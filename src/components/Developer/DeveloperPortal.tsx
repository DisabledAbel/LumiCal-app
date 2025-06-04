
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code, Calendar, Users, Bell } from 'lucide-react';
import DeveloperChatbot from './DeveloperChatbot';

const DeveloperPortal = () => {
  const [githubUrl, setGithubUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGithubConnect = async () => {
    setIsConnecting(true);
    console.log('Connecting GitHub project:', githubUrl);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      // Here you would implement actual GitHub integration
    }, 2000);
  };

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/calendar/events',
      description: 'Retrieve calendar events',
      example: 'fetch("/api/calendar/events")'
    },
    {
      method: 'POST',
      endpoint: '/api/calendar/events',
      description: 'Create a new event',
      example: 'fetch("/api/calendar/events", { method: "POST", body: JSON.stringify(eventData) })'
    },
    {
      method: 'POST',
      endpoint: '/api/reminders/sms',
      description: 'Send SMS reminder',
      example: 'fetch("/api/reminders/sms", { method: "POST", body: JSON.stringify(reminderData) })'
    },
    {
      method: 'GET',
      endpoint: '/api/users/invitations',
      description: 'Get user invitations',
      example: 'fetch("/api/users/invitations")'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Code className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Developer Portal</h2>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View Documentation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* GitHub Integration */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Connect GitHub Project
              </h3>
              <p className="text-gray-600 mb-4">
                Connect your GitHub repository to integrate CalendarHub with your development workflow
              </p>
              <div className="flex space-x-3">
                <Input
                  placeholder="https://github.com/username/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleGithubConnect}
                  disabled={isConnecting || !githubUrl}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </Button>
              </div>
            </Card>

            {/* API Reference */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                API Reference
              </h3>
              <div className="space-y-4">
                {apiEndpoints.map((api, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        api.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {api.method}
                      </span>
                      <code className="text-sm font-mono text-gray-800">{api.endpoint}</code>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{api.description}</p>
                    <code className="text-xs bg-gray-100 p-2 rounded block text-gray-700">
                      {api.example}
                    </code>
                  </div>
                ))}
              </div>
            </Card>

            {/* SDK Installation */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Start
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Install SDK</h4>
                  <code className="block bg-gray-900 text-green-400 p-3 rounded text-sm">
                    npm install @calendarhub/sdk
                  </code>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Initialize</h4>
                  <code className="block bg-gray-900 text-green-400 p-3 rounded text-sm">
                    {`import { CalendarHub } from '@calendarhub/sdk';

const calendar = new CalendarHub({
  apiKey: 'your-api-key',
  endpoint: 'https://api.calendarhub.com'
});`}
                  </code>
                </div>
              </div>
            </Card>
          </div>

          {/* Chatbot Sidebar */}
          <div className="lg:col-span-1">
            <DeveloperChatbot />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 text-center">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Calendar API</h3>
            <p className="text-sm text-gray-600">
              Full CRUD operations for events, recurring schedules, and calendar management
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Bell className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">SMS/RCS Reminders</h3>
            <p className="text-sm text-gray-600">
              Integrate with TextNow and other providers for automated reminders
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
            <p className="text-sm text-gray-600">
              Handle invitations, permissions, and collaborative features
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPortal;
