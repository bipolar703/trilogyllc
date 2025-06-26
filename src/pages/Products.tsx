import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";
import {
  Package,
  Shirt,
  Cpu,
  Wrench,
  Home,
  Utensils,
  Car,
  Stethoscope,
  Search,
  Filter,
  Globe,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Contact from "../components/Contact";

const iconMap = {
  Package,
  Shirt,
  Cpu,
  Wrench,
  Home,
  Utensils,
  Car,
  Stethoscope,
};

const ProductsPage = () => {
  const { t, i18n } = useTranslation();
  const [showContact, setShowContact] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const productCategories = t("products.categories", {
    returnObjects: true,
  }) as Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    products: Array<{
      name: string;
      description: string;
      specifications: string[];
      applications: string[];
    }>;
    features: string[];
    markets: string[];
  }>;

  const filteredCategories = productCategories.filter((category) => {
    const matchesCategory =
      selectedCategory === "all" || category.id === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.products.some(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const capabilities = [
    {
      icon: <Search className="w-6 h-6" />,
      title: t("products.capabilities.sourcing.title"),
      description: t("products.capabilities.sourcing.description"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("products.capabilities.quality.title"),
      description: t("products.capabilities.quality.description"),
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t("products.capabilities.global.title"),
      description: t("products.capabilities.global.description"),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t("products.capabilities.compliance.title"),
      description: t("products.capabilities.compliance.description"),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div
        className={`${styles.headerBackground} py-16 sm:py-20 md:py-24 relative`}
      >
        <div className="light1" />
        <div className="light2" />
        <div className="light3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <h1
              className={`${styles.gradientText} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6`}
            >
              {t("products.title")}
            </h1>
            <p
              className={`${styles.subtleText} text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8`}
            >
              {t("products.description")}
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type="text"
                  placeholder={t("products.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent appearance-none bg-white min-w-[200px]"
                >
                  <option value="all">{t("products.allCategories")}</option>
                  {productCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("products.capabilities.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("products.capabilities.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-brand-gold to-brand-bronze rounded-lg flex items-center justify-center mb-4">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {capability.title}
                </h3>
                <p className="text-gray-600">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("products.categoriesTitle")}
            </h2>
            <p className="text-lg text-gray-600">
              {filteredCategories.length} {t("products.categoriesFound")}
            </p>
          </div>

          <div className="space-y-12">
            {filteredCategories.map((category, index) => {
              const CategoryIcon =
                iconMap[category.icon as keyof typeof iconMap] || Package;

              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-brand-gold to-brand-bronze rounded-xl flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-lg mb-4">
                          {category.description}
                        </p>

                        {/* Key Features */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {category.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-gold/10 text-brand-gold"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />

                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Target Markets */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {t("products.targetMarkets")}:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {category.markets.map((market, marketIndex) => (
                              <span
                                key={marketIndex}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {market}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.products.map((product, productIndex) => (
                        <div
                          key={productIndex}
                          className="border border-gray-200 rounded-lg p-6 hover:border-brand-gold transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {product.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4">
                            {product.description}
                          </p>

                          {/* Specifications */}
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-900 mb-2">
                              {t("products.specifications")}:
                            </h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {product.specifications.map((spec, specIndex) => (
                                <li
                                  key={specIndex}
                                  className="flex items-start"
                                >
                                  <span className="w-1 h-1 bg-brand-gold rounded-full mt-2 mr-2 flex-shrink-0" />

                                  {spec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Applications */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">
                              {t("products.applications")}:
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {product.applications.map((app, appIndex) => (
                                <span
                                  key={appIndex}
                                  className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs"
                                >
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("products.noResults")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("products.noResultsDescription")}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="text-brand-gold hover:text-brand-bronze font-medium"
              >
                {t("products.clearFilters")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-brand-gold to-brand-bronze">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">
                {t("products.stats.suppliers")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-lg opacity-90">
                {t("products.stats.countries")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">
                {t("products.stats.years")}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">
                {t("products.stats.satisfaction")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            {!showContact ? (
              <>
                <TrendingUp className="w-16 h-16 text-brand-gold mx-auto mb-6" />

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t("products.cta.title")}
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                  {t("products.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowContact(true)}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-brand-gold to-brand-bronze text-white px-8 py-4 rounded-lg hover:from-brand-bronze hover:to-brand-gold transition-all duration-300 transform hover:scale-105"
                  >
                    {t("products.cta.getQuote")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center border-2 border-brand-gold text-brand-gold px-8 py-4 rounded-lg hover:bg-brand-gold hover:text-white transition-all duration-300"
                  >
                    {t("products.cta.viewServices")}
                  </Link>
                </div>
              </>
            ) : (
              <div className="transition-all duration-300">
                <div
                  className={`flex justify-between items-center mb-8 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <h2 className="text-3xl font-bold text-gray-900">
                    {t("contact.form.title")}
                  </h2>
                  <button
                    onClick={() => setShowContact(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
                <Contact showOfficeInfo={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
