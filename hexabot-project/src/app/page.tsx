import { ChatWindow } from '@/components/chat/ChatWindow';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hexabot AI Agent
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your Digital Consultant for Global Trade Solutions
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online 24/7</span>
            </div>
            <div>•</div>
            <div>Trilogy Trading LLC</div>
            <div>•</div>
            <div>15+ Years Experience</div>
            <div>•</div>
            <div>500+ Global Clients</div>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatWindow />

        {/* Navigation Links */}
        <div className="text-center mt-8">
          <div className="flex justify-center gap-6 mb-6">
            <a href="/blog" className="text-trilogy-blue hover:text-trilogy-navy font-medium">
              📖 Read Our Blog
            </a>
            <a href="/dashboard" className="text-trilogy-blue hover:text-trilogy-navy font-medium">
              📊 Analytics Dashboard
            </a>
            <a href="tel:+962796872273" className="text-trilogy-blue hover:text-trilogy-navy font-medium">
              📞 Call Us
            </a>
            <a href="mailto:info@trilogytradingllc.com" className="text-trilogy-blue hover:text-trilogy-navy font-medium">
              ✉️ Email Us
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Powered by Hexabot AI • Built with Next.js 15, TypeScript, and Supabase
          </p>
          <p className="mt-2">
            For immediate assistance, call{' '}
            <a href="tel:+962796872273" className="text-trilogy-blue hover:underline">
              +962 79 687 2273
            </a>{' '}
            or email{' '}
            <a href="mailto:info@trilogytradingllc.com" className="text-trilogy-blue hover:underline">
              info@trilogytradingllc.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}