"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, PhoneCall, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for recent calls and favorites
const recentCalls = [
  { id: 1, name: "John Doe", number: "+1 (555) 123-4567", date: "2023-06-20 14:30", duration: "5:23" },
  { id: 2, name: "Jane Smith", number: "+1 (555) 987-6543", date: "2023-06-20 11:15", duration: "3:47" },
  { id: 3, name: "Dr. Williams", number: "+1 (555) 246-8135", date: "2023-06-19 16:45", duration: "8:12" },
]

const favorites = [
  { id: 1, name: "Main Office", number: "+1 (555) 111-0000" },
  { id: 2, name: "Dr. Johnson", number: "+1 (555) 222-3333" },
  { id: 3, name: "Pharmacy Supply", number: "+1 (555) 444-5555" },
]

// Sample data for outbound call log
const outboundCallLog = [
  {
    id: 1,
    name: "Alice Brown",
    number: "+1 (555) 555-1212",
    date: "2023-06-20 15:45",
    duration: "4:18",
    status: "Completed",
  },
  {
    id: 2,
    name: "Bob Green",
    number: "+1 (555) 555-2323",
    date: "2023-06-20 14:30",
    duration: "0:45",
    status: "No Answer",
  },
  {
    id: 3,
    name: "Charlie Davis",
    number: "+1 (555) 555-3434",
    date: "2023-06-20 13:15",
    duration: "2:36",
    status: "Completed",
  },
  {
    id: 4,
    name: "Diana Evans",
    number: "+1 (555) 555-4545",
    date: "2023-06-20 11:00",
    duration: "1:52",
    status: "Completed",
  },
  {
    id: 5,
    name: "Edward Foster",
    number: "+1 (555) 555-5656",
    date: "2023-06-19 16:20",
    duration: "0:30",
    status: "Busy",
  },
]

export default function OutboundPage() {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleCall = () => {
    console.log("Calling:", phoneNumber)
    // Implement actual call functionality here
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Outbound Calls</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Softphone Dialer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((digit) => (
                  <Button key={digit} variant="outline" onClick={() => setPhoneNumber((prev) => prev + digit)}>
                    {digit}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={handleCall}>
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
                <Button variant="outline" onClick={() => setPhoneNumber("")}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              <TabsContent value="recent">
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {recentCalls.map((call) => (
                      <div key={call.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{call.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{call.name}</p>
                            <p className="text-xs text-muted-foreground">{call.number}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setPhoneNumber(call.number)}>
                          <PhoneCall className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="favorites">
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {favorites.map((favorite) => (
                      <div key={favorite.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{favorite.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{favorite.name}</p>
                            <p className="text-xs text-muted-foreground">{favorite.number}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setPhoneNumber(favorite.number)}>
                          <PhoneCall className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Outbound Call Log</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="hidden md:table-cell">Number</TableHead>
                  <TableHead className="hidden sm:table-cell">Date & Time</TableHead>
                  <TableHead className="hidden lg:table-cell">Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outboundCallLog.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">{call.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{call.number}</TableCell>
                    <TableCell className="hidden sm:table-cell">{call.date}</TableCell>
                    <TableCell className="hidden lg:table-cell">{call.duration}</TableCell>
                    <TableCell>{call.status}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setPhoneNumber(call.number)}>
                        <PhoneCall className="h-4 w-4" />
                      </Button>
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

