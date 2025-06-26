import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Contact from "../components/Contact";
import { useState } from "react";
import styles from "./ServiceDetail.module.css";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { t, ready, i18n } = useTranslation();
  const [showContact, setShowContact] = useState(false);

  const serviceKeyMap: Record<string, string> = {
    "strategic-sourcing": "strategic-sourcing",
    "logistics-optimization": "logistics-optimization",
    "price-negotiation": "price-negotiation",
    "b2b-services": "b2b-services",
    "export-documentation": "export-documentation",
    "import-services": "import-services",
  };

  const localeKey = serviceKeyMap[serviceId || ""];

  console.log("ServiceId:", serviceId);
  console.log("LocaleKey:", localeKey);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">{t("ui.loading.service")}</div>
      </div>
    );
  }

  const serviceDetails = t(`services.items.${localeKey}`, {
    returnObjects: true,
  }) as {
    title: string;
    description: string;
    fullDescription: string;
    sections?: {
      overview?: {
        title: string;
        content: string[];
        highlights: Record<string, { number: string; text: string }>;
      };
      methodology?: {
        title: string;
        steps: Array<{ title: string; description: string }>;
      };
      solutions?: {
        title: string;
        categories: Array<{ title: string; features: string[] }>;
      };
      documentation?: {
        title: string;
        categories: Array<{ title: string; items: string[] }>;
      };
    };
    benefits?: string[];
    features?: string[];
    industries?: string[];
    process?: string[];
  };

  console.log("Service Details:", serviceDetails);

  if (!serviceDetails || !localeKey) {
    console.log("Service not found, redirecting to 404");
    navigate("/404");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header Section with animations */}
      <div className={`relative overflow-hidden ${styles.headerBackground}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90" />

        {/* Animated light effects */}
        <div
          className={`${styles.light1} bg-brand-gold/20 w-96 h-96 -top-24 -left-24`}
        />

        <div
          className={`${styles.light2} bg-brand-bronze/20 w-96 h-96 -bottom-24 -right-24`}
        />

        <div
          className={`${styles.light3} bg-white/10 w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${styles.gradientText}`}
            >
              {serviceDetails.title}
            </h1>
            <p
              className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto ${styles.subtleText}`}
            >
              {serviceDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Back to Services button moved below banner */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-brand-gold transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />

            <span className="font-medium">
              {t("serviceDetail.backToServices")}
            </span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Full Description */}
          <p className="text-xl text-gray-600 mb-12">
            {serviceDetails.fullDescription}
          </p>

          {/* Overview Section */}
          {serviceDetails.sections?.overview && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {serviceDetails.sections.overview.title}
              </h2>

              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {Object.entries(
                  serviceDetails.sections.overview.highlights,
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-brand-gold mb-2">
                      {value.number}
                    </div>
                    <div className="text-gray-600">{value.text}</div>
                  </div>
                ))}
              </div>

              {/* Content List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceDetails.sections.overview.content.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-1" />

                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Methodology/Approach Section */}
          {serviceDetails.sections?.methodology && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {serviceDetails.sections.methodology.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviceDetails.sections.methodology.steps.map(
                  (step, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Solutions or Documentation Section */}
          {(serviceDetails.sections?.solutions ||
            serviceDetails.sections?.documentation) && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {serviceDetails.sections?.solutions?.title ||
                  serviceDetails.sections?.documentation?.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(
                  serviceDetails.sections?.solutions?.categories ||
                  serviceDetails.sections?.documentation?.categories
                )?.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {category.title}
                    </h3>
                    <ul className="space-y-3">
                      {(category.features || category.items)?.map(
                        (item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-brand-gold mr-3 flex-shrink-0 mt-1" />

                            <span className="text-gray-600">{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {serviceDetails.benefits && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t("serviceDetail.sections.benefits")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceDetails.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-1" />

                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process Section */}
          {serviceDetails.process && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t("serviceDetail.sections.process")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceDetails.process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Industries Section */}
          {serviceDetails.industries && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t("serviceDetail.sections.industries")}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {serviceDetails.industries.map((industry, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                  >
                    <span className="text-gray-700">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modified CTA Section */}
          <div className="text-center bg-gray-50 rounded-2xl p-8 mt-16">
            {!showContact ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t("serviceDetail.cta.title")}
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  {t("serviceDetail.cta.description")}
                </p>
                <button
                  onClick={() => setShowContact(true)}
                  className="inline-block bg-gradient-to-r from-brand-gold to-brand-bronze text-white px-8 py-4 rounded-lg hover:from-brand-bronze hover:to-brand-gold transition-all duration-300"
                >
                  {t("serviceDetail.cta.button")}
                </button>
              </>
            ) : (
              <div className="transition-all duration-300">
                <div
                  className={`flex justify-between items-center mb-8 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <h2 className="text-3xl font-bold text-gray-900">
                    {t("contact.form.title")}
                  </h2>
                  <button
                    onClick={() => setShowContact(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
                <Contact showOfficeInfo={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
