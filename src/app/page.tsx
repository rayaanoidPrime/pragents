// src/app/page.tsx - Main app entry point

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, GitBranch, BarChart, Shield, Landmark } from "lucide-react";

export default function Home() {
  // Strategy cards for the homepage
  const strategies = [
    {
      id: "infrastructure",
      name: "Build Infrastructure",
      description: "Set up and configure data engineering infrastructure",
      icon: Server,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      id: "pipeline",
      name: "Data Pipeline",
      description: "Create and optimize ETL/ELT data pipelines",
      icon: GitBranch,
      color: "bg-green-500/10 text-green-500"
    },
    {
      id: "analysis",
      name: "Data Analysis",
      description: "Analyze and derive insights from your data",
      icon: BarChart,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      id: "quality",
      name: "Data Quality",
      description: "Implement data quality checks and monitoring",
      icon: Shield,
      color: "bg-amber-500/10 text-amber-500"
    },
    {
      id: "governance",
      name: "Data Governance",
      description: "Establish data governance policies and practices",
      icon: Landmark,
      color: "bg-red-500/10 text-red-500"
    }
  ];

  return (
    <div className="container py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Data Engineering Agents Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          Leverage multiple AI agents to solve complex data engineering tasks.
          Select from various strategies and specialized agents to build
          infrastructure, create data pipelines, and analyze your data.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/conversation">Start a Conversation</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/execution">Direct Execution</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {strategies.map((strategy) => (
          <Card key={strategy.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${strategy.color}`}>
                <strategy.icon className="h-6 w-6" />
              </div>
              <CardTitle>{strategy.name}</CardTitle>
              <CardDescription>{strategy.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href={`/conversation?strategy=${strategy.id}`}>
                  Select Strategy
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 border rounded-lg p-6 bg-accent/30">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-medium mb-2">Multiple Agent Collaboration</h3>
            <p className="text-muted-foreground">
              Combine the expertise of multiple specialized data engineering agents to tackle complex problems.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Specialized Strategies</h3>
            <p className="text-muted-foreground">
              Choose from different data engineering strategies tailored to your specific needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Direct Execution</h3>
            <p className="text-muted-foreground">
              Execute code and queries directly within the platform for immediate results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}