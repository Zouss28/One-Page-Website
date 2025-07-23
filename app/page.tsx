"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, FileText, ImageIcon, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormData {
  name: string
  email: string
  program: string
  file: File | null
}

interface FormErrors {
  name?: string
  email?: string
  program?: string
  file?: string
}

const programs = [
  "Inventory Management System",
  "Asset Tracking Program",
  "Supply Chain Optimization",
  "Warehouse Management",
  "Stock Control System",
]

export default function InventoryForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    program: "",
    file: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateFile = (file: File): string | null => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return "Please upload a PDF, PNG, or JPG file"
    }

    if (file.size > maxSize) {
      return "File size must be less than 5MB"
    }

    return null
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    if (step === 2) {
      if (!formData.program) {
        newErrors.program = "Please select a program"
      }
    }

    if (step === 3) {
      if (!formData.file) {
        newErrors.file = "Please upload a file"
      } else {
        const fileError = validateFile(formData.file)
        if (fileError) {
          newErrors.file = fileError
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, file })

    if (file) {
      const fileError = validateFile(file)
      if (fileError) {
        setErrors({ ...errors, file: fileError })
      } else {
        setErrors({ ...errors, file: undefined })
      }
    }
  }

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Log form data to console
      console.log("Form Submission Data:", {
        name: formData.name,
        email: formData.email,
        program: formData.program,
        file: formData.file
          ? {
              name: formData.file.name,
              size: formData.file.size,
              type: formData.file.type,
              lastModified: formData.file.lastModified,
            }
          : null,
      })

      setIsSubmitted(true)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    return <ImageIcon className="h-5 w-5 text-blue-500" />
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your information has been submitted successfully. We'll be in touch soon.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setCurrentStep(1)
                  setFormData({ name: "", email: "", program: "", file: null })
                  setErrors({})
                }}
                className="w-full"
              >
                Submit Another Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">Inventory Workflow Setup</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Complete the form below to get started with your inventory management solution
          </CardDescription>

          {/* Progress Indicator */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: User Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Program Selection */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Program Selection</h3>
              <p className="text-gray-600">Choose the inventory program that best fits your needs:</p>

              <RadioGroup
                value={formData.program}
                onValueChange={(value) => setFormData({ ...formData, program: value })}
                className="space-y-3"
              >
                {programs.map((program) => (
                  <div key={program} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={program} id={program} />
                    <Label htmlFor={program} className="flex-1 cursor-pointer">
                      {program}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {errors.program && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.program}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step 3: File Upload */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
              <p className="text-gray-600">Upload a relevant document (PDF, PNG, or JPG - max 5MB)</p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500 font-medium">Click to upload a file</span>
                  <span className="text-gray-500"> or drag and drop</span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">PDF, PNG, JPG up to 5MB</p>
              </div>

              {formData.file && !errors.file && (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  {getFileIcon(formData.file)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{formData.file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(formData.file.size)}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              )}

              {errors.file && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.file}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 bg-transparent"
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} className="px-6">
                Next Step
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="px-6">
                Submit Form
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
