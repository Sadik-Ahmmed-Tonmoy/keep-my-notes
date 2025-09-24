"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { otpSchema, type OtpFormData } from "@/lib/validations/auth"

export function OtpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  })

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Update form value
    const otpString = newOtp.join("")
    setValue("otp", otpString)
    trigger("otp")

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = pastedData
      .split("")
      .concat(Array(6 - pastedData.length).fill(""))
      .slice(0, 6)
    setOtp(newOtp)
    setValue("otp", newOtp.join(""))
    trigger("otp")

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const onSubmit = async (data: OtpFormData) => {
    setIsLoading(true)

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("OTP data:", data)
    setIsLoading(false)
    // Redirect to success page or login
    window.location.href = "/login"
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-semibold bg-background border-input"
            />
          ))}
        </div>
        {errors.otp && <p className="text-sm text-destructive text-center">{errors.otp.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isLoading || otp.join("").length !== 6}
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Code expires in 5:00</p>
        <button
          type="button"
          className="text-sm text-primary hover:underline"
          onClick={() => {
            // Resend OTP logic
            console.log("Resending OTP...")
          }}
        >
          Resend verification code
        </button>
      </div>
    </form>
  )
}
