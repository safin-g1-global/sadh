import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Heart Health Assessment",
      description:
        "Comprehensive evaluation of your cardiovascular risk factors",
    },
    {
      icon: Shield,
      title: "Diabetes Risk Screening",
      description: "Early detection and prevention strategies for diabetes",
    },
    {
      icon: Users,
      title: "Culturally Tailored Care",
      description: "Specialized health guidance for South Asian communities",
    },
  ];

  const benefits = [
    "Personalized health risk assessment",
    "Evidence-based recommendations",
    "Culturally appropriate guidance",
    "Free and confidential screening",
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Cardiologist",
      quote:
        "This tool provides invaluable insights for early detection and prevention in our community.",
    },
    {
      name: "Raj Patel",
      role: "Patient",
      quote:
        "The assessment helped me understand my risks and take proactive steps for my health.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your Health,
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    {" "}
                    Our Priority
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Take control of your health with our comprehensive diabetes
                  and heart health screening tool, specifically designed for the
                  South Asian community.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/assessment")}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Health Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="link"
                  size="lg"
                  className="hover:text-white text-lg px-8 py-6 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Quick Assessment</p>
                      <p className="text-white/80">Complete in 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Secure & Private</p>
                      <p className="text-white/80">Your data is protected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Personalized Results</p>
                      <p className="text-white/80">Tailored recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Screening
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our evidence-based assessment tools help identify your risk
              factors and provide personalized recommendations for better health
              outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Health Assessment?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate("/assessment")}
                className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Health Statistics
                </h3>
                <p className="text-gray-600">
                  South Asian Community Health Risks
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    2x Higher
                  </div>
                  <p className="text-gray-700">Risk of Type 2 Diabetes</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    40% Higher
                  </div>
                  <p className="text-gray-700">Risk of Heart Disease</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    85% Success
                  </div>
                  <p className="text-gray-700">Early Detection Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what doctors and patients are saying about our assessment tool
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Take the First Step Towards Better Health
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands who have already taken control of their health with
            our comprehensive assessment tool.
          </p>
          <Button
            onClick={() => navigate("/assessment")}
            size="lg"
            className="bg-white text-blue-600 hover:bg-white/90 text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Health Journey
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-xl font-bold">
                  South Asian Health Center
                </span>
              </div>
              <p className="text-gray-400">
                Dedicated to improving health outcomes in the South Asian
                community through early detection and prevention.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Health Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@southasianhealthcenter.org</p>
                <p>Phone: (555) 123-4567</p>
                <p>Address: 123 Health St, Medical District</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 South Asian Center for Diabetes and Heart Health. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
