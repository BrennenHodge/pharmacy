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
import { Search, Download, Filter, MoreVertical, Phone, PhoneIncoming, PhoneOutgoing } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample call data
const calls = [
  {
    id: 1,
    type: "incoming",
    from: "+1 (555) 123-4567",
    to: "Pharmacy",
    duration: "00:03:45",
    date: "2023-06-10T09:30:00",
    status: "Completed",
  },
  {
    id: 2,
    type: "outgoing",
    from: "Pharmacy",
    to: "+1 (555) 987-6543",
    duration: "00:02:15",
    date: "2023-06-10T10:15:00",
    status: "Completed",
  },
  {
    id: 3,
    type: "incoming",
    from: "+1 (555) 246-8135",
    to: "Pharmacy",
    duration: "00:01:30",
    date: "2023-06-10T11:00:00",
    status: "Missed",
  },
  {
    id: 4,
    type: "outgoing",
    from: "Pharmacy",
    to: "+1 (555) 369-2580",
    duration: "00:04:20",
    date: "2023-06-10T13:45:00",
    status: "Completed",
  },
  {
    id: 5,
    type: "incoming",
    from: "+1 (555) 159-7530",
    to: "Pharmacy",
    duration: "00:00:45",
    date: "2023-06-10T15:30:00",
    status: "Voicemail",
  },
]

export default function CallLogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 5, 1),
    to: new Date(),
  })
  const [activeTab, setActiveTab] = useState("all")

  const filteredCalls = calls.filter(
    (call) =>
      (activeTab === "all" || call.type === activeTab) &&
      (call.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.status.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const callStats = {
    total: filteredCalls.length,
    incoming: filteredCalls.filter((call) => call.type === "incoming").length,
    outgoing: filteredCalls.filter((call) => call.type === "outgoing").length,
    missed: filteredCalls.filter((call) => call.status === "Missed").length,
    averageDuration: "00:02:31", // This would be calculated from actual data
  }

  const exportData = () => {
    // Implement export functionality here
    console.log("Exporting data...")
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Call Log</h1>
        <p className="text-muted-foreground">View and manage your call history</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative flex-1 w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search calls"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportData} className="w-full md:w-auto">
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
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Missed</DropdownMenuItem>
              <DropdownMenuItem>Voicemail</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Duration</DropdownMenuLabel>
              <DropdownMenuItem>{"< 1 minute"}</DropdownMenuItem>
              <DropdownMenuItem>1 - 5 minutes</DropdownMenuItem>
              <DropdownMenuItem>{"> 5 minutes"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incoming</CardTitle>
            <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.incoming}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outgoing</CardTitle>
            <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.outgoing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.missed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.averageDuration}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            All Calls
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
              <TableHead className="hidden md:table-cell">To</TableHead>
              <TableHead className="hidden sm:table-cell">Duration</TableHead>
              <TableHead className="hidden lg:table-cell">Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>{call.type === "incoming" ? "Incoming" : "Outgoing"}</TableCell>
                <TableCell>{call.from}</TableCell>
                <TableCell className="hidden md:table-cell">{call.to}</TableCell>
                <TableCell className="hidden sm:table-cell">{call.duration}</TableCell>
                <TableCell className="hidden lg:table-cell">{new Date(call.date).toLocaleString()}</TableCell>
                <TableCell>{call.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Add Note</DropdownMenuItem>
                      <DropdownMenuItem>Call Back</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}

