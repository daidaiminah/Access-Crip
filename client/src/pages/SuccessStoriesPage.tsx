import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Quote, TrendingUp, Users } from "lucide-react";

export const SuccessStoriesPage = () => {
  const stories = [
    {
      name: "Sarah Johnson",
      location: "Sinkor, Monrovia",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face",
      story: "Started hosting my guest house 6 months ago and it's been amazing. I've met wonderful people from around the world and earned enough to support my family.",
      earnings: "$2,400",
      rating: 4.9
    },
    {
      name: "Emmanuel Koffa",
      location: "Central Monrovia",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story: "Access Crip helped me turn my apartment into a steady income source. The platform is easy to use and the support team is fantastic.",
      earnings: "$1,800",
      rating: 4.8
    },
    {
      name: "Mary Weah",
      location: "Robertsport",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      story: "Living in Robertsport, I never thought I could earn from tourism. Now I host surfers and beach lovers regularly. It's been life-changing!",
      earnings: "$3,200",
      rating: 5.0
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-muted-foreground">
              Real stories from hosts who are earning and thriving with Access Crip
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {stories.map((story, index) => (
              <div key={index} className="bg-gradient-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{story.name}</h3>
                    <p className="text-muted-foreground text-sm">{story.location}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm ml-1">{story.rating}</span>
                    </div>
                  </div>
                </div>
                
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-muted-foreground mb-6 italic">"{story.story}"</p>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Earnings</span>
                    <span className="text-lg font-bold text-green-600">{story.earnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-2xl bg-muted/30">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">89%</h3>
              <p className="text-muted-foreground">of hosts earn extra income within their first month</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-muted/30">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">successful hosts across Liberia</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-muted/30">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">4.8</h3>
              <p className="text-muted-foreground">average host rating on our platform</p>
            </div>
          </div>

          <div className="bg-gradient-hero text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-white/90 mb-6">
              Join hundreds of successful hosts who are earning money and meeting amazing people.
            </p>
            <Button variant="glass" size="lg" asChild>
              <Link to="/list-property">Start Hosting Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};