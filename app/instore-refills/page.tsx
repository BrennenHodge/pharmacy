"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PillIcon, Search, RefreshCw, AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock function to simulate fetching patient data
const fetchPatientData = async (rxNumber: string) => {
  // In a real application, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

  if (rxNumber === "RX1234567") {
    return {
      name: "John Doe",
      dateOfBirth: "1980-05-15",
      address: "123 Main St, Anytown, USA",
      phoneNumber: "(555) 123-4567",
      prescriptions: [
        { rxNumber: "RX1234567", medication: "Lisinopril 10mg", lastFilled: "2023-05-01", refillsRemaining: 2 },
        { rxNumber: "RX7654321", medication: "Metformin 500mg", lastFilled: "2023-05-15", refillsRemaining: 3 },
      ],
    }
  }
  return null
}

export default function InstoreRefillsPage() {
  const [rxNumber, setRxNumber] = useState("")
  const [patientData, setPatientData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refillSuccess, setRefillSuccess] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    setPatientData(null)
    setRefillSuccess(false)

    try {
      const data = await fetchPatientData(rxNumber)
      if (data) {
        setPatientData(data)
      } else {
        setError("No patient found with the given RX number.")
      }
    } catch (err) {
      setError("An error occurred while fetching patient data.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefill = async (rxNumber: string) => {
    // In a real application, this would be an API call to process the refill
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    setIsLoading(false)
    setRefillSuccess(true)
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Instore Refills</h1>
        <p className="text-muted-foreground">Process prescription refills for in-store patients</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Lookup</CardTitle>
          <CardDescription>Enter the patient's RX number to retrieve their information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-end space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="w-full sm:w-auto flex-grow">
              <Label htmlFor="rx-number" className="mb-1 block">
                RX Number
              </Label>
              <Input
                id="rx-number"
                value={rxNumber}
                onChange={(e) => setRxNumber(e.target.value)}
                placeholder="Enter RX number"
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {refillSuccess && (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>The prescription has been successfully sent for refill.</AlertDescription>
        </Alert>
      )}

      {patientData && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label>Name</Label>
                <p className="font-medium">{patientData.name}</p>
              </div>
              <div>
                <Label>Date of Birth</Label>
                <p className="font-medium">{patientData.dateOfBirth}</p>
              </div>
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <p className="font-medium">{patientData.address}</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <Label>Phone Number</Label>
                <p className="font-medium">{patientData.phoneNumber}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Prescriptions</h3>
              <ScrollArea className="h-[300px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>RX Number</TableHead>
                      <TableHead className="hidden sm:table-cell">Medication</TableHead>
                      <TableHead className="hidden md:table-cell">Last Filled</TableHead>
                      <TableHead>Refills</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientData.prescriptions.map((prescription: any) => (
                      <TableRow key={prescription.rxNumber}>
                        <TableCell>{prescription.rxNumber}</TableCell>
                        <TableCell className="hidden sm:table-cell">{prescription.medication}</TableCell>
                        <TableCell className="hidden md:table-cell">{prescription.lastFilled}</TableCell>
                        <TableCell>{prescription.refillsRemaining}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleRefill(prescription.rxNumber)}
                            disabled={prescription.refillsRemaining === 0 || isLoading}
                            size="sm"
                          >
                            <PillIcon className="mr-2 h-4 w-4" />
                            Refill
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

