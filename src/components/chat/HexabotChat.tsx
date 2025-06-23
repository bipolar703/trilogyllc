import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, X, MessageCircle, Phone, Mail } from 'lucide-react';
import hexabotConfig from '../../config/hexabot.config';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface HexabotChatProps {
  isVisible: boolean;
  onClose: () => void;
}

const HexabotChat: React.FC<HexabotChatProps> = ({ isVisible, onClose }) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isVisible && messages.length === 0) {
      // Initialize with welcome message from config
      const welcomeMessage: Message = {
        id: '1',
        text: hexabotConfig.responses.welcome,
        isBot: true,
        timestamp: new Date(),
        options: Object.keys(hexabotConfig.services).concat(['Contact Information'])
      };
      setMessages([welcomeMessage]);
    }
  }, [isVisible, messages.length]);

  const getServiceResponse = (service: string): Message => {
    if (service === 'Contact Information') {
      const contactText = `You can reach our expert team through multiple channels:\n\n📞 Phone: ${hexabotConfig.contact.phones.join(' | ')}\n📧 Email: ${hexabotConfig.contact.email}\n💬 WhatsApp: ${hexabotConfig.contact.whatsapp}\n🕒 Hours: ${hexabotConfig.contact.hours}\n\nWould you like me to connect you with a specialist for your specific needs?`;
      
      return {
        id: Date.now().toString(),
        text: contactText,
        isBot: true,
        timestamp: new Date(),
        options: ['Schedule Call', 'Send Email', 'WhatsApp Contact', 'Back to Services']
      };
    }

    const serviceConfig = hexabotConfig.services[service as keyof typeof hexabotConfig.services];
    if (serviceConfig) {
      let responseText = `${serviceConfig.description}\n\n`;
      responseText += `⏱️ Timeline: ${serviceConfig.timeline}\n`;
      
      if ('benefits' in serviceConfig) {
        responseText += `✅ Benefits: ${serviceConfig.benefits.join(', ')}\n`;
      }
      
      responseText += `\nHow can we help you with ${service.toLowerCase()}?`;

      const options = service === 'Strategic Product Sourcing' 
        ? ['Asia Sourcing', 'Europe Sourcing', 'Get Quote', 'Success Stories']
        : service === 'Logistics Optimization'
        ? ['Transportation Planning', 'Inventory Management', 'Customs Compliance', 'Get Quote']
        : service === 'Trade Documentation Services'
        ? ['Export Documentation', 'Import Documentation', 'Certificate of Origin', 'Customs Clearance']
        : ['Market Entry Strategy', 'Partnership Building', 'Get Quote', 'Success Stories'];

      return {
        id: Date.now().toString(),
        text: responseText,
        isBot: true,
        timestamp: new Date(),
        options
      };
    }

    return {
      id: Date.now().toString(),
      text: "I'd be happy to help you with that. Let me connect you with our specialist team for detailed information.",
      isBot: true,
      timestamp: new Date(),
      options: ['Contact Sales Team', 'View Services', 'Get Quote']
    };
  };

  const getGeneralResponse = (input: string): Message => {
    const lowerInput = input.toLowerCase();
    
    // Check for pricing-related intents
    if (hexabotConfig.intents.pricing.some(keyword => lowerInput.includes(keyword))) {
      return {
        id: Date.now().toString(),
        text: hexabotConfig.responses.pricing,
        isBot: true,
        timestamp: new Date(),
        options: ['Share Project Details', 'Contact Sales Team', 'View Services']
      };
    }
    
    // Check for timeline-related intents
    if (hexabotConfig.intents.timeline.some(keyword => lowerInput.includes(keyword))) {
      return {
        id: Date.now().toString(),
        text: hexabotConfig.responses.timeline,
        isBot: true,
        timestamp: new Date(),
        options: ['Documentation Timeline', 'Sourcing Timeline', 'Market Entry Timeline', 'Logistics Timeline']
      };
    }
    
    // Check for coverage-related intents
    if (hexabotConfig.intents.coverage.some(keyword => lowerInput.includes(keyword))) {
      return {
        id: Date.now().toString(),
        text: hexabotConfig.responses.coverage,
        isBot: true,
        timestamp: new Date(),
        options: ['Asian Markets', 'European Markets', 'Middle East Markets', 'All Regions']
      };
    }

    // Check for quality-related intents
    if (hexabotConfig.intents.quality.some(keyword => lowerInput.includes(keyword))) {
      return {
        id: Date.now().toString(),
        text: hexabotConfig.responses.quality,
        isBot: true,
        timestamp: new Date(),
        options: ['View Certifications', 'Quality Process', 'Client Reviews', 'Get Quote']
      };
    }
    
    // Default escalation response
    return {
      id: Date.now().toString(),
      text: hexabotConfig.responses.escalation,
      isBot: true,
      timestamp: new Date(),
      options: ['Schedule Call', 'Email Discussion', 'WhatsApp Chat', 'Back to Services']
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay using config
    setTimeout(() => {
      let botResponse: Message;
      
      // Check if it's a service selection
      const services = Object.keys(hexabotConfig.services).concat(['Contact Information']);
      if (services.includes(messageText)) {
        botResponse = getServiceResponse(messageText);
      } else {
        botResponse = getGeneralResponse(messageText);
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, hexabotConfig.demo.typingDelay);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Trilogy Assistant</h3>
            <p className="text-xs opacity-90">Powered by Hexabot</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-700 p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.isBot 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-blue-600 text-white'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              {message.options && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="block w-full text-left p-2 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 text-gray-700"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Quick Contact Actions */}
        <div className="flex justify-center space-x-4 mt-3">
          <a
            href={`tel:${hexabotConfig.contact.phones[0]}`}
            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
          >
            <Phone className="w-3 h-3" />
            <span>Call</span>
          </a>
          <a
            href={`mailto:${hexabotConfig.contact.email}`}
            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
          >
            <Mail className="w-3 h-3" />
            <span>Email</span>
          </a>
          <a
            href={`https://wa.me/${hexabotConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HexabotChat;