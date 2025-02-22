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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Search, Download, MoreVertical, Plus } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample queue data
const queues = [
  { id: 1, name: "General Inquiries", agents: 5, avgWaitTime: "00:02:30", callsHandled: 120, abandonRate: "3.5%" },
  { id: 2, name: "Prescription Refills", agents: 3, avgWaitTime: "00:01:45", callsHandled: 85, abandonRate: "2.1%" },
  { id: 3, name: "Insurance Queries", agents: 4, avgWaitTime: "00:03:15", callsHandled: 70, abandonRate: "4.2%" },
  { id: 4, name: "Pharmacist Consultation", agents: 2, avgWaitTime: "00:04:00", callsHandled: 40, abandonRate: "1.8%" },
]

// Sample agent data
const agents = [
  {
    id: 1,
    name: "John Doe",
    queue: "General Inquiries",
    status: "Available",
    callsHandled: 25,
    avgHandleTime: "00:03:45",
  },
  {
    id: 2,
    name: "Jane Smith",
    queue: "Prescription Refills",
    status: "On Call",
    callsHandled: 18,
    avgHandleTime: "00:02:30",
  },
  {
    id: 3,
    name: "Mike Johnson",
    queue: "Insurance Queries",
    status: "Break",
    callsHandled: 15,
    avgHandleTime: "00:04:15",
  },
  {
    id: 4,
    name: "Sarah Brown",
    queue: "Pharmacist Consultation",
    status: "Available",
    callsHandled: 12,
    avgHandleTime: "00:05:30",
  },
]

export default function QueueReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 5, 1),
    to: new Date(),
  })
  const [activeTab, setActiveTab] = useState("queues")
  const [newQueue, setNewQueue] = useState({ name: "", agents: 0 })

  const filteredQueues = queues.filter((queue) => queue.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.queue.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddQueue = () => {
    // Logic to add a new queue
    console.log("Adding new queue:", newQueue)
    // Reset the form
    setNewQueue({ name: "", agents: 0 })
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Queue Reports</h1>
        <p className="text-muted-foreground">View and manage call queues and agent performance</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative flex-1 w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search queues or agents"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => console.log("Exporting data...")} className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Queue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Queue</DialogTitle>
                <DialogDescription>Create a new call queue for your pharmacy.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Queue Name
                  </Label>
                  <Input
                    id="name"
                    value={newQueue.name}
                    onChange={(e) => setNewQueue({ ...newQueue, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="agents" className="text-right">
                    Initial Agents
                  </Label>
                  <Input
                    id="agents"
                    type="number"
                    value={newQueue.agents}
                    onChange={(e) => setNewQueue({ ...newQueue, agents: Number.parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddQueue}>Add Queue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="queues" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="queues" className="flex-1 sm:flex-none">
            Queues
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex-1 sm:flex-none">
            Agents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queues">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Queue Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{queues.length}</span>
                <span className="text-sm text-muted-foreground">Total Queues</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{queues.reduce((acc, q) => acc + q.agents, 0)}</span>
                <span className="text-sm text-muted-foreground">Total Agents</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{queues.reduce((acc, q) => acc + q.callsHandled, 0)}</span>
                <span className="text-sm text-muted-foreground">Total Calls Handled</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  {(queues.reduce((acc, q) => acc + Number.parseFloat(q.abandonRate), 0) / queues.length).toFixed(1)}%
                </span>
                <span className="text-sm text-muted-foreground">Avg. Abandon Rate</span>
              </div>
            </CardContent>
          </Card>

          <ScrollArea className="h-[400px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Queue Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Agents</TableHead>
                  <TableHead className="hidden md:table-cell">Avg. Wait Time</TableHead>
                  <TableHead className="hidden lg:table-cell">Calls Handled</TableHead>
                  <TableHead>Abandon Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQueues.map((queue) => (
                  <TableRow key={queue.id}>
                    <TableCell className="font-medium">{queue.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{queue.agents}</TableCell>
                    <TableCell className="hidden md:table-cell">{queue.avgWaitTime}</TableCell>
                    <TableCell className="hidden lg:table-cell">{queue.callsHandled}</TableCell>
                    <TableCell>{queue.abandonRate}</TableCell>
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
                          <DropdownMenuItem>Edit Queue</DropdownMenuItem>
                          <DropdownMenuItem>Manage Agents</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete Queue</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="agents">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Agent Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{agents.length}</span>
                <span className="text-sm text-muted-foreground">Total Agents</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{agents.filter((a) => a.status === "Available").length}</span>
                <span className="text-sm text-muted-foreground">Available Agents</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{agents.reduce((acc, a) => acc + a.callsHandled, 0)}</span>
                <span className="text-sm text-muted-foreground">Total Calls Handled</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  {agents.reduce(
                    (acc, a) =>
                      acc +
                      Number.parseInt(a.avgHandleTime.split(":")[0]) * 60 +
                      Number.parseInt(a.avgHandleTime.split(":")[1]),
                    0,
                  ) / agents.length}
                  s
                </span>
                <span className="text-sm text-muted-foreground">Avg. Handle Time</span>
              </div>
            </CardContent>
          </Card>

          <ScrollArea className="h-[400px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Queue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Calls Handled</TableHead>
                  <TableHead className="hidden lg:table-cell">Avg. Handle Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{agent.queue}</TableCell>
                    <TableCell>{agent.status}</TableCell>
                    <TableCell className="hidden md:table-cell">{agent.callsHandled}</TableCell>
                    <TableCell className="hidden lg:table-cell">{agent.avgHandleTime}</TableCell>
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
                          <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                          <DropdownMenuItem>Change Queue</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Remove Agent</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

