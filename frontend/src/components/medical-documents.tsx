// "use client"

// import type React from "react"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { FileUp, Upload, FileText, AlertCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { useState } from "react"

// export function MedicalDocuments() {
//   const [isDragging, setIsDragging] = useState(false)
//   const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
//   const [analysis, setAnalysis] = useState<string | null>(null)
//   const [reportHeader, setReportHeader] = useState<string | null>(null)
//   const [precautions, setPrecautions] = useState<string[]>([])
//   const [symptoms, setSymptoms] = useState<string[]>([])
//   const [finalSummary, setFinalSummary] = useState<string | null>(null)

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = () => {
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)

//     const files = Array.from(e.dataTransfer.files)
//     handleFiles(files)
//   }

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files)
//       handleFiles(files)
//     }
//   }

//   const handleFiles = async (files: File[]) => {
//     const newFiles = files.map((file) => file.name)
//     setUploadedFiles((prev) => [...prev, ...newFiles])
  
//     const formData = new FormData()
//     formData.append("file", files[0]) // sending only the first file for now
  
//     try {
//       const response = await fetch("http://localhost:5001/upload", {
//         method: "POST",
//         body: formData,
//       })
  
//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}`)
//       }
  
//       const data = await response.json()
//       console.log("Server response:", data)
  
//       setAnalysis(data.advice || "No advice received.")
//     } catch (error) {
//       console.error("Upload failed:", error)
//       setAnalysis("Error: Could not process the file.")
//     }
//     const parseReportText = (text: string) => {
//       const lines = text.split("\n").map(line => line.trim()).filter(Boolean)
    
//       let header = ""
//       const precautionList: string[] = []
//       const symptomList: string[] = []
//       let summary = ""
    
//       let currentSection: "header" | "precaution" | "symptom" | "summary" | null = "header"
    
//       for (const line of lines) {
//         if (line.startsWith("*Precautionary Measures:*")) {
//           currentSection = "precaution"
//           continue
//         } else if (line.startsWith("*In Summary:*")) {
//           currentSection = "summary"
//           continue
//         }
    
//         if (currentSection === "header" && header === "") {
//           header = line
//         } else if (currentSection === "precaution" && line.startsWith("*")) {
//           precautionList.push(line.replace(/^\*+\s*/, "").trim())
//           if (line.toLowerCase().includes("symptom")) {
//             currentSection = "symptom"
//           }
//         } else if (currentSection === "symptom" && line.startsWith("*")) {
//           symptomList.push(line.replace(/^\*+\s*/, "").trim())
//         } else if (currentSection === "summary") {
//           summary += line + " "
//         }
//       }
      

//       setReportHeader(header)
//       setPrecautions(precautionList)
//       setSymptoms(symptomList)
//       setFinalSummary(summary.trim())
//       setAnalysis(data.text || "")
//       parseReportText(data.text || "")
//     }
    
//   }
  
//   return (
//     <div className="space-y-6 w-full">
//       <div>
//         <h2 className="text-3xl font-bold mb-2">Medical Documents</h2>
//         <p className="text-xl text-muted-foreground">Upload and manage your medical reports</p>
//       </div>

//       <Card className="bg-card shadow-md">
//         <CardHeader>
//           <CardTitle className="text-2xl flex items-center gap-2">
//             <FileUp className="h-6 w-6 text-primary" />
//             Upload Documents
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div
//             className={`mb-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
//               isDragging ? "border-primary bg-primary/5" : "border-gray-300"
//             }`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             <Upload className="mb-4 h-16 w-16 text-muted-foreground" />
//             <p className="mb-2 text-xl font-medium">Drag and drop your medical documents here</p>
//             <p className="mb-4 text-lg text-muted-foreground">or</p>
//             <Button onClick={() => document.getElementById("file-upload")?.click()} className="text-lg h-12">
//               Browse Files
//             </Button>
//             <input
//               id="file-upload"
//               type="file"
//               className="hidden"
//               multiple
//               onChange={handleFileInput}
//               accept=".pdf,.jpg,.jpeg,.png"
//             />
//           </div>

//           {uploadedFiles.length > 0 && (
//             <div className="mt-8">
//               <h3 className="mb-4 text-xl font-medium">Uploaded Documents</h3>
//               <div className="space-y-3">
//                 {uploadedFiles.map((file, index) => (
//                   <div key={index} className="flex items-center gap-3 rounded-md bg-muted p-4">
//                     <FileText className="h-6 w-6 text-primary" />
//                     <span className="text-lg">{file}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {analysis && (
//             <Alert className="mt-8 border-secondary">
//               <AlertCircle className="h-5 w-5 text-secondary" />
//               <AlertTitle className="text-lg">AI Analysis</AlertTitle>
//               <AlertDescription className="text-base">{analysis}</AlertDescription>
//             </Alert>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Upload, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function MedicalDocuments() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [reportHeader, setReportHeader] = useState<string | null>(null)
  const [precautions, setPrecautions] = useState<string[]>([])
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [finalSummary, setFinalSummary] = useState<string | null>(null)

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

      const text = data.text || ""
      parseReportText(text)
    } catch (error) {
      console.error("Upload failed:", error)
      setReportHeader("Error")
      setFinalSummary("Could not process the file.")
    }
  }

  const parseReportText = (text: string) => {
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean)

    let header = ""
    const precautionList: string[] = []
    const symptomList: string[] = []
    let summary = ""

    let currentSection: "header" | "precaution" | "symptom" | "summary" | null = "header"

    for (const line of lines) {
      if (line.startsWith("*Precautionary Measures:*")) {
        currentSection = "precaution"
        continue
      } else if (line.startsWith("*In Summary:*")) {
        currentSection = "summary"
        continue
      }

      if (currentSection === "header" && header === "") {
        header = line
      } else if (currentSection === "precaution" && line.startsWith("*")) {
        precautionList.push(line.replace(/^\*+\s*/, "").trim())
        if (line.toLowerCase().includes("symptom")) {
          currentSection = "symptom"
        }
      } else if (currentSection === "symptom" && line.startsWith("*")) {
        symptomList.push(line.replace(/^\*+\s*/, "").trim())
      } else if (currentSection === "summary") {
        summary += line + " "
      }
    }

    setReportHeader(header)
    setPrecautions(precautionList)
    setSymptoms(symptomList)
    setFinalSummary(summary.trim())
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

          {reportHeader && (
            <div className="mt-8 space-y-6">
              <Alert className="border-secondary">
                <AlertCircle className="h-5 w-5 text-secondary" />
                <AlertTitle className="text-lg">{reportHeader}</AlertTitle>
              </Alert>

              {precautions.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold">Precautionary Measures:</h4>
                  <ul className="list-disc list-inside text-base text-muted-foreground">
                    {precautions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {symptoms.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold">Watch for Symptoms:</h4>
                  <ul className="list-disc list-inside text-base text-muted-foreground">
                    {symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>
              )}

              {finalSummary && (
                <div>
                  <h4 className="text-lg font-semibold">Summary:</h4>
                  <p className="text-base text-muted-foreground">{finalSummary}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

