import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, Shield, Heart, Globe, Award } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">About Access Crip</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting travelers with authentic Liberian hospitality. We're building 
              bridges between communities and creating opportunities for everyone.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                To make travel accessible and affordable for everyone while empowering 
                Liberian property owners to share their spaces and generate income.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Stays</h3>
                <p className="text-muted-foreground">
                  Every property is vetted to ensure comfort, safety, and authenticity for our guests.
                </p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Community First</h3>
                <p className="text-muted-foreground">
                  We believe in building strong communities and supporting local businesses.
                </p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Trust & Safety</h3>
                <p className="text-muted-foreground">
                  Advanced security measures and verification processes protect all users.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            </div>
            
            <div className="prose prose-lg mx-auto">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Access Crip was born from a simple idea: every Liberian should have the 
                opportunity to showcase their beautiful country and earn from it. Founded 
                in 2024, we started as a small team passionate about connecting people 
                through authentic travel experiences.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                We noticed that many beautiful properties across Liberia's 15 counties 
                were sitting empty while travelers struggled to find authentic, affordable 
                accommodations. Access Crip bridges this gap by providing a secure, 
                easy-to-use platform for property owners and guests.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to serve over 2,000 happy guests and support hundreds 
                of property owners across Liberia. Our journey is just beginning, and 
                we're excited to continue building a platform that truly serves our community.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We celebrate genuine Liberian culture and hospitality.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    Travel should be accessible to everyone, regardless of budget.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in every interaction and experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're looking for a place to stay or have a space to share, 
              we'd love to have you join the Access Crip family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/list-property">List Your Property</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/explore">Start Exploring</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};