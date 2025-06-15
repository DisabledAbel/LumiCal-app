
import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { uploadBackgroundImage, setUserBackground, getUserBackground } from "@/lib/backgrounds";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Example curated themes
const CURATED_THEMES = [
  {
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80"
  },
  {
    name: "Mountains",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1280&q=80"
  },
  {
    name: "Retro",
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1280&q=80"
  }
];

const BackgroundPicker = ({ onBackgroundChange }: { onBackgroundChange?: (url: string) => void }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (user) {
      getUserBackground(user.id).then((bg) => {
        if (bg?.image_url) {
          setSelected(bg.image_url || null);
          setPreview(bg.image_url || null);
          onBackgroundChange?.(bg.image_url);
        } else if (bg?.curated_theme) {
          const theme = CURATED_THEMES.find(t => t.name === bg.curated_theme);
          if (theme) {
            setSelected(theme.url);
            setPreview(theme.url);
            onBackgroundChange?.(theme.url);
          }
        }
      });
    }
    // eslint-disable-next-line
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const url = await uploadBackgroundImage(user.id, file);
    if (url) {
      await setUserBackground({ user_id: user.id, image_url: url, curated_theme: null });
      setSelected(url);
      setPreview(url);
      toast({ title: "Background updated!" });
      onBackgroundChange?.(url);
    } else {
      toast({ title: "Upload failed", variant: "destructive" });
    }
    setLoading(false);
  };

  const handleThemeSelect = async (theme: typeof CURATED_THEMES[0]) => {
    if (!user) return;
    setLoading(true);
    await setUserBackground({ user_id: user.id, image_url: null, curated_theme: theme.name });
    setSelected(theme.url);
    setPreview(theme.url);
    toast({ title: "Background set!" });
    onBackgroundChange?.(theme.url);
    setLoading(false);
  };

  return (
    <Card className="p-4 space-y-4 bg-white/90">
      <h3 className="font-semibold text-lg">Custom Background</h3>
      {/* Curated themes */}
      <div>
        <div className="text-sm mb-2">Curated themes:</div>
        <div className="flex gap-3">
          {CURATED_THEMES.map(theme => (
            <button
              key={theme.name}
              type="button"
              className={`rounded-lg overflow-hidden border-2 ${selected === theme.url ? "border-blue-600" : "border-transparent"} transition-all`}
              onClick={() => handleThemeSelect(theme)}
              disabled={loading}
              style={{ width: 64, height: 48, backgroundImage: `url(${theme.url})`, backgroundSize: "cover" }}
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
              width: '100%',
              height: 120,
              background: `url(${preview}) center/cover no-repeat`,
              borderRadius: 8,
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default BackgroundPicker;
