import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Globe,
  Shield,
  Award,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLogo from "../images/footerlogo.svg";
import FooterLogoAr from "../images/footerlogoar.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language;

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (path.startsWith("/#")) {
      e.preventDefault();
      if (location.pathname === "/") {
        const sectionId = path.replace("/#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = path;
      }
    }
  };

  const trustIndicators = [
    {
      icon: <Shield className="w-5 h-5" data-oid="cdz5uht" />,
      text: "ISO 9001:2015 Certified",
    },
    {
      icon: <Award className="w-5 h-5" data-oid="5e13wo7" />,
      text: "FIATA Accredited",
    },
    {
      icon: <Users className="w-5 h-5" data-oid="h0xraxu" />,
      text: "500+ Global Clients",
    },
    {
      icon: <Globe className="w-5 h-5" data-oid=".y_0w19" />,
      text: "30+ Countries Served",
    },
  ];

  return (
    <footer className={styles.footer} data-oid="qw4h:zz">
      {/* Animated Background */}
      <div className={styles.footerBackground} data-oid=".4gw9d9">
        <div className={styles.gradientOrb1} data-oid="zslam30" />
        <div className={styles.gradientOrb2} data-oid="jbzw58t" />
        <div className={styles.gradientOrb3} data-oid="q8q.5ax" />
      </div>

      {/* Trust Indicators Bar */}
      <div className={styles.trustBar} data-oid="2:8:3to">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="h.g:ksc"
        >
          <div className={styles.trustIndicators} data-oid="rvu_-xq">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className={styles.trustItem} data-oid="1-vd:--">
                <div className={styles.trustIcon} data-oid="afst3bk">
                  {indicator.icon}
                </div>
                <span className={styles.trustText} data-oid="tp357.q">
                  {indicator.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10"
        data-oid="lvmztct"
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          data-oid="y8666zw"
        >
          {/* Company Info */}
          <div className="lg:col-span-2" data-oid="8pp0nbi">
            <Link to="/" className="block mb-6" data-oid="kvowkxp">
              <img
                src={currentLang === "ar" ? FooterLogoAr : MainLogo}
                alt="Trilogy Trading"
                className={`${styles.logo} h-12`}
                data-oid="qmxkz39"
              />
            </Link>

            <p className={styles.companyDescription} data-oid="8g31x6:">
              {t("footer.company.description")}
            </p>

            {/* Enhanced Contact Info */}
            <div className="space-y-6 mt-8" data-oid="38_rcry">
              <div className={styles.contactSection} data-oid="i-b1b54">
                <h4 className={styles.contactTitle} data-oid="6b::z0x">
                  Get in Touch
                </h4>

                <div className="space-y-4" data-oid="260:91l">
                  {/* Address */}
                  <div className={styles.contactItem} data-oid="7tgrl0w">
                    <div className={styles.contactIcon} data-oid="8f6ft78">
                      <MapPin className="w-5 h-5" data-oid="ql43nca" />
                    </div>
                    <div className={styles.contactContent} data-oid="k55zomq">
                      <span className={styles.contactLabel} data-oid="n1yiowl">
                        Address
                      </span>
                      <span className={styles.contactValue} data-oid="gc.4:4b">
                        {t("footer.contact.address")}
                      </span>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className={styles.contactItem} data-oid="956a7:i">
                    <div className={styles.contactIcon} data-oid="zb37pd3">
                      <Phone className="w-5 h-5" data-oid="we8v9__" />
                    </div>
                    <div className={styles.contactContent} data-oid="xs4qf3q">
                      <span className={styles.contactLabel} data-oid="k4t9cev">
                        Phone
                      </span>
                      <div className="space-y-1" data-oid="f_s:0vw">
                        <a
                          href="tel:+962796564791"
                          className={styles.contactLink}
                          dir="ltr"
                          data-oid="9ut_i1z"
                        >
                          +962796564791
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={styles.contactItem} data-oid="fo10.bt">
                    <div className={styles.contactIcon} data-oid="26pubpq">
                      <Mail className="w-5 h-5" data-oid="cjr2vo8" />
                    </div>
                    <div className={styles.contactContent} data-oid="._vk94b">
                      <span className={styles.contactLabel} data-oid="j6qp-ow">
                        Email
                      </span>
                      <a
                        href={`mailto:${t("footer.contact.email")}`}
                        className={styles.contactLink}
                        dir="ltr"
                        data-oid="nu4o1:9"
                      >
                        {t("footer.contact.email")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className={styles.businessHours} data-oid="xgk0lx6">
                <h4 className={styles.contactTitle} data-oid="67t4.gp">
                  Business Hours
                </h4>
                <div className={styles.hoursGrid} data-oid="ycb7xzo">
                  <div className={styles.hoursItem} data-oid="0p32kl4">
                    <span className={styles.hoursDay} data-oid="50yqye2">
                      Sunday - Thursday
                    </span>
                    <span className={styles.hoursTime} data-oid="_k9hctu">
                      8:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className={styles.hoursItem} data-oid=":yqyoav">
                    <span className={styles.hoursDay} data-oid="0mwtu-:">
                      Friday - Saturday
                    </span>
                    <span className={styles.hoursTime} data-oid="jwj3l_i">
                      Closed
                    </span>
                  </div>
                  <div className={styles.timezone} data-oid="becuy-4">
                    <span data-oid="8eey4sk">GMT+3 (Jordan Time)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-oid="mnowq38">
            <h3 className={styles.sectionTitle} data-oid="i46ev9y">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className={styles.linksList} data-oid="m7e35e6">
              {Object.entries(
                t("footer.quickLinks.items", { returnObjects: true }),
              ).map(([key, item]: [string, any]) => (
                <li key={key} data-oid="5guw:24">
                  <Link
                    to={item.path}
                    onClick={(e) => handleNavigation(e, item.path)}
                    className={styles.footerLink}
                    data-oid="k8e24yc"
                  >
                    <span data-oid="anwk7zq">{item.text}</span>
                    <ArrowRight
                      className={`w-4 h-4 ${styles.linkArrow}`}
                      data-oid="li0t7ei"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-oid="c2r_b:m">
            <h3 className={styles.sectionTitle} data-oid="rn7awk4">
              {t("footer.services.title")}
            </h3>
            <ul className={styles.linksList} data-oid="rs4jf.o">
              {Object.entries(
                t("footer.services.items", { returnObjects: true }),
              ).map(([key, item]: [string, any]) => (
                <li key={key} data-oid="6dtmjiq">
                  <Link
                    to={item.path}
                    className={`${styles.footerLink} ${
                      key === "viewAll" ? styles.featuredLink : ""
                    }`}
                    data-oid="c-b-9pe"
                  >
                    <span data-oid="pt_m6y5">{item.text}</span>
                    <ArrowRight
                      className={`w-4 h-4 ${styles.linkArrow}`}
                      data-oid="0zyzqqp"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Section */}
            <div className={styles.ctaSection} data-oid="wobttwt">
              <h4 className={styles.ctaTitle} data-oid="gonxbip">
                Ready to Start?
              </h4>
              <p className={styles.ctaDescription} data-oid="ki99s-7">
                Get a free consultation for your trade needs
              </p>
              <Link
                to="/#contact"
                className={styles.ctaButton}
                data-oid="-p--qnf"
              >
                <span data-oid="im6i9ih">Get Free Quote</span>
                <ArrowRight className="w-4 h-4" data-oid="owbyqyi" />
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection} data-oid="jv41mti">
          <div className={styles.newsletterContent} data-oid="rslym-4">
            <div data-oid="p5pqft3">
              <h3 className={styles.newsletterTitle} data-oid="wgm2kuw">
                Stay Updated
              </h3>
              <p className={styles.newsletterDescription} data-oid="8zq2asj">
                Get the latest trade insights and market updates delivered to
                your inbox
              </p>
            </div>
            <div className={styles.newsletterForm} data-oid="jv3s:.i">
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.newsletterInput}
                data-oid="skxbavz"
              />

              <button className={styles.newsletterButton} data-oid="xah4pwr">
                Subscribe
                <ArrowRight className="w-4 h-4" data-oid="p6qe_rf" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar} data-oid="y1h1kz_">
          <div className={styles.copyright} data-oid="jdo7a3e">
            <p data-oid="60gmhe6">
              {currentLang === "ar"
                ? "تم التصميم والتطوير بواسطة شركة الصبّار للدعاية والإعلان © الشركة الثلاثية للتوريد والوكالات التجارية ذ.م.م - جميع الحقوق محفوظة"
                : "Designed and Developed by Cactus Media © Trilogy Trading LLC. - All Rights Reserved"}
            </p>
          </div>

          <div className={styles.socialLinks} data-oid="bz.nq-j">
            <a
              href="#"
              className={styles.socialLink}
              aria-label="LinkedIn"
              data-oid="indgfy:"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                data-oid="ad8kcqo"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  data-oid="y89pbw0"
                />
              </svg>
            </a>
            <a
              href="#"
              className={styles.socialLink}
              aria-label="Twitter"
              data-oid="lod7ekq"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                data-oid="39hlt6x"
              >
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  data-oid="w:rc6:6"
                />
              </svg>
            </a>
            <a
              href="#"
              className={styles.socialLink}
              aria-label="Facebook"
              data-oid="hmm1moh"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                data-oid="2wboofs"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  data-oid="w9ent17"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
