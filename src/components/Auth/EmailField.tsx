
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField = ({ value, onChange }: EmailFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <div className="relative">
      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        id="email"
        placeholder="Enter your email"
        type="email"
        value={value}
        onChange={onChange}
        className="pl-10"
        required
      />
    </div>
  </div>
);

export default EmailField;
