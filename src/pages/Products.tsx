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
      icon: <Search className="w-6 h-6" data-oid="p0pyeg-" />,
      title: t("products.capabilities.sourcing.title"),
      description: t("products.capabilities.sourcing.description"),
    },
    {
      icon: <Shield className="w-6 h-6" data-oid="fjpc5-b" />,
      title: t("products.capabilities.quality.title"),
      description: t("products.capabilities.quality.description"),
    },
    {
      icon: <Globe className="w-6 h-6" data-oid="h7_wluz" />,
      title: t("products.capabilities.global.title"),
      description: t("products.capabilities.global.description"),
    },
    {
      icon: <Award className="w-6 h-6" data-oid="0osiir5" />,
      title: t("products.capabilities.compliance.title"),
      description: t("products.capabilities.compliance.description"),
    },
  ];

  return (
    <div data-oid="oo5rb9b">
      {/* Header Section */}
      <div
        className={`${styles.headerBackground} py-16 sm:py-20 md:py-24 relative`}
        data-oid="age:w_5"
      >
        <div className="light1" data-oid="il78k7q" />
        <div className="light2" data-oid="xkmfu2-" />
        <div className="light3" data-oid="uwpusfw" />

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          data-oid="n1e4iej"
        >
          <div
            className="flex flex-col items-center justify-center text-center"
            data-oid="pc55vpr"
          >
            <h1
              className={`${styles.gradientText} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6`}
              data-oid="c8iq5g3"
            >
              {t("products.title")}
            </h1>
            <p
              className={`${styles.subtleText} text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8`}
              data-oid="r2gsvfx"
            >
              {t("products.description")}
            </p>

            {/* Search and Filter */}
            <div
              className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
              data-oid=":f-ojs9"
            >
              <div className="relative flex-1" data-oid="alr8c0g">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  data-oid="gs.wjlt"
                />

                <input
                  type="text"
                  placeholder={t("products.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  data-oid="yzklsqp"
                />
              </div>
              <div className="relative" data-oid="0:ig2ak">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  data-oid="b1je0p6"
                />

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent appearance-none bg-white min-w-[200px]"
                  data-oid="idk27jy"
                >
                  <option value="all" data-oid="9j05c-r">
                    {t("products.allCategories")}
                  </option>
                  {productCategories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      data-oid="u2.mg73"
                    >
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
      <div className="py-16 bg-gray-50" data-oid="ox-e:sn">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="e:_2d8e"
        >
          <div className="text-center mb-12" data-oid="ttth51s">
            <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="r7k_mcz"
            >
              {t("products.capabilities.title")}
            </h2>
            <p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              data-oid="ow06rm0"
            >
              {t("products.capabilities.description")}
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            data-oid="__zz5kz"
          >
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                data-oid="7u6kfex"
              >
                <div
                  className="w-12 h-12 bg-gradient-to-r from-brand-gold to-brand-bronze rounded-lg flex items-center justify-center mb-4"
                  data-oid="4dynxwu"
                >
                  {capability.icon}
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-2"
                  data-oid="89y2zmz"
                >
                  {capability.title}
                </h3>
                <p className="text-gray-600" data-oid="3in:mc8">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="py-16" data-oid="ephgbfa">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="vb:v510"
        >
          <div className="text-center mb-12" data-oid="snfu1lx">
            <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="sj3ollw"
            >
              {t("products.categoriesTitle")}
            </h2>
            <p className="text-lg text-gray-600" data-oid="3hfx0dl">
              {filteredCategories.length} {t("products.categoriesFound")}
            </p>
          </div>

          <div className="space-y-12" data-oid="37-5i8f">
            {filteredCategories.map((category, index) => {
              const CategoryIcon =
                iconMap[category.icon as keyof typeof iconMap] || Package;

              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  data-oid="jitpy1x"
                >
                  <div className="p-8" data-oid="7w5wilt">
                    <div
                      className="flex items-start gap-6 mb-8"
                      data-oid="cjiygnx"
                    >
                      <div
                        className="w-16 h-16 bg-gradient-to-r from-brand-gold to-brand-bronze rounded-xl flex items-center justify-center flex-shrink-0"
                        data-oid="ed7c24x"
                      >
                        <CategoryIcon
                          className="w-8 h-8 text-white"
                          data-oid="f9:cg93"
                        />
                      </div>
                      <div className="flex-1" data-oid="04obxcn">
                        <h3
                          className="text-2xl font-bold text-gray-900 mb-2"
                          data-oid="gpnlq-v"
                        >
                          {category.name}
                        </h3>
                        <p
                          className="text-gray-600 text-lg mb-4"
                          data-oid=".4_g09_"
                        >
                          {category.description}
                        </p>

                        {/* Key Features */}
                        <div
                          className="flex flex-wrap gap-2 mb-6"
                          data-oid="idwfd1c"
                        >
                          {category.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-gold/10 text-brand-gold"
                              data-oid="niw_1db"
                            >
                              <CheckCircle
                                className="w-4 h-4 mr-1"
                                data-oid="qr8g4.y"
                              />

                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Target Markets */}
                        <div className="mb-6" data-oid="_quhj3v">
                          <h4
                            className="font-semibold text-gray-900 mb-2"
                            data-oid="ei9bl7."
                          >
                            {t("products.targetMarkets")}:
                          </h4>
                          <div
                            className="flex flex-wrap gap-2"
                            data-oid="6269q6e"
                          >
                            {category.markets.map((market, marketIndex) => (
                              <span
                                key={marketIndex}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                data-oid="20-22l3"
                              >
                                {market}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Products Grid */}
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      data-oid="vrtamu_"
                    >
                      {category.products.map((product, productIndex) => (
                        <div
                          key={productIndex}
                          className="border border-gray-200 rounded-lg p-6 hover:border-brand-gold transition-colors"
                          data-oid="t604shf"
                        >
                          <h4
                            className="font-semibold text-gray-900 mb-2"
                            data-oid="pdan_:l"
                          >
                            {product.name}
                          </h4>
                          <p
                            className="text-gray-600 text-sm mb-4"
                            data-oid="fy_:bgq"
                          >
                            {product.description}
                          </p>

                          {/* Specifications */}
                          <div className="mb-4" data-oid="ariwiu5">
                            <h5
                              className="text-sm font-medium text-gray-900 mb-2"
                              data-oid="gw8oeo:"
                            >
                              {t("products.specifications")}:
                            </h5>
                            <ul
                              className="text-xs text-gray-600 space-y-1"
                              data-oid="94v.ry5"
                            >
                              {product.specifications.map((spec, specIndex) => (
                                <li
                                  key={specIndex}
                                  className="flex items-start"
                                  data-oid="mmtszd-"
                                >
                                  <span
                                    className="w-1 h-1 bg-brand-gold rounded-full mt-2 mr-2 flex-shrink-0"
                                    data-oid="qyh_glg"
                                  />

                                  {spec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Applications */}
                          <div data-oid="7qukiyk">
                            <h5
                              className="text-sm font-medium text-gray-900 mb-2"
                              data-oid="4:sy61x"
                            >
                              {t("products.applications")}:
                            </h5>
                            <div
                              className="flex flex-wrap gap-1"
                              data-oid="pjaksir"
                            >
                              {product.applications.map((app, appIndex) => (
                                <span
                                  key={appIndex}
                                  className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs"
                                  data-oid="mg9t73:"
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
            <div className="text-center py-12" data-oid="9xgclj-">
              <Package
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                data-oid="w-xmxps"
              />

              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                data-oid="fryanrz"
              >
                {t("products.noResults")}
              </h3>
              <p className="text-gray-600 mb-4" data-oid="b6onhhj">
                {t("products.noResultsDescription")}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="text-brand-gold hover:text-brand-bronze font-medium"
                data-oid="vsrzvzz"
              >
                {t("products.clearFilters")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="py-16 bg-gradient-to-r from-brand-gold to-brand-bronze"
        data-oid="azp.65a"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="7_4meqt"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white"
            data-oid="dbl18eg"
          >
            <div data-oid="hnc46yn">
              <div className="text-4xl font-bold mb-2" data-oid="j84hpkw">
                500+
              </div>
              <div className="text-lg opacity-90" data-oid="b17gyyr">
                {t("products.stats.suppliers")}
              </div>
            </div>
            <div data-oid="4qlvftz">
              <div className="text-4xl font-bold mb-2" data-oid=":t9awxr">
                30+
              </div>
              <div className="text-lg opacity-90" data-oid="fgw0t9t">
                {t("products.stats.countries")}
              </div>
            </div>
            <div data-oid="8iqjh-i">
              <div className="text-4xl font-bold mb-2" data-oid="018r81v">
                15+
              </div>
              <div className="text-lg opacity-90" data-oid="ifhku.d">
                {t("products.stats.years")}
              </div>
            </div>
            <div data-oid="k0ayhgk">
              <div className="text-4xl font-bold mb-2" data-oid="uio9g-d">
                98%
              </div>
              <div className="text-lg opacity-90" data-oid="-bj5062">
                {t("products.stats.satisfaction")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16" data-oid="0ma:yvw">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="vhjue-f"
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
            data-oid="3hnvs--"
          >
            {!showContact ? (
              <>
                <TrendingUp
                  className="w-16 h-16 text-brand-gold mx-auto mb-6"
                  data-oid="c4-5kp3"
                />

                <h2
                  className="text-3xl font-bold text-gray-900 mb-4"
                  data-oid="7t.q1v2"
                >
                  {t("products.cta.title")}
                </h2>
                <p
                  className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
                  data-oid="w38e:ot"
                >
                  {t("products.cta.description")}
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  data-oid="7m8vpo2"
                >
                  <button
                    onClick={() => setShowContact(true)}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-brand-gold to-brand-bronze text-white px-8 py-4 rounded-lg hover:from-brand-bronze hover:to-brand-gold transition-all duration-300 transform hover:scale-105"
                    data-oid="4dzg4ts"
                  >
                    {t("products.cta.getQuote")}
                    <ArrowRight className="w-5 h-5 ml-2" data-oid="s.r5wrw" />
                  </button>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center border-2 border-brand-gold text-brand-gold px-8 py-4 rounded-lg hover:bg-brand-gold hover:text-white transition-all duration-300"
                    data-oid="c4.56b4"
                  >
                    {t("products.cta.viewServices")}
                  </Link>
                </div>
              </>
            ) : (
              <div className="transition-all duration-300" data-oid="0gnj_xt">
                <div
                  className={`flex justify-between items-center mb-8 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
                  data-oid="wktc1:n"
                >
                  <h2
                    className="text-3xl font-bold text-gray-900"
                    data-oid="5nyup-3"
                  >
                    {t("contact.form.title")}
                  </h2>
                  <button
                    onClick={() => setShowContact(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    data-oid="ff8h3hs"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
                <Contact showOfficeInfo={false} data-oid="q5n.bae" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
