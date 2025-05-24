import { Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLogo from '../images/footerlogo.svg';
import FooterLogoAr from '../images/footerlogoar.svg';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language;

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      if (location.pathname === '/') {
        // If we're already on the home page, just scroll to the section
        const sectionId = path.replace('/#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on another page, navigate to home and then scroll
        window.location.href = path; // Consider using navigate from react-router-dom for SPA behavior
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white font-sans"> {/* Applied base font */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="block mb-6">
              <img
                src={currentLang === 'ar' ? FooterLogoAr : MainLogo}
                alt="Trilogy Trading"
                className="h-12"
              />
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed"> {/* Adjusted size/leading */}
              {t('footer.company.description')}
            </p>
            <div className="space-y-4">
              {Object.entries({
                address: {
                  icon: <MapPin />,
                  content: t('footer.contact.address'),
                },
                phone: {
                  icon: <Phone />,
                  content: (
                    <a
                      href={`tel:${t('footer.contact.phone')}`}
                      className="hover:text-brand-gold transition-colors"
                      dir="ltr"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {t('footer.contact.phoneDisplay')}
                    </a>
                  ),
                },
                email: {
                  icon: <Mail />,
                  content: (
                    <a
                      href={`mailto:${t('footer.contact.email')}`}
                      className="hover:text-brand-gold transition-colors"
                      dir="ltr"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      {t('footer.contact.email')}
                    </a>
                  ),
                },
              }).map(([key, item]) => (
                <div
                  key={key}
                  className={`flex items-center text-gray-400 text-sm ${ /* Adjusted size */}
                    ${currentLang === 'ar' ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}
                  `}
                >
                  {currentLang === 'ar' ? (
                    <>
                      <span className="flex-grow text-right">{item.content}</span> {/* Ensure content takes space */}
                      <span className="h-5 w-5 text-brand-gold mr-3 ml-4 flex-shrink-0">{item.icon}</span> {/* Added flex-shrink-0 */}
                    </>
                  ) : (
                    <>
                      <span className="h-5 w-5 text-brand-gold mr-3 flex-shrink-0">{item.icon}</span>
                      <span>{item.content}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            {/* Apply heading font */}
            <h3 className="text-lg font-heading font-semibold mb-6 bg-gradient-to-r from-brand-gold to-brand-bronze bg-clip-text text-transparent">
              {t('footer.quickLinks.title')}
            </h3>
            <ul className="space-y-3">
              {Object.entries(t('footer.quickLinks.items', { returnObjects: true })).map(([key, item]: [string, any]) => (
                <li key={key}>
                  <Link
                    to={item.path}
                    onClick={(e) => handleNavigation(e, item.path)}
                    className="text-gray-400 hover:text-brand-gold transition-colors text-sm" /* Adjusted size */
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            {/* Apply heading font */}
            <h3 className="text-lg font-heading font-semibold mb-6 bg-gradient-to-r from-brand-gold to-brand-bronze bg-clip-text text-transparent">
              {t('footer.services.title')}
            </h3>
            <ul className="space-y-3">
              {Object.entries(t('footer.services.items', { returnObjects: true })).map(([key, item]: [string, any]) => (
                <li key={key}>
                  <Link
                    to={item.path}
                    className={`text-gray-400 hover:text-brand-gold transition-colors text-sm ${ /* Adjusted size */}
                      ${key === 'viewAll' ? 'text-brand-gold hover:text-brand-bronze font-medium' : ''}
                    `}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs"> {/* Adjusted size/color */}
          <p>
            {currentLang === 'ar'
              ? "تم التصميم والتطوير بواسطة شركة الصبّار للدعاية والإعلان © الشركة الثلاثية للتوريد والوكالات التجارية ذ.م.م - جميع الحقوق محفوظة"
              : "Designed and Developed by Cactus Media © Trilogy Trading LLC. - All Rights Reserved"
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

