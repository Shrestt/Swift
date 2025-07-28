import SEOHead from "@/components/seo-head";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Converter from "@/components/converter";
import Features from "@/components/features";
import About from "@/components/about";
import Donations from "@/components/donations";
import Blog from "@/components/blog";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-swift-light text-swift-gray antialiased">
        <Header />
        <main role="main">
          <Hero />
          <Converter />
          <Features />
          <About />
          <Donations />
          <Blog />
          <section className="py-20 bg-swift-teal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Convert Your Files?
              </h2>
              <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust SwiftFormat for their file conversion needs. Fast, free, and AI-powered.
              </p>
              <button 
                className="bg-white text-swift-teal px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-swift-teal shadow-lg"
                onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Start Converting Now
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
