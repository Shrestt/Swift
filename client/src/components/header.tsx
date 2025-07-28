import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-swift-teal cursor-pointer" onClick={() => scrollToSection('hero')}>
                <Zap className="w-6 h-6 mr-2 inline" aria-hidden="true" />
                SwiftFormat
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <button 
                  onClick={() => scrollToSection('converter')}
                  className="text-gray-700 hover:text-swift-teal px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Convert
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-700 hover:text-swift-teal px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-swift-teal px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('blog')}
                  className="text-gray-700 hover:text-swift-teal px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Blog
                </button>
                <button 
                  onClick={() => scrollToSection('donate')}
                  className="text-gray-700 hover:text-swift-teal px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Support
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('converter')}
              className="bg-swift-teal text-white px-4 py-2 rounded-lg font-medium hover:bg-swift-teal-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-swift-teal focus:ring-offset-2" 
              aria-label="Start converting files"
            >
              Start Converting
            </button>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-700 hover:text-swift-teal focus:outline-none focus:ring-2 focus:ring-swift-teal p-2" 
              aria-expanded={isMenuOpen}
              aria-label="Open main menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <button 
                onClick={() => scrollToSection('converter')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Convert
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('donate')}
                className="text-gray-700 hover:text-swift-teal block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Support
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
