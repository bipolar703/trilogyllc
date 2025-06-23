"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  TrendingUp,
  Globe,
  Truck,
  FileText,
  Users,
  MessageCircle,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title:
      "Navigating Post-Pandemic Global Supply Chains: A Strategic Guide for 2024",
    excerpt:
      "The global supply chain landscape has fundamentally shifted. Learn how businesses are adapting their sourcing strategies to build resilience and maintain competitive advantages in the new normal.",
    content: `The COVID-19 pandemic exposed vulnerabilities in global supply chains that many businesses never anticipated. As we move through 2024, companies are reimagining their approach to international trade and supply chain management.

## Key Trends Shaping Supply Chains

**Diversification Over Efficiency**: The "just-in-time" model is giving way to "just-in-case" strategies. Companies are diversifying their supplier base across multiple countries and regions to reduce dependency on single sources.

**Nearshoring and Friendshoring**: Businesses are moving production closer to home markets or to politically aligned countries. This trend is particularly strong in electronics, textiles, and automotive sectors.

**Technology Integration**: AI, IoT, and blockchain technologies are becoming essential for supply chain visibility and risk management.

## Practical Strategies for Businesses

1. **Supplier Diversification**: Don't put all your eggs in one basket. Develop relationships with suppliers across different regions.

2. **Inventory Optimization**: Balance cost efficiency with supply security by maintaining strategic inventory buffers.

3. **Technology Investment**: Implement supply chain visibility tools to monitor and predict disruptions.

4. **Partnership Development**: Build stronger relationships with logistics providers and customs brokers.

At Trilogy Trading LLC, we've helped over 500 businesses navigate these challenges, achieving an average 35% improvement in supply chain resilience while maintaining cost competitiveness.`,
    author: "Sarah Al-Rashid",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Supply Chain",
    tags: ["Supply Chain", "Global Trade", "Risk Management", "Strategy"],
    featured: true,
  },
  {
    id: "2",
    title:
      "The Complete Guide to Trade Documentation in 2024: Avoiding Costly Delays",
    excerpt:
      "Proper documentation is the backbone of international trade. Discover the essential documents, common pitfalls, and best practices that can save your business time and money.",
    content: `International trade documentation can make or break your import/export operations. A single missing document or incorrect detail can result in costly delays, penalties, or even shipment seizures.

## Essential Trade Documents

**Commercial Invoice**: The foundation document that details the transaction between buyer and seller.

**Bill of Lading**: Serves as a receipt, contract of carriage, and document of title.

**Certificate of Origin**: Proves where goods were manufactured, crucial for tariff determination.

**Packing List**: Detailed inventory of shipment contents and packaging specifications.

## Common Documentation Pitfalls

- Inconsistent information across documents
- Missing or incorrect HS codes
- Inadequate product descriptions
- Incorrect valuation methods
- Missing regulatory certificates

## Best Practices for Documentation Success

1. **Standardize Processes**: Create templates and checklists for consistent documentation.

2. **Invest in Training**: Ensure your team understands documentation requirements for each market.

3. **Use Technology**: Implement digital documentation systems for accuracy and efficiency.

4. **Partner with Experts**: Work with experienced customs brokers and trade consultants.

Our documentation services have helped clients reduce customs clearance time by up to 40%, ensuring smooth and compliant international transactions.`,
    author: "Ahmed Hassan",
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    category: "Documentation",
    tags: ["Trade Documentation", "Customs", "Compliance", "Import/Export"],
    featured: false,
  },
  {
    id: "3",
    title: "Asia-Europe Trade Corridor: Opportunities and Challenges in 2024",
    excerpt:
      "The Asia-Europe trade route remains one of the world's most important commercial highways. Explore the latest developments, opportunities, and strategic considerations for businesses.",
    content: `The Asia-Europe trade corridor continues to be a vital artery for global commerce, handling over $700 billion in trade annually. As geopolitical landscapes shift and new technologies emerge, businesses must adapt their strategies.

## Current Market Dynamics

**Belt and Road Initiative Impact**: China's infrastructure investments are reshaping trade routes and reducing transit times.

**Digital Trade Growth**: E-commerce and digital services are driving new trade patterns and regulatory requirements.

**Sustainability Focus**: Environmental regulations and carbon footprint considerations are influencing logistics decisions.

## Key Opportunities

1. **Emerging Markets**: Central Asian countries offer new sourcing and market opportunities.

2. **Green Logistics**: Sustainable transportation solutions are becoming competitive advantages.

3. **Digital Integration**: Technology-enabled trade facilitation is reducing costs and improving efficiency.

## Strategic Considerations

- **Route Diversification**: Multiple transportation options reduce risk and optimize costs.
- **Regulatory Compliance**: Stay updated on changing trade regulations and standards.
- **Local Partnerships**: Strong regional partnerships are essential for success.

With our extensive network across 30+ countries, we help businesses navigate the complexities of Asia-Europe trade, achieving average cost savings of 20% while improving delivery reliability.`,
    author: "Maria Gonzalez",
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    category: "Market Analysis",
    tags: ["Asia-Europe", "Trade Routes", "Market Analysis", "Logistics"],
    featured: true,
  },
  {
    id: "4",
    title:
      "Digital Transformation in Global Trade: How AI is Revolutionizing Operations",
    excerpt:
      "Artificial Intelligence and digital technologies are transforming international trade operations. Learn how forward-thinking companies are leveraging these tools for competitive advantage.",
    content: `The integration of AI and digital technologies in global trade is no longer a future concept—it's happening now. From predictive analytics to automated documentation, technology is revolutionizing how businesses approach international commerce.

## AI Applications in Trade

**Predictive Analytics**: Forecast demand, identify supply chain risks, and optimize inventory levels.

**Automated Documentation**: AI-powered systems can generate and verify trade documents with 99%+ accuracy.

**Smart Logistics**: Route optimization and real-time tracking improve efficiency and customer satisfaction.

**Risk Assessment**: Machine learning algorithms analyze multiple data sources to assess supplier and market risks.

## Implementation Strategies

1. **Start Small**: Begin with pilot projects in specific areas like documentation or logistics.

2. **Data Quality**: Ensure clean, accurate data as the foundation for AI systems.

3. **Change Management**: Prepare your team for digital transformation with proper training.

4. **Partner Selection**: Choose technology partners with proven experience in trade applications.

## Measuring Success

- Reduced processing times
- Improved accuracy rates
- Cost savings
- Enhanced customer satisfaction
- Better risk management

At Trilogy Trading LLC, we're at the forefront of digital trade transformation, helping clients implement AI-powered solutions that deliver measurable results. Our Hexabot AI assistant is just one example of how we're leveraging technology to enhance customer service and operational efficiency.`,
    author: "David Chen",
    publishedAt: "2023-12-28",
    readTime: "9 min read",
    category: "Technology",
    tags: ["AI", "Digital Transformation", "Technology", "Innovation"],
    featured: false,
  },
  {
    id: "5",
    title:
      "Building Resilient Supplier Relationships: Lessons from Industry Leaders",
    excerpt:
      "Strong supplier relationships are the foundation of successful global trade. Discover proven strategies for building and maintaining partnerships that withstand market volatility.",
    content: `In an era of supply chain uncertainty, the strength of your supplier relationships can determine your business success. Leading companies are moving beyond transactional relationships to build strategic partnerships that create mutual value.

## Key Elements of Strong Supplier Relationships

**Transparency**: Open communication about challenges, opportunities, and expectations.

**Mutual Investment**: Both parties invest in the relationship's long-term success.

**Performance Metrics**: Clear KPIs and regular performance reviews ensure accountability.

**Innovation Collaboration**: Joint development of new products, processes, or solutions.

## Best Practices for Relationship Building

1. **Regular Communication**: Establish consistent touchpoints beyond order transactions.

2. **Cultural Understanding**: Invest time in understanding your suppliers' business culture and practices.

3. **Payment Reliability**: Consistent, timely payments build trust and strengthen relationships.

4. **Capacity Building**: Help suppliers improve their capabilities through training and resources.

5. **Risk Sharing**: Develop mechanisms to share risks and rewards fairly.

## Managing Supplier Performance

- Set clear expectations and standards
- Provide regular feedback and support
- Recognize and reward excellent performance
- Address issues promptly and constructively
- Plan for succession and backup suppliers

## Technology's Role

Modern supplier relationship management platforms enable:
- Real-time performance monitoring
- Automated compliance tracking
- Collaborative planning and forecasting
- Risk assessment and mitigation

Our supplier vetting and relationship management services have helped clients build supplier networks that deliver 99%+ on-time performance while maintaining competitive pricing.`,
    author: "Jennifer Park",
    publishedAt: "2023-12-20",
    readTime: "6 min read",
    category: "Supplier Management",
    tags: [
      "Supplier Relations",
      "Partnership",
      "Performance Management",
      "Strategy",
    ],

    featured: false,
  },
];

