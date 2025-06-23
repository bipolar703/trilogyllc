import { Mail, Phone, MapPin, ArrowRight, Globe, Shield, Award, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLogo from '../images/footerlogo.svg';
import FooterLogoAr from '../images/footerlogoar.svg';
import styles from './Footer.module.css';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language;

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      if (location.pathname === '/') {
        const sectionId = path.replace('/#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = path;
      }
    }
  };

  const trustIndicators = [
    { icon: <Shield className="w-5 h-5" />, text: 'ISO 9001:2015 Certified' },
    { icon: <Award className="w-5 h-5" />, text: 'FIATA Accredited' },
    { icon: <Users className="w-5 h-5" />, text: '500+ Global Clients' },
    { icon: <Globe className="w-5 h-5" />, text: '30+ Countries Served' }
  ];

  return (
    <footer className={styles.footer}>
      {/* Animated Background */}
      <div className={styles.footerBackground}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>

      {/* Trust Indicators Bar */}
      <div className={styles.trustBar}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={styles.trustIndicators}>
            {trustIndicators.map((indicator, index) => (
              <div key={index} className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  {indicator.icon}
                </div>
                <span className={styles.trustText}>{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="block mb-6">
              <img
                src={currentLang === 'ar' ? FooterLogoAr : MainLogo}
                alt="Trilogy Trading"
                className={`${styles.logo} h-12`}
              />
            </Link>
            
            <p className={styles.companyDescription}>
              {t('footer.company.description')}
            </p>

            {/* Enhanced Contact Info */}
            <div className="space-y-6 mt-8">
              <div className={styles.contactSection}>
                <h4 className={styles.contactTitle}>Get in Touch</h4>
                
                <div className="space-y-4">
                  {/* Address */}
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>Address</span>
                      <span className={styles.contactValue}>
                        {t('footer.contact.address')}
                      </span>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>Phone</span>
                      <div className="space-y-1">
                        <a
                          href="tel:+962796564791"
                          className={styles.contactLink}
                          dir="ltr"
                        >
                          +962796564791
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>Email</span>
                      <a
                        href={`mailto:${t('footer.contact.email')}`}
                        className={styles.contactLink}
                        dir="ltr"
                      >
                        {t('footer.contact.email')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className={styles.businessHours}>
                <h4 className={styles.contactTitle}>Business Hours</h4>
                <div className={styles.hoursGrid}>
                  <div className={styles.hoursItem}>
                    <span className={styles.hoursDay}>Sunday - Thursday</span>
                    <span className={styles.hoursTime}>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span className={styles.hoursDay}>Friday - Saturday</span>
                    <span className={styles.hoursTime}>Closed</span>
                  </div>
                  <div className={styles.timezone}>
                    <span>GMT+3 (Jordan Time)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.sectionTitle}>
              {t('footer.quickLinks.title')}
            </h3>
            <ul className={styles.linksList}>
              {Object.entries(t('footer.quickLinks.items', { returnObjects: true })).map(([key, item]: [string, any]) => (
                <li key={key}>
                  <Link
                    to={item.path}
                    onClick={(e) => handleNavigation(e, item.path)}
                    className={styles.footerLink}
                  >
                    <span>{item.text}</span>
                    <ArrowRight className={`w-4 h-4 ${styles.linkArrow}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={styles.sectionTitle}>
              {t('footer.services.title')}
            </h3>
            <ul className={styles.linksList}>
              {Object.entries(t('footer.services.items', { returnObjects: true })).map(([key, item]: [string, any]) => (
                <li key={key}>
                  <Link
                    to={item.path}
                    className={`${styles.footerLink} ${
                      key === 'viewAll' ? styles.featuredLink : ''
                    }`}
                  >
                    <span>{item.text}</span>
                    <ArrowRight className={`w-4 h-4 ${styles.linkArrow}`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Section */}
            <div className={styles.ctaSection}>
              <h4 className={styles.ctaTitle}>Ready to Start?</h4>
              <p className={styles.ctaDescription}>
                Get a free consultation for your trade needs
              </p>
              <Link to="/#contact" className={styles.ctaButton}>
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <div>
              <h3 className={styles.newsletterTitle}>Stay Updated</h3>
              <p className={styles.newsletterDescription}>
                Get the latest trade insights and market updates delivered to your inbox
              </p>
            </div>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterButton}>
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <p>
              {currentLang === 'ar' 
                ? "تم التصميم والتطوير بواسطة شركة الصبّار للدعاية والإعلان © الشركة الثلاثية للتوريد والوكالات التجارية ذ.م.م - جميع الحقوق محفوظة"
                : "Designed and Developed by Cactus Media © Trilogy Trading LLC. - All Rights Reserved"
              }
            </p>
          </div>
          
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;