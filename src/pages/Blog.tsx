import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ArrowRight, Search, Tag, TrendingUp, BarChart3, Shield } from "lucide-react";
import { Link } from "react-router-dom";

// Sample blog data - in a real app this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "Global Trade Trends in 2024: What Businesses Need to Know",
    excerpt: "Explore the latest trends shaping international trade and how your business can adapt to the evolving global marketplace.",
    content: "The global trade landscape is constantly evolving, and 2024 has brought significant changes that businesses need to understand...",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Global Trade", "Market Trends", "Business Strategy"],
    featured: true
  },
  {
    id: 2,
    title: "The Future of Supply Chain Management in the Middle East",
    excerpt: "Discover how technology and innovation are transforming supply chain operations across the Middle East region.",
    content: "Supply chain management in the Middle East is undergoing a digital transformation...",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Supply Chain",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Supply Chain", "Technology", "Middle East"],
    featured: false
  },
  {
    id: 3,
    title: "Navigating International Trade Regulations: A Complete Guide",
    excerpt: "A comprehensive guide to understanding and complying with international trade regulations and customs requirements.",
    content: "International trade regulations can be complex and ever-changing...",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "Regulations",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Regulations", "Compliance", "Trade"],
    featured: false
  },
  {
    id: 4,
    title: "Sustainable Trading Practices: Building a Greener Future",
    excerpt: "Learn how to implement sustainable practices in your international trading operations for long-term success.",
    content: "Sustainability is no longer just a buzzword in international trade...",
    date: "2023-12-28",
    readTime: "6 min read",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1497436072909-f5e4be398877?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Sustainability", "Green Trade", "ESG"],
    featured: false
  },
  {
    id: 5,
    title: "Digital Transformation in International Trade",
    excerpt: "How digital technologies are revolutionizing the way businesses conduct international trade operations.",
    content: "The digital revolution has transformed every aspect of business...",
    date: "2023-12-20",
    readTime: "8 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Digital", "Technology", "Innovation"],
    featured: false
  },
  {
    id: 6,
    title: "Risk Management in Global Trade: Best Practices",
    excerpt: "Essential strategies for identifying, assessing, and mitigating risks in international trade operations.",
    content: "Risk management is crucial for successful international trade...",
    date: "2023-12-15",
    readTime: "9 min read",
    category: "Risk Management",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Risk Management", "Strategy", "Best Practices"],
    featured: false
  }
];

const categories = ["All", "Market Analysis", "Supply Chain", "Regulations", "Sustainability", "Technology", "Risk Management"];

const BlogCard = ({ post, featured = false }: { post: any; featured?: boolean }) => {
  const { i18n } = useTranslation();
  
  return (
    <article 
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div className={`relative ${featured ? "h-64 lg:h-80" : "h-48"} overflow-hidden`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className={`p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-brand-gold transition-colors ${
          featured ? "text-xl lg:text-2xl" : "text-lg"
        }`}>
          {post.title}
        </h3>
        
        <p className={`text-gray-600 mb-4 ${featured ? "text-base lg:text-lg" : "text-sm"}`}>
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          to={`/blog/${post.id}`}
          className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-bronze transition-colors font-medium"
        >
          Read More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className={`min-h-screen bg-gray-50 ${i18n.language === "ar" ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-brand-gold overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Trade Insights & News
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Stay informed with the latest trends, insights, and best practices in international trade and supply chain management.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-brand-gold ${
                  i18n.language === "ar" ? "text-right" : "text-left"
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-brand-gold text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or selecting a different category.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPost && selectedCategory === "All" && !searchTerm && (
                <BlogCard post={featuredPost} featured={true} />
              )}
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-brand-gold to-brand-bronze">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Trade Insights
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Subscribe to our newsletter and never miss important updates from the world of international trade.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white ${
                i18n.language === "ar" ? "text-right" : "text-left"
              }`}
            />
            <button className="bg-white text-brand-gold px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
