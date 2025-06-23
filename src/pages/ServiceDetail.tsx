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
      <div
        className="min-h-screen flex items-center justify-center"
        data-oid="upxa5oq"
      >
        <div className="text-xl text-gray-600" data-oid=":gat5hz">
          {t("ui.loading.service")}
        </div>
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
    <div className="min-h-screen bg-gray-50" data-oid="5bae_ti">
      {/* Enhanced Header Section with animations */}
      <div
        className={`relative overflow-hidden ${styles.headerBackground}`}
        data-oid="7jzo5y."
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90"
          data-oid="t-:ntjo"
        />

        {/* Animated light effects */}
        <div
          className={`${styles.light1} bg-brand-gold/20 w-96 h-96 -top-24 -left-24`}
          data-oid="ovwfvn4"
        />

        <div
          className={`${styles.light2} bg-brand-bronze/20 w-96 h-96 -bottom-24 -right-24`}
          data-oid="xj_nq6_"
        />

        <div
          className={`${styles.light3} bg-white/10 w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          data-oid="etwph34"
        />

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
          data-oid=":6ay93t"
        >
          <div className="text-center" data-oid="ueuv-o.">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${styles.gradientText}`}
              data-oid="4t:sp4x"
            >
              {serviceDetails.title}
            </h1>
            <p
              className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto ${styles.subtleText}`}
              data-oid="svo9.ob"
            >
              {serviceDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Back to Services button moved below banner */}
      <div className="bg-white border-b" data-oid="m9nwl91">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          data-oid="3ag-et2"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-brand-gold transition-colors group"
            data-oid="lcr8fcb"
          >
            <ArrowLeft
              className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              data-oid=".8fh66."
            />

            <span className="font-medium" data-oid="pn2-kot">
              {t("serviceDetail.backToServices")}
            </span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        data-oid="7:l26nf"
      >
        <div
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          data-oid="y:00xv_"
        >
          {/* Full Description */}
          <p className="text-xl text-gray-600 mb-12" data-oid="_5:wlxb">
            {serviceDetails.fullDescription}
          </p>

          {/* Overview Section */}
          {serviceDetails.sections?.overview && (
            <div className="mb-16" data-oid="k_.sx.5">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                data-oid="i9ff:cq"
              >
                {serviceDetails.sections.overview.title}
              </h2>

              {/* Highlights */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
                data-oid="6l6n8wm"
              >
                {Object.entries(
                  serviceDetails.sections.overview.highlights,
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 rounded-xl p-6 text-center"
                    data-oid="gcucdez"
                  >
                    <div
                      className="text-3xl font-bold text-brand-gold mb-2"
                      data-oid="y_xiwz3"
                    >
                      {value.number}
                    </div>
                    <div className="text-gray-600" data-oid="gv5o7vw">
                      {value.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Content List */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="90r37_b"
              >
                {serviceDetails.sections.overview.content.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    data-oid="v.80o-0"
                  >
                    <CheckCircle2
                      className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-1"
                      data-oid="a0td.2l"
                    />

                    <span className="text-gray-600" data-oid="ozr9tnj">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Methodology/Approach Section */}
          {serviceDetails.sections?.methodology && (
            <div className="mb-16" data-oid="_g2o145">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                data-oid="ohxwbbj"
              >
                {serviceDetails.sections.methodology.title}
              </h2>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                data-oid="720yw4c"
              >
                {serviceDetails.sections.methodology.steps.map(
                  (step, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-6"
                      data-oid="d82cvhy"
                    >
                      <div
                        className="flex items-center mb-4"
                        data-oid="_wn1nbj"
                      >
                        <div
                          className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold mr-4"
                          data-oid="0n8t8on"
                        >
                          {index + 1}
                        </div>
                        <h3
                          className="text-xl font-semibold text-gray-900"
                          data-oid="f5:rckv"
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600" data-oid="1p-aw1k">
                        {step.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Solutions or Documentation Section */}
          {(serviceDetails.sections?.solutions ||
            serviceDetails.sections?.documentation) && (
            <div className="mb-16" data-oid="utx-q71">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                data-oid="u8ol.d4"
              >
                {serviceDetails.sections?.solutions?.title ||
                  serviceDetails.sections?.documentation?.title}
              </h2>

              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                data-oid="69b65jp"
              >
                {(
                  serviceDetails.sections?.solutions?.categories ||
                  serviceDetails.sections?.documentation?.categories
                )?.map((category, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6"
                    data-oid="skafu_."
                  >
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-4"
                      data-oid="s1:l0t-"
                    >
                      {category.title}
                    </h3>
                    <ul className="space-y-3" data-oid="fhos635">
                      {(category.features || category.items)?.map(
                        (item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start"
                            data-oid="pq40l5n"
                          >
                            <CheckCircle2
                              className="h-5 w-5 text-brand-gold mr-3 flex-shrink-0 mt-1"
                              data-oid="-ezy6fy"
                            />

                            <span className="text-gray-600" data-oid="ad-widg">
                              {item}
                            </span>
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
            <div className="mb-16" data-oid="y9t1gm0">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                data-oid="1gfzft7"
              >
                {t("serviceDetail.sections.benefits")}
              </h2>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="2wppie1"
              >
                {serviceDetails.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    data-oid="3xgsibd"
                  >
                    <CheckCircle2
                      className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-1"
                      data-oid=":3fbe26"
                    />

                    <span className="text-gray-600" data-oid="l1yrnfq">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process Section */}
          {serviceDetails.process && (
            <div className="mb-16" data-oid="4-bla.t">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                data-oid=".dlk19-"
              >
                {t("serviceDetail.sections.process")}
              </h2>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-oid="6qaiz70"
              >
                {serviceDetails.process.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                    data-oid="tj7szrc"
                  >
                    <div
                      className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0"
                      data-oid="v1kidf9"
                    >
                      {index + 1}
                    </div>
                    <span className="text-gray-600" data-oid="wgdf968">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Industries Section */}
          {serviceDetails.industries && (
            <div className="mb-16" data-oid="49x_-k.">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                data-oid="wy67:fz"
              >
                {t("serviceDetail.sections.industries")}
              </h2>

              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                data-oid=":nais7s"
              >
                {serviceDetails.industries.map((industry, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                    data-oid="qscnc.e"
                  >
                    <span className="text-gray-700" data-oid="og-hj8l">
                      {industry}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modified CTA Section */}
          <div
            className="text-center bg-gray-50 rounded-2xl p-8 mt-16"
            data-oid="_zy1gx_"
          >
            {!showContact ? (
              <>
                <h2
                  className="text-3xl font-bold text-gray-900 mb-4"
                  data-oid="o41bk_1"
                >
                  {t("serviceDetail.cta.title")}
                </h2>
                <p
                  className="text-gray-600 mb-8 max-w-2xl mx-auto"
                  data-oid=":ibz2on"
                >
                  {t("serviceDetail.cta.description")}
                </p>
                <button
                  onClick={() => setShowContact(true)}
                  className="inline-block bg-gradient-to-r from-brand-gold to-brand-bronze text-white px-8 py-4 rounded-lg hover:from-brand-bronze hover:to-brand-gold transition-all duration-300"
                  data-oid="31h.rnh"
                >
                  {t("serviceDetail.cta.button")}
                </button>
              </>
            ) : (
              <div className="transition-all duration-300" data-oid="54fssgp">
                <div
                  className={`flex justify-between items-center mb-8 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
                  data-oid=".us5gnx"
                >
                  <h2
                    className="text-3xl font-bold text-gray-900"
                    data-oid="pfmk-eq"
                  >
                    {t("contact.form.title")}
                  </h2>
                  <button
                    onClick={() => setShowContact(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    data-oid="5q3m:-b"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
                <Contact showOfficeInfo={false} data-oid="tdwq6ou" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
