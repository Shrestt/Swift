import { useEffect } from 'react';

export default function SEOHead() {
  useEffect(() => {
    // Set page title
    document.title = "SwiftFormat - Fast, Free, AI-Powered File Converter | Convert Videos, Audio, Documents Online";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'SwiftFormat is a fast, free, AI-powered online file converter specializing in documents, audio, video, and data transformation. Convert MOV to MP4, PDF to Word, MP3 to WAV, and more instantly.');
    }
  }, []);

  return null;
}
