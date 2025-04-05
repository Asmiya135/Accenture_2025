"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function WeeklyReport() {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading weekly health report...")
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold mb-2">Weekly Report</h2>
        <p className="text-xl text-muted-foreground">View and download your health summary</p>
      </div>

      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Health Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-primary/5 p-6 border border-primary/10">
            <h3 className="mb-4 text-xl font-bold text-primary">Weekly Health Summary</h3>
            <p className="mb-6 text-lg">
              Your health metrics have been stable this week. Blood pressure readings are within normal range, and your
              heart rate has been consistent.
            </p>

            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-medium flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
                    Overall Health Score
                  </span>
                  <span className="text-lg font-medium">85/100</span>
                </div>
                <Progress value={85} className="h-4 progress-bar-primary" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-medium flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-secondary"></span>
                    Medication Adherence
                  </span>
                  <span className="text-lg font-medium">92%</span>
                </div>
                <Progress value={92} className="h-4 progress-bar-secondary" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg font-medium flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
                    Activity Goals
                  </span>
                  <span className="text-lg font-medium">78%</span>
                </div>
                <Progress value={78} className="h-4 progress-bar-success" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-6 border border-border">
            <h3 className="mb-4 text-xl font-bold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              AI Recommendations
            </h3>
            <ul className="mb-6 space-y-3 text-lg text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
                Continue with your current medication schedule
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
                Try to increase daily steps to reach your 10,000 steps goal
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
                Consider adding more fruits to your diet
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
                Schedule your next checkup with Dr. Sharma
              </li>
            </ul>

            <Button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 text-lg h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Download className="h-5 w-5" />
              Download Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

