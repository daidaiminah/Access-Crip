import { Navigation } from "@/components/Navigation";
import { Shield, CheckCircle, Users, Lock, AlertTriangle, Phone } from "lucide-react";

export const SafetyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn about the measures we take to ensure a safe experience for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-gradient-card">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Verified Properties</h3>
              <p className="text-muted-foreground">
                All properties undergo thorough verification to ensure they meet our safety and quality standards.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Background Checks</h3>
              <p className="text-muted-foreground">
                Hosts are verified through comprehensive background checks and identity verification processes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
              <p className="text-muted-foreground">
                Your payment information is protected with bank-level encryption and secure processing.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card">
              <Phone className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our support team is available around the clock to assist with any safety concerns or emergencies.
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Safety Guidelines</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <p>Always communicate through our platform for your protection</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <p>Verify property details and host information before booking</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <p>Report any suspicious activity or safety concerns immediately</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <p>Keep emergency contact information easily accessible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};