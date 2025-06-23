import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface LiveChatProps {
  isVisible: boolean;
}

const LiveChat: React.FC<LiveChatProps> = ({ isVisible }) => {
  const { i18n } = useTranslation();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create container for Botpress
    if (!containerRef.current) {
      const container = document.createElement("div");
      container.id = "botpress-webchat-container";
      document.body.appendChild(container);
      containerRef.current = container;
    }

    // Initialize Botpress webchat
    if (!scriptRef.current) {
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
      script.async = true;
      script.defer = true;
      // Add nonce if your CSP requires it
      // script.nonce = 'your-nonce-here';

      script.onload = () => {
        // @ts-ignore - Botpress types are not available
        window.botpressWebChat.init({
          botId: "hexabot-demo-trilogy", // Hexabot demo configuration
          hostUrl: "https://cdn.botpress.cloud/webchat/v1",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "trilogy-trading-client", // Demo client ID
          webhookId: "trilogy-webhook-demo", // Demo webhook ID
          lazySocket: true,
          themeName: "prism",
          frontendVersion: "v1",
          showPoweredBy: false,
          theme: "light",
          themeColor: "#2563EB",
          hideWidget: true,
          disableAnimations: false,
          closeOnEscape: false,
          showConversationsButton: false,
          enableTranscriptDownload: false,
          containerWidth: "100%",
          layoutWidth: "100%",
          hideHeaderAvatar: true,
          showCloseButton: false,
          disableNotificationSound: false,
          enableReset: true,
          stylesheet:
            "https://webchat-styler-css.botpress.app/prod/code/d5f9b934-a77b-4f86-9d65-6c9056e5b238/v31918/style.css",
          useSessionStorage: true,
          enablePersistHistory: true,
          phoneNumber: "+962796564791",
          locale: i18n.language,
          extraStylesheet: "",
          className: "z-50 shadow-xl webchat-iframe", // Combined className values
          welcomeMessage:
            "Hello! I'm here to help you with Trilogy Trading LLC's global trade and supply chain solutions. We've been helping businesses navigate international trade for over 15 years. How can I assist you today?",
          botName: "Trilogy Assistant",
          botAvatar: "/logo.png",
          userData: {
            company: "Trilogy Trading LLC",
            services: [
              "Strategic Product Sourcing",
              "Logistics Optimization",
              "Trade Documentation Services",
              "B2B Trade Solutions",
            ],

            contact: {
              phone: "+962796564791",
              email: "info@trilogytradingllc.com",
              whatsapp: "+962796564791",
              hours: "Sunday-Thursday: 8:00 AM - 6:00 PM (GMT+3)",
            },
          },
        });
      };

      document.head.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [i18n.language]);

  useEffect(() => {
    // @ts-ignore - Botpress types are not available
    if (window.botpressWebChat) {
      if (isVisible) {
        // @ts-ignore
        window.botpressWebChat.sendEvent({ type: "show" });
      } else {
        // @ts-ignore
        window.botpressWebChat.sendEvent({ type: "hide" });
      }
    }
  }, [isVisible]);

  return null;
};

export default LiveChat;
