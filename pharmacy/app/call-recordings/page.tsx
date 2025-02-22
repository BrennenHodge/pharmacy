"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Download,
  Filter,
  Trash2,
  Archive,
  PlayCircle,
  PauseCircle,
  PhoneIncoming,
  PhoneOutgoing,
} from "lucide-react"
import type { DateRange } from "react-day-picker"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample call recording data
const recordings = [
  {
    id: 1,
    type: "incoming",
    from: "+1 (555) 123-4567",
    to: "Pharmacy",
    duration: "00:03:45",
    date: "2023-06-10T09:30:00",
    size: "2.3 MB",
  },
  {
    id: 2,
    type: "outgoing",
    from: "Pharmacy",
    to: "+1 (555) 987-6543",
    duration: "00:02:15",
    date: "2023-06-10T10:15:00",
    size: "1.5 MB",
  },
  {
    id: 3,
    type: "incoming",
    from: "+1 (555) 246-8135",
    to: "Pharmacy",
    duration: "00:01:30",
    date: "2023-06-10T11:00:00",
    size: "1.1 MB",
  },
  {
    id: 4,
    type: "outgoing",
    from: "Pharmacy",
    to: "+1 (555) 369-2580",
    duration: "00:04:20",
    date: "2023-06-10T13:45:00",
    size: "3.1 MB",
  },
  {
    id: 5,
    type: "incoming",
    from: "+1 (555) 159-7530",
    to: "Pharmacy",
    duration: "00:00:45",
    date: "2023-06-10T15:30:00",
    size: "0.8 MB",
  },
]

export default function CallRecordingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 5, 1),
    to: new Date(),
  })
  const [activeTab, setActiveTab] = useState("all")
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [selectedRecording, setSelectedRecording] = useState<(typeof recordings)[0] | null>(null)

  const filteredRecordings = recordings.filter(
    (recording) =>
      (activeTab === "all" || recording.type === activeTab) &&
      (recording.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recording.to.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const togglePlay = (id: number) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id)
    // Here you would typically implement the actual audio playback logic
  }

  const exportRecordings = () => {
    // Implement export functionality here
    console.log("Exporting recordings...")
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Call Recordings</h1>
        <p className="text-muted-foreground">Listen to and manage your recorded calls</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative flex-1 w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recordings"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportRecordings} className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Duration</DropdownMenuLabel>
              <DropdownMenuItem>{"< 1 minute"}</DropdownMenuItem>
              <DropdownMenuItem>1 - 5 minutes</DropdownMenuItem>
              <DropdownMenuItem>{"> 5 minutes"}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Size</DropdownMenuLabel>
              <DropdownMenuItem>{"< 1 MB"}</DropdownMenuItem>
              <DropdownMenuItem>1 - 5 MB</DropdownMenuItem>
              <DropdownMenuItem>{"> 5 MB"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recording Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{recordings.length}</span>
            <span className="text-sm text-muted-foreground">Total Recordings</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{recordings.filter((r) => r.type === "incoming").length}</span>
            <span className="text-sm text-muted-foreground">Incoming Calls</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{recordings.filter((r) => r.type === "outgoing").length}</span>
            <span className="text-sm text-muted-foreground">Outgoing Calls</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">
              {recordings.reduce((acc, r) => acc + Number.parseFloat(r.size), 0).toFixed(1)} MB
            </span>
            <span className="text-sm text-muted-foreground">Total Size</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            All Recordings
          </TabsTrigger>
          <TabsTrigger value="incoming" className="flex-1 sm:flex-none">
            Incoming
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex-1 sm:flex-none">
            Outgoing
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="h-[calc(100vh-400px)] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead className="hidden sm:table-cell">To</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead className="hidden lg:table-cell">Date & Time</TableHead>
              <TableHead className="hidden xl:table-cell">Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecordings.map((recording) => (
              <TableRow key={recording.id}>
                <TableCell>
                  {recording.type === "incoming" ? (
                    <PhoneIncoming className="h-4 w-4 text-green-500" />
                  ) : (
                    <PhoneOutgoing className="h-4 w-4 text-blue-500" />
                  )}
                </TableCell>
                <TableCell>{recording.from}</TableCell>
                <TableCell className="hidden sm:table-cell">{recording.to}</TableCell>
                <TableCell className="hidden md:table-cell">{recording.duration}</TableCell>
                <TableCell className="hidden lg:table-cell">{new Date(recording.date).toLocaleString()}</TableCell>
                <TableCell className="hidden xl:table-cell">{recording.size}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => togglePlay(recording.id)}>
                      {currentlyPlaying === recording.id ? (
                        <PauseCircle className="h-4 w-4" />
                      ) : (
                        <PlayCircle className="h-4 w-4" />
                      )}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Search className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Recording Details</DialogTitle>
                          <DialogDescription>
                            From: {recording.from}
                            <br />
                            Date: {new Date(recording.date).toLocaleString()}
                            <br />
                            Duration: {recording.duration}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Audio Player</Label>
                            <audio controls src={`/api/recordings/${recording.id}`} className="w-full">
                              Your browser does not support the audio element.
                            </audio>
                          </div>
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

