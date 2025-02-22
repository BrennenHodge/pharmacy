"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Clock, Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

type TimeRange = {
  open: string
  close: string
}

type DaySchedule = {
  isOpen: boolean
  hours: TimeRange[]
}

type Holiday = {
  date: Date
  name: string
  isOpen: boolean
  hours: TimeRange[]
}

// Function to get US holidays for the current year
const getUSHolidays = (year: number): Holiday[] => [
  { date: new Date(year, 0, 1), name: "New Year's Day", isOpen: false, hours: [] },
  { date: new Date(year, 0, 16), name: "Martin Luther King Jr. Day", isOpen: false, hours: [] },
  { date: new Date(year, 1, 20), name: "Presidents' Day", isOpen: false, hours: [] },
  { date: new Date(year, 4, 29), name: "Memorial Day", isOpen: false, hours: [] },
  { date: new Date(year, 6, 4), name: "Independence Day", isOpen: false, hours: [] },
  { date: new Date(year, 8, 4), name: "Labor Day", isOpen: false, hours: [] },
  { date: new Date(year, 9, 9), name: "Columbus Day", isOpen: false, hours: [] },
  { date: new Date(year, 10, 11), name: "Veterans Day", isOpen: false, hours: [] },
  { date: new Date(year, 10, 23), name: "Thanksgiving Day", isOpen: false, hours: [] },
  { date: new Date(year, 11, 25), name: "Christmas Day", isOpen: false, hours: [] },
]

