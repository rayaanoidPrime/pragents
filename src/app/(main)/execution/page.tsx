"use client";

import { Play, Terminal, Code, FileJson, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExecutionPage() {
  return (
    <div className="flex h-full">
      {/* Left panel for code files/snippets (20% width) */}
      <div className="w-1/5 border-r p-3 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Code Files</h3>
          <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
            <Play className="h-3.5 w-3.5" />
            <span>New</span>
          </Button>
        </div>
        
        <div className="space-y-2">
          {["data_pipeline.py", "transform.py", "etl_functions.py", "config.json", "requirements.txt"].map((file, i) => (
            <div 
              key={file} 
              className={`p-2 rounded-md cursor-pointer flex items-center gap-2 text-sm ${i === 0 ? 'bg-accent' : 'hover:bg-muted'}`}
            >
              <Code className="h-4 w-4 text-muted-foreground" />
              <span>{file}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right area for execution interface (80% width) */}
      <div className="w-4/5 p-4">
        <Tabs defaultValue="code" className="flex-1 flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Code Editor</span>
              </TabsTrigger>
              <TabsTrigger value="terminal" className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span>Terminal</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>Data Explorer</span>
              </TabsTrigger>
            </TabsList>
            
            <Button className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span>Execute</span>
            </Button>
          </div>
          
          <TabsContent value="code" className="flex-1 h-[calc(100%-40px)]">
            <Card className="h-full">
              <CardHeader className="py-3">
                <CardTitle className="text-base">data_pipeline.py</CardTitle>
                <CardDescription>
                  Main pipeline implementation
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-130px)] bg-muted rounded-md p-4 font-mono text-sm overflow-auto">
                <pre className="text-foreground">
                  <code>
{`# Example Python code for data processing
import pandas as pd
import numpy as np
from pyspark.sql import SparkSession

# Initialize Spark session
spark = SparkSession.builder\\
    .appName("DataProcessing")\\
    .getOrCreate()

# Read data
df = spark.read.csv("s3://data-bucket/sales.csv", header=True, inferSchema=True)

# Perform transformations
df = df.filter(df.revenue > 1000)\\
    .groupBy("region", "product")\\
    .agg({"revenue": "sum", "quantity": "sum"})

# Write results
df.write.parquet("s3://data-bucket/processed/sales_aggregated", mode="overwrite")

print("Data processing complete!")`}
                  </code>
                </pre>
              </CardContent>
              <CardFooter className="flex justify-between border-t py-3">
                <Button variant="outline">
                  <FileJson className="mr-2 h-4 w-4" />
                  Load File
                </Button>
                <div className="flex items-center text-xs text-muted-foreground">
                  Modified: March 19, 2025
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="terminal" className="flex-1 h-[calc(100%-40px)]">
            <Card className="h-full">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Terminal</CardTitle>
                <CardDescription>
                  Command output and logs
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-130px)] bg-black rounded-md p-4 font-mono text-sm text-green-400 overflow-auto">
                <pre>
{`$ spark-submit --master yarn --deploy-mode cluster process_data.py
24/03/19 10:15:32 INFO SparkContext: Running Spark version 3.3.0
24/03/19 10:15:34 INFO ResourceUtils: Resources for spark.driver:
24/03/19 10:15:35 INFO ResourceUtils: Resources for spark.executor:
24/03/19 10:15:36 INFO Utils: Successfully started service 'SparkUI' on port 4040
24/03/19 10:15:38 INFO SparkUI: Bound SparkUI to 0.0.0.0, and started at http://host:4040
24/03/19 10:15:42 INFO BlockManagerMaster: Registered BlockManager
24/03/19 10:15:45 INFO FileSourceStrategy: Pruning directories with: 
24/03/19 10:15:48 INFO FileOutputCommitter: File Output Committer Algorithm version is 2
24/03/19 10:15:52 INFO SQLTransformer: Executing SQL query
24/03/19 10:15:55 INFO CodeGenerator: Code generated in 235.926501 ms
24/03/19 10:16:02 INFO SparkContext: Job finished: parquet at process_data.py:42, took 8.453028 s
24/03/19 10:16:03 INFO SparkUI: Stopped Spark web UI at http://host:4040
24/03/19 10:16:05 INFO SparkContext: Successfully stopped SparkContext
24/03/19 10:16:05 INFO ShutdownHookManager: Shutdown hook called
24/03/19 10:16:05 INFO ShutdownHookManager: Deleting directory /tmp/spark-a8f93d1c-e833-4a3c-9824-d3982a

Data processing complete!
`}
                </pre>
              </CardContent>
              <CardFooter className="flex justify-between border-t py-3">
                <Button variant="outline">
                  Clear
                </Button>
                <Button variant="outline">
                  <Terminal className="mr-2 h-4 w-4" />
                  New Terminal
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="flex-1 h-[calc(100%-40px)]">
            <Card className="h-full">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Data Explorer</CardTitle>
                <CardDescription>
                  Browse and preview data
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-130px)]">
                <div className="h-full bg-muted rounded-md p-4 flex items-center justify-center">
                  <div className="text-center">
                    <Database className="h-16 w-16 text-muted-foreground mb-4 mx-auto opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Data Explorer</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      Connect to your data sources to browse and preview data before processing
                    </p>
                    <Button>
                      <Database className="mr-2 h-4 w-4" />
                      Connect Data Source
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t py-3">
                <div className="w-full flex justify-center">
                  <Button variant="outline" size="sm">
                    Show Connection History
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}