
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { FileText } from "lucide-react"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Keep</h1>
              <p className="text-sm text-muted-foreground -mt-1">MY Notes</p>
            </div>
          </div>
        </div>

        {/* Reset Password Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Set new password</h2>
            <p className="text-sm text-muted-foreground">Please create a new password for your account.</p>
          </div>

          <ResetPasswordForm />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Remember your password?{" "}
            <a href="/login" className="text-primary hover:underline">
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
