import { Zap } from "lucide-react";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-swift-gray text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Zap className="text-swift-teal w-8 h-8 mr-2" aria-hidden="true" />
              <h3 className="text-2xl font-bold">SwiftFormat</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Fast, free, AI-powered online file converter specializing in documents, audio, video, and data transformation. Created with ❤️ in Pune, India.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-swift-teal transition-colors duration-200" aria-label="Share on Twitter">
                <Twitter className="w-6 h-6" aria-hidden="true" />
              </button>
              <button className="text-gray-300 hover:text-swift-teal transition-colors duration-200" aria-label="Share on LinkedIn">
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </button>
              <button className="text-gray-300 hover:text-swift-teal transition-colors duration-200" aria-label="Share on GitHub">
                <Github className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-swift-teal transition-colors duration-200">Video Conversion</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-swift-teal transition-colors duration-200">Audio Processing</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-swift-teal transition-colors duration-200">Document OCR</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-swift-teal transition-colors duration-200">Image Enhancement</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-swift-teal transition-colors duration-200">Data Transformation</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => scrollToSection('blog')} className="hover:text-swift-teal transition-colors duration-200">How-to Guides</button></li>
              <li><button onClick={() => scrollToSection('blog')} className="hover:text-swift-teal transition-colors duration-200">FAQ</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-swift-teal transition-colors duration-200">About Developer</button></li>
              <li><button onClick={() => scrollToSection('donate')} className="hover:text-swift-teal transition-colors duration-200">Donate</button></li>
              <li><button className="hover:text-swift-teal transition-colors duration-200">Contact</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 SwiftFormat. Made with ❤️ by Gaurav in Pune, India. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <button className="hover:text-swift-teal transition-colors duration-200">Privacy Policy</button> | 
            <button className="hover:text-swift-teal transition-colors duration-200 ml-2">Terms of Service</button> | 
            <button className="hover:text-swift-teal transition-colors duration-200 ml-2">Sitemap</button>
          </p>
        </div>
      </div>
    </footer>
  );
}
