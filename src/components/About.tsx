import {
  CheckCircle2,
  Award,
  Users,
  Globe,
  Shield,
  TrendingUp,
  Target,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import GlowCard from "./GlowCard";
import styles from "./About.module.css";

const About = () => {
  const { t } = useTranslation();

  const cards = ["mission", "experience", "values", "commitment"];

  const achievements = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "500+",
      label: "Satisfied Clients",
      color: "blue",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "30+",
      label: "Countries Served",
      color: "green",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "15+",
      label: "Years Experience",
      color: "purple",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "98%",
      label: "Success Rate",
      color: "orange",
    },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: t("about.features.globalReach.title"),
      description: t("about.features.globalReach.description"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("about.features.expertTeam.title"),
      description: t("about.features.expertTeam.description"),
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: t("about.features.customSolutions.title"),
      description: t("about.features.customSolutions.description"),
    },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientMesh1} />
        <div className={styles.gradientMesh2} />
        <div className={styles.gradientMesh3} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className={`${styles.headerSection} text-center mb-20`}>
          <div className={styles.premiumBadge}>
            <Shield className="w-4 h-4" />
            <span>TRUSTED PARTNER</span>
          </div>

          <h2 className={styles.sectionTitle}>
            <span className={styles.titleGradient}>{t("about.title")}</span>
          </h2>

          <p className={styles.sectionSubtitle}>{t("about.subtitle")}</p>
        </div>

        {/* Achievements Section */}
        <div className={styles.achievementsSection}>
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`${styles.achievementCard} stagger-item`}
              >
                <div
                  className={`${styles.achievementIcon} ${styles[`icon${achievement.color}`]}`}
                >
                  {achievement.icon}
                </div>
                <div className={styles.achievementContent}>
                  <span className={styles.achievementValue}>
                    {achievement.value}
                  </span>
                  <span className={styles.achievementLabel}>
                    {achievement.label}
                  </span>
                </div>
                <div className={styles.achievementGlow} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentGrid}>
            {/* Left Column - Text Content */}
            <div className={styles.textContent}>
              <div className={styles.contentCard}>
                <h3 className={styles.contentTitle}>
                  {t("about.whoWeAre.title")}
                </h3>
                <p className={styles.contentDescription}>
                  {t("about.whoWeAre.description")}
                </p>

                <div className={styles.featuresList}>
                  {features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <div className={styles.featureIcon}>{feature.icon}</div>
                      <div className={styles.featureContent}>
                        <h4 className={styles.featureTitle}>{feature.title}</h4>
                        <p className={styles.featureDescription}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className={styles.ctaContainer}>
                  <a
                    href="#contact"
                    className={`${styles.ctaButton} btn-premium`}
                  >
                    <span>Start Your Journey</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Cards Grid */}
            <div className={styles.cardsGrid}>
              {cards.map((card, index) => (
                <div
                  key={card}
                  className={`${styles.cardWrapper} stagger-item`}
                >
                  <GlowCard
                    title={t(`about.cards.${card}.title`)}
                    description={t(`about.cards.${card}.description`)}
                    colorIndex={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Company Values */}
        <div className={styles.valuesSection}>
          <div className={styles.valuesContainer}>
            <h3 className={styles.valuesTitle}>Why Choose Trilogy Trading?</h3>

            <div className={styles.valuesGrid}>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className={styles.valueTitle}>Trusted & Reliable</h4>
                <p className={styles.valueDescription}>
                  ISO 9001:2015 certified with FIATA accreditation
                </p>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className={styles.valueTitle}>Global Network</h4>
                <p className={styles.valueDescription}>
                  Strategic partnerships across 30+ countries
                </p>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className={styles.valueTitle}>Proven Results</h4>
                <p className={styles.valueDescription}>
                  98% success rate with measurable ROI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
