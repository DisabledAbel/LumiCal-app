
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({ value, onChange }: PasswordFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        id="password"
        placeholder="Enter your password"
        type="password"
        value={value}
        onChange={onChange}
        className="pl-10"
        required
        minLength={6}
      />
    </div>
  </div>
);

export default PasswordField;
