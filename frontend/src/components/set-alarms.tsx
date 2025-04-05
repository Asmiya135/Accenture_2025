"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

type Alarm = {
  id: number
  time: string
  label: string
  days: string[]
  active: boolean
}

export function SetAlarms() {
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

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold mb-2">Set Alarms</h2>
        <p className="text-xl text-muted-foreground">Set reminders for your medications</p>
      </div>

      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            Medication Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-end">
            <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 text-lg h-12">
              <Plus className="h-5 w-5" />
              Add Alarm
            </Button>
          </div>

          {showForm && (
            <div className="mb-8 rounded-lg border p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="time" className="text-base mb-2 block">
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAlarm.time}
                      onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                      className="text-lg h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="label" className="text-base mb-2 block">
                      Label
                    </Label>
                    <Input
                      id="label"
                      placeholder="e.g., Take Medicine"
                      value={newAlarm.label}
                      onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
                      className="text-lg h-12"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-base mb-2 block">Repeat</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={newAlarm.days.includes(day) ? "default" : "outline"}
                        className="text-base"
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
                <Button onClick={handleAddAlarm} className="text-lg h-12">
                  Save Alarm
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className={`flex items-center justify-between rounded-lg border p-5 transition-colors ${
                  alarm.active ? "bg-primary/5" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">{alarm.time}</div>
                  <div>
                    <h4 className="text-xl font-medium">{alarm.label}</h4>
                    <p className="text-base text-muted-foreground">{alarm.days.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={alarm.active}
                    onCheckedChange={() => toggleAlarm(alarm.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Button variant="ghost" size="icon" onClick={() => deleteAlarm(alarm.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

