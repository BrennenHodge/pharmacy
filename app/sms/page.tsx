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
import { Textarea } from "@/components/ui/textarea"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Search, Download, MoreVertical, Plus, Send } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample SMS data
const smsMessages = [
  {
    id: 1,
    type: "incoming",
    from: "+1 (555) 123-4567",
    to: "Pharmacy",
    content: "Is my prescription ready?",
    date: "2023-06-10T09:30:00",
    status: "Read",
  },
  {
    id: 2,
    type: "outgoing",
    from: "Pharmacy",
    to: "+1 (555) 987-6543",
    content: "Your prescription is ready for pickup.",
    date: "2023-06-10T10:15:00",
    status: "Delivered",
  },
  {
    id: 3,
    type: "incoming",
    from: "+1 (555) 246-8135",
    to: "Pharmacy",
    content: "What are your opening hours?",
    date: "2023-06-10T11:00:00",
    status: "Unread",
  },
  {
    id: 4,
    type: "outgoing",
    from: "Pharmacy",
    to: "+1 (555) 369-2580",
    content: "Your refill request has been processed.",
    date: "2023-06-10T13:45:00",
    status: "Sent",
  },
  {
    id: 5,
    type: "incoming",
    from: "+1 (555) 159-7530",
    to: "Pharmacy",
    content: "Do you have COVID-19 vaccines available?",
    date: "2023-06-10T15:30:00",
    status: "Read",
  },
]

// Sample group data
const groups = [
  { id: 1, name: "Prescription Reminders", members: 150 },
  { id: 2, name: "Vaccine Updates", members: 200 },
  { id: 3, name: "Health Tips", members: 100 },
]

// Sample campaign data
const campaigns = [
  {
    id: 1,
    name: "Summer Sale",
    status: "Active",
    recipients: 500,
    sentCount: 450,
    openRate: "85%",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
  },
  {
    id: 2,
    name: "Flu Shot Reminder",
    status: "Scheduled",
    recipients: 1000,
    sentCount: 0,
    openRate: "0%",
    startDate: "2023-09-01",
    endDate: "2023-09-15",
  },
  {
    id: 3,
    name: "Holiday Hours",
    status: "Draft",
    recipients: 750,
    sentCount: 0,
    openRate: "0%",
    startDate: "2023-12-15",
    endDate: "2023-12-31",
  },
  {
    id: 4,
    name: "New Service Announcement",
    status: "Completed",
    recipients: 1200,
    sentCount: 1200,
    openRate: "92%",
    startDate: "2023-05-01",
    endDate: "2023-05-15",
  },
]

export default function SMSPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 5, 1),
    to: new Date(),
  })
  const [newMessage, setNewMessage] = useState({ to: "", content: "" })
  const [newGroup, setNewGroup] = useState({ name: "" })
  const [newCampaign, setNewCampaign] = useState({ name: "", content: "", group: "", startDate: "", endDate: "" })

  const filteredMessages = smsMessages.filter(
    (message) =>
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    console.log("Sending message:", newMessage)
    setNewMessage({ to: "", content: "" })
  }

  const handleCreateGroup = () => {
    console.log("Creating group:", newGroup)
    setNewGroup({ name: "" })
  }

  const handleCreateCampaign = () => {
    console.log("Creating campaign:", newCampaign)
    setNewCampaign({ name: "", content: "", group: "", startDate: "", endDate: "" })
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">SMS Management</h1>
        <p className="text-muted-foreground">Manage incoming and outgoing SMS messages</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => console.log("Exporting data...")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send New SMS</DialogTitle>
                <DialogDescription>Compose and send a new SMS message.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="to" className="text-right">
                    To
                  </Label>
                  <Input
                    id="to"
                    value={newMessage.to}
                    onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Message
                  </Label>
                  <Textarea
                    id="content"
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSendMessage}>Send Message</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="messages" className="mb-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="messages" className="flex-1 sm:flex-none">
            Messages
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex-1 sm:flex-none">
            Groups
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex-1 sm:flex-none">
            Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>SMS Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Messages" value={smsMessages.length} />
                <StatsCard title="Incoming" value={smsMessages.filter((m) => m.type === "incoming").length} />
                <StatsCard title="Outgoing" value={smsMessages.filter((m) => m.type === "outgoing").length} />
                <StatsCard title="Unread" value={smsMessages.filter((m) => m.status === "Unread").length} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead className="hidden sm:table-cell">To</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>{message.type}</TableCell>
                        <TableCell>{message.from}</TableCell>
                        <TableCell className="hidden sm:table-cell">{message.to}</TableCell>
                        <TableCell className="max-w-xs truncate">{message.content}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(message.date).toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{message.status}</TableCell>
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
                              <DropdownMenuItem>Reply</DropdownMenuItem>
                              <DropdownMenuItem>Forward</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">SMS Groups</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New SMS Group</DialogTitle>
                  <DialogDescription>Create a new group for sending bulk SMS messages.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="group-name" className="text-right">
                      Group Name
                    </Label>
                    <Input
                      id="group-name"
                      value={newGroup.name}
                      onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateGroup}>Create Group</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group Name</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{group.members}</TableCell>
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
                              <DropdownMenuItem>View Members</DropdownMenuItem>
                              <DropdownMenuItem>Edit Group</DropdownMenuItem>
                              <DropdownMenuItem>Send Group Message</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Delete Group</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">SMS Campaigns</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New SMS Campaign</DialogTitle>
                  <DialogDescription>Set up a new SMS campaign for your pharmacy.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="campaign-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="campaign-name"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="campaign-content" className="text-right">
                      Content
                    </Label>
                    <Textarea
                      id="campaign-content"
                      value={newCampaign.content}
                      onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="campaign-group" className="text-right">
                      Group
                    </Label>
                    <select
                      id="campaign-group"
                      value={newCampaign.group}
                      onChange={(e) => setNewCampaign({ ...newCampaign, group: e.target.value })}
                      className="col-span-3"
                    >
                      <option value="">Select a group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="campaign-start-date" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="campaign-start-date"
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="campaign-end-date" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="campaign-end-date"
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Recipients</TableHead>
                      <TableHead className="hidden md:table-cell">Sent</TableHead>
                      <TableHead className="hidden lg:table-cell">Open Rate</TableHead>
                      <TableHead className="hidden xl:table-cell">Start Date</TableHead>
                      <TableHead className="hidden xl:table-cell">End Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.status}</TableCell>
                        <TableCell className="hidden sm:table-cell">{campaign.recipients}</TableCell>
                        <TableCell className="hidden md:table-cell">{campaign.sentCount}</TableCell>
                        <TableCell className="hidden lg:table-cell">{campaign.openRate}</TableCell>
                        <TableCell className="hidden xl:table-cell">{campaign.startDate}</TableCell>
                        <TableCell className="hidden xl:table-cell">{campaign.endDate}</TableCell>
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
                              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate Campaign</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Delete Campaign</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-muted-foreground">{title}</span>
    </div>
  )
}

