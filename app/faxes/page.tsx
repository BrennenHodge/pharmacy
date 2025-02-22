"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreVertical, Eye, Printer, Plus, Archive, Trash } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample fax data
const faxes = [
  {
    id: 1,
    type: "incoming",
    from: "Dr. Smith's Office",
    to: "VOXO Pharmacy",
    subject: "Patient Prescription",
    pages: 2,
    date: "2023-06-10T09:30:00",
    status: "Received",
  },
  {
    id: 2,
    type: "outgoing",
    from: "VOXO Pharmacy",
    to: "Insurance Company",
    subject: "Claim Form",
    pages: 3,
    date: "2023-06-09T14:15:00",
    status: "Sent",
  },
  {
    id: 3,
    type: "incoming",
    from: "Medical Center",
    to: "VOXO Pharmacy",
    subject: "Lab Results",
    pages: 1,
    date: "2023-06-08T11:00:00",
    status: "Received",
  },
  {
    id: 4,
    type: "outgoing",
    from: "VOXO Pharmacy",
    to: "Patient Home",
    subject: "Medication Instructions",
    pages: 2,
    date: "2023-06-07T16:45:00",
    status: "Sent",
  },
  {
    id: 5,
    type: "incoming",
    from: "Specialist Office",
    to: "VOXO Pharmacy",
    subject: "Prescription Update",
    pages: 1,
    date: "2023-06-06T10:30:00",
    status: "Received",
  },
]

export default function FaxesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isNewFaxModalOpen, setIsNewFaxModalOpen] = useState(false)
  const [newFaxNumber, setNewFaxNumber] = useState("")
  const [newFaxFile, setNewFaxFile] = useState<File | null>(null)

  const filteredFaxes = faxes.filter(
    (fax) =>
      (activeTab === "all" || fax.type === activeTab) &&
      (fax.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fax.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fax.subject.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleNewFax = () => {
    // Here you would typically send the fax using an API
    console.log("Sending fax to:", newFaxNumber)
    console.log("File to send:", newFaxFile)
    // Reset form and close modal
    setNewFaxNumber("")
    setNewFaxFile(null)
    setIsNewFaxModalOpen(false)
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Faxes</h1>
        <p className="text-muted-foreground">Manage your incoming and outgoing faxes</p>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            All Faxes
          </TabsTrigger>
          <TabsTrigger value="incoming" className="flex-1 sm:flex-none">
            Incoming
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex-1 sm:flex-none">
            Outgoing
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faxes"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Dialog open={isNewFaxModalOpen} onOpenChange={setIsNewFaxModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Fax
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send New Fax</DialogTitle>
                <DialogDescription>Enter the fax number and upload the file you want to send.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fax-number" className="text-right">
                    Fax Number
                  </Label>
                  <Input
                    id="fax-number"
                    value={newFaxNumber}
                    onChange={(e) => setNewFaxNumber(e.target.value)}
                    className="col-span-3"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fax-file" className="text-right">
                    File
                  </Label>
                  <Input
                    id="fax-file"
                    type="file"
                    onChange={(e) => setNewFaxFile(e.target.files ? e.target.files[0] : null)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleNewFax}>Send Fax</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead>From</TableHead>
              <TableHead className="hidden sm:table-cell">To</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="hidden md:table-cell">Pages</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="hidden xl:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaxes.map((fax) => (
              <TableRow key={fax.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{fax.from}</TableCell>
                <TableCell className="hidden sm:table-cell">{fax.to}</TableCell>
                <TableCell>{fax.subject}</TableCell>
                <TableCell className="hidden md:table-cell">{fax.pages}</TableCell>
                <TableCell className="hidden lg:table-cell">{new Date(fax.date).toLocaleDateString()}</TableCell>
                <TableCell className="hidden xl:table-cell">{fax.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        <span>Print</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        <span>Archive</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
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

