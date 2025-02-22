"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function IVAPage() {
  const [selectedVoice, setSelectedVoice] = useState("default")
  const [prompt, setPrompt] = useState("")
  const [personality, setPersonality] = useState("")
  const [knowledgeBase, setKnowledgeBase] = useState<File | null>(null)
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1,
    pitch: 1,
    volume: 1,
  })
  const [useIVA, setUseIVA] = useState(false)

  const handleKnowledgeBaseUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setKnowledgeBase(file)
    }
  }

  const handleSaveConfiguration = () => {
    // Here you would implement the logic to save the IVA configuration
    console.log("Saving IVA configuration...")
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Interactive Voice Agent (IVA) Configuration</h1>
        <p className="text-muted-foreground">Set up your AI-powered voice assistant</p>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
            <TabsTrigger value="general" className="flex-1 sm:flex-none">
              General
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex-1 sm:flex-none">
              Voice Settings
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex-1 sm:flex-none">
              Knowledge Base
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure the basic settings for your IVA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="use-iva" checked={useIVA} onCheckedChange={setUseIVA} />
                  <Label htmlFor="use-iva">Use IVA instead of IVR</Label>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="voice-select">Select Voice AI</Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default AI Voice</SelectItem>
                      <SelectItem value="friendly">Friendly AI Voice</SelectItem>
                      <SelectItem value="professional">Professional AI Voice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prompt">Initial Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Enter the initial prompt for your IVA"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="personality">Agent Personality</Label>
                  <Textarea
                    id="personality"
                    placeholder="Describe how the agent should act (e.g., friendly, professional, empathetic)"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice">
            <Card>
              <CardHeader>
                <CardTitle>Voice Settings</CardTitle>
                <CardDescription>Customize the voice characteristics of your IVA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="speed-slider">Speed</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="speed-slider"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={[voiceSettings.speed]}
                      onValueChange={([speed]) => setVoiceSettings({ ...voiceSettings, speed })}
                      className="flex-grow"
                    />
                    <span className="w-12 text-center">{voiceSettings.speed.toFixed(1)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pitch-slider">Pitch</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="pitch-slider"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={[voiceSettings.pitch]}
                      onValueChange={([pitch]) => setVoiceSettings({ ...voiceSettings, pitch })}
                      className="flex-grow"
                    />
                    <span className="w-12 text-center">{voiceSettings.pitch.toFixed(1)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="volume-slider">Volume</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="volume-slider"
                      min={0}
                      max={1}
                      step={0.1}
                      value={[voiceSettings.volume]}
                      onValueChange={([volume]) => setVoiceSettings({ ...voiceSettings, volume })}
                      className="flex-grow"
                    />
                    <span className="w-12 text-center">{voiceSettings.volume.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Upload documents to enhance your IVA's knowledge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="knowledge-base">Upload Knowledge Base</Label>
                  <Input
                    id="knowledge-base"
                    type="file"
                    onChange={handleKnowledgeBaseUpload}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </div>
                {knowledgeBase && <p className="text-sm text-muted-foreground">Uploaded: {knowledgeBase.name}</p>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={handleSaveConfiguration} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" /> Save IVA Configuration
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}

