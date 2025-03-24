// src/app/page.tsx - Enhanced landing page

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, GitBranch, BarChart, Shield, Landmark, Database, Code, Cpu, 
         MessageSquare, Zap, ArrowRight, Workflow, UserPlus } from "lucide-react";




         
export default function Home() {
  // Main feature cards
  const features = [
    {
      id: "conversation",
      name: "Data Conversation Agents",
      description: "Collaborate with multiple specialized AI agents to solve complex data engineering tasks through natural conversation",
      icon: MessageSquare,
      color: "bg-gradient-to-br from-purple-600 to-indigo-600",
      textColor: "text-white",
      link: "/conversation"
    },
    {
      id: "pipelines",
      name: "AI Data Pipelines",
      description: "Generate optimized code for ETL/ELT pipelines with intelligent agents that understand your data architecture",
      icon: Workflow,
      color: "bg-gradient-to-br from-cyan-500 to-blue-600",
      textColor: "text-white",
      link: "/execution?category=pipeline"
    },
    {
      id: "infrastructure",
      name: "AI Data Infrastructure",
      description: "Build and deploy scalable data infrastructure with AI-generated configurations and implementation code",
      icon: Server,
      color: "bg-gradient-to-br from-orange-500 to-pink-600",
      textColor: "text-white",
      link: "/execution?category=infrastructure"
    }
  ];

  // Strategy cards for the homepage
  const strategies = [
    {
      id: "infrastructure",
      name: "Infrastructure Setup",
      description: "Configure data engineering infrastructure with expert AI assistance",
      icon: Database,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-500"
    },
    {
      id: "pipeline",
      name: "Pipeline Construction",
      description: "Build robust ETL/ELT pipelines optimized for your specific needs",
      icon: GitBranch,
      color: "from-emerald-500/20 to-green-600/20",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-500"
    },
    {
      id: "code",
      name: "Code Generation",
      description: "Generate high-quality data engineering code in your preferred languages",
      icon: Code,
      color: "from-violet-500/20 to-purple-600/20",
      borderColor: "border-violet-500/30",
      iconColor: "text-violet-500"
    },
    {
      id: "analysis",
      name: "Data Analysis",
      description: "Analyze and derive insights from your data with AI-powered techniques",
      icon: BarChart,
      color: "from-cyan-500/20 to-blue-600/20",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-500"
    },
    {
      id: "quality",
      name: "Data Quality",
      description: "Implement robust validation and monitoring for data quality assurance",
      icon: Shield,
      color: "from-amber-500/20 to-yellow-600/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-500"
    },
    {
      id: "governance",
      name: "Data Governance",
      description: "Establish compliant data governance policies and practices",
      icon: Landmark,
      color: "from-red-500/20 to-rose-600/20",
      borderColor: "border-red-500/30", 
      iconColor: "text-red-500"
    }
  ];

  // Testimonials/Use cases
  const useCases = [
    {
      title: "Data Lake Implementation",
      description: "Our team built a complete data lake infrastructure in 73% less time using the agent-driven approach",
      company: "Financial Services Company"
    },
    {
      title: "Stream Processing Pipeline",
      description: "We developed and optimized a real-time analytics pipeline with the help of specialized AI agents",
      company: "E-commerce Platform"
    },
    {
      title: "Data Mesh Architecture",
      description: "Migrated from monolithic data warehouse to domain-driven data mesh with minimal engineering resources",
      company: "Healthcare Provider"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">

      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-cyan-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 right-10 w-96 h-96 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Hero section */}
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="pt-20 pb-16 lg:pt-28 lg:pb-24 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="flex flex-col space-y-4 mb-6">
                <a href="https://github.com/hottechstack/data-engineering-agents" className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-red-500/20 to-orange-500/20 border border-pink-500/30 backdrop-blur-sm hover:from-pink-500/30 hover:via-red-500/30 hover:to-orange-500/30 transition-all">
                  <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-pink-300 text-sm font-medium">
                    <span className="opacity-90">Opensource by</span> 
                    <span className="font-bold ml-1 group-hover:text-white transition-colors">HotTechStack</span>
                  </span>
                  <div className="ml-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs py-0.5 px-2 rounded-full font-semibold text-slate-900">
                    New
                  </div>
                </a>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 backdrop-blur-sm">
                  <span className="text-indigo-300 text-sm font-medium">Supercharge Your Data Engineering</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
                Data Engineering <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  Powered by AI Agents
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-xl mb-8">
                Leverage multiple specialized AI agents to solve complex data engineering 
                tasks, generate optimized code, and build scalable infrastructure - empowering Data Engineers to do more in less time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 h-12 px-6">
                  <Link href="/conversation" className="flex items-center gap-2">
                    Start Building Now <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-12 px-6">
                  <Link href="/execution">Direct Execution</Link>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <span className="text-small font-bold text-indigo-400">Data Engineering</span>
                  <span className="text-sm text-slate-400">Faster Development</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-small font-bold text-cyan-400">10+</span>
                  <span className="text-sm text-slate-400">Data Agents</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-small font-bold text-purple-400">Target</span>
                  <span className="text-sm text-slate-400">In Production</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative h-[520px] w-full max-w-lg mx-auto">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 opacity-75 blur"></div>
                <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-white shadow-xl">
                  {/* App Header */}
                  <div className="h-12 bg-white border-b flex items-center px-4 justify-between">
                    <span className="font-bold text-xl text-black">DataAgents</span>
                    {/* <div className="flex space-x-3">
                      <div className="text-gray-500 w-4 h-4">⚙️</div>
                      <div className="text-gray-500 w-4 h-4">🔄</div>
                      <div className="text-gray-500 w-4 h-4">📋</div>
                      <div className="text-gray-500 w-4 h-4">📂</div>
                    </div> */}
                  </div>
                  
                  {/* App Body */}
                  <div className="flex h-[468px] bg-gray-50">
                    {/* Left Sidebar */}
                    <div className="w-24 bg-white border-r flex flex-col">
                      <div className="p-2 border-b">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            <div className="bg-gray-200 text-xs rounded-full px-2 py-0.5 flex items-center">
                              <span className="mr-1">Agents</span>
                              <span className="bg-gray-300 rounded-full h-4 w-4 flex items-center justify-center text-xs">0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <div className="grid gap-2">
                          <div className="w-full aspect-square bg-blue-100 rounded-full flex items-center justify-center text-blue-600">DA</div>
                          <div className="w-full aspect-square bg-green-100 rounded-full flex items-center justify-center text-green-600">PE</div>
                          <div className="w-full aspect-square bg-amber-100 rounded-full flex items-center justify-center text-amber-600">DA</div>
                          <div className="w-full aspect-square bg-purple-100 rounded-full flex items-center justify-center text-purple-600">DS</div>
                          <div className="w-full aspect-square bg-red-100 rounded-full flex items-center justify-center text-red-600">GS</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                      {/* Chat Header */}
                      <div className="bg-white border-b h-10 flex items-center px-4 justify-between">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-blue-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-blue-600 font-semibold text-sm">Agent Discussion</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-green-100 text-green-600 text-xs rounded-full px-2 py-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                            <span>Connected</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-8 h-4 rounded-full bg-gray-200 flex items-center">
                              <div className="h-3 w-3 rounded-full bg-white border border-gray-300 translate-x-1"></div>
                            </div>
                            <span className="ml-1 text-xs text-gray-700">Live</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Chat Content */}
                      <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-center items-center bg-gray-50">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <h2 className="text-yellow-500 font-bold">Start a multi-agent conversation</h2>
                          <p className="text-gray-500 text-sm max-w-md mt-2">
                            Select agents from the panel and explore data engineering topics together.
                          </p>
                        </div>
                        
                        <div className="w-full max-w-md">
                          <div className="flex items-center mb-3">
                            <svg className="h-4 w-4 text-gray-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <h3 className="text-sm font-semibold">Frequently Asked Questions</h3>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="p-3 bg-white border rounded-md text-black hover:shadow-sm transition-shadow">
                              How would you design a scalable data pipeline architecture?
                            </div>
                            <div className="p-3 bg-white border rounded-md text-black hover:shadow-sm transition-shadow">
                              What are the best practices for data quality monitoring?
                            </div>
                            <div className="p-3 bg-white border rounded-md text-black hover:shadow-sm transition-shadow">
                              How should we approach migrating from batch to streaming data?
                            </div>
                          </div>
                          
                          <div className="mt-4 text-xs text-gray-500">
                            Current Strategy: <span className="font-medium">Sequential</span> • Agents respond in sequence, building on previous responses
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main features section */}
        <div className="py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Reinvent Your Data Engineering Workflow</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Automate complex data engineering tasks with GenAI agents that require minimal human assistance"
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link href={feature.link} key={feature.id} className="group">
                <Card className={`${feature.color} overflow-hidden h-full border-0 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg`}>
                  <CardHeader>
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-white/20 mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className={`${feature.textColor} text-xl`}>{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${feature.textColor} opacity-90`}>{feature.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center text-white">
                      <span>Get Started</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Strategies section */}
        <div className="py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Specialized Data Engineering Strategies</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose from various approaches tailored to your specific data challenges
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <Link href={`/conversation?strategy=${strategy.id}`} key={strategy.id} className="group">
                <div className={`h-full p-6 rounded-xl bg-gradient-to-br ${strategy.color} border ${strategy.borderColor} backdrop-blur-sm hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-800/60 transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-slate-900/40 ${strategy.iconColor}`}>
                    <strategy.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{strategy.name}</h3>
                  <p className="text-slate-300 text-sm">{strategy.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Technology stack section */}
        <div className="py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by Modern Data Technology</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our AI agents work with your preferred data technologies and frameworks
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 py-8">
            <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
              <div className="h-12 w-12 bg-[#00ACEE]/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-[#00ACEE] text-2xl font-bold">dbt</span>
              </div>
              <span className="text-sm text-slate-300">dbt</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
              <div className="h-12 w-12 bg-[#EF533F]/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-[#EF533F] text-2xl font-bold">Ap</span>
              </div>
              <span className="text-sm text-slate-300">Airflow</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
              <div className="h-12 w-12 bg-[#3775A9]/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-[#3775A9] text-2xl font-bold">Py</span>
              </div>
              <span className="text-sm text-slate-300">Python</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
              <div className="h-12 w-12 bg-[#FF9E2D]/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-[#FF9E2D] text-2xl font-bold">Sp</span>
              </div>
              <span className="text-sm text-slate-300">Spark</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
              <div className="h-12 w-12 bg-[#29B5E8]/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-[#29B5E8] text-2xl font-bold">Sf</span>
              </div>
              <span className="text-sm text-slate-300">Snowflake</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center">
              <div className="h-12 w-12 bg-[#336791]/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-[#336791] text-2xl font-bold">Pg</span>
              </div>
              <span className="text-sm text-slate-300">PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Use cases section */}
        <div className="py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real-World Success Stories</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how organizations have transformed their data engineering workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-slate-300 mb-4">{useCase.description}</p>
                <div className="text-sm text-indigo-400">{useCase.company}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="py-16 relative z-10">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-800/30 p-8 md:p-12 text-center backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Data Engineering Workflow?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Start building with AI-powered data engineering agents today.
              Experience the future of data infrastructure development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 h-12 px-8">
                <Link href="/conversation" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white h-12 px-8">
                <Link href="/execution">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-12 border-t border-slate-800 text-center text-slate-400 text-sm relative z-10">
          <p>© 2025 Data Engineering Agents Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}