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
      "Supply Chain": <TrendingUp className="h-4 w-4" data-oid=".:q:p:0" />,
      Documentation: <FileText className="h-4 w-4" data-oid="5j-h0sa" />,
      "Market Analysis": <Globe className="h-4 w-4" data-oid="-xwo._x" />,
      Technology: <MessageCircle className="h-4 w-4" data-oid="6j4:4af" />,
      "Supplier Management": <Users className="h-4 w-4" data-oid="sj.9opq" />,
    };
    return (
      icons[category as keyof typeof icons] || (
        <Tag className="h-4 w-4" data-oid="77z7co-" />
      )
    );
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50" data-oid="bx7mn0m">
        {/* Header */}
        <div className="bg-white shadow-sm border-b" data-oid="7m3.yv:">
          <div
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            data-oid="oog2z15"
          >
            <div
              className="flex items-center justify-between py-6"
              data-oid="_6sqntq"
            >
              <div className="flex items-center gap-4" data-oid="aj_-cuf">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2"
                  data-oid="qpfaq16"
                >
                  ← Back to Blog
                </Button>
                <Link
                  href="/"
                  className="text-trilogy-blue hover:underline"
                  data-oid="gyqb601"
                >
                  Home
                </Link>
              </div>
              <Link href="/dashboard" data-oid=".v.7tm4">
                <Button variant="outline" data-oid="5kd:grn">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          data-oid="pkavxj-"
        >
          <article
            className="bg-white rounded-lg shadow-sm p-8"
            data-oid="g8yb7_8"
          >
            {/* Article Header */}
            <header className="mb-8" data-oid="y1:by-9">
              <div className="flex items-center gap-2 mb-4" data-oid="qvk3__7">
                {getCategoryIcon(selectedPost.category)}
                <span
                  className="text-trilogy-blue font-medium"
                  data-oid="20g-_81"
                >
                  {selectedPost.category}
                </span>
              </div>
              <h1
                className="text-4xl font-bold text-gray-900 mb-4"
                data-oid="cl3o6.a"
              >
                {selectedPost.title}
              </h1>
              <div
                className="flex items-center gap-6 text-gray-600"
                data-oid=":hmbo5u"
              >
                <div className="flex items-center gap-2" data-oid="os5a_43">
                  <User className="h-4 w-4" data-oid="-pyo3nn" />
                  <span data-oid="a8c-p0_">{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2" data-oid="tn5hl9l">
                  <Calendar className="h-4 w-4" data-oid="v0o.q_8" />
                  <span data-oid="bjbjjnw">
                    {formatDate(selectedPost.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2" data-oid="6k78kje">
                  <Clock className="h-4 w-4" data-oid="etgpd19" />
                  <span data-oid="q-vfvk4">{selectedPost.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4" data-oid="bds7wrv">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    data-oid="81l5xc9"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none" data-oid="vbgph.w">
              <div
                className="text-xl text-gray-600 mb-8 font-medium leading-relaxed"
                data-oid="shjiy3r"
              >
                {selectedPost.excerpt}
              </div>
              <div
                className="whitespace-pre-line text-gray-800 leading-relaxed"
                data-oid="m6rgj89"
              >
                {selectedPost.content}
              </div>
            </div>

            {/* Call to Action */}
            <div
              className="mt-12 p-6 bg-gradient-to-r from-trilogy-blue to-trilogy-navy rounded-lg text-white"
              data-oid="8317.zr"
            >
              <h3 className="text-xl font-bold mb-2" data-oid="j9iggsb">
                Ready to Transform Your Global Trade Operations?
              </h3>
              <p className="mb-4" data-oid="sn.hvhc">
                Get expert guidance from our team of international trade
                specialists. Chat with Hexabot or contact us directly for
                personalized solutions.
              </p>
              <div className="flex gap-4" data-oid="n9a-0dk">
                <Link href="/" data-oid="bn2v--b">
                  <Button variant="secondary" data-oid="2d:uu1w">
                    Chat with Hexabot
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-trilogy-blue"
                  data-oid="sj9t8f:"
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
    <div className="min-h-screen bg-gray-50" data-oid="ys0rutp">
      {/* Header */}
      <div className="bg-white shadow-sm border-b" data-oid="_-6wvqg">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="azp19zs"
        >
          <div
            className="flex items-center justify-between py-6"
            data-oid="pmt_fiq"
          >
            <div data-oid="lo2.wb-">
              <h1
                className="text-3xl font-bold text-gray-900"
                data-oid="-uwl_1_"
              >
                Trilogy Trading Blog
              </h1>
              <p className="text-gray-600" data-oid="_wmk4_i">
                Insights, strategies, and trends in global trade
              </p>
            </div>
            <div className="flex items-center gap-4" data-oid="8drq884">
              <Link href="/" data-oid=".59zrop">
                <Button variant="outline" data-oid="-d_3:bp">
                  Chat with Hexabot
                </Button>
              </Link>
              <Link href="/dashboard" data-oid="b3qvdjd">
                <Button variant="outline" data-oid="yuq1l2d">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="wwrx500"
      >
        {/* Search and Filters */}
        <div className="mb-8" data-oid="y51chnm">
          <div
            className="flex flex-col md:flex-row gap-4 mb-6"
            data-oid="r:w08rw"
          >
            <div className="flex-1 relative" data-oid="5glww6x">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                data-oid="46ndtz9"
              />

              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-oid=":gxw2c4"
              />
            </div>
            <div className="flex gap-2 flex-wrap" data-oid="i:.bu_r">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                  data-oid="3zvgvry"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "All" && searchTerm === "" && (
          <div className="mb-12" data-oid="_0fmoww">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6"
              data-oid="7r4nbdc"
            >
              Featured Articles
            </h2>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              data-oid=":aqh141"
            >
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  data-oid="gzcqj.n"
                >
                  <CardContent className="p-0" data-oid="s79g7op">
                    <div className="p-6" data-oid="1.kv05z">
                      <div
                        className="flex items-center gap-2 mb-3"
                        data-oid="69u9db3"
                      >
                        {getCategoryIcon(post.category)}
                        <span
                          className="text-trilogy-blue font-medium text-sm"
                          data-oid="hsuj890"
                        >
                          {post.category}
                        </span>
                        <span
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium"
                          data-oid="bt7:_.p"
                        >
                          Featured
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
                        data-oid="4a1u:eh"
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 line-clamp-3"
                        data-oid="av4f:kq"
                      >
                        {post.excerpt}
                      </p>
                      <div
                        className="flex items-center justify-between"
                        data-oid="nezkpyu"
                      >
                        <div
                          className="flex items-center gap-4 text-sm text-gray-500"
                          data-oid="3upvzfq"
                        >
                          <span data-oid="4_1_x7k">{post.author}</span>
                          <span data-oid="q:oquhk">
                            {formatDate(post.publishedAt)}
                          </span>
                          <span data-oid="vq4b1dj">{post.readTime}</span>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedPost(post)}
                          className="text-trilogy-blue hover:text-trilogy-navy"
                          data-oid="884i:jf"
                        >
                          Read More{" "}
                          <ArrowRight
                            className="h-4 w-4 ml-1"
                            data-oid="7.9:w87"
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
        <div data-oid="j6:r0ud">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6"
            data-oid="etg_e_5"
          >
            {selectedCategory === "All"
              ? "All Articles"
              : `${selectedCategory} Articles`}
            {searchTerm &&
              ` (${filteredPosts.length} results for "${searchTerm}")`}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12" data-oid="kfc.jdx">
              <p className="text-gray-500 text-lg" data-oid="x__wd1u">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4"
                data-oid="0j1c0wa"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-oid="mxtu_.j"
            >
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  data-oid="q9nch4x"
                >
                  <CardContent className="p-0" data-oid="-5:1:2c">
                    <div className="p-6" data-oid="if7rv.l">
                      <div
                        className="flex items-center gap-2 mb-3"
                        data-oid="ya59j9r"
                      >
                        {getCategoryIcon(post.category)}
                        <span
                          className="text-trilogy-blue font-medium text-sm"
                          data-oid="welso6j"
                        >
                          {post.category}
                        </span>
                        {post.featured && (
                          <span
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium"
                            data-oid="6jzz6zd"
                          >
                            Featured
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-lg font-bold text-gray-900 mb-3 line-clamp-2"
                        data-oid="2_i30m."
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-gray-600 mb-4 line-clamp-3 text-sm"
                        data-oid="p32re9l"
                      >
                        {post.excerpt}
                      </p>
                      <div
                        className="flex flex-wrap gap-1 mb-4"
                        data-oid="6.6.o66"
                      >
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            data-oid="61f6w6l"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="flex items-center justify-between"
                        data-oid="1zzv0.g"
                      >
                        <div
                          className="text-xs text-gray-500"
                          data-oid="j3md6kh"
                        >
                          <div data-oid="dwppe_2">{post.author}</div>
                          <div data-oid="j0056k3">
                            {formatDate(post.publishedAt)} • {post.readTime}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPost(post)}
                          className="text-trilogy-blue hover:text-trilogy-navy"
                          data-oid=":7czcxe"
                        >
                          Read{" "}
                          <ArrowRight
                            className="h-3 w-3 ml-1"
                            data-oid="uthv6ov"
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
        <div className="mt-16" data-oid="ypxj2-c">
          <Card
            className="bg-gradient-to-r from-trilogy-blue to-trilogy-navy text-white"
            data-oid="aaamawx"
          >
            <CardContent className="p-8 text-center" data-oid="raw699f">
              <h3 className="text-2xl font-bold mb-4" data-oid="2_v1l72">
                Stay Updated with Global Trade Insights
              </h3>
              <p
                className="text-blue-100 mb-6 max-w-2xl mx-auto"
                data-oid="ptb5:og"
              >
                Get the latest articles, market analysis, and trade strategies
                delivered to your inbox. Join 5,000+ professionals who trust our
                insights.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                data-oid="ch-d31n"
              >
                <Input
                  placeholder="Enter your email"
                  className="bg-white text-gray-900"
                  data-oid="77w1o86"
                />

                <Button
                  variant="secondary"
                  className="whitespace-nowrap"
                  data-oid="t1ltb86"
                >
                  Subscribe Now
                </Button>
              </div>
              <p className="text-blue-100 text-sm mt-4" data-oid="yg41yvi">
                No spam. Unsubscribe anytime. Read our privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center" data-oid="6nq49_3">
          <h3
            className="text-xl font-bold text-gray-900 mb-4"
            data-oid="q442-bd"
          >
            Need Expert Guidance for Your Global Trade Operations?
          </h3>
          <p
            className="text-gray-600 mb-6 max-w-2xl mx-auto"
            data-oid="ilw0xqg"
          >
            Our team of international trade specialists is ready to help you
            navigate complex global markets, optimize your supply chain, and
            achieve your business goals.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-oid="-bzpir3"
          >
            <Link href="/" data-oid="zz:07fp">
              <Button
                className="bg-trilogy-blue hover:bg-trilogy-navy"
                data-oid="y0zumus"
              >
                <MessageCircle className="h-4 w-4 mr-2" data-oid="ygnlzmn" />
                Chat with Hexabot
              </Button>
            </Link>
            <Button variant="outline" data-oid="yyg21f.">
              <Phone className="h-4 w-4 mr-2" data-oid="k--1hf6" />
              Call +962796564791
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
