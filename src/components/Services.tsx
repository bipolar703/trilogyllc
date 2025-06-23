import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  Shield
} from 'lucide-react';
import styles from './Services.module.css';

const iconMap = {
  Search,
  Truck,
  HandshakeIcon,
  Building2,
  FileText,
  PackageOpen
};

const CoreServices = () => {
  const { t } = useTranslation();
  
  const services = t('hero.slides', { returnObjects: true }) as Array<{
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
    { icon: <TrendingUp className="w-6 h-6" />, value: '500+', label: 'Global Clients' },
    { icon: <Shield className="w-6 h-6" />, value: '15+', label: 'Years Experience' },
    { icon: <Sparkles className="w-6 h-6" />, value: '30+', label: 'Countries Served' }
  ];

  return (
    <section id="services" className={styles.servicesSection}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.floatingElements}>
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className={styles.floatingElement}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${20 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className={`${styles.headerSection} text-center mb-20`}>
          <div className={styles.premiumBadge}>
            <Sparkles className="w-4 h-4" />
            <span>PREMIUM SERVICES</span>
          </div>
          
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleGradient}>
              {t('services.title')}
            </span>
          </h2>
          
          <p className={styles.sectionSubtitle}>
            {t('services.subtitle')}
          </p>

          {/* Stats Bar */}
          <div className={styles.statsContainer}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statIcon}>
                  {stat.icon}
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {coreServices.map((service, index) => {
            const iconKeys = ['Search', 'Truck', 'HandshakeIcon'] as const;
            const ServiceIcon = iconMap[iconKeys[index]];
            const serviceId = service.link.split('/').pop();
            
            return (
              <Link
                key={serviceId}
                to={`/services/${serviceId}`}
                className={`${styles.serviceCard} stagger-item`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={styles.cardBackground} />
                <div className={styles.cardContent}>
                  <div className={styles.iconContainer}>
                    <div className={styles.iconBackground} />
                    <ServiceIcon className={styles.serviceIcon} />
                    <div className={styles.iconGlow} />
                  </div>

                  <div className={styles.serviceContent}>
                    <h3 className={styles.serviceTitle}>
                      {service.title}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.learnMore}>Learn More</span>
                    <ArrowRight className={styles.arrowIcon} />
                  </div>
                </div>

                {/* Hover Effects */}
                <div className={styles.hoverOverlay} />
                <div className={styles.shimmerEffect} />
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>
              Ready to Transform Your Trade Operations?
            </h3>
            <p className={styles.ctaDescription}>
              Discover all our premium services and find the perfect solution for your business needs
            </p>
            
            <div className={styles.ctaButtons}>
              <Link to="/services" className={`${styles.primaryCta} btn-premium`}>
                <span>Explore All Services</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link to="/#contact" className={`${styles.secondaryCta} btn-glass`}>
                <span>Get Free Consultation</span>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.ctaDecorations}>
            <div className={styles.decorativeCircle1} />
            <div className={styles.decorativeCircle2} />
            <div className={styles.decorativeCircle3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;