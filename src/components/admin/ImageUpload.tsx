"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageUploadProps {
  currentUrl?: string | null;
  onUploaded: (assetId: string, url: string) => void;
  onRemoved?: () => void;
}

export function ImageUpload({
  currentUrl,
  onUploaded,
  onRemoved,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onUploaded(data.id, data.url);
        setPreview(data.url);
      } else {
        alert(data.error || "Upload failed");
        setPreview(currentUrl || null);
      }
    } catch {
      alert("Upload failed");
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onRemoved?.();
  }

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized={preview.startsWith("blob:")}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X size={12} />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-32 h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-colors"
        >
          <Upload size={20} />
          <span className="text-xs">Upload</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />
      {!preview && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Choose Image
        </Button>
      )}
    </div>
  );
}
