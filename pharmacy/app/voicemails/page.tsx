"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, Trash2, Archive, PlayCircle, PauseCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample voicemail data
const voicemails = [
  {
    id: 1,
    from: "+1 (555) 123-4567",
    date: "2023-06-10T09:30:00",
    duration: "00:45",
    transcription:
      "Hello, this is John Doe calling about my prescription refill. I need to know if it's ready for pickup. Please call me back at this number. Thank you.",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: 2,
    from: "+1 (555) 987-6543",
    date: "2023-06-09T14:15:00",
    duration: "01:20",
    transcription:
      "Hi, this is Jane Smith. I'm calling to inquire about the side effects of my new medication. I've been experiencing some dizziness. Could someone please give me a call back? Thanks.",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: 3,
    from: "+1 (555) 246-8135",
    date: "2023-06-08T11:00:00",
    duration: "00:30",
    transcription:
      "Hello, Dr. Johnson here. I need to update a prescription for patient Alice Brown. Please call my office when you get this message.",
    audioUrl: "/placeholder.mp3",
  },
]

export default function VoicemailsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isPlaying, setIsPlaying] = useState<number | null>(null)

  const filteredVoicemails = voicemails.filter(
    (voicemail) =>
      voicemail.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voicemail.transcription.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const togglePlayPause = (id: number) => {
    setIsPlaying(isPlaying === id ? null : id)
    // Here you would typically implement the actual audio playback logic
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Voicemails</h1>
        <p className="text-muted-foreground">Listen to and manage your voicemail messages</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search voicemails"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Voicemail Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Voicemails" value={voicemails.length} />
            <StatsCard title="New Voicemails" value={2} />
            <StatsCard title="Avg. Duration" value="00:52" />
            <StatsCard title="Transcribed" value={`${voicemails.length}/${voicemails.length}`} />
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-400px)] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead>From</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead className="hidden lg:table-cell">Transcription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVoicemails.map((voicemail) => (
              <TableRow key={voicemail.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{voicemail.from}</TableCell>
                <TableCell className="hidden sm:table-cell">{new Date(voicemail.date).toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">{voicemail.duration}</TableCell>
                <TableCell className="hidden lg:table-cell max-w-xs truncate">{voicemail.transcription}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => togglePlayPause(voicemail.id)}>
                      {isPlaying === voicemail.id ? (
                        <PauseCircle className="h-5 w-5" />
                      ) : (
                        <PlayCircle className="h-5 w-5" />
                      )}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Search className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Voicemail Details</DialogTitle>
                          <DialogDescription>
                            From: {voicemail.from}
                            <br />
                            Date: {new Date(voicemail.date).toLocaleString()}
                            <br />
                            Duration: {voicemail.duration}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Transcription</h4>
                            <p className="text-sm text-muted-foreground">{voicemail.transcription}</p>
                          </div>
                          <audio controls src={voicemail.audioUrl} className="w-full">
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline">
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </Button>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                          <Search className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => togglePlayPause(voicemail.id)}>
                          {isPlaying === voicemail.id ? "Pause" : "Play"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}

function StatsCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-muted-foreground">{title}</span>
    </div>
  )
}

