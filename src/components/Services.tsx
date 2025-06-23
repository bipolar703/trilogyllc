import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  Truck,
  HandshakeIcon,
  Building2,
  FileText,
  PackageOpen,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";
import styles from "./Services.module.css";

const iconMap = {
  Search,
  Truck,
  HandshakeIcon,
  Building2,
  FileText,
  PackageOpen,
};

const CoreServices = () => {
  const { t } = useTranslation();

  const services = t("hero.slides", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    link: string;
    ctaText: string;
  }>;

  if (!Array.isArray(services)) {
    return null;
  }

  const coreServices = services.slice(0, 3);

  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" data-oid="zc5cnsw" />,
      value: "500+",
      label: "Global Clients",
    },
    {
      icon: <Shield className="w-6 h-6" data-oid="6q5rbfd" />,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: <Sparkles className="w-6 h-6" data-oid=".ur:v.i" />,
      value: "30+",
      label: "Countries Served",
    },
  ];

  return (
    <section
      id="services"
      className={styles.servicesSection}
      data-oid="ao96etl"
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements} data-oid="129zbzm">
        <div className={styles.gradientOrb1} data-oid="sv9v_22" />
        <div className={styles.gradientOrb2} data-oid="lmmddtf" />
        <div className={styles.floatingElements} data-oid="vj8sdi0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={styles.floatingElement}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${20 + Math.random() * 10}s`,
              }}
              data-oid="6ktx0xh"
            />
          ))}
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        data-oid="lxy2eu3"
      >
        {/* Header Section */}
        <div
          className={`${styles.headerSection} text-center mb-20`}
          data-oid="4ia_wtf"
        >
          <div className={styles.premiumBadge} data-oid="wdku.u7">
            <Sparkles className="w-4 h-4" data-oid="cucw:v0" />
            <span data-oid="adikw2y">PREMIUM SERVICES</span>
          </div>

          <h2 className={styles.sectionTitle} data-oid="ev-dph_">
            <span className={styles.titleGradient} data-oid="yex:ksn">
              {t("services.title")}
            </span>
          </h2>

          <p className={styles.sectionSubtitle} data-oid="tuc6aji">
            {t("services.subtitle")}
          </p>

          {/* Stats Bar */}
          <div className={styles.statsContainer} data-oid="6b8u1p2">
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem} data-oid="ol0j702">
                <div className={styles.statIcon} data-oid="03f8c0m">
                  {stat.icon}
                </div>
                <div className={styles.statContent} data-oid="7wn.nne">
                  <span className={styles.statValue} data-oid="1mugnmt">
                    {stat.value}
                  </span>
                  <span className={styles.statLabel} data-oid="s8cd4_k">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className={styles.servicesGrid} data-oid="z05_xqy">
          {coreServices.map((service, index) => {
            const iconKeys = ["Search", "Truck", "HandshakeIcon"] as const;
            const ServiceIcon = iconMap[iconKeys[index]];
            const serviceId = service.link.split("/").pop();

            return (
              <Link
                key={serviceId}
                to={`/services/${serviceId}`}
                className={`${styles.serviceCard} stagger-item`}
                style={{ animationDelay: `${index * 150}ms` }}
                data-oid="ydqx49o"
              >
                <div className={styles.cardBackground} data-oid="6dj6pno" />
                <div className={styles.cardContent} data-oid="dnskx0:">
                  <div className={styles.iconContainer} data-oid="6_nf-hp">
                    <div className={styles.iconBackground} data-oid="ijs3fyc" />
                    <ServiceIcon
                      className={styles.serviceIcon}
                      data-oid="pe06g2w"
                    />

                    <div className={styles.iconGlow} data-oid="-9l8nx9" />
                  </div>

                  <div className={styles.serviceContent} data-oid="jqcuki_">
                    <h3 className={styles.serviceTitle} data-oid="32huik7">
                      {service.title}
                    </h3>
                    <p className={styles.serviceDescription} data-oid=":biva-6">
                      {service.description}
                    </p>
                  </div>

                  <div className={styles.cardFooter} data-oid="4v-cm.o">
                    <span className={styles.learnMore} data-oid="660x361">
                      Learn More
                    </span>
                    <ArrowRight
                      className={styles.arrowIcon}
                      data-oid="ck7:fek"
                    />
                  </div>
                </div>

                {/* Hover Effects */}
                <div className={styles.hoverOverlay} data-oid="ugyi7n3" />
                <div className={styles.shimmerEffect} data-oid="oi44:61" />
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection} data-oid="6m1o0u0">
          <div className={styles.ctaContent} data-oid="-zmob9l">
            <h3 className={styles.ctaTitle} data-oid="h9uyhd3">
              Ready to Transform Your Trade Operations?
            </h3>
            <p className={styles.ctaDescription} data-oid="6u7_9fq">
              Discover all our premium services and find the perfect solution
              for your business needs
            </p>

            <div className={styles.ctaButtons} data-oid=".d1vsk6">
              <Link
                to="/services"
                className={`${styles.primaryCta} btn-premium`}
                data-oid="2rtwnxn"
              >
                <span data-oid="7ji0v8l">Explore All Services</span>
                <ArrowRight className="w-5 h-5" data-oid="9j8pnki" />
              </Link>

              <Link
                to="/#contact"
                className={`${styles.secondaryCta} btn-glass`}
                data-oid="mvmg.4n"
              >
                <span data-oid="csntf7z">Get Free Consultation</span>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.ctaDecorations} data-oid="m2ps:ky">
            <div className={styles.decorativeCircle1} data-oid="dnhu98p" />
            <div className={styles.decorativeCircle2} data-oid="bqdwa9m" />
            <div className={styles.decorativeCircle3} data-oid="xbu4jss" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
