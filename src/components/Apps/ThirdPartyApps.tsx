
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink, Settings } from 'lucide-react';

const ThirdPartyApps = () => {
  const connectedApps = [
    {
      id: 1,
      name: 'Zoom',
      description: 'Video conferencing integration',
      status: 'connected',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Slack',
      description: 'Team communication',
      status: 'connected',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'GitHub',
      description: 'Code repository integration',
      status: 'connected',
      color: 'bg-gray-800'
    }
  ];

  const availableApps = [
    {
      id: 4,
      name: 'TextNow',
      description: 'SMS/RCS reminders',
      status: 'available',
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Notion',
      description: 'Note-taking and documentation',
      status: 'available',
      color: 'bg-black'
    },
    {
      id: 6,
      name: 'Figma',
      description: 'Design collaboration',
      status: 'available',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Third-Party Apps</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Browse App Store
          </Button>
        </div>

        {/* Connected Apps */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Apps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedApps.map((app) => (
              <Card key={app.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {app.name[0]}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{app.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{app.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Apps */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Available Apps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableApps.map((app) => (
              <Card key={app.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {app.name[0]}
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{app.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{app.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Available
                  </span>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* App Development CTA */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Build Your Own Integration
            </h3>
            <p className="text-gray-600 mb-6">
              Use our Developer Portal to create custom integrations with our powerful API
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Open Developer Portal
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ThirdPartyApps;
