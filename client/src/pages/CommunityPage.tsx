import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Heart, MessageSquare, Calendar, Award, Globe } from "lucide-react";

export const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Join Our Community
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with hosts and travelers who share your passion for Liberian hospitality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-gradient-card">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Host Network</h3>
              <p className="text-muted-foreground">
                Connect with experienced hosts, share tips, and learn best practices for hospitality.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
              <p className="text-muted-foreground">
                Join discussions, ask questions, and share your experiences with fellow community members.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card">
              <Calendar className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Local Events</h3>
              <p className="text-muted-foreground">
                Participate in meetups, workshops, and cultural events happening across Liberia.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Recognition Program</h3>
              <p className="text-muted-foreground">
                Get recognized for exceptional hospitality and contributions to the community.
              </p>
            </div>
          </div>

          <div className="bg-gradient-hero text-white rounded-2xl p-8 text-center mb-16">
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Building Connections Across Liberia</h2>
            <p className="text-white/90 mb-6">
              Our community brings together people from all 15 counties, creating lasting friendships 
              and cultural exchanges that enrich everyone's experience.
            </p>
            <Button variant="glass" size="lg">
              Join the Conversation
            </Button>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
                <Heart className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Respect & Kindness</h4>
                  <p className="text-sm text-muted-foreground">Treat all community members with respect and kindness</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
                <Users className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Inclusive Environment</h4>
                  <p className="text-sm text-muted-foreground">Welcome people from all backgrounds and experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};