import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
}

const blogPosts: { [key: string]: BlogPostData } = {
  "ai-file-conversion-2025": {
    id: "ai-file-conversion-2025",
    title: "The Future of AI-Powered File Conversion in 2025",
    excerpt: "Discover how artificial intelligence is revolutionizing file conversion with advanced compression, format optimization, and smart processing.",
    date: "2025-01-27",
    readTime: "5 min read",
    category: "Technology",
    author: "Gaurav",
    tags: ["AI", "File Conversion", "Technology", "2025"],
    content: "The landscape of file conversion is rapidly evolving, and artificial intelligence is at the forefront of this transformation. As we move through 2025, AI-powered conversion tools are becoming more sophisticated, efficient, and user-friendly than ever before. Traditional file conversion tools simply translate one format to another, often resulting in quality loss or inefficient file sizes. AI-powered systems like SwiftFormat are changing this paradigm by implementing intelligent compression algorithms that analyze file content to determine optimal compression settings. This results in smaller file sizes without compromising quality, adaptive bitrates for video and audio files, and smart image optimization that preserves important details. Instead of one-size-fits-all conversion, AI systems consider the intended use of the converted file, device compatibility requirements, network bandwidth constraints, and storage limitations. Content creators are using AI-powered conversion to automatically optimize videos for different social media platforms, generate multiple quality versions for adaptive streaming, and remove noise while enhancing audio quality during conversion. Businesses are leveraging AI conversion for OCR-enhanced PDF creation from scanned documents, smart layout preservation when converting between formats, and automatic language detection with text enhancement. With mobile devices handling more file processing than ever, AI optimizes conversions for mobile hardware limitations, uses battery-conscious processing algorithms to reduce power consumption, and provides touch-friendly interfaces that make complex conversions simple."
  },
  "mobile-file-processing": {
    id: "mobile-file-processing",
    title: "Mobile-First File Processing: Best Practices for 2025",
    excerpt: "Learn how to optimize file conversion workflows for mobile devices with touch-friendly interfaces and efficient processing.",
    date: "2025-01-25",
    readTime: "4 min read",
    category: "Mobile",
    author: "Gaurav",
    tags: ["Mobile", "UX", "Performance", "Touch"],
    content: "With over 60% of file conversion requests now originating from mobile devices, designing mobile-first conversion experiences has become critical for success. Mobile devices face unique challenges including limited RAM for processing large files, battery consumption considerations during intensive operations, storage constraints that affect temporary file handling, and network variability affecting upload and download speeds. Mobile users expect instant feedback on upload progress, clear error messages with actionable solutions, touch-optimized interfaces with appropriate tap targets, and offline capabilities when possible. Design principles for mobile file processing include implementing minimum 44px tap targets for all interactive elements, adequate spacing between buttons to prevent mis-taps, large drag-and-drop zones with minimum 200px height on mobile, and clear visual feedback for touch interactions. Progressive disclosure starts with simple options and reveals advanced settings as needed, uses collapsible sections for detailed settings, implements step-by-step wizards for complex conversions, and provides smart defaults to minimize configuration. Performance optimization leverages WebAssembly for intensive computation, Service Workers for background processing, local storage for temporary file caching, and progressive loading for large file handling. Network efficiency includes chunked uploads for large files with resume capability, compression before network transfer, delta sync for incremental updates, and offline queuing for when connectivity is poor."
  },
  "secure-serverless-conversion": {
    id: "secure-serverless-conversion",
    title: "Building Secure Serverless File Conversion Services",
    excerpt: "A comprehensive guide to creating secure, scalable file conversion services using serverless architecture and modern security practices.",
    date: "2025-01-22",
    readTime: "8 min read",
    category: "Security",
    author: "Gaurav",
    tags: ["Security", "Serverless", "Architecture", "Privacy"],
    content: "Serverless architecture offers incredible scalability and cost-effectiveness for file conversion services, but it also introduces unique security challenges. In serverless environments, the cloud provider handles infrastructure security while the developer handles application and data security, creating a shared responsibility model. Serverless applications face specific threats including function injection through file uploads, resource exhaustion attacks, data leakage between function invocations, and dependency vulnerabilities in deployment packages. File upload security requires multi-layer file validation including MIME type checks, file signature verification, and malware scanning. Input validation must include file size limits to prevent resource exhaustion, upload rate limiting per user or IP address, concurrent processing limits to manage costs, and timeout configurations for long-running conversions. Secure file handling uses encrypted temporary storage with automatic cleanup, unique file naming to prevent conflicts, isolated processing environments for each conversion, and no persistent file storage to minimize data exposure. Authentication and authorization implement token-based authentication with JWT validation, API endpoint rate limiting to prevent abuse, user-based quotas for conversion limits, and IP-based restrictions for suspicious activity. Data protection includes end-to-end encryption with TLS 1.3 for data in transit and AES-256 encryption for data at rest, along with key rotation policies and hardware security modules for key management. Privacy compliance requires data minimization by processing only necessary data for conversion, automatic data deletion after processing, no user data logging in application logs, and privacy-by-design architecture principles."
  }
};

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-swift-light dark:bg-swift-gray">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-swift-gray dark:text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The requested blog post could not be found.</p>
          <Link href="/#blog" className="text-swift-teal hover:text-swift-teal-dark">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-swift-light dark:bg-swift-gray">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back to Blog */}
        <Link href="/#blog" className="inline-flex items-center text-swift-teal hover:text-swift-teal-dark mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-swift-teal text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-swift-gray dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-swift-teal text-white rounded-full flex items-center justify-center font-bold">
                {post.author[0]}
              </div>
              <div>
                <div className="font-medium text-swift-gray dark:text-white">{post.author}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Developer & Creator</div>
              </div>
            </div>
            
            <button className="flex items-center gap-2 text-swift-teal hover:text-swift-teal-dark transition-colors duration-200">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            {post.content.split('. ').map((sentence, index) => (
              <p key={index} className="mb-4">
                {sentence}{sentence.endsWith('.') ? '' : '.'}
              </p>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-swift-gray dark:text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-swift-teal hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-swift-gray dark:text-white mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(blogPosts)
              .filter(p => p.id !== postId)
              .slice(0, 2)
              .map((relatedPost) => (
              <Link 
                key={relatedPost.id} 
                href={`/blog/${relatedPost.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-sm text-swift-teal font-medium mb-2">{relatedPost.category}</div>
                <h4 className="text-lg font-bold text-swift-gray dark:text-white mb-3 line-clamp-2">{relatedPost.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{relatedPost.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(relatedPost.date).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  {relatedPost.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
}