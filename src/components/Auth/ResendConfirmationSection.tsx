
import React from "react";
import { Button } from "@/components/ui/button";

interface ResendConfirmationSectionProps {
  show: boolean;
  isSignUp: boolean;
  resendLoading: boolean;
  onResend: () => void;
}

const ResendConfirmationSection = ({
  show,
  isSignUp,
  resendLoading,
  onResend
}: ResendConfirmationSectionProps) => {
  if (!show || isSignUp) return null;

  return (
    <div className="flex flex-col items-center space-y-2 mt-2">
      <p className="text-xs text-gray-500">
        Didn't get the confirmation email? Check your spam/junk folder or resend it.
      </p>
      <Button
        type="button"
        size="sm"
        className="w-auto"
        onClick={onResend}
        disabled={resendLoading}
      >
        {resendLoading ? 'Resending...' : 'Resend confirmation email'}
      </Button>
    </div>
  );
};

export default ResendConfirmationSection;