export default function StoreHoursPage() {
  const [regularHours, setRegularHours] = useState<Record<string, DaySchedule>>(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { isOpen: true, hours: [{ open: "09:00", close: "17:00" }] },
      }),
      {},
    ),
  )

  const [holidays, setHolidays] = useState<Holiday[]>(getUSHolidays(new Date().getFullYear()))

  const [newHoliday, setNewHoliday] = useState<Holiday>({
    date: new Date(),
    name: "",
    isOpen: false,
    hours: [],
  })

  const handleRegularHoursChange = (day: string, index: number, field: "open" | "close", value: string) => {
    setRegularHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: prev[day].hours.map((timeRange, i) => (i === index ? { ...timeRange, [field]: value } : timeRange)),
      },
    }))
  }

  const toggleDayOpen = (day: string) => {
    setRegularHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen },
    }))
  }

  const addTimeRange = (day: string) => {
    setRegularHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: [...prev[day].hours, { open: "09:00", close: "17:00" }],
      },
    }))
  }

  const removeTimeRange = (day: string, index: number) => {
    setRegularHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: prev[day].hours.filter((_, i) => i !== index),
      },
    }))
  }

  const addHoliday = () => {
    if (newHoliday.name) {
      setHolidays((prev) => [...prev, newHoliday])
      setNewHoliday({ date: new Date(), name: "", isOpen: false, hours: [] })
    }
  }

  const removeHoliday = (index: number) => {
    setHolidays((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleHolidayOpen = (index: number) => {
    setHolidays((prev) =>
      prev.map((holiday, i) =>
        i === index
          ? { ...holiday, isOpen: !holiday.isOpen, hours: holiday.isOpen ? [] : [{ open: "09:00", close: "17:00" }] }
          : holiday,
      ),
    )
  }

  const addHolidayTimeRange = (index: number) => {
    setHolidays((prev) =>
      prev.map((holiday, i) =>
        i === index ? { ...holiday, hours: [...holiday.hours, { open: "09:00", close: "17:00" }] } : holiday,
      ),
    )
  }

  const removeHolidayTimeRange = (holidayIndex: number, timeRangeIndex: number) => {
    setHolidays((prev) =>
      prev.map((holiday, i) =>
        i === holidayIndex ? { ...holiday, hours: holiday.hours.filter((_, j) => j !== timeRangeIndex) } : holiday,
      ),
    )
  }

  const handleHolidayHoursChange = (
    holidayIndex: number,
    timeRangeIndex: number,
    field: "open" | "close",
    value: string,
  ) => {
    setHolidays((prev) =>
      prev.map((holiday, i) =>
        i === holidayIndex
          ? {
              ...holiday,
              hours: holiday.hours.map((timeRange, j) =>
                j === timeRangeIndex ? { ...timeRange, [field]: value } : timeRange,
              ),
            }
          : holiday,
      ),
    )
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Store Hours</h1>
      <Tabs defaultValue="regular" className="space-y-4">
        <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="regular" className="flex-1 sm:flex-none">
            Regular Hours
          </TabsTrigger>
          <TabsTrigger value="holidays" className="flex-1 sm:flex-none">
            Holidays
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <TabsContent value="regular">
            <Card>
              <CardHeader>
                <CardTitle>Regular Store Hours</CardTitle>
                <CardDescription>Set your regular operating hours for each day of the week.</CardDescription>
              </CardHeader>
              <CardContent>
                {daysOfWeek.map((day) => (
                  <div key={day} className="mb-6 border-b pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold mb-2 sm:mb-0">{day}</h3>
                      <div className="flex items-center space-x-2">
                        <Switch checked={regularHours[day].isOpen} onCheckedChange={() => toggleDayOpen(day)} />
                        <Label>{regularHours[day].isOpen ? "Open" : "Closed"}</Label>
                      </div>
                    </div>
                    {regularHours[day].isOpen && (
                      <div className="space-y-2">
                        {regularHours[day].hours.map((timeRange, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
                          >
                            <Clock className="h-4 w-4 mt-2 sm:mt-0" />
                            <Input
                              type="time"
                              value={timeRange.open}
                              onChange={(e) => handleRegularHoursChange(day, index, "open", e.target.value)}
                              className="w-full sm:w-24"
                            />
                            <span className="hidden sm:inline">to</span>
                            <Input
                              type="time"
                              value={timeRange.close}
                              onChange={(e) => handleRegularHoursChange(day, index, "close", e.target.value)}
                              className="w-full sm:w-24"
                            />
                            {index > 0 && (
                              <Button variant="ghost" size="icon" onClick={() => removeTimeRange(day, index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addTimeRange(day)} className="mt-2">
                          <Plus className="h-4 w-4 mr-2" /> Add Hours
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="holidays">
            <Card>
              <CardHeader>
                <CardTitle>Holiday Hours</CardTitle>
                <CardDescription>Set special hours for holidays or add store closures.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holidays.map((holiday, holidayIndex) => (
                    <div key={holidayIndex} className="border-b pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{holiday.name}</p>
                          <p className="text-sm text-muted-foreground">{holiday.date.toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                          <Switch checked={holiday.isOpen} onCheckedChange={() => toggleHolidayOpen(holidayIndex)} />
                          <Label>{holiday.isOpen ? "Open" : "Closed"}</Label>
                        </div>
                      </div>
                      {holiday.isOpen && (
                        <div className="space-y-2 mt-2">
                          {holiday.hours.map((timeRange, timeRangeIndex) => (
                            <div
                              key={timeRangeIndex}
                              className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
                            >
                              <Clock className="h-4 w-4 mt-2 sm:mt-0" />
                              <Input
                                type="time"
                                value={timeRange.open}
                                onChange={(e) =>
                                  handleHolidayHoursChange(holidayIndex, timeRangeIndex, "open", e.target.value)
                                }
                                className="w-full sm:w-24"
                              />
                              <span className="hidden sm:inline">to</span>
                              <Input
                                type="time"
                                value={timeRange.close}
                                onChange={(e) =>
                                  handleHolidayHoursChange(holidayIndex, timeRangeIndex, "close", e.target.value)
                                }
                                className="w-full sm:w-24"
                              />
                              {timeRangeIndex > 0 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeHolidayTimeRange(holidayIndex, timeRangeIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addHolidayTimeRange(holidayIndex)}
                            className="mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Hours
                          </Button>
                        </div>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => removeHoliday(holidayIndex)} className="mt-2">
                        Remove Holiday
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold">Add Custom Holiday</h4>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="holiday-name">Holiday Name</Label>
                      <Input
                        id="holiday-name"
                        value={newHoliday.name}
                        onChange={(e) => setNewHoliday((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Local Event"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Date</Label>
                      <Calendar
                        mode="single"
                        selected={newHoliday.date}
                        onSelect={(date) => setNewHoliday((prev) => ({ ...prev, date: date || new Date() }))}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  <Button onClick={addHoliday} className="w-full sm:w-auto">
                    Add Custom Holiday
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}

