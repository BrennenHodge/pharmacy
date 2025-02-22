"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for staff and voicemail boxes
const staff = [
  { id: 1, name: "Dr. John Smith", phone: "+1 (555) 123-4567" },
  { id: 2, name: "Nurse Jane Doe", phone: "+1 (555) 987-6543" },
  { id: 3, name: "Pharmacist Mike Johnson", phone: "+1 (555) 246-8135" },
]

const voicemailBoxes = [
  { id: 1, name: "General Inquiries" },
  { id: 2, name: "Prescription Refills" },
  { id: 3, name: "Emergency Consultations" },
]

export default function AfterHoursPage() {
  const [afterHoursEnabled, setAfterHoursEnabled] = useState(true)
  const [routingOption, setRoutingOption] = useState("staff")
  const [selectedStaff, setSelectedStaff] = useState("")
  const [selectedVoicemail, setSelectedVoicemail] = useState("")
  const [customNumber, setCustomNumber] = useState("")
  const [schedules, setSchedules] = useState([
    { id: 1, days: "Mon-Fri", startTime: "18:00", endTime: "09:00", destination: "Dr. John Smith" },
    { id: 2, days: "Sat-Sun", startTime: "00:00", endTime: "23:59", destination: "General Inquiries (Voicemail)" },
  ])

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving after hours settings...")
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">After Hours</h1>
        <p className="text-muted-foreground">Configure call routing for after-hours operations</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>After Hours Settings</CardTitle>
          <CardDescription>Manage your pharmacy's after-hours call routing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="after-hours-mode" checked={afterHoursEnabled} onCheckedChange={setAfterHoursEnabled} />
            <Label htmlFor="after-hours-mode">Enable After Hours Mode</Label>
          </div>

          <RadioGroup value={routingOption} onValueChange={setRoutingOption} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="staff" id="staff" />
              <Label htmlFor="staff">Route to Staff Member</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="voicemail" id="voicemail" />
              <Label htmlFor="voicemail">Route to Voicemail Box</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Route to Custom Number</Label>
            </div>
          </RadioGroup>

          {routingOption === "staff" && (
            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {routingOption === "voicemail" && (
            <Select value={selectedVoicemail} onValueChange={setSelectedVoicemail}>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Select voicemail box" />
              </SelectTrigger>
              <SelectContent>
                {voicemailBoxes.map((box) => (
                  <SelectItem key={box.id} value={box.id.toString()}>
                    {box.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {routingOption === "custom" && (
            <Input
              type="tel"
              placeholder="Enter custom phone number"
              value={customNumber}
              onChange={(e) => setCustomNumber(e.target.value)}
              className="w-full sm:w-[300px]"
            />
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
            Save Settings
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>After Hours Schedules</CardTitle>
          <CardDescription>Define specific schedules for after-hours routing</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Days</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead className="hidden sm:table-cell">Destination</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.days}</TableCell>
                    <TableCell>{schedule.startTime}</TableCell>
                    <TableCell>{schedule.endTime}</TableCell>
                    <TableCell className="hidden sm:table-cell">{schedule.destination}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto">Add New Schedule</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

