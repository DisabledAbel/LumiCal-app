
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Example curated themes
const CURATED_THEMES = [
  {
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80",
  },
  {
    name: "Mountains",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1280&q=80",
  },
  {
    name: "Retro",
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1280&q=80",
  },
];

const LOCAL_STORAGE_KEY = "customBackgroundUrl";

const BackgroundPicker = ({
  onBackgroundChange,
}: {
  onBackgroundChange?: (url: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved background from localStorage on first mount
  useEffect(() => {
    const savedUrl = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedUrl) {
      setSelected(savedUrl);
      setPreview(savedUrl);
      onBackgroundChange?.(savedUrl);
    }
  }, [onBackgroundChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setSelected(result);
      setPreview(result);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, result);
      toast({ title: "Background updated!" });
      onBackgroundChange?.(result);
      setLoading(false);
    };
    reader.onerror = () => {
      toast({ title: "Failed to load image", variant: "destructive" });
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleThemeSelect = (theme: typeof CURATED_THEMES[0]) => {
    setLoading(true);
    setSelected(theme.url);
    setPreview(theme.url);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, theme.url);
    toast({ title: "Background set!" });
    onBackgroundChange?.(theme.url);
    setLoading(false);
  };

  const handleClear = () => {
    setSelected(null);
    setPreview(null);
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast({ title: "Background removed!" });
    onBackgroundChange?.("");
  };

  return (
    <Card className="p-4 space-y-4 bg-white/90">
      <h3 className="font-semibold text-lg">Custom Background</h3>
      {/* Curated themes */}
      <div>
        <div className="text-sm mb-2">Curated themes:</div>
        <div className="flex gap-3">
          {CURATED_THEMES.map((theme) => (
            <button
              key={theme.name}
              type="button"
              className={`rounded-lg overflow-hidden border-2 ${selected === theme.url ? "border-blue-600" : "border-transparent"} transition-all`}
              onClick={() => handleThemeSelect(theme)}
              disabled={loading}
              style={{
                width: 64,
                height: 48,
                backgroundImage: `url(${theme.url})`,
                backgroundSize: "cover",
              }}
              aria-label={theme.name}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm mb-2">Upload your own image:</div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => fileInputRef.current?.click()}
        >
          {loading ? "Uploading..." : "Choose File"}
        </Button>
      </div>
      {preview && (
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-1">Preview:</div>
          <div
            style={{
              width: "100%",
              height: 120,
              background: `url(${preview}) center/cover no-repeat`,
              borderRadius: 8,
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={handleClear}
          >
            Remove Background
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BackgroundPicker;