const categories = [
  "All",
  "Supply Chain",
  "Documentation",
  "Market Analysis",
  "Technology",
  "Supplier Management",
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      "Supply Chain": <TrendingUp className="h-4 w-4" data-oid=":cbfcrn" />,
      Documentation: <FileText className="h-4 w-4" data-oid="78:j9f6" />,
      "Market Analysis": <Globe className="h-4 w-4" data-oid="kzgwnm9" />,
      Technology: <MessageCircle className="h-4 w-4" data-oid="d9umhfl" />,
      "Supplier Management": <Users className="h-4 w-4" data-oid="pce_0:y" />,
    };
    return (
      icons[category as keyof typeof icons] || (
        <Tag className="h-4 w-4" data-oid="6l9h_1_" />
      )
    );
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50" data-oid="1.oqa2l">
        {/* Header */}
        <div className="bg-white shadow-sm border-b" data-oid="pcb4j57">
          <div
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            data-oid="sy:z3h6"
          >
            <div
              className="flex items-center justify-between py-6"
              data-oid="-f9nad9"
            >
              <div className="flex items-center gap-4" data-oid="eepri-1">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2"
                  data-oid="e6ungfu"
                >
                  ← Back to Blog
                </Button>
                <Link
                  href="/"
                  className="text-trilogy-blue hover:underline"
                  data-oid="b9s.14x"
                >
                  Home
                </Link>
              </div>
              <Link href="/dashboard" data-oid=":c:d6rt">
                <Button variant="outline" data-oid="ge5ozd0">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          data-oid="qwjw0:m"
        >
          <article
            className="bg-white rounded-lg shadow-sm p-8"
            data-oid="kwqy3:z"
          >
            {/* Article Header */}
            <header className="mb-8" data-oid="r8c2umh">
              <div className="flex items-center gap-2 mb-4" data-oid="7575cqq">
                {getCategoryIcon(selectedPost.category)}
                <span
                  className="text-trilogy-blue font-medium"
                  data-oid="ils8dmc"
                >
                  {selectedPost.category}
                </span>
              </div>
              <h1
                className="text-4xl font-bold text-gray-900 mb-4"
                data-oid="t3zfq0c"
              >
                {selectedPost.title}
              </h1>
              <div
                className="flex items-center gap-6 text-gray-600"
                data-oid="j1w40wr"
              >
                <div className="flex items-center gap-2" data-oid="_1vyupx">
                  <User className="h-4 w-4" data-oid="iq_17kx" />
                  <span data-oid="z5h1y4y">{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2" data-oid="nmq_9ot">
                  <Calendar className="h-4 w-4" data-oid="1udco-z" />
                  <span data-oid="-0j9yvh">
                    {formatDate(selectedPost.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2" data-oid="o..jm:.">
                  <Clock className="h-4 w-4" data-oid="iurrgiy" />
                  <span data-oid="o:2w8:s">{selectedPost.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4" data-oid="2bg4u48">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    data-oid="nw6yeqs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none" data-oid="dk1tca4">
              <div
                className="text-xl text-gray-600 mb-8 font-medium leading-relaxed"
                data-oid="1ejjlr-"
              >
                {selectedPost.excerpt}
              </div>
              <div
                className="whitespace-pre-line text-gray-800 leading-relaxed"
                data-oid="ziwc1mc"
              >
                {selectedPost.content}
              </div>
            </div>

            {/* Call to Action */}
            <div
              className="mt-12 p-6 bg-gradient-to-r from-trilogy-blue to-trilogy-navy rounded-lg text-white"
              data-oid="5cmg8an"
            >
              <h3 className="text-xl font-bold mb-2" data-oid="3hlt9ah">
                Ready to Transform Your Global Trade Operations?
              </h3>
              <p className="mb-4" data-oid="lhcfjyb">
                Get expert guidance from our team of international trade
                specialists. Chat with Hexabot or contact us directly for
                personalized solutions.
              </p>
              <div className="flex gap-4" data-oid="7y8y3a1">
                <Link href="/" data-oid="nm1nsn3">
                  <Button variant="secondary" data-oid="5:8ecs.">
                    Chat with Hexabot
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-trilogy-blue"
                  data-oid="sr-ptr0"
                >
                  Contact Our Experts
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-oid="a5tfkr.">
      {/* Header */}
      <div className="bg-white shadow-sm border-b" data-oid="juvjupd">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="gx.z3a_"
        >
          <div
            className="flex items-center justify-between py-6"
            data-oid="q_h8u9r"
          >
            <div data-oid="bbrzqvr">
              <h1
                className="text-3xl font-bold text-gray-900"
                data-oid="c3-xm2e"
              >
                Trilogy Trading Blog
              </h1>
              <p className="text-gray-600" data-oid="hz7m2-:">
                Insights, strategies, and trends in global trade
              </p>
            </div>
            <div className="flex items-center gap-4" data-oid="uu8kqgu">
              <Link href="/" data-oid="4wx_czt">
                <Button variant="outline" data-oid="ys9eewn">
                  Chat with Hexabot
                </Button>
              </Link>
              <Link href="/dashboard" data-oid="evnck.r">
                <Button variant="outline" data-oid="z2_l7h.">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="_luywac"
      >
        {/* Search and Filters */}
        <div className="mb-8" data-oid="-qg5v25">
          <div
            className="flex flex-col md:flex-row gap-4 mb-6"
            data-oid="33_ysrs"
          >
            <div className="flex-1 relative" data-oid="m4cnznm">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                data-oid=".th1hkr"
              />

              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-oid="kiho4ze"
              />
            </div>
            <div className="flex gap-2 flex-wrap" data-oid="e0v98l-">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                  data-oid="pyt6-th"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "All" && searchTerm === "" && (
          <div className="mb-12" data-oid=".pq4_5q">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6"
              data-oid="hdikbs-"
            >
              Featured Articles
            </h2>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              data-oid="_s4c2-t"
            >
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  data-oid="uf_csd2"
                >
                  <CardContent className="p-0" data-oid="4-avgyf">
                    <div className="p-6" data-oid="ha.cwey">
                      <div
                        className="flex items-center gap-2 mb-3"
                        data-oid="pc3sa91"
                      >
                        {getCategoryIcon(post.category)}
                        <span
                          className="text-trilogy-blue font-medium text-sm"
                          data-oid="1dni_7v"
                        >
                          {post.category}
                        </span>
                        <span
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium"
                          data-oid="a5yg8.4"
                        >
                          Featured
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
                        data-oid="3_j149d"
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 line-clamp-3"
                        data-oid=".huynkd"
                      >
                        {post.excerpt}
                      </p>
                      <div
                        className="flex items-center justify-between"
                        data-oid="_ysr2dh"
                      >
                        <div
                          className="flex items-center gap-4 text-sm text-gray-500"
                          data-oid="dk2pv5y"
                        >
                          <span data-oid="wvixf2m">{post.author}</span>
                          <span data-oid="ylw1y:z">
                            {formatDate(post.publishedAt)}
                          </span>
                          <span data-oid="t.yu0fc">{post.readTime}</span>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedPost(post)}
                          className="text-trilogy-blue hover:text-trilogy-navy"
                          data-oid="_o8q-gv"
                        >
                          Read More{" "}
                          <ArrowRight
                            className="h-4 w-4 ml-1"
                            data-oid="4q1:ut0"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div data-oid="egp1jb9">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6"
            data-oid="guet_yd"
          >
            {selectedCategory === "All"
              ? "All Articles"
              : `${selectedCategory} Articles`}
            {searchTerm &&
              ` (${filteredPosts.length} results for "${searchTerm}")`}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12" data-oid="puyj-ud">
              <p className="text-gray-500 text-lg" data-oid="t:75jy4">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4"
                data-oid="u7xs1g."
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-oid="g4n1b4h"
            >
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  data-oid="cz6rzc2"
                >
                  <CardContent className="p-0" data-oid="r1pcysw">
                    <div className="p-6" data-oid="6-u-vl6">
                      <div
                        className="flex items-center gap-2 mb-3"
                        data-oid="r7ropc1"
                      >
                        {getCategoryIcon(post.category)}
                        <span
                          className="text-trilogy-blue font-medium text-sm"
                          data-oid=".-7-po4"
                        >
                          {post.category}
                        </span>
                        {post.featured && (
                          <span
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium"
                            data-oid="2499dl0"
                          >
                            Featured
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-lg font-bold text-gray-900 mb-3 line-clamp-2"
                        data-oid="gw5vd2k"
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 line-clamp-3 text-sm"
                        data-oid="bq1949g"
                      >
                        {post.excerpt}
                      </p>
                      <div
                        className="flex flex-wrap gap-1 mb-4"
                        data-oid="wowx0kr"
                      >
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            data-oid="f-nz9k2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="flex items-center justify-between"
                        data-oid="qvu99f8"
                      >
                        <div
                          className="text-xs text-gray-500"
                          data-oid="uy0j:x_"
                        >
                          <div data-oid="1p8kkvv">{post.author}</div>
                          <div data-oid="1d4uj8:">
                            {formatDate(post.publishedAt)} • {post.readTime}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPost(post)}
                          className="text-trilogy-blue hover:text-trilogy-navy"
                          data-oid="d52dzdr"
                        >
                          Read{" "}
                          <ArrowRight
                            className="h-3 w-3 ml-1"
                            data-oid="ay.vm4a"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16" data-oid="xnl8mll">
          <Card
            className="bg-gradient-to-r from-trilogy-blue to-trilogy-navy text-white"
            data-oid="uzey-65"
          >
            <CardContent className="p-8 text-center" data-oid="ha8x:d8">
              <h3 className="text-2xl font-bold mb-4" data-oid="90h_0jj">
                Stay Updated with Global Trade Insights
              </h3>
              <p
                className="text-blue-100 mb-6 max-w-2xl mx-auto"
                data-oid="ek5bvz1"
              >
                Get the latest articles, market analysis, and trade strategies
                delivered to your inbox. Join 5,000+ professionals who trust our
                insights.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                data-oid="9_os8_h"
              >
                <Input
                  placeholder="Enter your email"
                  className="bg-white text-gray-900"
                  data-oid="g2g0rau"
                />

                <Button
                  variant="secondary"
                  className="whitespace-nowrap"
                  data-oid="2vb.5mz"
                >
                  Subscribe Now
                </Button>
              </div>
              <p className="text-blue-100 text-sm mt-4" data-oid="3_8bw9-">
                No spam. Unsubscribe anytime. Read our privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center" data-oid="e-j93m6">
          <h3
            className="text-xl font-bold text-gray-900 mb-4"
            data-oid="3a.gt-5"
          >
            Need Expert Guidance for Your Global Trade Operations?
          </h3>
          <p
            className="text-gray-600 mb-6 max-w-2xl mx-auto"
            data-oid="a6hj007"
          >
            Our team of international trade specialists is ready to help you
            navigate complex global markets, optimize your supply chain, and
            achieve your business goals.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-oid="1zlnw8o"
          >
            <Link href="/" data-oid="fu9grp6">
              <Button
                className="bg-trilogy-blue hover:bg-trilogy-navy"
                data-oid="8kyl2o7"
              >
                <MessageCircle className="h-4 w-4 mr-2" data-oid="4xexky1" />
                Chat with Hexabot
              </Button>
            </Link>
            <Button variant="outline" data-oid="x524brk">
              <Phone className="h-4 w-4 mr-2" data-oid="wbf9hhj" />
              Call +962796564791
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
