"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useState } from "react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Appointment = {
  id: number
  date: Date
  title: string
  doctor: string
}

export function MyCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, date: new Date(2025, 3, 10), title: "Regular Checkup", doctor: "Dr. Sharma" },
    { id: 2, date: new Date(2025, 3, 15), title: "Eye Examination", doctor: "Dr. Patel" },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "id">>({
    date: date || new Date(),
    title: "",
    doctor: "",
  })

  const appointmentsForSelectedDate = date
    ? appointments.filter(
        (app) =>
          app.date.getDate() === date.getDate() &&
          app.date.getMonth() === date.getMonth() &&
          app.date.getFullYear() === date.getFullYear(),
      )
    : []

  const handleAddAppointment = () => {
    if (newAppointment.title && newAppointment.doctor) {
      setAppointments([...appointments, { ...newAppointment, id: Date.now() }])
      setNewAppointment({
        date: date || new Date(),
        title: "",
        doctor: "",
      })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold mb-2">My Calendar</h2>
        <p className="text-xl text-muted-foreground">Manage your doctor appointments</p>
      </div>

      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-border bg-card"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day: "text-foreground hover:bg-muted text-lg h-12 w-12",
                  head_cell: "text-muted-foreground text-base",
                  caption: "text-foreground text-lg",
                  nav_button: "text-foreground hover:bg-muted h-10 w-10",
                  table: "border-border",
                }}
              />
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-medium">{date ? format(date, "MMMM d, yyyy") : "Select a date"}</h3>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-base"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Plus className="h-5 w-5" />
                  Add Appointment
                </Button>
              </div>

              {showForm && (
                <div className="mb-6 rounded-lg border p-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="title" className="text-base mb-1 block">
                        Appointment Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Regular Checkup"
                        value={newAppointment.title}
                        onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                        className="text-lg h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctor" className="text-base mb-1 block">
                        Doctor
                      </Label>
                      <Input
                        id="doctor"
                        placeholder="e.g., Dr. Sharma"
                        value={newAppointment.doctor}
                        onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                        className="text-lg h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-base mb-1 block">
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        className="text-lg h-12"
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
                    <Button onClick={handleAddAppointment} className="text-lg h-12">
                      Save Appointment
                    </Button>
                  </div>
                </div>
              )}

              {appointmentsForSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {appointmentsForSelectedDate.map((appointment) => (
                    <div key={appointment.id} className="rounded-md border bg-primary/5 p-4">
                      <h4 className="text-xl font-medium text-primary">{appointment.title}</h4>
                      <p className="text-lg text-muted-foreground">
                        {format(appointment.date, "h:mm a")} with {appointment.doctor}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md bg-muted p-6 text-center">
                  <p className="text-lg text-muted-foreground">No appointments for this date</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

