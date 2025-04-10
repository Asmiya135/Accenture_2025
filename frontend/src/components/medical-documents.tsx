

// "use client"

// import type React from "react"
// import { useState } from "react"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { FileUp, Upload, FileText, AlertCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// export function MedicalDocuments() {
//   const [isDragging, setIsDragging] = useState(false)
//   const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

//   const [reportHeader, setReportHeader] = useState<string | null>(null)
//   const [alarmingIndicators, setAlarmingIndicators] = useState<string[]>([])
//   const [dietSuggestions, setDietSuggestions] = useState<string[]>([])
//   const [consultSpecialist, setConsultSpecialist] = useState<string[]>([])
//   const [precautions, setPrecautions] = useState<string[]>([])
//   const [disclaimer, setDisclaimer] = useState<string[]>([])
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
//     formData.append("file", files[0]) // Only first file is sent

//     try {
//       const response = await fetch("https://elderlycare-3sok.onrender.com/upload", {
//         method: "POST",
//         body: formData,
//       })

//       const data = await response.json()
//       console.log("Server response:", data)

//       const text = data.text || ""
//       parseReportText(text)
//     } catch (error) {
//       console.error("Upload failed:", error)
//       setReportHeader("Error")
//       setFinalSummary("Could not process the file.")
//     }
//   }

//   const parseReportText = (text: string) => {
//     const lines = text.split("\n").map((line) => line.trim()).filter(Boolean)

//     let header = ""
//     const ALList: string[] = []
//     const DietList: string[] = []
//     const CsList: string[] = []
//     const PmList: string[] = []
//     const DList: string[] = []
//     let currentSection:
//       | "header"
//       | "Alarming Indicators"
//       | "Diet/Lifestyle Suggestions"
//       | "Consult a Specialist"
//       | "Precautionary Measures"
//       | "Disclaimer"
//       | null = "header"

//     for (const line of lines) {
//       if (line.startsWith("*Alarming Indicators:*")) {
//         currentSection = "Alarming Indicators"
//         continue
//       } else if (line.startsWith("*Diet/Lifestyle Suggestions:*")) {
//         currentSection = "Diet/Lifestyle Suggestions"
//         continue
//       } else if (line.startsWith("*Consult a Specialist:*")) {
//         currentSection = "Consult a Specialist"
//         continue
//       } else if (line.startsWith("*Precautionary Measures:*")) {
//         currentSection = "Precautionary Measures"
//         continue
//       } else if (line.startsWith("*Disclaimer:*")) {
//         currentSection = "Disclaimer"
//         continue
//       }

//       if (currentSection === "header" && header === "") {
//         header = line
//       } else if (currentSection === "Alarming Indicators" && line.startsWith("*")) {
//         ALList.push(line.replace(/^\*+\s*/, "").trim())
//       } else if (currentSection === "Diet/Lifestyle Suggestions" && line.startsWith("*")) {
//         DietList.push(line.replace(/^\*+\s*/, "").trim())
//       } else if (currentSection === "Consult a Specialist") {
//         CsList.push(line.replace(/^\*+\s*/, "").trim())
//       } else if (currentSection === "Precautionary Measures") {
//         PmList.push(line.replace(/^\*+\s*/, "").trim())
//       } else if (currentSection === "Disclaimer") {
//         DList.push(line.replace(/^\*+\s*/, "").trim())
//       }
//     }

//     setReportHeader(header)
//     setAlarmingIndicators(ALList)
//     setDietSuggestions(DietList)
//     setConsultSpecialist(CsList)
//     setPrecautions(PmList)
//     setDisclaimer(DList)
//     setFinalSummary("Parsed successfully.")
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

//           {reportHeader && (
//             <Alert className="mt-8 border-secondary">
//               <AlertCircle className="h-5 w-5 text-secondary" />
//               <AlertTitle className="text-lg">Report Header</AlertTitle>
//               <AlertDescription className="text-base">{reportHeader}</AlertDescription>
//             </Alert>
//           )}

//           {alarmingIndicators.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Alarming Indicators</h3>
//               <ul className="list-disc pl-6 text-base">
//                 {alarmingIndicators.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {dietSuggestions.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Diet/Lifestyle Suggestions</h3>
//               <ul className="list-disc pl-6 text-base">
//                 {dietSuggestions.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {consultSpecialist.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Consult a Specialist</h3>
//               <ul className="list-disc pl-6 text-base">
//                 {consultSpecialist.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {precautions.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Precautionary Measures</h3>
//               <ul className="list-disc pl-6 text-base">
//                 {precautions.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {disclaimer.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Disclaimer</h3>
//               <ul className="list-disc pl-6 text-base">
//                 {disclaimer.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {finalSummary && (
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold mb-2">Summary</h3>
//               <p className="text-base">{finalSummary}</p>
//             </div>
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
    formData.append("file", files[0]) // Only first file is sent

    try {
      const response = await fetch("https://elderlycare-3sok.onrender.com/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("Server response:", data)

      const text = data.advice || ""
      parseReportText(text)
    } catch (error) {
      console.error("Upload failed:", error)
      setReportHeader("Error")
      setFinalSummary("Could not process the file.")
    }
  }

  const parseReportText = (text: string) => {
    const lines = text.split("\n").map(line => line.trim()).filter(Boolean)

    let header = ""
    const precautionList: string[] = []
    const symptomList: string[] = []
    let summary = ""

    let currentSection: string | null = null

    for (const line of lines) {
      if (line.startsWith("##")) {
        header = line.replace(/^##\s*/, "").trim()
        continue
      }

      if (line.toLowerCase().includes("precautionary measures")) {
        currentSection = "precaution"
        continue
      } else if (line.toLowerCase().includes("symptom")) {
        currentSection = "symptom"
        continue
      } else if (line.toLowerCase().includes("summary") || line.toLowerCase().includes("advice")) {
        currentSection = "summary"
        continue
      }

      if (line.startsWith("*")) {
        const cleanLine = line.replace(/^\*+\s*/, "").trim()
        if (currentSection === "precaution") {
          precautionList.push(cleanLine)
        } else if (currentSection === "symptom") {
          symptomList.push(cleanLine)
        } else {
          summary += cleanLine + " "
        }
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
            <Alert className="mt-8 border-secondary">
              <AlertCircle className="h-5 w-5 text-secondary" />
              <AlertTitle className="text-lg">Report Header</AlertTitle>
              <AlertDescription className="text-base">{reportHeader}</AlertDescription>
            </Alert>
          )}

          {precautions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Precautionary Measures</h3>
              <ul className="list-disc pl-6 text-base">
                {precautions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {symptoms.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Symptoms</h3>
              <ul className="list-disc pl-6 text-base">
                {symptoms.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {finalSummary && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Summary</h3>
              <p className="text-base">{finalSummary}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
