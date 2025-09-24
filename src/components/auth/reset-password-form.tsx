"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, CheckCircle } from "lucide-react"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth"

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const password = watch("password")

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)

    // Simulate password reset
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Reset password data:", data)
    setIsLoading(false)
    setIsSuccess(true)

    // Redirect to login after success
    setTimeout(() => {
      window.location.href = "/login"
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Password updated!</h3>
          <p className="text-sm text-muted-foreground">
            Your password has been successfully updated. You'll be redirected to the login page.
          </p>
        </div>
      </div>
    )
  }

  const passwordRequirements = [
    { text: "At least 8 characters", met: password?.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(password || "") },
    { text: "One lowercase letter", met: /[a-z]/.test(password || "") },
    { text: "One number", met: /\d/.test(password || "") },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-foreground">
          New Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a new password"
            className="h-10 bg-background border-input pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      {/* Password Requirements */}
      {password && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Password requirements:</p>
          <div className="grid grid-cols-2 gap-1">
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${req.met ? "bg-green-500" : "bg-gray-300"}`} />
                <span className={`text-xs ${req.met ? "text-green-600" : "text-muted-foreground"}`}>{req.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
          Confirm New Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            className="h-10 bg-background border-input pr-10"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isLoading}
      >
        {isLoading ? "Updating password..." : "Update password"}
      </Button>
    </form>
  )
}
