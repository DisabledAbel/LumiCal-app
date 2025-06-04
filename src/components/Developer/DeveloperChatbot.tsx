
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const DeveloperChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your development assistant. I can help you with CalendarHub API integration, troubleshooting, and code examples. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "How do I create an event?",
    "SMS reminder setup",
    "GitHub integration guide",
    "API authentication"
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('event') || input.includes('create')) {
      return `To create an event, use the POST /api/calendar/events endpoint:

\`\`\`javascript
const event = await fetch('/api/calendar/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Event',
    start: '2024-06-15T10:00:00Z',
    end: '2024-06-15T11:00:00Z',
    description: 'Event description'
  })
});
\`\`\``;
    }
    
    if (input.includes('sms') || input.includes('reminder')) {
      return `For SMS reminders, connect TextNow and use:

\`\`\`javascript
const reminder = await fetch('/api/reminders/sms', {
  method: 'POST',
  body: JSON.stringify({
    phone: '+1234567890',
    message: 'Event reminder: Meeting in 15 minutes',
    eventId: 'event-123'
  })
});
\`\`\``;
    }
    
    if (input.includes('github')) {
      return `GitHub integration allows you to:
• Connect repositories to track commits
• Create events from GitHub milestones
• Sync project deadlines with calendar

Use the GitHub connector in the Developer Portal to get started.`;
    }
    
    if (input.includes('auth')) {
      return `Authentication uses API keys:

1. Generate an API key in your developer dashboard
2. Include it in requests:

\`\`\`javascript
headers: {
  'Authorization': 'Bearer your-api-key',
  'Content-Type': 'application/json'
}
\`\`\``;
    }
    
    return "I can help with API documentation, code examples, and troubleshooting. Try asking about specific features like 'How do I create an event?' or 'SMS reminder setup'.";
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <Card className="h-96 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Developer Assistant</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Replies */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-1 mb-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(reply)}
              className="text-xs"
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about API, examples..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DeveloperChatbot;
