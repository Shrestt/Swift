import { Calendar, ArrowRight, FileText, Zap, Shield } from "lucide-react";
import { Link } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  icon: any;
}

const blogPosts: BlogPost[] = [
  {
    id: "ai-file-conversion-2025",
    title: "The Future of AI-Powered File Conversion in 2025",
    excerpt: "Discover how artificial intelligence is revolutionizing file conversion with advanced compression, format optimization, and smart processing.",
    date: "2025-01-27",
    readTime: "5 min read",
    category: "Technology",
    icon: Zap
  },
  {
    id: "mobile-file-processing",
    title: "Mobile-First File Processing: Best Practices for 2025",
    excerpt: "Learn how to optimize file conversion workflows for mobile devices with touch-friendly interfaces and efficient processing.",
    date: "2025-01-25",
    readTime: "4 min read",
    category: "Mobile",
    icon: FileText
  },
  {
    id: "secure-serverless-conversion",
    title: "Building Secure Serverless File Conversion Services",
    excerpt: "A comprehensive guide to creating secure, scalable file conversion services using serverless architecture and modern security practices.",
    date: "2025-01-22",
    readTime: "8 min read",
    category: "Security",
    icon: Shield
  }
];

const categories = ["All", "Technology", "Mobile", "Security", "Performance"];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-gray-50" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="blog-heading" className="text-3xl md:text-4xl font-bold text-swift-gray mb-4">
            SwiftFormat Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest in file conversion technology, AI enhancement features, and best practices for digital workflows.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full border border-swift-teal text-swift-teal hover:bg-swift-teal hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-swift-teal focus:ring-offset-2"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-swift-teal bg-opacity-10 p-2 rounded-lg">
                    <post.icon className="w-5 h-5 text-swift-teal" />
                  </div>
                  <span className="text-sm font-medium text-swift-teal">{post.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-swift-gray mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="flex items-center gap-2 text-swift-teal font-medium hover:text-swift-teal-dark transition-colors duration-200 group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-swift-gray text-center mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-swift-gray mb-3">How secure is file conversion?</h4>
                <p className="text-gray-600">
                  All files are processed securely in isolated serverless environments and automatically deleted after conversion. We never store your files permanently.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-swift-gray mb-3">What file sizes are supported?</h4>
                <p className="text-gray-600">
                  SwiftFormat supports files up to 100MB in size. For larger files, we recommend compressing them first or breaking them into smaller parts.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-swift-gray mb-3">How fast are conversions?</h4>
                <p className="text-gray-600">
                  Most conversions complete within 30 seconds. Complex video or large document conversions may take up to 5 minutes depending on file size and format.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-swift-gray mb-3">Is SwiftFormat really free?</h4>
                <p className="text-gray-600">
                  Yes! SwiftFormat is completely free to use with no hidden charges. We're supported by optional donations from users who find the service valuable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}