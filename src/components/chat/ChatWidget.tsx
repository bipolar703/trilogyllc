import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LiveIndicator from './LiveIndicator';
import ChatOptions from './ChatOptions';
import LiveChat from './LiveChat';

const ChatWidget: React.FC = () => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isLiveChatVisible, setIsLiveChatVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleOptionSelect = (option: 'whatsapp' | 'live') => {
    if (option === 'whatsapp') {
      const phoneNumber = '962796872273'; // Your WhatsApp number
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    } else {
      setIsLiveChatVisible(true);
    }
    setIsOptionsVisible(false);
  };

  return (
    <>
      <div 
        className={`fixed ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} bottom-4 sm:bottom-6 z-50 flex flex-col items-end`}
      >
        <div className="relative">
          <button
            onClick={() => {
              setIsOptionsVisible(!isOptionsVisible);
              if (isLiveChatVisible) setIsLiveChatVisible(false);
            }}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={t('chat.open')}
          >
            {isOptionsVisible ? (
              <svg
                className="w-6 h-6 text-white transform rotate-0 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <LiveIndicator />
              </>
            )}
          </button>

          <ChatOptions
            isVisible={isOptionsVisible}
            onOptionSelect={handleOptionSelect}
          />
        </div>
      </div>

      <LiveChat isVisible={isLiveChatVisible} />
    </>
  );
};

export default ChatWidget; 