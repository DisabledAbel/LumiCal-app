
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface InstallPromptProps {
  onClose: () => void;
}

const InstallPrompt = ({ onClose }: InstallPromptProps) => {
  const { installApp } = usePWA();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      onClose();
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 p-6 max-w-sm bg-white shadow-lg border-blue-200 z-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Install CalendarHub</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Add CalendarHub to your home screen for quick access and offline capabilities.
      </p>
      
      <div className="flex space-x-2">
        <Button onClick={handleInstall} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
          Install App
        </Button>
        <Button variant="outline" onClick={onClose}>
          Maybe Later
        </Button>
      </div>
    </Card>
  );
};

export default InstallPrompt;
