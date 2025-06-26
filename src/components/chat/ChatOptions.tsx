import React from "react";
import { useTranslation } from "react-i18next";

interface ChatOptionsProps {
  onOptionSelect: (option: "whatsapp" | "live" | "hexabot") => void;
  isVisible: boolean;
}

const ChatOptions: React.FC<ChatOptionsProps> = ({
  onOptionSelect,
  isVisible,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`absolute bottom-full mb-4 ${isRTL ? "right-0" : "left-0"} transform transition-all duration-300 ease-out ${
        isVisible
          ? "scale-100 opacity-100 translate-y-0"
          : "scale-95 opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-3 min-w-[240px] backdrop-blur-sm bg-opacity-95 border border-gray-100">
        <button
          onClick={() => onOptionSelect("hexabot")}
          className="w-full text-left px-4 py-3.5 hover:bg-purple-50 rounded-xl flex items-center space-x-3 rtl:space-x-reverse transition-all duration-200 group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <svg
              className="w-5 h-5 text-purple-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">AI Assistant</p>
            <p className="text-sm text-gray-500">Powered by Hexabot</p>
          </div>
        </button>

        <button
          onClick={() => onOptionSelect("whatsapp")}
          className="w-full mt-2 text-left px-4 py-3.5 hover:bg-green-50 rounded-xl flex items-center space-x-3 rtl:space-x-reverse transition-all duration-200 group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <svg
              className="w-5 h-5 text-green-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.6 6.4C16.2 5 14.3 4.2 12.3 4.2C8.3 4.2 5 7.5 5 11.5C5 12.9 5.4 14.3 6.1 15.5L5 19L8.6 17.9C9.7 18.5 11 18.8 12.3 18.8C16.3 18.8 19.6 15.5 19.6 11.5C19.6 9.5 18.9 7.7 17.6 6.4ZM12.3 17.3C11.2 17.3 10.1 17 9.2 16.4L9 16.3L6.9 16.9L7.5 14.9L7.3 14.7C6.6 13.7 6.3 12.6 6.3 11.5C6.3 8.3 9 5.7 12.2 5.7C13.9 5.7 15.4 6.3 16.5 7.4C17.6 8.5 18.2 10 18.2 11.7C18.3 14.9 15.5 17.3 12.3 17.3ZM15.3 13.1C15.1 13 14.3 12.6 14.1 12.5C13.9 12.4 13.8 12.4 13.7 12.6C13.6 12.8 13.2 13.2 13.1 13.3C13 13.4 12.9 13.4 12.7 13.3C12.5 13.2 12 13 11.4 12.4C10.9 11.9 10.6 11.3 10.5 11.1C10.4 10.9 10.5 10.8 10.6 10.7C10.7 10.6 10.8 10.5 10.9 10.4C11 10.3 11 10.2 11.1 10.1C11.2 10 11.1 9.9 11.1 9.8C11.1 9.7 10.8 8.9 10.6 8.5C10.5 8.1 10.3 8.2 10.2 8.2H9.9C9.8 8.2 9.6 8.2 9.4 8.4C9.2 8.6 8.8 9 8.8 9.8C8.8 10.6 9.4 11.3 9.5 11.4C9.6 11.5 10.6 13 12.1 13.7C12.5 13.9 12.8 14 13.1 14.1C13.5 14.2 13.9 14.2 14.2 14.1C14.5 14 15.2 13.6 15.4 13.2C15.5 12.8 15.5 12.4 15.4 12.3C15.4 13.2 15.4 13.2 15.3 13.1Z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{t("chat.whatsapp")}</p>
            <p className="text-sm text-gray-500">Via WhatsApp</p>
          </div>
        </button>

        <button
          onClick={() => onOptionSelect("live")}
          className="w-full mt-2 text-left px-4 py-3.5 hover:bg-blue-50 rounded-xl flex items-center space-x-3 rtl:space-x-reverse transition-all duration-200 group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <svg
              className="w-5 h-5 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{t("chat.liveChat")}</p>
            <p className="text-sm text-gray-500">Chat with us now</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatOptions;
