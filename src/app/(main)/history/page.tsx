"use client";

import { History, Calendar, Filter, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversationHistory } from "@/components/conversation/ConversationHistory";

export default function HistoryPage() {
  return (
    <div className="container mx-auto p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <History className="mr-2 h-5 w-5 text-primary" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Conversation History
            </span>
          </h1>
          <p className="text-muted-foreground">
            Browse and manage your past conversations with agents
          </p>
        </div>
        
        <div className="flex flex-row gap-6 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
          
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="flex-1">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Conversations</TabsTrigger>
            <TabsTrigger value="pipelines">Data Pipelines</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ml">ML Workflows</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="h-[calc(100%-50px)]">
            <Card className="p-6 h-full overflow-auto">
              <ConversationHistory limit={20} />
            </Card>
          </TabsContent>
          
          <TabsContent value="pipelines" className="h-[calc(100%-50px)]">
            <Card className="p-6 h-full overflow-auto">
              <ConversationHistory limit={8} />
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="h-[calc(100%-50px)]">
            <Card className="p-6 h-full overflow-auto">
              <ConversationHistory limit={5} />
            </Card>
          </TabsContent>
          
          <TabsContent value="ml" className="h-[calc(100%-50px)]">
            <Card className="p-6 h-full overflow-auto">
              <ConversationHistory limit={7} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}