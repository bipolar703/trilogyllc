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
      icon: <Users className="w-8 h-8" data-oid="1zu.fbj" />,
      value: "500+",
      label: "Satisfied Clients",
      color: "blue",
    },
    {
      icon: <Globe className="w-8 h-8" data-oid="ohl_22u" />,
      value: "30+",
      label: "Countries Served",
      color: "green",
    },
    {
      icon: <Award className="w-8 h-8" data-oid="96csrkq" />,
      value: "15+",
      label: "Years Experience",
      color: "purple",
    },
    {
      icon: <TrendingUp className="w-8 h-8" data-oid="nacbzuk" />,
      value: "98%",
      label: "Success Rate",
      color: "orange",
    },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6" data-oid="p.nese9" />,
      title: t("about.features.globalReach.title"),
      description: t("about.features.globalReach.description"),
    },
    {
      icon: <Users className="w-6 h-6" data-oid="gga-ztk" />,
      title: t("about.features.expertTeam.title"),
      description: t("about.features.expertTeam.description"),
    },
    {
      icon: <Target className="w-6 h-6" data-oid=":6t.l55" />,
      title: t("about.features.customSolutions.title"),
      description: t("about.features.customSolutions.description"),
    },
  ];

  return (
    <section id="about" className={styles.aboutSection} data-oid="uc3ujre">
      {/* Background Elements */}
      <div className={styles.backgroundElements} data-oid="mbfrdcm">
        <div className={styles.gradientMesh1} data-oid="r68ptbu" />
        <div className={styles.gradientMesh2} data-oid="y2-ybtk" />
        <div className={styles.gradientMesh3} data-oid="mnpv0yc" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        data-oid="hjwhb4f"
      >
        {/* Header Section */}
        <div
          className={`${styles.headerSection} text-center mb-20`}
          data-oid="lgsgw6z"
        >
          <div className={styles.premiumBadge} data-oid="bu62q4y">
            <Shield className="w-4 h-4" data-oid="89pqky0" />
            <span data-oid="_yijqi4">TRUSTED PARTNER</span>
          </div>

          <h2 className={styles.sectionTitle} data-oid="q3gn2s-">
            <span className={styles.titleGradient} data-oid="tsnskvf">
              {t("about.title")}
            </span>
          </h2>

          <p className={styles.sectionSubtitle} data-oid="yop7da5">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Achievements Section */}
        <div className={styles.achievementsSection} data-oid="3ynhv_:">
          <div className={styles.achievementsGrid} data-oid="dj1d963">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`${styles.achievementCard} stagger-item`}
                data-oid="wincb8d"
              >
                <div
                  className={`${styles.achievementIcon} ${styles[`icon${achievement.color}`]}`}
                  data-oid="zkcf22k"
                >
                  {achievement.icon}
                </div>
                <div className={styles.achievementContent} data-oid="x.715fe">
                  <span className={styles.achievementValue} data-oid="sup34q5">
                    {achievement.value}
                  </span>
                  <span className={styles.achievementLabel} data-oid="lb18nx.">
                    {achievement.label}
                  </span>
                </div>
                <div className={styles.achievementGlow} data-oid="sgjw129" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent} data-oid="kf3.:xp">
          <div className={styles.contentGrid} data-oid="a95kmlm">
            {/* Left Column - Text Content */}
            <div className={styles.textContent} data-oid="v.2uvr1">
              <div className={styles.contentCard} data-oid="alkgdg-">
                <h3 className={styles.contentTitle} data-oid="oc.0wkd">
                  {t("about.whoWeAre.title")}
                </h3>
                <p className={styles.contentDescription} data-oid="vp1nwvf">
                  {t("about.whoWeAre.description")}
                </p>

                <div className={styles.featuresList} data-oid="afahge4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={styles.featureItem}
                      data-oid="tv_wfg1"
                    >
                      <div className={styles.featureIcon} data-oid="5jbb4ft">
                        {feature.icon}
                      </div>
                      <div className={styles.featureContent} data-oid="z2m.m:7">
                        <h4 className={styles.featureTitle} data-oid="rsh8phv">
                          {feature.title}
                        </h4>
                        <p
                          className={styles.featureDescription}
                          data-oid="v-:loje"
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className={styles.ctaContainer} data-oid="7r5_:ps">
                  <a
                    href="#contact"
                    className={`${styles.ctaButton} btn-premium`}
                    data-oid="a_qo-jn"
                  >
                    <span data-oid=":mr9zy6">Start Your Journey</span>
                    <CheckCircle2 className="w-5 h-5" data-oid="z6p9jf8" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Cards Grid */}
            <div className={styles.cardsGrid} data-oid="xn1s520">
              {cards.map((card, index) => (
                <div
                  key={card}
                  className={`${styles.cardWrapper} stagger-item`}
                  data-oid="5uyqhh."
                >
                  <GlowCard
                    title={t(`about.cards.${card}.title`)}
                    description={t(`about.cards.${card}.description`)}
                    colorIndex={index}
                    data-oid="iu61g08"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Company Values */}
        <div className={styles.valuesSection} data-oid="eju:pfz">
          <div className={styles.valuesContainer} data-oid="8hqlcca">
            <h3 className={styles.valuesTitle} data-oid="06je49w">
              Why Choose Trilogy Trading?
            </h3>

            <div className={styles.valuesGrid} data-oid="oluruos">
              <div className={styles.valueItem} data-oid="me2cyyk">
                <div className={styles.valueIcon} data-oid="0gtyd.r">
                  <Shield className="w-6 h-6" data-oid="zez:9px" />
                </div>
                <h4 className={styles.valueTitle} data-oid="v5uw48h">
                  Trusted & Reliable
                </h4>
                <p className={styles.valueDescription} data-oid="ws18_ua">
                  ISO 9001:2015 certified with FIATA accreditation
                </p>
              </div>

              <div className={styles.valueItem} data-oid="8rri_hd">
                <div className={styles.valueIcon} data-oid="luwl3uj">
                  <Globe className="w-6 h-6" data-oid="hxj-.3r" />
                </div>
                <h4 className={styles.valueTitle} data-oid="ar:iit4">
                  Global Network
                </h4>
                <p className={styles.valueDescription} data-oid="416gk:_">
                  Strategic partnerships across 30+ countries
                </p>
              </div>

              <div className={styles.valueItem} data-oid="rtgfc97">
                <div className={styles.valueIcon} data-oid="1m78vjd">
                  <TrendingUp className="w-6 h-6" data-oid="owim2io" />
                </div>
                <h4 className={styles.valueTitle} data-oid="y6hj2gr">
                  Proven Results
                </h4>
                <p className={styles.valueDescription} data-oid="576553n">
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
