import { ChatWindow } from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex items-center justify-center"
      data-oid="ee42587"
    >
      <div className="w-full max-w-4xl" data-oid="zy4wyfb">
        {/* Header */}
        <div className="text-center mb-8" data-oid="q5app.w">
          <h1
            className="text-4xl font-bold text-gray-900 mb-2"
            data-oid="y.ytrlw"
          >
            Hexabot AI Agent
          </h1>
          <p className="text-lg text-gray-600 mb-4" data-oid="0zmix1q">
            Your Digital Consultant for Global Trade Solutions
          </p>
          <div
            className="flex items-center justify-center gap-6 text-sm text-gray-500"
            data-oid="e9zb70u"
          >
            <div className="flex items-center gap-2" data-oid="kzbua-5">
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                data-oid="frn8y.x"
              ></div>
              <span data-oid="7r:p0pc">Online 24/7</span>
            </div>
            <div data-oid="2ur04z.">•</div>
            <div data-oid="9:mx:ko">Trilogy Trading LLC</div>
            <div data-oid="-i:u3:7">•</div>
            <div data-oid="mfcrdul">15+ Years Experience</div>
            <div data-oid="tjgtr1p">•</div>
            <div data-oid="cdiyr7o">500+ Global Clients</div>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatWindow data-oid="w5xdv_w" />

        {/* Navigation Links */}
        <div className="text-center mt-8" data-oid="vey3hig">
          <div className="flex justify-center gap-6 mb-6" data-oid="fss3v_d">
            <a
              href="/blog"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="uueu0yb"
            >
              📖 Read Our Blog
            </a>
            <a
              href="/dashboard"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="rdjip2i"
            >
              📊 Analytics Dashboard
            </a>
            <a
              href="tel:+962796564791"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="hygi4ig"
            >
              📞 Call Us
            </a>
            <a
              href="mailto:info@trilogytradingllc.com"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="g2pacsb"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center mt-8 text-sm text-gray-500"
          data-oid="kpdrdbn"
        >
          <p data-oid="3.:16hj">
            Powered by Hexabot AI • Built with Next.js 15, TypeScript, and
            Supabase
          </p>
          <p className="mt-2" data-oid="a1b6-tb">
            For immediate assistance, call{" "}
            <a
              href="tel:+962796564791"
              className="text-trilogy-blue hover:underline"
              data-oid="nq6dmim"
            >
              +962796564791
            </a>{" "}
            or email{" "}
            <a
              href="mailto:info@trilogytradingllc.com"
              className="text-trilogy-blue hover:underline"
              data-oid="4lbty6q"
            >
              info@trilogytradingllc.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
