import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, RotateCcw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClassificationResult {
  waste_type: string;
  confidence: number;
  reasoning: string;
  disposal_method: string;
}

const NeuroBinAI: React.FC = () => {
  const [currentView, setCurrentView] = useState<'upload' | 'camera' | 'preview' | 'result'>('upload');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { toast } = useToast();

  const wasteCategories = [
    { number: 1, name: 'Biodegradable Waste', color: 'bg-green-500' },
    { number: 2, name: 'Recyclable Waste', color: 'bg-blue-500' },
    { number: 3, name: 'Non-Recyclable Waste', color: 'bg-gray-500' },
    { number: 4, name: 'Hazardous Waste', color: 'bg-red-600' },
    { number: 5, name: 'Biomedical Waste', color: 'bg-pink-500' },
    { number: 6, name: 'E-waste', color: 'bg-purple-500' }
  ];

  const wasteConfigs = {
    biodegradable: { number: 1, label: 'Biodegradable Waste', bgColor: 'bg-green-50', borderColor: 'border-green-200', textColor: 'text-green-800', iconColor: 'bg-green-600' },
    recyclable: { number: 2, label: 'Recyclable Waste', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-800', iconColor: 'bg-blue-600' },
    nonrecyclable: { number: 3, label: 'Non-Recyclable Waste', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', textColor: 'text-gray-800', iconColor: 'bg-gray-600' },
    hazardous: { number: 4, label: 'Hazardous Waste', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-800', iconColor: 'bg-red-700' },
    biomedical: { number: 5, label: 'Biomedical Waste', bgColor: 'bg-pink-50', borderColor: 'border-pink-200', textColor: 'text-pink-800', iconColor: 'bg-pink-600' },
    ewaste: { number: 6, label: 'E-waste', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', textColor: 'text-purple-800', iconColor: 'bg-purple-600' }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const resizeImage = (file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    
    try {
      const resizedDataUrl = await resizeImage(file, 512, 512, 0.9);
      setImagePreview(resizedDataUrl);
      setImageBase64(resizedDataUrl.split(',')[1]);
      setCurrentView('preview');
      setError('');
    } catch (error) {
      setError('Could not process the selected image file.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCurrentView('camera');
      setError('');
    } catch (err) {
      setError('Could not access the camera. Please ensure you have given permission.');
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setImagePreview(dataUrl);
      setImageBase64(dataUrl.split(',')[1]);
      stopCamera();
      setCurrentView('preview');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCurrentView('upload');
  };

  const classifyImage = async () => {
    if (!imageBase64) {
      setError('Please provide an image first.');
      return;
    }

    setIsClassifying(true);
    setError('');

    const apiKey = "AIzaSyAD4OtSfd38C_wzG6bbJ_z7GOi3SE6jw8A";
    const model = "gemini-2.5-flash-preview-05-20";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const disposalGuidance = `
Based on the classification, determine the single most 'Optimal Disposal Method'. Use the following guidelines strictly:
1. Biodegradable Waste: Use 'Composting or Anaerobic Digestion (for biogas/fertilizer)'.
2. Recyclable Waste (Paper, Glass, Metal, non-PVC/PS Plastics): Use 'Recycling at a municipal facility'.
3. Non-Recyclable Waste (Contaminated or unrecyclable items): Use 'Landfill or Incineration with energy recovery'.
4. Hazardous Waste (Batteries, Paint, Chemicals): Use 'Take to a designated Hazardous Waste Collection Center (Neutralization/Stabilization)'.
5. Biomedical Waste (Infectious): Use 'Specialized Medical Waste Disposal (Autoclaving or Incineration)'.
6. E-waste (Electronics, phones): Use 'Certified E-waste Recycler or Manufacturer Take-back Program'.
`;

    const prompt = `Analyze the image and classify the waste into one of the following six categories: 'Biodegradable Waste', 'Recyclable Waste', 'Non-Recyclable Waste', 'Hazardous Waste', 'Biomedical Waste', or 'E-waste'. 
${disposalGuidance}
Respond ONLY with a valid JSON object containing 'waste_type', 'confidence', 'reasoning', and 'disposal_method' (which must be a string from the guidance above).`;

    const payload = {
      contents: [{
        parts: [
          { text: prompt },
          { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            waste_type: { type: "STRING", description: "One of 'Biodegradable Waste', 'Recyclable Waste', 'Non-Recyclable Waste', 'Hazardous Waste', 'Biomedical Waste', or 'E-waste'." },
            confidence: { type: "NUMBER", description: "A floating-point number between 0 and 1 representing classification certainty." },
            reasoning: { type: "STRING", description: "A brief, one-sentence explanation for the classification." },
            disposal_method: { type: "STRING", description: "The single optimal disposal method based on the provided guidance." }
          },
          required: ["waste_type", "confidence", "reasoning", "disposal_method"]
        }
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        let apiMessage = errorData.error?.message || 'API request failed with an unknown status.';
        
        if (apiMessage.includes('unregistered callers') || apiMessage.includes('API key not valid')) {
          apiMessage = "Authentication Failed: The provided API key may be invalid or restricted.";
        }
        throw new Error(apiMessage);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        const text = candidate.content.parts[0].text;
        const parsedJson = JSON.parse(text);
        setResult(parsedJson);
        setCurrentView('result');
        toast({
          title: "Classification Complete",
          description: `Identified as ${parsedJson.waste_type}`,
        });
      } else {
        throw new Error("Invalid response structure or empty result from the API.");
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsClassifying(false);
    }
  };

  const resetAll = () => {
    setCurrentView('upload');
    setImageBase64('');
    setImagePreview('');
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getWasteConfig = (wasteType: string) => {
    const normalizedType = wasteType.toLowerCase().replace(/ waste/g, '').replace(/-/g, '').replace(/\s/g, '');
    return wasteConfigs[normalizedType as keyof typeof wasteConfigs] || wasteConfigs.nonrecyclable;
  };

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            NeuroBin AI Classifier
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI-powered waste classification system. Upload a photo or use your camera to identify waste types and get proper disposal recommendations.
          </p>
        </div>

        {/* Categories Overview */}
        <Card className="mb-12 p-8 card-gradient border-border/50">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">6 Waste Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wasteCategories.map((category) => (
              <div key={category.number} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <div className={`w-8 h-8 rounded-full ${category.color} text-white text-sm font-bold flex items-center justify-center`}>
                  {category.number}
                </div>
                <span className="text-sm font-medium text-foreground">{category.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Application */}
        <Card className="p-8 card-gradient border-border/50">
          {/* Upload Section */}
          {currentView === 'upload' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Classify Waste</h3>
                <p className="text-muted-foreground">Upload a photo or use your camera to start classification.</p>
              </div>
              
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <p className="text-lg font-semibold text-foreground mb-2">Drag & drop an image here</p>
                <p className="text-muted-foreground mb-4">or</p>
                <p className="font-bold text-primary text-lg">Click to Select File</p>
              </div>

              <div className="text-center">
                <Button onClick={startCamera} size="lg" className="px-8 py-4">
                  <Camera className="w-6 h-6 mr-3" />
                  Use Camera
                </Button>
              </div>
            </div>
          )}

          {/* Camera Section */}
          {currentView === 'camera' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Camera View</h3>
                <p className="text-muted-foreground">Position the waste item in the camera view and take a photo.</p>
              </div>
              
              <video 
                ref={videoRef}
                className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-border"
                autoPlay
                playsInline
              />
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="flex gap-4 justify-center">
                <Button onClick={captureImage} size="lg" className="px-8">
                  Take Photo
                </Button>
                <Button onClick={stopCamera} variant="outline" size="lg" className="px-8">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Preview Section */}
          {currentView === 'preview' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Image Preview</h3>
                <p className="text-muted-foreground">Review your image and click classify to analyze the waste type.</p>
              </div>
              
              <div className="text-center">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-w-full max-h-96 mx-auto rounded-xl shadow-lg border border-border object-contain"
                />
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={classifyImage} 
                  disabled={isClassifying}
                  size="lg"
                  className="px-8"
                >
                  {isClassifying ? 'Classifying...' : 'Classify Waste'}
                </Button>
                <Button onClick={resetAll} variant="outline" size="lg" className="px-8">
                  Change Image
                </Button>
              </div>
            </div>
          )}

          {/* Result Section */}
          {currentView === 'result' && result && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-foreground mb-4">Classification Result</h3>
              </div>
              
              {(() => {
                const config = getWasteConfig(result.waste_type);
                return (
                  <Card className={`p-8 ${config.bgColor} border-2 ${config.borderColor}`}>
                    <div className="text-center space-y-6">
                      <div className="flex items-center justify-center">
                        <div className={`w-20 h-20 rounded-full ${config.iconColor} flex items-center justify-center text-white text-3xl font-bold mr-6`}>
                          {config.number}
                        </div>
                        <div className="text-left">
                          <h4 className={`text-3xl font-bold ${config.textColor}`}>
                            {config.number}. {config.label}
                          </h4>
                          <p className="text-lg font-semibold text-foreground mt-2">
                            Confidence: <span className="text-2xl">{(result.confidence * 100).toFixed(1)}%</span>
                          </p>
                        </div>
                      </div>
                      
                      <Card className="p-6 bg-background/70 border-2 border-dashed border-green-400">
                        <p className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Optimal Disposal Method:</p>
                        <p className="text-xl font-bold text-green-600">{result.disposal_method}</p>
                      </Card>
                      
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-muted-foreground italic">
                          <span className="font-semibold">Reasoning:</span> "{result.reasoning}"
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })()}

              <div className="text-center">
                <Button onClick={resetAll} size="lg" className="px-8">
                  <RotateCcw className="w-5 h-5 mr-3" />
                  Classify Another Item
                </Button>
              </div>
            </div>
          )}

          {/* Error Section */}
          {error && (
            <Card className="p-6 border-destructive bg-destructive/10 mb-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="w-6 h-6" />
                <div>
                  <span className="font-bold">Error:</span>
                  <span className="ml-2">{error}</span>
                </div>
              </div>
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
};

export default NeuroBinAI;