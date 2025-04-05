"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus, Trash2, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

type Alarm = {
  id: number
  time: string
  label: string
  days: string[]
  active: boolean
}

type Appointment = {
  id: number
  date: Date
  title: string
  doctor: string
}

export function CalendarAndAlarms() {
  // Calendar state
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, date: new Date(2025, 3, 10), title: "Regular Checkup", doctor: "Dr. Sharma" },
    { id: 2, date: new Date(2025, 3, 15), title: "Eye Examination", doctor: "Dr. Patel" },
  ])

  // Add these states after the appointments state
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "id">>({
    date: date || new Date(),
    title: "",
    doctor: "",
  })

  // Alarms state
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: 1,
      time: "08:00",
      label: "Morning Medicine",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      active: true,
    },
    {
      id: 2,
      time: "13:00",
      label: "Afternoon Medicine",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      active: true,
    },
    {
      id: 3,
      time: "20:00",
      label: "Night Medicine",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      active: true,
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newAlarm, setNewAlarm] = useState<Omit<Alarm, "id">>({ time: "", label: "", days: [], active: true })

  // Calendar functions
  const appointmentsForSelectedDate = date
    ? appointments.filter(
        (app) =>
          app.date.getDate() === date.getDate() &&
          app.date.getMonth() === date.getMonth() &&
          app.date.getFullYear() === date.getFullYear(),
      )
    : []

  // Alarm functions
  const handleAddAlarm = () => {
    if (newAlarm.time && newAlarm.label) {
      setAlarms([...alarms, { ...newAlarm, id: Date.now() }])
      setNewAlarm({ time: "", label: "", days: [], active: true })
      setShowForm(false)
    }
  }

  const toggleAlarm = (id: number) => {
    setAlarms(alarms.map((alarm) => (alarm.id === id ? { ...alarm, active: !alarm.active } : alarm)))
  }

  const deleteAlarm = (id: number) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id))
  }

  // Add this function before the return statement
  const handleAddAppointment = () => {
    if (newAppointment.title && newAppointment.doctor) {
      setAppointments([...appointments, { ...newAppointment, id: Date.now(), date: newAppointment.date || new Date() }])
      setNewAppointment({ date: date || new Date(), title: "", doctor: "" })
      setShowAppointmentForm(false)
    }
  }

  return (
    <Card className="card-hover h-full overflow-hidden" id="calendar-and-alarms">
      <div className="card-header-gradient">
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Calendar & Alarms
          </div>
        </CardTitle>
        <p className="text-sm mt-1 text-white/80">Manage your schedule and reminders</p>
      </div>
      <CardContent className="p-0">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="w-full rounded-none border-b border-border">
            <TabsTrigger
              value="calendar"
              className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="alarms"
              className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Alarms
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="p-4">
            <div className="grid gap-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-border bg-card"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day: "text-foreground hover:bg-muted",
                  head_cell: "text-muted-foreground",
                  caption: "text-foreground",
                  nav_button: "text-foreground hover:bg-muted",
                  table: "border-border",
                }}
              />

              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">{date ? format(date, "MMMM d, yyyy") : "Select a date"}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => setShowAppointmentForm(!showAppointmentForm)}
                >
                  <Plus className="h-4 w-4" />
                  Add Appointment
                </Button>
              </div>

              {showAppointmentForm && (
                <div className="mb-6 rounded-lg border border-border bg-muted p-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="title">Appointment Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Regular Checkup"
                        value={newAppointment.title}
                        onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctor">Doctor</Label>
                      <Input
                        id="doctor"
                        placeholder="e.g., Dr. Sharma"
                        value={newAppointment.doctor}
                        onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        className="bg-card border-border"
                        onChange={(e) => {
                          if (date && e.target.value) {
                            const [hours, minutes] = e.target.value.split(":").map(Number)
                            const newDate = new Date(date)
                            newDate.setHours(hours, minutes)
                            setNewAppointment({ ...newAppointment, date: newDate })
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleAddAppointment}>Save Appointment</Button>
                  </div>
                </div>
              )}

              {appointmentsForSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {appointmentsForSelectedDate.map((appointment) => (
                    <div key={appointment.id} className="rounded-md border border-border bg-muted p-3">
                      <h4 className="font-medium text-primary">{appointment.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(appointment.date, "h:mm a")} with {appointment.doctor}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md bg-muted p-4 text-center border border-border">
                  <p className="text-muted-foreground">No appointments for this date</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="alarms" className="p-4">
            <div className="mb-4 flex justify-end">
              <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Alarm
              </Button>
            </div>

            {showForm && (
              <div className="mb-6 rounded-lg border border-border bg-muted p-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAlarm.time}
                        onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="label">Label</Label>
                      <Input
                        id="label"
                        placeholder="e.g., Take Medicine"
                        value={newAlarm.label}
                        onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
                        className="bg-card border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Repeat</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={newAlarm.days.includes(day) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (newAlarm.days.includes(day)) {
                              setNewAlarm({
                                ...newAlarm,
                                days: newAlarm.days.filter((d) => d !== day),
                              })
                            } else {
                              setNewAlarm({
                                ...newAlarm,
                                days: [...newAlarm.days, day],
                              })
                            }
                          }}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddAlarm}>Save Alarm</Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className={`flex items-center justify-between rounded-lg border border-border p-4 transition-colors ${
                    alarm.active ? "bg-primary/5" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{alarm.label}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">{alarm.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {alarm.days.join(", ")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={alarm.active} onCheckedChange={() => toggleAlarm(alarm.id)} />
                    <Button variant="ghost" size="icon" onClick={() => deleteAlarm(alarm.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

