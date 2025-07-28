import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Donations() {
  const [hasDonated, setHasDonated] = useState(false);

  const handleDonated = () => {
    setHasDonated(true);
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-swift-teal to-swift-teal-dark" aria-labelledby="donate-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="donate-heading" className="text-3xl md:text-4xl font-bold text-white mb-8">
            Support SwiftFormat
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-12 max-w-2xl mx-auto">
            SwiftFormat is free and always will be. If you find it useful, consider supporting our development with a small donation.
          </p>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-swift-gray mb-6">Donate via FamPay</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="bg-swift-teal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                    <div>Scan the QR code with your UPI app or FamPay</div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-swift-teal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                    <div>Enter any amount you'd like to contribute</div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-swift-teal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                    <div>Complete the payment and click "I've Donated" below</div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleDonated}
                  disabled={hasDonated}
                  className="mt-8 bg-swift-teal text-white hover:bg-swift-teal-dark disabled:opacity-75"
                >
                  <Heart className="w-5 h-5 mr-2" aria-hidden="true" />
                  {hasDonated ? "❤️ Thank You!" : "I've Donated"}
                </Button>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
                  <img 
                    src="/assets/Fampay-QR_1753612356045.jpeg" 
                    alt="FamPay QR Code for Donations to SwiftFormat" 
                    className="w-48 h-48 mx-auto object-contain"
                  />
                  <p className="text-center text-sm text-gray-600 mt-4">Scan to donate via UPI</p>
                </div>
              </div>
            </div>
            
            {/* Thank you message */}
            {hasDonated && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🙏</div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Thank You!</h4>
                  <p className="text-green-700">
                    Your generous support means the world to us! The SwiftFormat team and Gaurav are incredibly grateful for your contribution. Your donation helps us keep the service free and continuously improve it for everyone.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
