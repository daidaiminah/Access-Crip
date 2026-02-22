import { Navigation } from "@/components/Navigation";
import { Shield, Lock, Eye, Database } from "lucide-react";

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              How we collect, use, and protect your personal information
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 2024
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Database className="w-6 h-6 mr-3 text-primary" />
                Information We Collect
              </h2>
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Name, email address, and phone number</li>
                  <li>Profile photo and verification documents</li>
                  <li>Payment information and booking history</li>
                  <li>Communication preferences and reviews</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6">Property Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Property details, photos, and location</li>
                  <li>Availability and pricing information</li>
                  <li>Host verification documents</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-primary" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use your information to:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Provide and improve our services</li>
                  <li>• Process bookings and payments</li>
                  <li>• Verify identities and prevent fraud</li>
                  <li>• Send important updates and notifications</li>
                  <li>• Provide customer support</li>
                  <li>• Comply with legal requirements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-primary" />
                Data Protection
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• SSL encryption for all data transmission</li>
                  <li>• Secure servers with regular security updates</li>
                  <li>• Limited access to personal information</li>
                  <li>• Regular security audits and monitoring</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-primary" />
                Your Rights
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Access your personal information</li>
                  <li>• Update or correct your information</li>
                  <li>• Delete your account and personal data</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• Request a copy of your data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell your personal information. We may share information only in these circumstances:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• With your consent</li>
                  <li>• To provide services you've requested</li>
                  <li>• To comply with legal obligations</li>
                  <li>• To protect our rights and safety</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <div className="bg-muted/30 rounded-2xl p-6">
                <p className="text-muted-foreground mb-4">
                  If you have questions about this privacy policy or your personal information, contact us:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Email: privacy@accesscrip.com</li>
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