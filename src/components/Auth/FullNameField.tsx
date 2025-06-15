
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface FullNameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FullNameField = ({ value, onChange, required }: FullNameFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="fullName">Full Name</Label>
    <div className="relative">
      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        id="fullName"
        placeholder="Enter your full name"
        type="text"
        value={value}
        onChange={onChange}
        className="pl-10"
        required={required}
      />
    </div>
  </div>
);

export default FullNameField;
