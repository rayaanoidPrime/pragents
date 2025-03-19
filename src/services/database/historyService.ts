"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Search, Trash2, MessageSquare, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Mock chat history data
const chatHistory = [
  { 
    id: "1", 
    title: "Data Pipeline for Customer Analytics", 
    strategy: "Data Pipeline",
    strategyIcon: "git-branch",
    agents: ["Data Engineer", "Data Analyst"],
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    messageCount: 24
  },
  { 
    id: "2", 
    title: "Infrastructure Setup for Data Lake", 
    strategy: "Build Infrastructure",
    strategyIcon: "server",
    agents: ["Data Architect", "Data Engineer"],
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    messageCount: 18
  },
  { 
    id: "3", 
    title: "ETL Process Optimization", 
    strategy: "Data Pipeline",
    strategyIcon: "git-branch",
    agents: ["Pipeline Engineer", "Data Governance"],
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    messageCount: 32
  },
  { 
    id: "4", 
    title: "Data Quality Monitoring System", 
    strategy: "Data Quality",
    strategyIcon: "shield",
    agents: ["Data Governance", "Data Engineer"],
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    messageCount: 15
  }
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // Filter chats based on search query
  const filteredChats = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.agents.some(agent => agent.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Sort chats based on sort order
  const sortedChats = [...filteredChats].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.date.getTime() - a.date.getTime();
    } else {
      return a.date.getTime() - b.date.getTime();
    }
  });
  
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chat History</h1>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="flex items-center gap-2"
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortOrder === "desc" ? "Newest First" : "Oldest First"}
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-3 flex-1 overflow-auto">
        {sortedChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No conversations found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No results for "${searchQuery}"`
                : "Start a new conversation to see it here"}
            </p>
          </div>
        ) : (
          sortedChats.map((chat) => (
            <Card key={chat.id} className="hover:bg-accent/30 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{chat.title}</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <span className="text-xs">
                    {formatDistanceToNow(chat.date, { addSuffix: true })}
                  </span>
                  <span className="text-xs">•</span>
                  <span className="text-xs">
                    {chat.strategy}
                  </span>
                  <span className="text-xs">•</span>
                  <span className="text-xs">
                    {chat.messageCount} messages
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex -space-x-2">
                  {chat.agents.map((agent, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={`/images/avatars/${agent.toLowerCase().replace(/\s+/g, '-')}.png`} alt={agent} />
                      <AvatarFallback className="text-[10px]">
                        {agent.split(' ').map(word => word[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/conversation?id=${chat.id}`}>
                    Continue conversation
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}