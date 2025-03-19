"use client";

import { Settings, User, Moon, Sun, Globe, Key, Shield, Database, HardDrive, Users, Layout, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex h-full">
      {/* Left panel for settings categories (20% width) */}
      <div className="w-1/5 border-r p-2 overflow-auto">
        <div className="space-y-1">
          {[
            { id: "general", name: "User Preferences", icon: User },
            { id: "appearance", name: "Appearance", icon: Layout },
            { id: "agents", name: "Agent Settings", icon: Users },
            { id: "api", name: "API Keys", icon: Key },
            { id: "connections", name: "Data Connections", icon: Database },
            { id: "storage", name: "Storage", icon: HardDrive },
            { id: "advanced", name: "Advanced", icon: Server },
          ].map((item) => (
            <Button 
              key={item.id}
              variant={item.id === "general" ? "secondary" : "ghost"}
              className="w-full justify-start h-9 px-2 gap-2"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Right area for settings content (80% width) */}
      <div className="w-4/5 p-4 overflow-auto">
        <h2 className="text-xl font-semibold flex items-center mb-6">
          <Settings className="mr-2 h-5 w-5 text-primary" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            User Preferences
          </span>
        </h2>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" placeholder="Your Name" defaultValue="User" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="example@company.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Language</Label>
                <RadioGroup defaultValue="en">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="lang-en" />
                    <Label htmlFor="lang-en" className="cursor-pointer">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="lang-es" />
                    <Label htmlFor="lang-es" className="cursor-pointer">Spanish</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fr" id="lang-fr" />
                    <Label htmlFor="lang-fr" className="cursor-pointer">French</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>
                Choose your preferred theme and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto aspect-square">
                    <Sun className="h-10 w-10 mb-2" />
                    <span>Light</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto aspect-square">
                    <Moon className="h-10 w-10 mb-2" />
                    <span>Dark</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto aspect-square border-primary bg-primary/5">
                    <Globe className="h-10 w-10 mb-2" />
                    <span>System</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable interface animations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates and notifications via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your desktop
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}