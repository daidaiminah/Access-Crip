import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, MessageCircle, Mail, Phone, Search } from "lucide-react";

export const HelpCenterPage = () => {
  const faqs = [
    {
      question: "How do I book a property?",
      answer: "Browse properties, select your dates, and follow the booking process. Payment is secure and protected."
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "Cancellation policies vary by property. Check the specific policy before booking and contact us for assistance."
    },
    {
      question: "How do I become a host?",
      answer: "Visit our 'List Your Property' page to start the verification process and list your accommodation."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use bank-level encryption and secure payment processors to protect your financial information."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-xl text-muted-foreground">
              Get answers to your questions and find the support you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-2xl bg-gradient-card">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Chat with our support team in real-time</p>
              <Button variant="outline">Start Chat</Button>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-card">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">Send us a detailed message</p>
              <Button variant="outline">Send Email</Button>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-card">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-muted-foreground mb-4">Call us for immediate assistance</p>
              <Button variant="outline">+231 XXX XXXX</Button>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 rounded-2xl bg-muted/30">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Button size="lg" asChild>
              <Link to="/about">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};