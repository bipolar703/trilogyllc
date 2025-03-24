import { useTranslation } from 'react-i18next';
import WhatsAppIcon from '../images/whatsapp-icon.svg';

const WhatsAppWidget = () => {
  const { t, i18n } = useTranslation();
  const phoneNumber = '962796872273'; // Without the + symbol
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${i18n.language === 'ar' ? 'left-6' : 'right-6'} bottom-6 z-50 transition-transform duration-300 hover:scale-110 group`}
      aria-label="Chat on WhatsApp"
    >
      <img 
        src={WhatsAppIcon} 
        alt="WhatsApp"
        className="w-12 h-12"
      />
      <span className={`absolute ${i18n.language === 'ar' ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        {t('common.chatWithUs')}
      </span>
    </a>
  );
};

export default WhatsAppWidget; 