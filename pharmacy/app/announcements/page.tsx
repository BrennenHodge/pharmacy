"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlayCircle, PauseCircle, Trash2 } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"

type Announcement = {
  id: string
  text: string
  audioUrl: string
  isActive: boolean
  schedule: {
    startDate: Date
    endDate: Date
    startTime: string
    endTime: string
  }
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState<Omit<Announcement, "id" | "audioUrl">>({
    text: "",
    isActive: true,
    schedule: {
      startDate: new Date(),
      endDate: new Date(),
      startTime: "09:00",
      endTime: "17:00",
    },
  })
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  useEffect(() => {
    // Load announcements from API or local storage
    // For this example, we'll use mock data
    setAnnouncements([
      {
        id: "1",
        text: "Welcome to our pharmacy. Please note that we are currently experiencing high call volumes.",
        audioUrl: "/placeholder.mp3",
        isActive: true,
        schedule: {
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          startTime: "09:00",
          endTime: "17:00",
        },
      },
      {
        id: "2",
        text: "Our pharmacy will be closing early today at 6 PM.",
        audioUrl: "/placeholder.mp3",
        isActive: false,
        schedule: {
          startDate: new Date(),
          endDate: new Date(),
          startTime: "09:00",
          endTime: "18:00",
        },
      },
    ])
  }, [])

  const generateAudio = async () => {
    setIsGeneratingAudio(true)
    // Simulate API call to text-to-speech service
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingAudio(false)

    const newAnnouncementWithId: Announcement = {
      ...newAnnouncement,
      id: Date.now().toString(),
      audioUrl: "/placeholder.mp3", // In a real app, this would be the URL returned by the TTS service
      schedule: {
        ...newAnnouncement.schedule,
        startDate: dateRange?.from || new Date(),
        endDate: dateRange?.to || new Date(),
      },
    }

    setAnnouncements((prev) => [...prev, newAnnouncementWithId])
    setNewAnnouncement({
      text: "",
      isActive: true,
      schedule: {
        startDate: new Date(),
        endDate: new Date(),
        startTime: "09:00",
        endTime: "17:00",
      },
    })
    setDateRange({ from: new Date(), to: new Date() })
  }

  const toggleAnnouncementActive = (id: string) => {
    setAnnouncements((prev) => prev.map((ann) => (ann.id === id ? { ...ann, isActive: !ann.isActive } : ann)))
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((ann) => ann.id !== id))
  }

  const togglePlay = (id: string) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null)
      // Stop audio playback
    } else {
      setCurrentlyPlaying(id)
      // Start audio playback
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Announcements</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Announcement</CardTitle>
          <CardDescription>Enter the announcement text and set its schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="announcement-text">Announcement Text</Label>
              <Textarea
                id="announcement-text"
                placeholder="Enter your announcement here..."
                value={newAnnouncement.text}
                onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, text: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <DateRangePicker date={dateRange} onDateChange={setDateRange} />
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={newAnnouncement.schedule.startTime}
                  onChange={(e) =>
                    setNewAnnouncement((prev) => ({
                      ...prev,
                      schedule: { ...prev.schedule, startTime: e.target.value },
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={newAnnouncement.schedule.endTime}
                  onChange={(e) =>
                    setNewAnnouncement((prev) => ({
                      ...prev,
                      schedule: { ...prev.schedule, endTime: e.target.value },
                    }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateAudio}
            disabled={isGeneratingAudio || !newAnnouncement.text}
            className="w-full sm:w-auto"
          >
            {isGeneratingAudio ? "Generating..." : "Generate Announcement"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Announcement</TableHead>
                  <TableHead className="hidden md:table-cell">Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.text}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(announcement.schedule.startDate, "PP")} - {format(announcement.schedule.endDate, "PP")}
                      <br />
                      {announcement.schedule.startTime} - {announcement.schedule.endTime}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={announcement.isActive}
                        onCheckedChange={() => toggleAnnouncementActive(announcement.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => togglePlay(announcement.id)}>
                          {currentlyPlaying === announcement.id ? (
                            <PauseCircle className="h-5 w-5" />
                          ) : (
                            <PlayCircle className="h-5 w-5" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteAnnouncement(announcement.id)}>
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

