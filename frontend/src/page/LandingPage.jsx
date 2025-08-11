import React from 'react'
import Navbar from '../components/Navbar'
import { BeamsBackground } from '../components/ui/beams-background'
import { ArrowRight, Shield, TrendingUp, PieChart, DollarSign, Target, Users, Award, Bell, Check } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section with BeamsBackground */}
      <section className="relative overflow-hidden">
        <BeamsBackground intensity="medium" className="h-screen">
          <Navbar isInHero={true} />
          
          <div className="flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Take Control of Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Financial Future
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Track expenses, manage budgets, and achieve your financial goals with our 
                intuitive and powerful finance management platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 group shadow-lg shadow-blue-600/25"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </div>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/50 backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span>Real-time Analytics</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/50 backdrop-blur-sm">
                  <PieChart className="h-4 w-4 text-purple-400" />
                  <span>Smart Insights</span>
                </div>
              </div>
            </div>
          </div>
        </BeamsBackground>
      </section>

      {/* Regular Navbar for other sections */}
      <Navbar isInHero={false} />

      {/* Features Preview */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="block text-blue-400">Manage Your Money</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to simplify your financial life and help you make smarter money decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Expense Tracking",
                description: "Automatically categorize and track all your expenses with smart AI-powered insights.",
                color: "text-green-400"
              },
              {
                icon: Target,
                title: "Budget Planning",
                description: "Set realistic budgets and get alerts when you're approaching your limits.",
                color: "text-blue-400"
              },
              {
                icon: PieChart,
                title: "Visual Analytics",
                description: "Beautiful charts and graphs to understand your spending patterns at a glance.",
                color: "text-purple-400"
              },
              {
                icon: TrendingUp,
                title: "Financial Goals",
                description: "Set and track progress towards your savings and investment goals.",
                color: "text-orange-400"
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Get intelligent alerts about spending patterns, upcoming bills, and savings opportunities.",
                color: "text-red-400"
              },
              {
                icon: Users,
                title: "Family Sharing",
                description: "Share budgets and expenses with family members for better coordination.",
                color: "text-cyan-400"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gray-800/50 mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Choose Your
              <span className="block text-blue-400">Perfect Plan</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start with our free plan and upgrade as your financial management needs grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 hover:bg-gray-800/50 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  $0
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <p className="text-gray-400">Perfect to get started</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Basic expense tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Simple budget planning</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Monthly reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Up to 3 financial goals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Mobile app access</span>
                </li>
              </ul>

              <Link to="/register" className="block">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 py-3 text-lg font-semibold transition-all duration-200"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/50 rounded-xl p-8 relative hover:from-blue-600/30 hover:to-blue-800/30 transition-all duration-300">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  $9
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <p className="text-gray-400">For serious financial planning</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Advanced analytics & insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Unlimited financial goals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Custom categories & tags</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Smart notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Family sharing</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Priority support</span>
                </li>
              </ul>

              <Link to="/register" className="block">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-200 hover:scale-105"
                >
                  Start Pro Trial
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400">
              All plans include a 14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-16 w-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="block text-blue-400">Financial Life?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their finances. 
            Start your free trial today and see the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 group"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            
            <div className="text-sm text-gray-400">
              No credit card required • 14-day free trial
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Finance<span className="text-blue-400">Tracker</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering individuals and families to take control of their financial future 
                through smart, intuitive money management tools.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#api" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinanceTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage