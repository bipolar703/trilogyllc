import React from "react";
import { MessageCircle, X } from "lucide-react";

interface ChatToggleProps {
  isVisible: boolean;
  onClick: () => void;
  unreadCount?: number;
}

const ChatToggle: React.FC<ChatToggleProps> = ({
  isVisible,
  onClick,
  unreadCount = 0,
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-40 flex items-center justify-center ${
        isVisible
          ? "bg-gray-600 hover:bg-gray-700"
          : "bg-blue-600 hover:bg-blue-700 animate-pulse"
      }`}
      aria-label={isVisible ? "Close chat" : "Open chat"}
      data-oid="u:3pfcl"
    >
      {isVisible ? (
        <X className="w-6 h-6 text-white" data-oid="tllt1zn" />
      ) : (
        <>
          <MessageCircle className="w-6 h-6 text-white" data-oid="s8_hh:w" />
          {unreadCount > 0 && (
            <div
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
              data-oid="pyfn5vt"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </>
      )}
    </button>
  );
};

export default ChatToggle;
