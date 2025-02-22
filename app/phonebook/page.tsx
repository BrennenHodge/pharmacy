"use client"

import type React from "react"

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
import { Search, Download, Upload, Filter, MoreVertical, Plus, Trash, Edit } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample contact data
const initialContacts = [
  { id: 1, name: "Dr. John Smith", type: "Doctor", phone: "+1 (555) 123-4567", email: "john.smith@example.com" },
  { id: 2, name: "St. Mary's Hospital", type: "Hospital", phone: "+1 (555) 987-6543", email: "info@stmarys.com" },
  { id: 3, name: "Jane Doe", type: "Patient", phone: "+1 (555) 246-8135", email: "jane.doe@example.com" },
  { id: 4, name: "MedSupply Inc.", type: "Supplier", phone: "+1 (555) 369-2580", email: "orders@medsupply.com" },
  { id: 5, name: "Dr. Sarah Johnson", type: "Doctor", phone: "+1 (555) 159-7530", email: "sarah.johnson@example.com" },
]

type Contact = (typeof initialContacts)[0]

export default function PhonebookPage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [newContact, setNewContact] = useState<Omit<Contact, "id">>({ name: "", type: "", phone: "", email: "" })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredContacts = contacts.filter(
    (contact) =>
      (filterType === null || contact.type === filterType) &&
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAddContact = () => {
    setContacts([...contacts, { id: contacts.length + 1, ...newContact }])
    setNewContact({ name: "", type: "", phone: "", email: "" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const exportContacts = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Type,Phone,Email\n" +
      contacts.map((c) => `${c.name},${c.type},${c.phone},${c.email}`).join("\n")
    const encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }

  const importContacts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const lines = content.split("\n")
        const newContacts: Omit<Contact, "id">[] = lines.slice(1).map((line) => {
          const [name, type, phone, email] = line.split(",")
          return { name, type, phone, email }
        })
        setContacts([...contacts, ...newContacts.map((c, index) => ({ ...c, id: contacts.length + index + 1 }))])
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Phonebook</h1>
        <p className="text-muted-foreground">Manage your pharmacy contacts</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                {filterType || "All Types"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterType(null)}>All Types</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Doctor")}>Doctors</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Hospital")}>Hospitals</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Patient")}>Patients</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Supplier")}>Suppliers</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" onClick={exportContacts} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-import")?.click()}
            className="w-full sm:w-auto"
          >
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <input id="file-import" type="file" accept=".csv" className="hidden" onChange={importContacts} />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>Enter the details of the new contact below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input
                    id="type"
                    value={newContact.type}
                    onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddContact}>Add Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{contact.type}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell className="hidden md:table-cell">{contact.email}</TableCell>
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
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteContact(contact.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
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

