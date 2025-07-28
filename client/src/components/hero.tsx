import { Rocket, PlayCircle } from "lucide-react";

export default function Hero() {
  const scrollToConverter = () => {
    const element = document.getElementById('converter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="bg-gradient-to-br from-white to-gray-50 py-20" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-swift-gray mb-6">
            Fast, Free, AI-Powered
            <span className="text-swift-teal block">File Converter</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Convert videos, audio, documents, and data formats instantly. No software downloads, no limits, just lightning-fast conversions powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToConverter}
              className="bg-swift-teal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-swift-teal-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-swift-teal focus:ring-offset-2 shadow-lg"
            >
              <Rocket className="w-5 h-5 mr-2 inline" aria-hidden="true" />
              Start Converting Now
            </button>
            <button className="border-2 border-swift-teal text-swift-teal px-8 py-4 rounded-lg font-semibold text-lg hover:bg-swift-teal hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-swift-teal focus:ring-offset-2">
              <PlayCircle className="w-5 h-5 mr-2 inline" aria-hidden="true" />
              See How It Works
            </button>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-swift-teal">50+</div>
              <div className="text-gray-600">File Formats</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-swift-teal">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-swift-teal">⚡</div>
              <div className="text-gray-600">Lightning Fast</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-swift-teal">🔒</div>
              <div className="text-gray-600">Secure & Private</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
