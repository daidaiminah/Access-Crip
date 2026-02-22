import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, BarChart, Shield, Globe } from "lucide-react";

export const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              How we use cookies and similar technologies on Access Crip
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 2024
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Cookie className="w-6 h-6 mr-3 text-primary" />
                What Are Cookies?
              </h2>
              <div className="text-muted-foreground">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  improving the functionality of our platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-card">
                  <Shield className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Essential Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Required for basic website functionality, security, and user authentication. 
                    These cannot be disabled.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-card">
                  <Settings className="w-8 h-8 text-blue-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Functional Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Remember your preferences like language settings, search filters, 
                    and previously viewed properties.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-card">
                  <BarChart className="w-8 h-8 text-purple-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Analytics Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Help us understand how visitors use our website so we can improve 
                    performance and user experience.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-card">
                  <Globe className="w-8 h-8 text-orange-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-3">Marketing Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Used to show you relevant advertisements and measure the effectiveness 
                    of our marketing campaigns.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Cookie Details</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Cookie Name</th>
                      <th className="text-left p-4 font-semibold">Purpose</th>
                      <th className="text-left p-4 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground text-sm">
                    <tr className="border-b">
                      <td className="p-4">ac_session</td>
                      <td className="p-4">Maintains user login session</td>
                      <td className="p-4">Session</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">ac_preferences</td>
                      <td className="p-4">Stores user preferences</td>
                      <td className="p-4">1 year</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">ac_analytics</td>
                      <td className="p-4">Website usage analytics</td>
                      <td className="p-4">2 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">ac_marketing</td>
                      <td className="p-4">Marketing and advertising</td>
                      <td className="p-4">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Managing Your Cookie Preferences</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You can control cookies in several ways:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Use our cookie consent banner when you first visit</li>
                  <li>• Adjust settings in your browser preferences</li>
                  <li>• Use browser extensions that block tracking</li>
                  <li>• Clear existing cookies from your device</li>
                </ul>
                <div className="bg-muted/30 rounded-lg p-4 mt-6">
                  <p className="text-sm">
                    <strong>Note:</strong> Disabling certain cookies may affect website functionality 
                    and your overall experience on Access Crip.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Third-Party Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may use third-party services that set their own cookies, including:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Google Analytics for website analytics</li>
                  <li>• Payment processors for secure transactions</li>
                  <li>• Social media platforms for sharing features</li>
                  <li>• Customer support tools for help functionality</li>
                </ul>
                <p className="mt-4">
                  These third parties have their own cookie policies that govern their use of cookies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <div className="bg-muted/30 rounded-2xl p-6">
                <p className="text-muted-foreground mb-4">
                  If you have questions about our use of cookies, contact us:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Email: privacy@accesscrip.com</li>
                  <li>Phone: +231 XXX XXXX</li>
                  <li>Address: Monrovia, Liberia</li>
                </ul>
              </div>
            </section>

            <div className="text-center pt-8">
              <Button size="lg">Manage Cookie Preferences</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};