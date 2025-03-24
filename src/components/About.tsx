import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GlowCard from './GlowCard';

const About = () => {
  const { t } = useTranslation();

  const cards = [
    'mission',
    'experience',
    'values',
    'commitment'
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('about.whoWeAre.title')}
            </h3>
            <p className="text-gray-600 mb-8">
              {t('about.whoWeAre.description')}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('about.features.globalReach.title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('about.features.globalReach.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('about.features.expertTeam.title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('about.features.expertTeam.description')}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('about.features.customSolutions.title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('about.features.customSolutions.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <GlowCard
                key={card}
                title={t(`about.cards.${card}.title`)}
                description={t(`about.cards.${card}.description`)}
                colorIndex={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
