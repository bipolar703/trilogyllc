import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from '@google/generative-ai';
import { HEXABOT_SYSTEM_PROMPT } from '@/lib/prompts/hexabot';
import { Message } from '@/lib/supabase';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

// Define the escalateToHuman function schema
const escalateToHumanFunction = {
  name: "escalateToHuman",
  description: "Escalate a customer to a human agent by capturing their contact information and request details",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      userName: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Customer's full name"
      },
      userEmail: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Customer's email address"
      },
      userPhone: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Customer's phone number (optional)"
      },
      userCompany: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Customer's company name (optional)"
      },
      summaryOfRequest: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Detailed summary of the customer's needs and conversation context"
      },
      serviceInterest: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Primary service the customer is interested in",
        enum: ["strategic_sourcing", "logistics_optimization", "trade_documentation", "b2b_solutions", "general"]
      },
      urgencyLevel: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Urgency level of the customer's request",
        enum: ["low", "medium", "high", "urgent"]
      },
      escalationReason: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Reason why escalation is needed"
      }
    },
    required: ["userName", "userEmail", "summaryOfRequest", "serviceInterest", "urgencyLevel", "escalationReason"]
  }
};

// Get the Gemini model with function calling
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  },
  tools: [
    {
      functionDeclarations: [escalateToHumanFunction]
    }
  ]
});

export interface EscalationData {
  userName: string;
  userEmail: string;
  userPhone?: string;
  userCompany?: string;
  summaryOfRequest: string;
  serviceInterest: 'strategic_sourcing' | 'logistics_optimization' | 'trade_documentation' | 'b2b_solutions' | 'general';
  urgencyLevel: 'low' | 'medium' | 'high' | 'urgent';
  escalationReason: string;
}

export interface AIResponse {
  content: string;
  tokensUsed?: number;
  responseTime: number;
  shouldEscalate: boolean;
  functionCall?: {
    name: string;
    parameters: EscalationData;
  };
}

export async function generateResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<AIResponse> {
  const startTime = Date.now();

  try {
    // Prepare conversation history for context
    const contextMessages = conversationHistory
      .slice(-10) // Keep last 10 messages for context
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Construct the full prompt
    const fullPrompt = `${HEXABOT_SYSTEM_PROMPT}

## CONVERSATION HISTORY
${contextMessages ? contextMessages + '\n' : ''}

## CURRENT USER MESSAGE
User: ${userMessage}

## YOUR RESPONSE
Respond as Hexabot following all the guidelines above. Be professional, helpful, and stay within your knowledge base. If you need to escalate, gather the required information and use the escalateToHuman function.`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;

    // Check if there are function calls
    const functionCalls = response.functionCalls();
    let functionCall: { name: string; parameters: EscalationData } | undefined;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === 'escalateToHuman') {
        functionCall = {
          name: call.name,
          parameters: call.args as EscalationData
        };
      }
    }

    // Get the text content
    const content = response.text() || '';

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Determine if escalation is needed
    const shouldEscalate = !!functionCall || detectEscalationNeeded(content, userMessage);

    return {
      content: content.trim(),
      responseTime,
      shouldEscalate,
      functionCall,
    };

  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Fallback response
    const responseTime = Date.now() - startTime;
    return {
      content: "I apologize, but I'm experiencing technical difficulties. Please contact our team directly at +962796564791 or info@trilogytradingllc.com for immediate assistance. Our team is available Sunday-Thursday, 8 AM-6 PM (GMT+3).",
      responseTime,
      shouldEscalate: true,
    };
  }
}

/**
 * Detect if the response indicates escalation is needed
 */
function detectEscalationNeeded(response: string, userMessage: string): boolean {
  const escalationIndicators = [
    'connect you with our team',
    'speak with our specialists',
    'contact our expert team',
    '+962796564791',
    'info@trilogytradingllc.com',
    'detailed consultation',
    'human expert',
    'specialist team'
  ];

  const userEscalationRequests = [
    'speak to someone',
    'talk to a person',
    'human agent',
    'call me',
    'phone call',
    'speak with',
    'talk with',
    'contact me'
  ];

  // Check if response contains escalation language
  const responseHasEscalation = escalationIndicators.some(indicator => 
    response.toLowerCase().includes(indicator.toLowerCase())
  );

  // Check if user explicitly requested human contact
  const userRequestsEscalation = userEscalationRequests.some(request =>
    userMessage.toLowerCase().includes(request.toLowerCase())
  );

  return responseHasEscalation || userRequestsEscalation;
}

