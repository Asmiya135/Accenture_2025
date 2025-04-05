"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Droplet, Footprints, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Goal = {
  id: number
  name: string
  current: number
  target: number
  unit: string
  icon: string
  color: string
}

export function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "Steps",
      current: 6540,
      target: 10000,
      unit: "steps",
      icon: "footprints",
      color: "#525b88",
    },
    {
      id: 2,
      name: "Water",
      current: 5,
      target: 8,
      unit: "glasses",
      icon: "droplet",
      color: "#037373",
    },
    {
      id: 3,
      name: "Sleep",
      current: 6.5,
      target: 8,
      unit: "hours",
      icon: "moon",
      color: "#9333ea",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id" | "icon" | "color">>({
    name: "",
    current: 0,
    target: 0,
    unit: "",
  })

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target > 0) {
      const icons = ["target", "droplet", "footprints", "moon"]
      const colors = ["#525b88", "#037373", "#9333ea", "#10b981"]

      setGoals([
        ...goals,
        {
          id: Date.now(),
          ...newGoal,
          icon: icons[Math.floor(Math.random() * icons.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ])

      setNewGoal({
        name: "",
        current: 0,
        target: 0,
        unit: "",
      })

      setShowForm(false)
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "target":
        return <Target className="h-6 w-6" />
      case "droplet":
        return <Droplet className="h-6 w-6" />
      case "footprints":
        return <Footprints className="h-6 w-6" />
      case "moon":
        return <Moon className="h-6 w-6" />
      default:
        return <Target className="h-6 w-6" />
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Goals Tracker</h2>
          <p className="text-xl text-muted-foreground">Track your daily health goals</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="text-lg h-12">
          Add New Goal
        </Button>
      </div>

      {showForm && (
        <Card className="bg-card shadow-md p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-base mb-1 block">
                  Goal Name
                </Label>
                <Input
                  id="name"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="text-lg h-12"
                  placeholder="e.g., Steps, Water, etc."
                />
              </div>
              <div>
                <Label htmlFor="unit" className="text-base mb-1 block">
                  Unit
                </Label>
                <Input
                  id="unit"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  className="text-lg h-12"
                  placeholder="e.g., steps, glasses, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="current" className="text-base mb-1 block">
                  Current Value
                </Label>
                <Input
                  id="current"
                  type="number"
                  value={newGoal.current}
                  onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
                  className="text-lg h-12"
                />
              </div>
              <div>
                <Label htmlFor="target" className="text-base mb-1 block">
                  Target Value
                </Label>
                <Input
                  id="target"
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                  className="text-lg h-12"
                />
              </div>
            </div>
            <Button onClick={handleAddGoal} className="text-lg h-12">
              Save Goal
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="bg-card shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-full p-2"
                  style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
                >
                  {getIconComponent(goal.icon)}
                </div>
                {goal.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-4">
                <CircularProgressBar
                  percentage={(goal.current / goal.target) * 100}
                  color={goal.color}
                  size={192}
                  strokeWidth={12}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{goal.current}</span>
                  <span className="text-lg text-muted-foreground">
                    / {goal.target} {goal.unit}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg">{Math.round((goal.current / goal.target) * 100)}% Complete</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Circular Progress Bar Component
function CircularProgressBar({
  percentage,
  size,
  strokeWidth,
  color,
}: {
  percentage: number
  size: number
  strokeWidth: number
  color: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const dash = (percentage * circumference) / 100

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - dash}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />
    </svg>
  )
}

