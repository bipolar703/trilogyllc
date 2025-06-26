import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Download, 
  CheckCircle, 
  Package, 
  Truck, 
  Shield, 
  Globe, 
  Award,
  BarChart3,
  Leaf,
  Zap,
  Target,
  Users,
  Mail,
  Phone,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import Contact from "../components/Contact";

const Urea46Page = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [showContact, setShowContact] = useState(false);

  const specifications = [
    { label: "Nitrogen Content (N)", value: "46% minimum", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Moisture Content", value: "0.5% maximum", icon: <Package className="w-5 h-5" /> },
    { label: "Biuret", value: "1.0% maximum", icon: <Shield className="w-5 h-5" /> },
    { label: "Particle Size", value: "2-4mm (90%)", icon: <Target className="w-5 h-5" /> },
    { label: "Physical Form", value: "Free flowing white granules", icon: <Leaf className="w-5 h-5" /> },
    { label: "Bulk Density", value: "0.76-0.86 g/cm³", icon: <Package className="w-5 h-5" /> },
    { label: "pH", value: "8.5-9.5", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Crushing Strength", value: "2.8-4.0 kg/granule", icon: <Shield className="w-5 h-5" /> }
  ];

  const applications = [
    { 
      name: "Wheat", 
      dosage: "120-200 kg/ha", 
      timing: "Pre-sowing and top dressing",
      icon: <Leaf className="w-6 h-6" />
    },
    { 
      name: "Corn/Maize", 
      dosage: "150-250 kg/ha", 
      timing: "Side dressing at V6-V8 stage",
      icon: <Leaf className="w-6 h-6" />
    },
    { 
      name: "Rice", 
      dosage: "100-180 kg/ha", 
      timing: "Basal + top dressing",
      icon: <Leaf className="w-6 h-6" />
    },
    { 
      name: "Cotton", 
      dosage: "80-150 kg/ha", 
      timing: "Pre-plant and side dress",
      icon: <Leaf className="w-6 h-6" />
    },
    { 
      name: "Vegetables", 
      dosage: "100-300 kg/ha", 
      timing: "Multiple applications",
      icon: <Leaf className="w-6 h-6" />
    },
    { 
      name: "Fruits", 
      dosage: "200-500 kg/ha", 
      timing: "Split applications",
      icon: <Leaf className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      title: "High Nitrogen Content",
      description: "46% nitrogen provides excellent crop nutrition and enhanced yield potential",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Fast Acting",
      description: "Quickly available nitrogen for immediate plant uptake and rapid growth response",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Versatile Application",
      description: "Suitable for all crops and soil types with flexible application methods",
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Cost Effective",
      description: "High concentration reduces transportation and application costs",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: "Easy Storage",
      description: "Free-flowing granules ensure easy handling and storage",
      icon: <Package className="w-8 h-8" />
    },
    {
      title: "Quality Assured",
      description: "ISO certified production with consistent quality and purity",
      icon: <Award className="w-8 h-8" />
    }
  ];

  const packagingOptions = [
    { type: "50 kg PP Bags", description: "Standard retail packaging", minOrder: "25 MT" },
    { type: "1000 kg Big Bags", description: "Bulk wholesale packaging", minOrder: "100 MT" },
    { type: "Bulk Vessel", description: "Direct bulk loading", minOrder: "5000 MT" },
    { type: "Custom Packaging", description: "Private label options available", minOrder: "500 MT" }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <Package className="w-5 h-5" /> },
    { id: "specifications", label: "Specifications", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "applications", label: "Applications", icon: <Leaf className="w-5 h-5" /> },
    { id: "packaging", label: "Packaging", icon: <Truck className="w-5 h-5" /> }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${i18n.language === "ar" ? "rtl" : "ltr"}`}>
      {/* Header Section */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">Urea 46%</h1>
                  <p className="text-xl text-green-100">Premium Nitrogen Fertilizer</p>
                </div>
              </div>
              
              <p className="text-lg text-green-100 mb-8 leading-relaxed">
                High-quality nitrogen fertilizer with 46% nitrogen content, designed for optimal crop nutrition 
                and enhanced agricultural productivity. Suitable for all crops and soil types.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowContact(true)}
                  className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Get Quote
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Brochure
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <div className="space-y-4">
                  {[
                    "46% Nitrogen Content",
                    "Free Flowing Granules", 
                    "Quick Release Formula",
                    "All Crop Compatibility",
                    "ISO 9001:2015 Certified",
                    "Bulk Supply Available"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">46%</div>
              <div className="text-gray-600">Nitrogen Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">99.5%</div>
              <div className="text-gray-600">Purity Level</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Supplied</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === "overview" && (
          <div className="space-y-16">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Why Choose Our Urea 46%?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Quality Assurance</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Our Urea 46% is manufactured under strict quality control standards, ensuring consistent 
                    purity and performance for your agricultural needs.
                  </p>
                  <div className="space-y-4">
                    {[
                      "ISO 9001:2015 Certified Production",
                      "Regular Third-Party Testing",
                      "Batch-to-Batch Consistency",
                      "International Quality Standards",
                      "Contamination-Free Processing"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                      <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <div className="font-bold text-gray-900">ISO Certified</div>
                      <div className="text-sm text-gray-600">Quality Management</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                      <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <div className="font-bold text-gray-900">Lab Tested</div>
                      <div className="text-sm text-gray-600">Every Batch</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Technical Specifications
            </h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {specifications.map((spec, index) => (
                  <div key={index} className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {spec.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{spec.label}</div>
                      <div className="text-green-600 font-medium">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standards Compliance */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Standards Compliance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-8 text-center shadow-lg">
                  <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">International Standards</h4>
                  <p className="text-gray-600">Meets FAO, IFA, and regional quality standards</p>
                </div>
                <div className="bg-white rounded-xl p-8 text-center shadow-lg">
                  <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Quality Certification</h4>
                  <p className="text-gray-600">ISO 9001:2015 certified manufacturing process</p>
                </div>
                <div className="bg-white rounded-xl p-8 text-center shadow-lg">
                  <Shield className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Safety Compliance</h4>
                  <p className="text-gray-600">Meets all safety and environmental regulations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Crop Applications & Dosage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                    {app.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{app.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Recommended Dosage:</span>
                      <div className="text-green-600 font-semibold">{app.dosage}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Application Timing:</span>
                      <div className="text-gray-700">{app.timing}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Methods */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Application Methods
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Broadcasting</h4>
                  <p className="text-gray-600 text-sm">Surface application before cultivation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Side Dressing</h4>
                  <p className="text-gray-600 text-sm">Applied alongside growing crops</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Basal Application</h4>
                  <p className="text-gray-600 text-sm">Pre-planting soil incorporation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Top Dressing</h4>
                  <p className="text-gray-600 text-sm">Applied during active growth period</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "packaging" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Packaging Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packagingOptions.map((pkg, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.type}</h3>
                      <p className="text-gray-600 mb-4">{pkg.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Minimum Order:</span>
                        <span className="text-blue-600 font-semibold">{pkg.minOrder}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Logistics */}
            <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Logistics & Delivery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Truck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Global Shipping</h4>
                  <p className="text-gray-600">Worldwide delivery via sea, land, and air freight</p>
                </div>
                <div className="text-center">
                  <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Secure Packaging</h4>
                  <p className="text-gray-600">Moisture-proof and contamination-free packaging</p>
                </div>
                <div className="text-center">
                  <Users className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                  <p className="text-gray-600">Dedicated logistics team for smooth delivery</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Crop Yields?</h2>
          <p className="text-xl text-green-100 mb-8">
            Get premium quality Urea 46% delivered to your location with competitive pricing and reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowContact(true)}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Request Quote
            </button>
            <a
              href="tel:+962796564791"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href="https://wa.me/962796564791"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Request Quote for Urea 46%</h3>
              <button
                onClick={() => setShowContact(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <Contact showOfficeInfo={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Urea46Page;
