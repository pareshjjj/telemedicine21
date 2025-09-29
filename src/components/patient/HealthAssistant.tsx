import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageCircle, Send, Bot, User, AlertTriangle, Info } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'info' | 'warning';
}

// Mock chatbot responses - simulating offline AI assistant
const mockResponses: Record<string, string> = {
  'fever': 'For fever, you can take paracetamol 500mg and rest. If fever persists above 102°F for more than 2 days, please consult a doctor.',
  'headache': 'For headaches, try rest in a dark room, stay hydrated, and consider paracetamol. If severe or persistent, consult a doctor.',
  'cough': 'For dry cough, try honey and warm water. For productive cough, stay hydrated. If cough persists more than a week, see a doctor.',
  'stomach': 'For stomach pain, avoid spicy foods, drink plenty of water, and rest. If severe pain or vomiting occurs, seek medical attention.',
  'cold': 'For common cold, rest, drink fluids, and use steam inhalation. Symptoms usually resolve in 7-10 days.',
  'chest pain': 'Chest pain can be serious. Please seek immediate medical attention or call emergency services.',
  'difficulty breathing': 'Difficulty breathing requires immediate medical attention. Please visit the nearest hospital or call emergency services.',
  'hello': 'Hello! I\'m your health assistant. You can ask me about common symptoms, first aid, or general health questions. How can I help you today?',
  'help': 'I can help you with:\n• Common symptoms (fever, headache, cough, etc.)\n• First aid advice\n• When to see a doctor\n• General health tips\n\nWhat would you like to know?',
  'emergency': 'For medical emergencies, please call 102 (India) or visit the nearest hospital immediately. This chatbot is for general guidance only.',
};

const getResponse = (message: string): { content: string; type?: 'info' | 'warning' } => {
  const lowerMessage = message.toLowerCase();
  
  // Check for emergency keywords
  const emergencyKeywords = ['chest pain', 'difficulty breathing', 'emergency', 'severe pain', 'bleeding'];
  if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      content: 'This sounds like a medical emergency. Please call 102 immediately or visit the nearest hospital. Do not rely on this chatbot for emergency situations.',
      type: 'warning'
    };
  }
  
  // Check for specific symptoms
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) {
      return { content: response };
    }
  }
  
  // Default response
  return {
    content: 'I understand you\'re asking about a health concern. While I can provide general guidance, I recommend consulting with a qualified healthcare professional for personalized advice. You can book an appointment with a doctor through our platform.',
    type: 'info'
  };
};

interface HealthAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthAssistant: React.FC<HealthAssistantProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI health assistant. I can help you with basic health questions and symptom guidance. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'I have a fever',
    'Headache symptoms',
    'Common cold remedies',
    'When to see a doctor?'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-patient" />
            {t('patient.chatbot')} - Health Assistant
          </DialogTitle>
          <DialogDescription>
            Get instant health guidance and symptom advice
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-96">
          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-patient/10 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-patient" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.sender === 'user'
                          ? 'bg-patient text-patient-foreground ml-auto'
                          : message.type === 'warning'
                          ? 'bg-destructive/10 border border-destructive/20'
                          : message.type === 'info'
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-muted'
                      }`}
                    >
                      {message.type === 'warning' && (
                        <div className="flex items-center gap-2 mb-2 text-destructive">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-xs font-semibold">IMPORTANT</span>
                        </div>
                      )}
                      {message.type === 'info' && (
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                          <Info className="w-4 h-4" />
                          <span className="text-xs font-semibold">INFO</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-3">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-patient/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-patient" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="py-3 border-t">
              <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 pt-3 border-t">
            <Input
              placeholder="Type your health question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              variant="patient"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          ⚠️ This is for general guidance only. Always consult a healthcare professional for medical advice.
        </div>
      </DialogContent>
    </Dialog>
  );
};