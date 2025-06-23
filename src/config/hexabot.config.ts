// Hexabot Configuration for Trilogy Trading LLC Demo
export const hexabotConfig = {
  // Demo configuration - replace with actual Hexabot instance details
  botId: 'trilogy-trading-hexabot-demo',
  apiEndpoint: 'https://api.hexabot.ai/v1', // Replace with actual Hexabot API endpoint
  websocketUrl: 'wss://ws.hexabot.ai/v1', // Replace with actual WebSocket URL
  
  // Company-specific settings
  company: {
    name: 'Trilogy Trading LLC',
    established: '2009',
    experience: '15+ years',
    countries: '30+',
    clients: '500+',
    headquarters: 'Amman, Jordan'
  },

  // Contact information
  contact: {
    phones: ['+962796564791'],
    email: 'info@trilogytradingllc.com',
    whatsapp: '+962796564791',
    hours: 'Sunday-Thursday: 8:00 AM - 6:00 PM (GMT+3)',
    timezone: 'GMT+3'
  },

  // Services configuration
  services: {
    'Strategic Product Sourcing': {
      description: 'Global supplier identification, market price benchmarking, quality assurance, and contract negotiation support.',
      timeline: '15-30 days',
      regions: ['Asia', 'Europe', 'Middle East'],
      benefits: ['35% cost reduction', 'Quality assurance', 'Supplier vetting']
    },
    'Logistics Optimization': {
      description: 'End-to-end supply chain management, multimodal transportation, inventory management, and customs compliance.',
      timeline: '7-21 days',
      features: ['Transportation planning', 'Inventory management', 'Customs compliance'],
      benefits: ['15-day delivery optimization', '50+ monthly shipments managed']
    },
    'Trade Documentation Services': {
      description: 'Export/import documentation, Certificate of Origin processing, customs clearance, and regulatory compliance.',
      timeline: '3-15 days',
      documents: ['Export/Import papers', 'Certificate of Origin', 'Customs clearance'],
      compliance: '100% regulatory compliance guaranteed'
    },
    'B2B Trade Solutions': {
      description: 'Market entry strategies, trade partnership facilitation, dispute resolution, and risk management.',
      timeline: '3-6 months',
      markets: ['EU', 'Asia', 'Middle East'],
      benefits: ['3-month EU market entry', '20% better supplier terms', '40% faster customs clearance']
    }
  },

  // Success stories for bot responses
  successStories: [
    {
      industry: 'Textile Manufacturing',
      achievement: '35% cost reduction through Asian sourcing',
      timeline: '15-day delivery optimization',
      volume: '50+ monthly shipments managed'
    },
    {
      industry: 'Tech Startup',
      achievement: 'EU market entry in 3 months',
      savings: '20% better supplier terms',
      efficiency: '40% faster customs clearance'
    }
  ],

  // Bot personality and responses
  personality: {
    tone: 'professional',
    style: 'helpful',
    expertise: 'international trade',
    languages: ['en', 'ar']
  },

  // Response templates
  responses: {
    welcome: "Hello! I'm here to help you with Trilogy Trading LLC's global trade and supply chain solutions. We've been helping businesses navigate international trade for over 15 years. How can I assist you today?",
    
    pricing: "Our pricing is customized based on your specific requirements, shipment volume, and service complexity. For an accurate quote, please share your project details and I'll have our team prepare a proposal for you.",
    
    timeline: "Timelines vary by service:\n• Documentation: 3-15 days\n• Product Sourcing: 15-30 days\n• Market Entry: 3-6 months\n• Logistics Setup: 7-21 days\n\nWhat specific service timeline do you need?",
    
    coverage: "We operate in 30+ countries with strong networks in Asia-Europe-Middle East trade corridors. Our headquarters in Jordan provides strategic access to these key markets. Which regions are you interested in?",
    
    quality: "We guarantee 100% compliance with all regulations and provide real-time shipment tracking. Each client gets a dedicated account manager and quarterly performance reviews. We're ISO 9001:2015 certified and FIATA accredited.",
    
    escalation: "For detailed discussions about your specific needs, I'd like to connect you with our expert team. You can reach us at +962796564791 or info@trilogytradingllc.com. We're available Sunday-Thursday, 8 AM-6 PM (GMT+3)."
  },

  // Intent recognition patterns
  intents: {
    pricing: ['price', 'cost', 'quote', 'pricing', 'how much', 'expensive'],
    timeline: ['time', 'how long', 'duration', 'timeline', 'when', 'schedule'],
    coverage: ['country', 'region', 'where', 'location', 'coverage', 'operate'],
    quality: ['quality', 'compliance', 'guarantee', 'certification', 'standards'],
    services: ['service', 'what do you do', 'help', 'offer', 'provide'],
    contact: ['contact', 'phone', 'email', 'reach', 'talk', 'speak']
  },

  // Demo mode settings
  demo: {
    enabled: true,
    simulateTyping: true,
    typingDelay: 1500,
    showPoweredBy: true,
    enableAnalytics: false,
    mockResponses: true
  }
};

export default hexabotConfig;