/**
 * Validate that the AI response stays within guidelines
 */
export function validateResponse(response: string): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for potential hallucination indicators
  const problematicPhrases = [
    'I think',
    'I believe',
    'probably',
    'might be',
    'could be around',
    'approximately $',
    'roughly $',
    'about $'
  ];

  problematicPhrases.forEach(phrase => {
    if (response.toLowerCase().includes(phrase.toLowerCase())) {
      issues.push(`Response contains uncertain language: "${phrase}"`);
    }
  });

  // Check for specific pricing mentions (should be avoided)
  const pricingPatterns = [
    /\$\d+/g,
    /\d+\s*dollars?/gi,
    /\d+\s*USD/gi,
    /price.*\d+/gi
  ];

  pricingPatterns.forEach(pattern => {
    if (pattern.test(response)) {
      issues.push('Response contains specific pricing information');
    }
  });

  // Check response length (should be reasonable)
  if (response.length > 2000) {
    issues.push('Response is too long');
  }

  if (response.length < 10) {
    issues.push('Response is too short');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

/**
 * Format conversation history for AI context
 */
export function formatConversationHistory(messages: Message[]): string {
  return messages
    .slice(-8) // Keep last 8 messages for context
    .map(msg => {
      const role = msg.role === 'user' ? 'User' : 'Assistant';
      const timestamp = new Date(msg.created_at).toLocaleTimeString();
      return `[${timestamp}] ${role}: ${msg.content}`;
    })
    .join('\n');
}

/**
 * Extract key information from user message for analytics
 */
export function extractMessageInsights(message: string): {
  intent: string;
  entities: string[];
  urgency: 'low' | 'medium' | 'high';
  serviceInterest?: string;
} {
  const lowerMessage = message.toLowerCase();

  // Detect intent
  let intent = 'general_inquiry';
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    intent = 'greeting';
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    intent = 'pricing_inquiry';
  } else if (lowerMessage.includes('sourcing') || lowerMessage.includes('supplier')) {
    intent = 'sourcing_inquiry';
  } else if (lowerMessage.includes('logistics') || lowerMessage.includes('shipping')) {
    intent = 'logistics_inquiry';
  } else if (lowerMessage.includes('documentation') || lowerMessage.includes('customs')) {
    intent = 'documentation_inquiry';
  } else if (lowerMessage.includes('market') || lowerMessage.includes('b2b')) {
    intent = 'market_entry_inquiry';
  }

  // Extract entities (countries, products, etc.)
  const entities: string[] = [];
  const countries = ['china', 'germany', 'usa', 'jordan', 'europe', 'asia', 'middle east'];
  const products = ['textile', 'electronics', 'machinery', 'food', 'chemicals'];
  
  countries.forEach(country => {
    if (lowerMessage.includes(country)) {
      entities.push(country);
    }
  });

  products.forEach(product => {
    if (lowerMessage.includes(product)) {
      entities.push(product);
    }
  });

  // Detect urgency
  let urgency: 'low' | 'medium' | 'high' = 'medium';
  if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
    urgency = 'high';
  } else if (lowerMessage.includes('when convenient') || lowerMessage.includes('no rush')) {
    urgency = 'low';
  }

  // Detect service interest
  let serviceInterest: string | undefined;
  if (intent.includes('sourcing')) serviceInterest = 'strategic_sourcing';
  else if (intent.includes('logistics')) serviceInterest = 'logistics_optimization';
  else if (intent.includes('documentation')) serviceInterest = 'trade_documentation';
  else if (intent.includes('market')) serviceInterest = 'b2b_solutions';

  return {
    intent,
    entities,
    urgency,
    serviceInterest
  };
}