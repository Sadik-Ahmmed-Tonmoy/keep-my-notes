"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Eye, Trash2 } from "lucide-react"

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onImageSelect: (imageUrl: string) => void
  currentImage?: string
}

export function ImageUploadModal({ isOpen, onClose, onImageSelect, currentImage }: ImageUploadModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size must be less than 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (previewImage) {
      onImageSelect(previewImage)
    }
    onClose()
  }

  const handleRemove = () => {
    setPreviewImage(null)
    onImageSelect("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleViewImage = () => {
    setIsViewModalOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Profile Picture</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {previewImage ? (
              <div className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-full h-full object-cover rounded-full border-2 border-border"
                  />
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleViewImage}
                    className="bg-background border-input hover:bg-accent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-background border-input hover:bg-accent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemove}
                    className="bg-background border-input hover:bg-accent text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className="w-32 h-32 mx-auto border-2 border-dashed border-border rounded-full flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload Photo</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-background border-input hover:bg-accent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

            <p className="text-xs text-muted-foreground text-center">Supported formats: JPG, PNG, GIF (Max 5MB)</p>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-background border-input hover:bg-accent"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Profile Picture</DialogTitle>
          </DialogHeader>

          {previewImage && (
            <div className="space-y-4">
              <div className="relative w-full max-w-sm mx-auto">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Profile picture"
                  className="w-full h-auto rounded-lg border border-border"
                />
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-background border-input hover:bg-accent"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemove}
                  className="bg-background border-input hover:bg-accent text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
