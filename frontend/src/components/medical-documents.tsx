"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Upload, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"

export function MedicalDocuments() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [analysis, setAnalysis] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = async (files: File[]) => {
    const newFiles = files.map((file) => file.name)
    setUploadedFiles((prev) => [...prev, ...newFiles])
  
    const formData = new FormData()
    formData.append("file", files[0]) // sending only the first file for now
  
    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`)
      }
  
      const data = await response.json()
      console.log("Server response:", data)
  
      setAnalysis(data.advice || "No advice received.")
    } catch (error) {
      console.error("Upload failed:", error)
      setAnalysis("Error: Could not process the file.")
    }
  }
  
  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold mb-2">Medical Documents</h2>
        <p className="text-xl text-muted-foreground">Upload and manage your medical reports</p>
      </div>

      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileUp className="h-6 w-6 text-primary" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`mb-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mb-4 h-16 w-16 text-muted-foreground" />
            <p className="mb-2 text-xl font-medium">Drag and drop your medical documents here</p>
            <p className="mb-4 text-lg text-muted-foreground">or</p>
            <Button onClick={() => document.getElementById("file-upload")?.click()} className="text-lg h-12">
              Browse Files
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileInput}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-medium">Uploaded Documents</h3>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-md bg-muted p-4">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="text-lg">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis && (
            <Alert className="mt-8 border-secondary">
              <AlertCircle className="h-5 w-5 text-secondary" />
              <AlertTitle className="text-lg">AI Analysis</AlertTitle>
              <AlertDescription className="text-base">{analysis}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

