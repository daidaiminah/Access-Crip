import { Navigation } from "@/components/Navigation";
import { FileText, Users, CreditCard, Shield, AlertTriangle, Scale } from "lucide-react";

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              The terms and conditions governing your use of Access Crip
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 2024
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-primary" />
                Acceptance of Terms
              </h2>
              <div className="text-muted-foreground">
                <p>
                  By accessing and using Access Crip, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, 
                  you are prohibited from using this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-primary" />
                User Responsibilities
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold">For Guests:</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Provide accurate booking information</li>
                  <li>• Respect property rules and local laws</li>
                  <li>• Leave properties in good condition</li>
                  <li>• Communicate respectfully with hosts</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6">For Hosts:</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Provide accurate property descriptions</li>
                  <li>• Maintain property safety and cleanliness</li>
                  <li>• Respond promptly to guest inquiries</li>
                  <li>• Honor confirmed bookings</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-primary" />
                Payment Terms
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Payments are processed securely through our platform</li>
                  <li>• Service fees are clearly disclosed before booking</li>
                  <li>• Refunds are subject to cancellation policies</li>
                  <li>• Hosts receive payments after guest check-in</li>
                  <li>• All prices are in USD unless otherwise specified</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-primary" />
                Safety and Security
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Access Crip is committed to providing a safe platform. We:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Verify host and guest identities</li>
                  <li>• Monitor suspicious activity</li>
                  <li>• Provide 24/7 customer support</li>
                  <li>• Maintain secure payment processing</li>
                  <li>• Investigate reported incidents</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-primary" />
                Prohibited Activities
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>The following activities are strictly prohibited:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Fraudulent or misleading listings</li>
                  <li>• Discrimination based on protected characteristics</li>
                  <li>• Harassment or inappropriate behavior</li>
                  <li>• Circumventing platform fees</li>
                  <li>• Using the platform for illegal activities</li>
                  <li>• Creating fake accounts or reviews</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Scale className="w-6 h-6 mr-3 text-primary" />
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Access Crip acts as a platform connecting hosts and guests. We are not responsible for:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Property conditions or safety</li>
                  <li>• Actions of hosts or guests</li>
                  <li>• Property damage or theft</li>
                  <li>• Force majeure events</li>
                </ul>
                <p className="mt-4">
                  Users participate at their own risk and are encouraged to have appropriate insurance coverage.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Governing Law</h2>
              <div className="text-muted-foreground">
                <p>
                  These terms are governed by the laws of the Republic of Liberia. Any disputes 
                  will be resolved in the courts of Monrovia, Liberia.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-muted/30 rounded-2xl p-6">
                <p className="text-muted-foreground mb-4">
                  For questions about these terms, contact us:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Email: legal@accesscrip.com</li>
                  <li>Phone: +231 XXX XXXX</li>
                  <li>Address: Monrovia, Liberia</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};