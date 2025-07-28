import { MapPin, Code, Cloud } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-swift-gray mb-8">
            Meet the Developer
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="/assets/WhatsApp Image 2025-07-27 at 3.59.57 PM_1753612347528.jpeg" 
                  alt="Gaurav - SwiftFormat Developer from Pune, India" 
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-swift-gray mb-4">Gaurav</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Gaurav is a developer based in Pune, India, specializing in web applications, serverless deployments, and automation. Passionate about enabling efficient and accessible digital workflows, he created SwiftFormat to democratize file conversion and processing capabilities for users worldwide.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-swift-teal">
                    <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span className="font-medium">Pune, India</span>
                  </div>
                  <div className="flex items-center text-swift-teal">
                    <Code className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span className="font-medium">Full-Stack Developer</span>
                  </div>
                  <div className="flex items-center text-swift-teal">
                    <Cloud className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span className="font-medium">Serverless Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
