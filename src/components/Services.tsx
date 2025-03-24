import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Truck, 
  HandshakeIcon, 
  Building2, 
  FileText, 
  PackageOpen 
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

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-brand-gold to-brand-bronze rounded-lg flex items-center justify-center mb-6">
                    <ServiceIcon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-brand-gold to-brand-bronze hover:from-brand-bronze hover:to-brand-gold transition-all duration-300 transform hover:scale-105"
          >
            {t('services.viewAll')}
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
