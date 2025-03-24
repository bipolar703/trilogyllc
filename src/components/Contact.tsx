import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';


const ContactInfo = ({ t, i18n }: { t: any, i18n: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className={`text-2xl font-bold text-gray-900 mb-8 ${
        i18n.language === 'ar' ? 'text-right' : 'text-left'
      }`}>
        {t('contact.office.title')}
      </h3>
      
      <div className="space-y-8">
        {/* Address */}
        <div className={`group flex items-start ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} gap-4`}>
          <div className="flex-shrink-0">
            <MapPin className={`w-6 h-6 text-brand-gold transform ${
              i18n.language === 'ar' ? 'scale-x-[-1]' : ''
            }`} />
          </div>
          <div className={`flex-grow ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h4 className="font-medium text-gray-900 mb-1">
              {t('contact.office.address.name')}
            </h4>
            <address className="not-italic text-gray-600 space-y-1">
              <p>{t('contact.office.address.street')}</p>
              <p>{t('contact.office.address.city')}</p>
              <p>{t('contact.office.address.country')}</p>
            </address>
          </div>
        </div>

        {/* Phone */}
        <a 
          href={`tel:${t('contact.office.address.phone')}`}
          className={`group flex items-start hover:text-brand-gold transition-colors ${
            i18n.language === 'ar' ? 'flex-row-reverse' : ''} gap-4`}
        >
          <div className="flex-shrink-0">
            <Phone className={`w-6 h-6 text-brand-gold transform ${
              i18n.language === 'ar' ? 'scale-x-[-1]' : ''
            }`} />
          </div>
          <span className="text-gray-600 group-hover:text-brand-gold transition-colors" dir="ltr">
            {t('contact.office.address.phone')}
          </span>
        </a>

        {/* Email */}
        <a 
          href={`mailto:${t('contact.office.address.email')}`}
          className={`group flex items-start hover:text-brand-gold transition-colors ${
            i18n.language === 'ar' ? 'flex-row-reverse' : ''} gap-4`}
        >
          <div className="flex-shrink-0">
            <Mail className={`w-6 h-6 text-brand-gold transform ${
              i18n.language === 'ar' ? 'scale-x-[-1]' : ''
            }`} />
          </div>
          <span className="text-gray-600 group-hover:text-brand-gold transition-colors" dir="ltr">
            {t('contact.office.address.email')}
          </span>
        </a>

        {/* Working Hours */}
        <div className={`group flex items-start ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} gap-4`}>
          <div className="flex-shrink-0">
            <Clock className={`w-6 h-6 text-brand-gold transform ${
              i18n.language === 'ar' ? 'scale-x-[-1]' : ''
            }`} />
          </div>
          <div className={`${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h4 className="font-medium text-gray-900 mb-1">
              {t('contact.office.address.hours.title')}
            </h4>
            <div className="text-gray-600 space-y-1">
              <p>{t('contact.office.address.hours.weekdays')}</p>
              <p>{t('contact.office.address.hours.weekend')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const Contact = ({ showOfficeInfo = true }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/submit-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Server error');
      }

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: t('contact.form.submitSuccess'),
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        throw new Error(data.message || t('contact.form.submitError'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : t('contact.form.submitError'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className={showOfficeInfo ? "py-20 bg-gray-50" : ""}>
      <div className={`${showOfficeInfo ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : ""}`}>
        {showOfficeInfo && (
          <div className={`mb-16 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className={`text-lg text-gray-600 max-w-2xl ${i18n.language === 'ar' ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
              {t('contact.description')}
            </p>
          </div>
        )}

        <div className={`${showOfficeInfo ? "grid grid-cols-1 lg:grid-cols-3 gap-8" : ""}`}>
          {/* Contact Form */}
          <div className={`${showOfficeInfo ? "lg:col-span-2" : ""} bg-white rounded-xl shadow-lg p-8`}>
            {showOfficeInfo && (
              <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('contact.form.title')}
              </h3>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'}`}>
                  <label 
                    htmlFor="name" 
                    className={`block text-sm font-medium text-gray-700 mb-1 w-full ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t('contact.form.name.label')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                    placeholder={t('contact.form.name.placeholder')}
                  />
                </div>

                <div className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'}`}>
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium text-gray-700 mb-1 w-full ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t('contact.form.email.label')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                    placeholder={t('contact.form.email.placeholder')}
                  />
                </div>

                <div className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'}`}>
                  <label 
                    htmlFor="company" 
                    className={`block text-sm font-medium text-gray-700 mb-1 w-full ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t('contact.form.company.label')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                    placeholder={t('contact.form.company.placeholder')}
                  />
                </div>

                <div className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'}`}>
                  <label 
                    htmlFor="phone" 
                    className={`block text-sm font-medium text-gray-700 mb-1 w-full ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t('contact.form.phone.label')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold ${
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    }`}
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </div>
              </div>

              <div className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'}`}>
                <label 
                  htmlFor="message" 
                  className={`block text-sm font-medium text-gray-700 mb-1 w-full ${
                    i18n.language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                >
                  {t('contact.form.message.label')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold ${
                    i18n.language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  placeholder={t('contact.form.message.placeholder')}
                />
              </div>

              {submitStatus.type && (
                <div
                  className={`rounded-md p-4 ${
                    submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-gold to-brand-bronze text-white py-3 px-6 rounded-lg hover:from-brand-bronze hover:to-brand-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact.form.submitting')}
                  </span>
                ) : (
                  t('contact.form.submit')
                )}
              </button>
            </form>
          </div>

          {/* Contact Information Card */}
          {showOfficeInfo && (
            <ContactInfo t={t} i18n={i18n} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
