"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, TrendingUp, ArrowDown } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts"

const bloodPressureData = [
  { time: "6 AM", systolic: 118, diastolic: 78 },
  { time: "9 AM", systolic: 122, diastolic: 80 },
  { time: "12 PM", systolic: 125, diastolic: 82 },
  { time: "3 PM", systolic: 121, diastolic: 79 },
  { time: "6 PM", systolic: 119, diastolic: 77 },
  { time: "9 PM", systolic: 117, diastolic: 76 },
]

const heartRateData = [
  { time: "6 AM", rate: 68 },
  { time: "8 AM", rate: 72 },
  { time: "10 AM", rate: 75 },
  { time: "12 PM", rate: 78 },
  { time: "2 PM", rate: 76 },
  { time: "4 PM", rate: 74 },
  { time: "6 PM", rate: 73 },
  { time: "8 PM", rate: 71 },
  { time: "10 PM", rate: 69 },
]

export function HealthTracker() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold mb-2">Health Tracker</h2>
        <p className="text-xl text-muted-foreground">Monitor your vital signs in real-time</p>
      </div>

      <Tabs defaultValue="blood-pressure" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="blood-pressure" className="text-lg py-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Blood Pressure
            </div>
          </TabsTrigger>
          <TabsTrigger value="heart-rate" className="text-lg py-3">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Heart Rate
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blood-pressure" className="w-full">
          <Card className="bg-card shadow-md w-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                Blood Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bloodPressureData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorSystolic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#525b88" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#525b88" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorDiastolic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#037373" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#037373" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="time" stroke="#888888" tick={{ fontSize: 16 }} tickMargin={10} />
                    <YAxis stroke="#888888" domain={[60, 140]} tick={{ fontSize: 16 }} tickMargin={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        color: "#fff",
                        fontSize: "16px",
                        padding: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "16px", paddingTop: "20px" }} />
                    <Area
                      type="monotone"
                      dataKey="systolic"
                      name="Systolic"
                      stroke="#525b88"
                      fillOpacity={1}
                      fill="url(#colorSystolic)"
                      strokeWidth={4}
                      activeDot={{ r: 10 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="diastolic"
                      name="Diastolic"
                      stroke="#037373"
                      fillOpacity={1}
                      fill="url(#colorDiastolic)"
                      strokeWidth={4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-muted p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-muted-foreground">Systolic</p>
                    <div className="flex items-center text-green-500 text-base font-medium">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      2%
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary mr-4">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-4xl font-bold text-primary">120</h3>
                    <span className="ml-2 text-lg text-muted-foreground">mmHg</span>
                  </div>
                </Card>

                <Card className="bg-muted p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-muted-foreground">Diastolic</p>
                    <div className="flex items-center text-green-500 text-base font-medium">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      1%
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center justify-center rounded-full bg-secondary/10 p-3 text-secondary mr-4">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-4xl font-bold text-secondary">80</h3>
                    <span className="ml-2 text-lg text-muted-foreground">mmHg</span>
                  </div>
                </Card>

                <Card className="bg-muted p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-muted-foreground">Status</p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center justify-center rounded-full bg-green-500/10 p-3 text-green-500 mr-4">
                      <Activity className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-500">Normal</h3>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heart-rate" className="w-full">
          <Card className="bg-card shadow-md w-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="time" stroke="#888888" tick={{ fontSize: 16 }} tickMargin={10} />
                    <YAxis stroke="#888888" domain={[60, 90]} tick={{ fontSize: 16 }} tickMargin={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        color: "#fff",
                        fontSize: "16px",
                        padding: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "16px", paddingTop: "20px" }} />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      name="Heart Rate"
                      stroke="#ff4d6d"
                      strokeWidth={4}
                      dot={{ r: 6, strokeWidth: 3 }}
                      activeDot={{ r: 10 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-muted p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-muted-foreground">Current</p>
                    <div className="flex items-center text-green-500 text-base font-medium">
                      <ArrowDown className="h-4 w-4 mr-1" />2 BPM
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center justify-center rounded-full bg-red-500/10 p-3 text-red-400 mr-4">
                      <Heart className="h-8 w-8" />
                    </div>
                    <h3 className="text-4xl font-bold text-red-400">72</h3>
                    <span className="ml-2 text-lg text-muted-foreground">BPM</span>
                  </div>
                </Card>

                <Card className="bg-muted p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-muted-foreground">Average</p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary mr-4">
                      <Activity className="h-8 w-8" />
                    </div>
                    <h3 className="text-4xl font-bold text-primary">73</h3>
                    <span className="ml-2 text-lg text-muted-foreground">BPM</span>
                  </div>
                </Card>

                <Card className="bg-muted p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-muted-foreground">Status</p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center justify-center rounded-full bg-green-500/10 p-3 text-green-500 mr-4">
                      <Activity className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-500">Normal</h3>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

