'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  MessageCircle
} from 'lucide-react';

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
    id: '1',
    title: 'Navigating Post-Pandemic Global Supply Chains: A Strategic Guide for 2024',
    excerpt: 'The global supply chain landscape has fundamentally shifted. Learn how businesses are adapting their sourcing strategies to build resilience and maintain competitive advantages in the new normal.',
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
    author: 'Sarah Al-Rashid',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Supply Chain',
    tags: ['Supply Chain', 'Global Trade', 'Risk Management', 'Strategy'],
    featured: true
  },
  {
    id: '2',
    title: 'The Complete Guide to Trade Documentation in 2024: Avoiding Costly Delays',
    excerpt: 'Proper documentation is the backbone of international trade. Discover the essential documents, common pitfalls, and best practices that can save your business time and money.',
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
    author: 'Ahmed Hassan',
    publishedAt: '2024-01-10',
    readTime: '6 min read',
    category: 'Documentation',
    tags: ['Trade Documentation', 'Customs', 'Compliance', 'Import/Export'],
    featured: false
  },
  {
    id: '3',
    title: 'Asia-Europe Trade Corridor: Opportunities and Challenges in 2024',
    excerpt: 'The Asia-Europe trade route remains one of the world\'s most important commercial highways. Explore the latest developments, opportunities, and strategic considerations for businesses.',
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
    author: 'Maria Gonzalez',
    publishedAt: '2024-01-05',
    readTime: '7 min read',
    category: 'Market Analysis',
    tags: ['Asia-Europe', 'Trade Routes', 'Market Analysis', 'Logistics'],
    featured: true
  },
  {
    id: '4',
    title: 'Digital Transformation in Global Trade: How AI is Revolutionizing Operations',
    excerpt: 'Artificial Intelligence and digital technologies are transforming international trade operations. Learn how forward-thinking companies are leveraging these tools for competitive advantage.',
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
    author: 'David Chen',
    publishedAt: '2023-12-28',
    readTime: '9 min read',
    category: 'Technology',
    tags: ['AI', 'Digital Transformation', 'Technology', 'Innovation'],
    featured: false
  },
  {
    id: '5',
    title: 'Building Resilient Supplier Relationships: Lessons from Industry Leaders',
    excerpt: 'Strong supplier relationships are the foundation of successful global trade. Discover proven strategies for building and maintaining partnerships that withstand market volatility.',
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
    author: 'Jennifer Park',
    publishedAt: '2023-12-20',
    readTime: '6 min read',
    category: 'Supplier Management',
    tags: ['Supplier Relations', 'Partnership', 'Performance Management', 'Strategy'],
    featured: false
  }
];

const categories = ['All', 'Supply Chain', 'Documentation', 'Market Analysis', 'Technology', 'Supplier Management'];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Supply Chain': <TrendingUp className="h-4 w-4" />,
      'Documentation': <FileText className="h-4 w-4" />,
      'Market Analysis': <Globe className="h-4 w-4" />,
      'Technology': <MessageCircle className="h-4 w-4" />,
      'Supplier Management': <Users className="h-4 w-4" />
    };
    return icons[category as keyof typeof icons] || <Tag className="h-4 w-4" />;
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2"
                >
                  ← Back to Blog
                </Button>
                <Link href="/" className="text-trilogy-blue hover:underline">
                  Home
                </Link>
              </div>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                {getCategoryIcon(selectedPost.category)}
                <span className="text-trilogy-blue font-medium">{selectedPost.category}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedPost.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
                {selectedPost.excerpt}
              </div>
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {selectedPost.content}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-gradient-to-r from-trilogy-blue to-trilogy-navy rounded-lg text-white">
              <h3 className="text-xl font-bold mb-2">Ready to Transform Your Global Trade Operations?</h3>
              <p className="mb-4">
                Get expert guidance from our team of international trade specialists. 
                Chat with Hexabot or contact us directly for personalized solutions.
              </p>
              <div className="flex gap-4">
                <Link href="/">
                  <Button variant="secondary">
                    Chat with Hexabot
                  </Button>
                </Link>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-trilogy-blue">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trilogy Trading Blog</h1>
              <p className="text-gray-600">Insights, strategies, and trends in global trade</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline">Chat with Hexabot</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && searchTerm === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {getCategoryIcon(post.category)}
                        <span className="text-trilogy-blue font-medium text-sm">{post.category}</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                          Featured
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{post.author}</span>
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          onClick={() => setSelectedPost(post)}
                          className="text-trilogy-blue hover:text-trilogy-navy"
                        >
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
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
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            {searchTerm && ` (${filteredPosts.length} results for "${searchTerm}")`}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {getCategoryIcon(post.category)}
                        <span className="text-trilogy-blue font-medium text-sm">{post.category}</span>
                        {post.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <div>{post.author}</div>
                          <div>{formatDate(post.publishedAt)} • {post.readTime}</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedPost(post)}
                          className="text-trilogy-blue hover:text-trilogy-navy"
                        >
                          Read <ArrowRight className="h-3 w-3 ml-1" />
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
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-trilogy-blue to-trilogy-navy text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated with Global Trade Insights</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Get the latest articles, market analysis, and trade strategies delivered to your inbox. 
                Join 5,000+ professionals who trust our insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white text-gray-900"
                />
                <Button variant="secondary" className="whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-blue-100 text-sm mt-4">
                No spam. Unsubscribe anytime. Read our privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Need Expert Guidance for Your Global Trade Operations?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team of international trade specialists is ready to help you navigate complex global markets, 
            optimize your supply chain, and achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-trilogy-blue hover:bg-trilogy-navy">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with Hexabot
              </Button>
            </Link>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call +962 79 687 2273
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}