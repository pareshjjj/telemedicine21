import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Stethoscope, Shield, Calendar, Phone, Users, Clock, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6 bg-green-100 text-green-800 px-4 py-2">
            🌿 India's Trusted Healthcare Platform
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AROGYPATH
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your trusted digital health companion providing 24/7 arogypath services, 
            expert doctor consultations, and comprehensive healthcare solutions for rural communities.
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Calendar className="mr-2 h-5 w-5" />
              Book Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
              <Phone className="mr-2 h-5 w-5" />
              Emergency Care
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-green-600 mr-2" />
                <h3 className="text-3xl font-bold text-green-600">10K+</h3>
              </div>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Stethoscope className="h-8 w-8 text-blue-600 mr-2" />
                <h3 className="text-3xl font-bold text-blue-600">500+</h3>
              </div>
              <p className="text-gray-600">Expert Doctors</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-green-600 mr-2" />
                <h3 className="text-3xl font-bold text-green-600">24/7</h3>
              </div>
              <p className="text-gray-600">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AROGYPATH?</h2>
          <p className="text-xl text-gray-600">Experience healthcare like never before</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-red-50 rounded-full w-fit">
                <Heart className="h-12 w-12 text-red-500" />
              </div>
              <CardTitle className="text-xl">24/7 Emergency Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Round-the-clock medical consultation with certified doctors whenever you need urgent care</p>
              <div className="flex items-center justify-center space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">(4.9/5)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-green-50 rounded-full w-fit">
                <Stethoscope className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-xl">Expert Specialists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Connect with specialized healthcare professionals across India for comprehensive medical care</p>
              <div className="flex items-center justify-center space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">(4.8/5)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-blue-50 rounded-full w-fit">
                <Shield className="h-12 w-12 text-blue-500" />
              </div>
              <CardTitle className="text-xl">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">End-to-end encrypted consultations with complete privacy protection and secure data storage</p>
              <div className="flex items-center justify-center space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">(5.0/5)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-lg text-gray-600">Real stories from real people</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"AROGYPATH એ મારા પરિવારના સ્વાસ્થ્યની દેખભાળ માટે બહુ સરસ છે. ડૉક્ટરો પણ ખૂબ સારા છે."</p>
              <div>
                <p className="font-semibold">રમેશ પટેલ</p>
                <p className="text-sm text-gray-600">Ahmedabad, Gujarat</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"As a healthcare provider, I appreciate AROGYPATH's user-friendly interface and secure platform."</p>
              <div>
                <p className="font-semibold">Dr. Priya Sharma</p>
                <p className="text-sm text-gray-600">Mumbai, Maharashtra</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"ਬਹੁਤ ਵਧੀਆ ਸੇਵਾ ਹੈ। ਘਰ ਬੈਠੇ ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰ ਸਕਦੇ ਹਾਂ।"</p>
              <div>
                <p className="font-semibold">ਸੁਰਿੰਦਰ ਸਿੰਘ</p>
                <p className="text-sm text-gray-600">Chandigarh, Punjab</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied patients who trust AROGYPATH for their healthcare needs</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8">
              Contact Support
            </Button>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>10K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
