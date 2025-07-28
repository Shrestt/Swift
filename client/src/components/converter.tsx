import { useState, useRef } from "react";
import { CloudUpload, Settings, Wand2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ConversionSettings {
  outputFormat: string;
  quality: string;
  noiseReduction: boolean;
  autoCompression: boolean;
  ocr: boolean;
  transcription: boolean;
}

export default function Converter() {
  const [files, setFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>({
    outputFormat: '',
    quality: 'high',
    noiseReduction: false,
    autoCompression: false,
    ocr: false,
    transcription: false
  });
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const convertMutation = useMutation({
    mutationFn: async (data: { files: File[], settings: ConversionSettings }) => {
      // Validate file size (100MB limit)
      const maxSize = 100 * 1024 * 1024;
      const oversizedFiles = data.files.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        throw new Error(`File too large: ${oversizedFiles[0].name}. Maximum size is 100MB.`);
      }

      // Validate file types
      const allowedTypes = [
        'video/', 'audio/', 'image/', 'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/', 'application/json', 'text/csv'
      ];
      const invalidFiles = data.files.filter(file => 
        !allowedTypes.some(type => file.type.startsWith(type))
      );
      if (invalidFiles.length > 0) {
        throw new Error(`Unsupported file type: ${invalidFiles[0].name}`);
      }

      const formData = new FormData();
      data.files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('settings', JSON.stringify(data.settings));
      
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(300000), // 5 minute timeout
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error occurred' }));
        throw new Error(errorData.error || 'Conversion failed. Please try again.');
      }
      
      return response.blob();
    },
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted_file.${settings.outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setIsConverting(false);
      setProgress(0);
      toast({
        title: "Conversion Complete!",
        description: "Your file has been converted and downloaded.",
      });
    },
    onError: (error) => {
      setIsConverting(false);
      setProgress(0);
      
      // Enhanced error handling with retry suggestions
      let errorMessage = error.message || "An error occurred during conversion.";
      let description = "Please try again with a different file or format.";
      
      if (error.message?.includes('File too large')) {
        description = "Try compressing your file or use a smaller file (max 100MB).";
      } else if (error.message?.includes('Unsupported file type')) {
        description = "Please use a supported file format (video, audio, image, document).";
      } else if (error.message?.includes('Network error')) {
        description = "Check your internet connection and try again.";
      } else if (error.message?.includes('timeout')) {
        description = "File processing took too long. Try a smaller file or different format.";
      }
      
      toast({
        title: "Conversion Failed",
        description: `${errorMessage} ${description}`,
        variant: "destructive",
        action: (
          <button 
            onClick={() => {
              setFiles([]);
              setSettings({...settings, outputFormat: ''});
            }}
            className="text-sm underline"
          >
            Reset & Try Again
          </button>
        ),
      });
    }
  });

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const startConversion = () => {
    if (files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to convert.",
        variant: "destructive",
      });
      return;
    }

    if (!settings.outputFormat) {
      toast({
        title: "No Output Format",
        description: "Please select an output format.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    convertMutation.mutate({ files, settings });
  };

  return (
    <section id="converter" className="py-20 bg-white" aria-labelledby="converter-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="converter-heading" className="text-3xl md:text-4xl font-bold text-swift-gray mb-4">
            Convert Your Files Instantly
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Drag and drop your files or click to upload. We'll detect the format and convert it to your desired output.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* File Upload Zone */}
          <div 
            className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 mobile-drag-zone text-center hover:border-swift-teal transition-colors duration-200 cursor-pointer touch-action-manipulation"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            aria-label="Upload files by clicking or dragging and dropping"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
              accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.txt,.csv,.json,.xml,.yaml"
            />
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-swift-teal bg-opacity-10 p-6 rounded-full">
                  <CloudUpload className="w-12 h-12 text-swift-teal" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-swift-gray mb-2">
                  Drop your files here or click to upload
                </h3>
                <p className="text-gray-500">
                  Supports videos, audio, documents, images, and data files
                </p>
                {files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-swift-teal font-medium">
                      {files.length} file(s) selected: {files.map(f => f.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
              <Button className="bg-swift-teal text-white hover:bg-swift-teal-dark mobile-tap-target">
                Choose Files
              </Button>
            </div>
          </div>

          {/* Conversion Options */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-swift-gray mb-4">
                <Settings className="w-5 h-5 mr-2 text-swift-teal inline" aria-hidden="true" />
                Conversion Settings
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                  <Select value={settings.outputFormat} onValueChange={(value) => setSettings({...settings, outputFormat: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4 (Video)</SelectItem>
                      <SelectItem value="mp3">MP3 (Audio)</SelectItem>
                      <SelectItem value="pdf">PDF (Document)</SelectItem>
                      <SelectItem value="jpg">JPG (Image)</SelectItem>
                      <SelectItem value="png">PNG (Image)</SelectItem>
                      <SelectItem value="wav">WAV (Audio)</SelectItem>
                      <SelectItem value="mov">MOV (Video)</SelectItem>
                      <SelectItem value="docx">DOCX (Document)</SelectItem>
                      <SelectItem value="json">JSON (Data)</SelectItem>
                      <SelectItem value="csv">CSV (Data)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                  <Select value={settings.quality} onValueChange={(value) => setSettings({...settings, quality: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Quality</SelectItem>
                      <SelectItem value="medium">Medium Quality</SelectItem>
                      <SelectItem value="low">Low Quality (Smaller file)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-swift-gray mb-4">
                <Wand2 className="w-5 h-5 mr-2 text-swift-teal inline" aria-hidden="true" />
                AI Enhancements
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="noise-reduction" 
                    checked={settings.noiseReduction}
                    onCheckedChange={(checked) => setSettings({...settings, noiseReduction: !!checked})}
                  />
                  <label htmlFor="noise-reduction" className="text-sm text-gray-700">Noise reduction</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="auto-compression" 
                    checked={settings.autoCompression}
                    onCheckedChange={(checked) => setSettings({...settings, autoCompression: !!checked})}
                  />
                  <label htmlFor="auto-compression" className="text-sm text-gray-700">Auto-compression</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ocr" 
                    checked={settings.ocr}
                    onCheckedChange={(checked) => setSettings({...settings, ocr: !!checked})}
                  />
                  <label htmlFor="ocr" className="text-sm text-gray-700">OCR (for documents)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="transcription" 
                    checked={settings.transcription}
                    onCheckedChange={(checked) => setSettings({...settings, transcription: !!checked})}
                  />
                  <label htmlFor="transcription" className="text-sm text-gray-700">Auto-transcription</label>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isConverting && (
            <div className="mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 mobile-spacing">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-swift-gray">Converting your file...</h4>
                  <span className="text-sm text-swift-teal font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full progress-pulse" />
                <div className="mt-3 text-sm text-gray-600 text-center">
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-swift-teal border-t-transparent"></div>
                    Processing with AI enhancement...
                  </span>
                </div>
                {progress > 50 && (
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    Almost done! Please don't refresh the page.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Convert Button */}
          <div className="mt-8 text-center">
            <Button 
              onClick={startConversion}
              disabled={isConverting || files.length === 0}
              className="bg-swift-teal text-white px-12 py-4 text-lg font-semibold hover:bg-swift-teal-dark shadow-lg disabled:opacity-50 mobile-tap-target touch-action-manipulation"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                  Converting...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" aria-hidden="true" />
                  Convert File
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
