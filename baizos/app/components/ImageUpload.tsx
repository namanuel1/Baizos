"use client";

import { useState, useRef, useCallback } from "react";

export default function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearImage = () => {
    setPreview(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-md">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !preview && fileInputRef.current?.click()}
        className={`
          relative w-full aspect-square border rounded-sm flex items-center justify-center transition-colors duration-300
          ${isDragging ? "border-black bg-neutral-50" : "border-neutral-300"}
          ${!preview ? "cursor-pointer hover:border-neutral-500" : ""}
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt={fileName}
            className="w-full h-full object-contain p-6"
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-500"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="text-sm text-neutral-600">
              Drop image or click to browse
            </span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="hidden"
        />
      </div>

      {preview && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-neutral-600 truncate max-w-[200px]">{fileName}</span>
          <div className="flex gap-4">
            <button
              onClick={clearImage}
              className="text-sm text-neutral-600 hover:text-black transition-colors"
            >
              Remove
            </button>
            <button className="text-sm text-black font-medium hover:opacity-70 transition-opacity">
              Identify
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
