
import React from 'react';
import { Calendar } from 'lucide-react';

const AuthHeader = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Calendar className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">CalendarHub</h1>
      </div>
      <p className="text-gray-600">Your smart calendar platform</p>
    </div>
  );
};

export default AuthHeader;
