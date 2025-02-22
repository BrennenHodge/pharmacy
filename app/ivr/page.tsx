"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Save, Trash2, PhoneCall, ArrowRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

type IVROption = {
  id: string
  prompt: string
  action: string
  nextStep?: string
}

type IVRStep = {
  id: string
  name: string
  greeting: string
  options: IVROption[]
}

export default function IVRPage() {
  const [steps, setSteps] = useState<IVRStep[]>([
    {
      id: "main",
      name: "Main Menu",
      greeting: "Welcome to VOXO Pharmacy. Please listen carefully as our menu options have changed.",
      options: [
        { id: "1", prompt: "For prescription refills, press 1", action: "refills" },
        { id: "2", prompt: "For store hours and locations, press 2", action: "hours" },
        { id: "3", prompt: "To speak with a pharmacist, press 3", action: "pharmacist" },
        { id: "0", prompt: "To repeat this menu, press 0", action: "repeat" },
      ],
    },
  ])

  const [currentStep, setCurrentStep] = useState<string>("main")
  const [newOption, setNewOption] = useState<Omit<IVROption, "id">>({ prompt: "", action: "" })

  const addOption = () => {
    const updatedSteps = steps.map((step) => {
      if (step.id === currentStep) {
        return {
          ...step,
          options: [...step.options, { ...newOption, id: String(step.options.length + 1) }],
        }
      }
      return step
    })
    setSteps(updatedSteps)
    setNewOption({ prompt: "", action: "" })
  }

  const updateStep = (id: string, field: keyof IVRStep, value: string) => {
    const updatedSteps = steps.map((step) => (step.id === id ? { ...step, [field]: value } : step))
    setSteps(updatedSteps)
  }

  const deleteOption = (stepId: string, optionId: string) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        return {
          ...step,
          options: step.options.filter((option) => option.id !== optionId),
        }
      }
      return step
    })
    setSteps(updatedSteps)
  }

  const addNewStep = () => {
    const newStepId = `step_${steps.length + 1}`
    setSteps([
      ...steps,
      {
        id: newStepId,
        name: `New Step ${steps.length + 1}`,
        greeting: "Please select an option.",
        options: [],
      },
    ])
    setCurrentStep(newStepId)
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">IVR Configuration</h1>
        <p className="text-muted-foreground">Set up your interactive voice response system</p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <Select value={currentStep} onValueChange={setCurrentStep}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select a step" />
          </SelectTrigger>
          <SelectContent>
            {steps.map((step) => (
              <SelectItem key={step.id} value={step.id}>
                {step.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addNewStep} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New Step
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        {steps.map(
          (step) =>
            step.id === currentStep && (
              <Card key={step.id} className="mb-6">
                <CardHeader>
                  <CardTitle>
                    <Input
                      value={step.name}
                      onChange={(e) => updateStep(step.id, "name", e.target.value)}
                      className="text-xl font-bold"
                    />
                  </CardTitle>
                  <CardDescription>Configure the greeting and options for this step</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label htmlFor="greeting">Greeting</Label>
                    <Textarea
                      id="greeting"
                      value={step.greeting}
                      onChange={(e) => updateStep(step.id, "greeting", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Options</h3>
                    {step.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2"
                      >
                        <Input value={option.prompt} readOnly className="flex-grow" />
                        <Select defaultValue={option.action}>
                          <SelectTrigger className="w-full sm:w-[150px]">
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transfer">Transfer</SelectItem>
                            <SelectItem value="voicemail">Voicemail</SelectItem>
                            <SelectItem value="menu">Sub-menu</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" onClick={() => deleteOption(step.id, option.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                    <Input
                      placeholder="New option prompt"
                      value={newOption.prompt}
                      onChange={(e) => setNewOption({ ...newOption, prompt: e.target.value })}
                      className="flex-grow"
                    />
                    <Select
                      value={newOption.action}
                      onValueChange={(value) => setNewOption({ ...newOption, action: value })}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="voicemail">Voicemail</SelectItem>
                        <SelectItem value="menu">Sub-menu</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addOption} className="w-full sm:w-auto">
                      Add Option
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ),
        )}

        <div className="mt-6">
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save IVR Configuration
          </Button>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>IVR Flow Preview</CardTitle>
            <CardDescription>Visual representation of your IVR flow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-2">
                  <PhoneCall className="h-6 w-6" />
                  <div className="font-semibold">{step.name}</div>
                  {index < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  )
}

