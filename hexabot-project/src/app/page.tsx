import { ChatWindow } from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex items-center justify-center"
      data-oid="ih667tc"
    >
      <div className="w-full max-w-4xl" data-oid="6:b:ngb">
        {/* Header */}
        <div className="text-center mb-8" data-oid="0q09ndz">
          <h1
            className="text-4xl font-bold text-gray-900 mb-2"
            data-oid="0xlcf7w"
          >
            Hexabot AI Agent
          </h1>
          <p className="text-lg text-gray-600 mb-4" data-oid="4rdv-nt">
            Your Digital Consultant for Global Trade Solutions
          </p>
          <div
            className="flex items-center justify-center gap-6 text-sm text-gray-500"
            data-oid="4cd9byi"
          >
            <div className="flex items-center gap-2" data-oid="cjrvqfi">
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                data-oid=".o11f_1"
              ></div>
              <span data-oid="5fp28tl">Online 24/7</span>
            </div>
            <div data-oid="6u3vfzx">•</div>
            <div data-oid="m2w8:0j">Trilogy Trading LLC</div>
            <div data-oid="ibyheek">•</div>
            <div data-oid="z37xh4j">15+ Years Experience</div>
            <div data-oid="_.7cd5t">•</div>
            <div data-oid="wjopanu">500+ Global Clients</div>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatWindow data-oid="ov9gwhj" />

        {/* Navigation Links */}
        <div className="text-center mt-8" data-oid="5t6j7cg">
          <div className="flex justify-center gap-6 mb-6" data-oid="ns.nkkc">
            <a
              href="/blog"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="ymev.j8"
            >
              📖 Read Our Blog
            </a>
            <a
              href="/dashboard"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="aq:v6cv"
            >
              📊 Analytics Dashboard
            </a>
            <a
              href="tel:+962796564791"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="g3-7gxp"
            >
              📞 Call Us
            </a>
            <a
              href="mailto:info@trilogytradingllc.com"
              className="text-trilogy-blue hover:text-trilogy-navy font-medium"
              data-oid="10towfi"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center mt-8 text-sm text-gray-500"
          data-oid="vf60if5"
        >
          <p data-oid="ere7nf0">
            Powered by Hexabot AI • Built with Next.js 15, TypeScript, and
            Supabase
          </p>
          <p className="mt-2" data-oid="_uq3vk1">
            For immediate assistance, call{" "}
            <a
              href="tel:+962796564791"
              className="text-trilogy-blue hover:underline"
              data-oid="p26eh3i"
            >
              +962796564791
            </a>{" "}
            or email{" "}
            <a
              href="mailto:info@trilogytradingllc.com"
              className="text-trilogy-blue hover:underline"
              data-oid="5o0sgf5"
            >
              info@trilogytradingllc.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
