import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Services.module.css";
import {
  Search,
  Truck,
  HandshakeIcon,
  Building2,
  FileText,
  PackageOpen,
} from "lucide-react";
import Contact from "../components/Contact";
import { useState } from "react";

const iconMap = {
  Search,
  Truck,
  HandshakeIcon,
  Building2,
  FileText,
  PackageOpen,
};

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const [showContact, setShowContact] = useState(false);

  const services = t("hero.slides", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    link: string;
    ctaText: string;
  }>;

  return (
    <div data-oid="y9:em_4">
      <div
        className={`${styles.headerBackground} py-16 sm:py-20 md:py-24 relative`}
        data-oid="61a6y-3"
      >
        <div className="light1" data-oid="bnkanuk" />
        <div className="light2" data-oid="0bpah1b" />
        <div className="light3" data-oid=".hu5di6" />

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          data-oid="bwcn5il"
        >
          <div
            className="flex flex-col items-center justify-center text-center"
            data-oid="o.ndlfc"
          >
            <h1
              className={`${styles.gradientText} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6`}
              data-oid="edi4lk4"
            >
              {t("services.title")}
            </h1>
            <p
              className={`${styles.subtleText} text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed`}
              data-oid="plqg1at"
            >
              {t("services.description")}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-20" data-oid="q3r-c8l">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="bfimfsw"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-oid="yivrsm1"
          >
            {services.map((service, index) => {
              const iconKeys = [
                "Search",
                "Truck",
                "HandshakeIcon",
                "Building2",
                "FileText",
                "PackageOpen",
              ];

              const ServiceIcon = iconMap[iconKeys[index % iconKeys.length]];

              const serviceId = service.link.split("/").pop();

              return (
                <Link
                  key={serviceId}
                  to={`/services/${serviceId}`}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                  data-oid="ok4e8-b"
                >
                  <div className="p-8" data-oid="t:1jsfn">
                    <div
                      className="w-14 h-14 bg-gradient-to-r from-brand-gold to-brand-bronze rounded-lg flex items-center justify-center mb-6"
                      data-oid="5rxa0sb"
                    >
                      <ServiceIcon
                        className="h-8 w-8 text-white"
                        data-oid="8u4-w0f"
                      />
                    </div>

                    <h3
                      className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-brand-gold transition-colors"
                      data-oid="rupqji:"
                    >
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6" data-oid="ydfk9kb">
                      {service.description}
                    </p>

                    <div
                      className="flex items-center text-brand-gold font-medium"
                      data-oid="fi.uy01"
                    >
                      {service.ctaText}
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        data-oid="w4-nxvw"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                          data-oid="ehn81km"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div
            className="mt-20 text-center bg-white rounded-2xl shadow-lg p-12"
            data-oid="nphra0."
          >
            {!showContact ? (
              <>
                <h2
                  className="text-3xl font-bold text-gray-900 mb-4"
                  data-oid="mgl1jps"
                >
                  {t("services.readyToTransform")}
                </h2>
                <p
                  className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
                  data-oid="1ya:fe7"
                >
                  {t("services.contactToday")}
                </p>
                <button
                  onClick={() => setShowContact(true)}
                  className="inline-block bg-gradient-to-r from-brand-gold to-brand-bronze text-white px-8 py-4 rounded-lg hover:from-brand-bronze hover:to-brand-gold transition-all duration-300 transform hover:scale-105"
                  data-oid="q9q:cmm"
                >
                  {t("services.getStartedToday")}
                </button>
              </>
            ) : (
              <div className="transition-all duration-300" data-oid="o-8og:y">
                <div
                  className={`flex justify-between items-center mb-8 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
                  data-oid="nba3ofb"
                >
                  <h2
                    className="text-3xl font-bold text-gray-900"
                    data-oid="imaxnnn"
                  >
                    {t("contact.form.title")}
                  </h2>
                  <button
                    onClick={() => setShowContact(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    data-oid="1bcxl9z"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
                <Contact showOfficeInfo={false} data-oid="e_7ymg3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
