import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Truck, 
  HandshakeIcon, 
  Building2, 
  FileText, 
  PackageOpen, 
  ArrowRight // Added for the button
} from 'lucide-react';

const iconMap = {
  Search,
  Truck,
  HandshakeIcon,
  Building2,
  FileText,
  PackageOpen
};

const CoreServices = () => {
  const { t, i18n } = useTranslation(); // Added i18n for RTL check
  
  const services = t('hero.slides', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    link: string;
    ctaText: string;
  }>;

  if (!Array.isArray(services)) {
    return null;
  }

  // Assuming the first 3 slides correspond to the core services shown here
  const coreServices = services.slice(0, 3);

  return (
    <section id="services" className="py-20 bg-gray-50"> {/* Added subtle background */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          {/* Apply heading font */}
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          {/* Apply sans font */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const iconKeys = ['Search', 'Truck', 'HandshakeIcon'] as const;
            const ServiceIcon = iconMap[iconKeys[index]];
            
            const serviceId = service.link.split('/').pop();
            
            return (
              <Link
                key={serviceId}
                to={`/services/${serviceId}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1" /* Enhanced shadow & hover */
              >
                <div className="p-8"> {/* Increased padding */}
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-brand-bronze rounded-lg flex items-center justify-center mb-6 shadow-md"> {/* Gradient direction & shadow */}
                    <ServiceIcon className="h-8 w-8 text-white" />
                  </div>

                  {/* Apply heading font */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  {/* Apply sans font */}
                  <p className="text-gray-600 font-sans text-base"> {/* Explicit font size */}
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-16"> {/* Increased margin */}
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-brand-gold to-brand-bronze hover:from-brand-bronze hover:to-brand-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group" /* Added shadow & group */
          >
            {t('services.viewAll')}
            <ArrowRight 
              className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${i18n.language === 'ar' ? 'mr-2 -scale-x-100 group-hover:-translate-x-1' : 'ml-2'}`} /* RTL support & animation */
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;

