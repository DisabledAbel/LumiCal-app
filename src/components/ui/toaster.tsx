
import React from "react";
import { useToast } from "@/components/ui/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // Defensive: only run hook if inside a component
  let toastResult;
  try {
    toastResult = useToast()
  } catch (e) {
    console.error("Error calling useToast inside Toaster component:", e);
    return null;
  }

  const { toasts } = toastResult || {};

  return (
    <ToastProvider>
      {(toasts || []).map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

