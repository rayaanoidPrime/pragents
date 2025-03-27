// src/app/landing/page.tsx - Enhanced landing page

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Zap, Database, Code, Layers, GitBranch, Bot } from "lucide-react";

export default function Home() {
  // Core features of the platform
  const coreFeatures = [
    {
      title: "Data Engineering Agents",
      description: "Specialized AI agents collaborate to solve complex data engineering tasks through natural conversation",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Deep Thinking Coordination",
      description: "Multiple agents work together to analyze problems, coordinating across tools to find the optimal solution",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Testing Environment Deployment",
      description: "Fully deploy and test solutions in controlled environments using autonomous agents",
      icon: Layers,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
    },
  ];

  // Technology stack
  const techStack = [
    {
      name: "Frontend",
      items: ["TypeScript", "React", "Next.js", "TailwindCSS", "pnpm"],
      icon: Code,
    },
    {
      name: "Backend",
      items: ["n8n Workflows", "REST APIs", "Future integrations planned"],
      icon: GitBranch,
    },
    {
      name: "AI",
      items: ["Claude", "OpenAI", "Ollama", "Custom Agents"],
      icon: Bot,
    },
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
                <a href="https://github.com/HotTechStack/dataengineering-agent" className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-red-500/20 to-orange-500/20 border border-pink-500/30 backdrop-blur-sm hover:from-pink-500/30 hover:via-red-500/30 hover:to-orange-500/30 transition-all">
                  <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-pink-300 text-sm font-medium">
                    <span className="opacity-90">Open Source by</span> 
                    <span className="font-bold ml-1 group-hover:text-white transition-colors">HotTechStack</span>
                  </span>
                  <div className="ml-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs py-0.5 px-2 rounded-full font-semibold text-slate-900">
                    MIT License
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
                tasks, generate optimized code, and build scalable infrastructure - empowering Data Engineers to move faster.
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
                  <span className="text-small font-bold text-indigo-400">10+</span>
                  <span className="text-sm text-slate-400">Specialized Agents</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-small font-bold text-cyan-400">Accelerate</span>
                  <span className="text-sm text-slate-400">Development</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-small font-bold text-purple-400">Easy</span>
                  <span className="text-sm text-slate-400">Integration</span>
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
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-green-100 text-green-600 text-xs rounded-full px-2 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                        <span>Connected</span>
                      </div>
                    </div>
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
                              <span className="bg-gray-300 rounded-full h-4 w-4 flex items-center justify-center text-xs">5</span>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core features section */}
        <div className="py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Automate complex data engineering tasks with GenAI agents that require minimal human assistance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className={`p-6 rounded-xl border ${feature.borderColor} ${feature.bgColor} backdrop-blur-sm`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white/10 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack section */}
        <div className="py-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built with modern tools and designed to evolve as requirements grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {techStack.map((tech, index) => (
              <div key={index} className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white/10 text-indigo-400">
                  <tech.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{tech.name}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></div>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Vision section */}
        <div className="py-16 relative z-10">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-800/30 p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 text-center">
              The ultimate goal is to automate data engineering as much as possible using AI, helping data engineers move faster and focus on high-value tasks.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-300">Evolving Technology</h3>
                <p className="text-slate-300">
                  As requirements grow, we'll adapt and incorporate new technologies. This platform is designed to evolve with the changing landscape of data engineering and AI.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-300">Community Driven</h3>
                <p className="text-slate-300">
                  Being an MIT licensed open-source project, we welcome contributions from the community to enhance capabilities and expand the reach of AI in data engineering.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="py-16 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Data Engineering Workflow?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Start building with AI-powered data engineering agents today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 h-12 px-8">
                <Link href="/conversation" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white h-12 px-8">
                <Link href="https://github.com/HotTechStack/dataengineering-agent">View on GitHub</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm relative z-10">
          <p>© 2025 HotTechStack. All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            {/* <Link href="/documentation" className="hover:text-white transition-colors">Documentation</Link> */}
            <Link href="https://github.com/HotTechStack/dataengineering-agent" className="hover:text-white transition-colors">GitHub</Link>
            {/* <Link href="/about" className="hover:text-white transition-colors">About</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}