import { Video, Music, FileText, Image, Database, Captions, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Video Conversion",
    description: "Convert between MP4, MOV, AVI, MKV with compression and quality optimization.",
    badge: "Supports 15+ formats"
  },
  {
    icon: Music,
    title: "Audio Processing",
    description: "MP3, WAV, OGG conversion with noise reduction and enhancement.",
    badge: "AI-powered cleanup"
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description: "PDF, Word, Excel with OCR, translation, and table extraction.",
    badge: "Smart text recognition"
  },
  {
    icon: Image,
    title: "Image Enhancement",
    description: "JPG, PNG, WebP with upscaling, compression, and watermarking.",
    badge: "AI upscaling available"
  },
  {
    icon: Database,
    title: "Data Transformation",
    description: "CSV, JSON, XML, YAML conversion with data validation.",
    badge: "Smart data mapping"
  },
  {
    icon: Captions,
    title: "AI Transcription",
    description: "Automatic speech-to-text with multiple language support.",
    badge: "95%+ accuracy rate"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-swift-gray mb-4">
            Powerful Features for Every Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From simple format conversions to advanced AI-powered enhancements, SwiftFormat handles all your file processing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="bg-swift-teal bg-opacity-10 p-3 rounded-lg">
                  <feature.icon className="text-swift-teal w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-swift-gray">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="text-sm text-swift-teal font-medium">
                {feature.badge} <ArrowRight className="w-4 h-4 ml-1 inline" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
