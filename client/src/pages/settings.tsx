import React from "react";
import { useAuth } from "@/hooks/use-auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, User, Key, Bell, Shield, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Settings() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { displayName?: string, email?: string }) => {
      const response = await apiRequest("PATCH", "/api/user/profile", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
  
  const updatePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string, newPassword: string }) => {
      const response = await apiRequest("POST", "/api/user/password", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    },
  });
  
  const updateSecurityMutation = useMutation({
    mutationFn: async (data: { twoFactorEnabled: boolean }) => {
      const response = await apiRequest("POST", "/api/user/security", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update security settings",
        variant: "destructive",
      });
    },
  });
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    updateProfileMutation.mutate({
      displayName: formData.get("displayName") as string,
      email: formData.get("email") as string,
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match",
        variant: "destructive",
      });
      return;
    }
    
    updatePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="mr-4 border-[#222] bg-[#0a0a0a] hover:bg-[#121212] text-[#aaa]"
              onClick={() => window.history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="ml-2">Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Settings</h1>
              <p className="text-[#aaa] mt-2">Manage your account preferences and settings</p>
            </div>
          </div>
          {user?.role === "admin" && (
            <Badge className="bg-gradient-to-r from-red-500 to-purple-500 border-none text-white">
              Admin
            </Badge>
          )}
        </div>
        
        <Tabs defaultValue="profile" className="mb-10">
          <TabsList className="mb-6 bg-[#121212] border border-[#222]">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="flex items-center">
              <Key className="mr-2 h-4 w-4" />
              <span>API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Update your personal information and how others see you on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        defaultValue={user?.username} 
                        className="bg-[#0a0a0a] border-[#222] focus:border-[#5b7def]" 
                        disabled 
                      />
                      <p className="text-xs text-[#777]">Your username cannot be changed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input 
                        id="displayName" 
                        name="displayName"
                        defaultValue={user?.displayName || ""} 
                        className="bg-[#0a0a0a] border-[#222] focus:border-[#5b7def]" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        defaultValue={user?.email} 
                        className="bg-[#0a0a0a] border-[#222] focus:border-[#5b7def]" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        defaultValue={user?.role} 
                        className="bg-[#0a0a0a] border-[#222] focus:border-[#5b7def]" 
                        disabled 
                      />
                      <p className="text-xs text-[#777]">Your account role determines your permissions</p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-[#5b7def] hover:bg-[#4a6ade]" disabled={updateProfileMutation.isPending}>
                    {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Update your password to maintain account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword"
                        type="password" 
                        className="bg-[#0a0a0a] border-[#222] focus:border-[#5b7def]" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword"
                        type="password" 
                        className="bg-[#0a0a0a] border-[#222] focus:border-[#5b7def]" 
                        required
                      />
                      <p className="text-xs text-[#777]">Password must be at least 8 characters long</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password" 
                        className="bg-[#0a0a0a] border-[#222] focus:border-[#5b7def]" 
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-[#5b7def] hover:bg-[#4a6ade]" disabled={updatePasswordMutation.isPending}>
                    {updatePasswordMutation.isPending ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Configure additional security options for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-[#5b7def]" />
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                      </div>
                      <p className="text-sm text-[#aaa]">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      id="two-factor" 
                      disabled 
                      onCheckedChange={(checked) => 
                        updateSecurityMutation.mutate({ twoFactorEnabled: checked })
                      }
                    />
                  </div>
                  
                  <Separator className="bg-[#222]" />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Account Access</h4>
                    
                    <Button 
                      variant="destructive" 
                      className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out of All Devices
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Create and manage API keys for programmatic access to HeliSync
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border border-[#222] rounded-md bg-[#0a0a0a]">
                    <p className="text-center text-[#aaa]">API key management will be available in a future update</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#5b7def] hover:bg-[#4a6ade]" disabled>Create New API Key</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-[#0f0f0f] border border-[#222]">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription className="text-[#aaa]">
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Webhook Activity</p>
                        <p className="text-xs text-[#777]">Receive notifications about webhook events</p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Database Status</p>
                        <p className="text-xs text-[#777]">Get notified about database connection issues</p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Security Alerts</p>
                        <p className="text-xs text-[#777]">Important security-related notifications</p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>
                  </div>
                  
                  <Separator className="bg-[#222]" />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">In-App Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>Webhook Events</p>
                        <p className="text-xs text-[#777]">Show real-time webhook events in the dashboard</p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p>System Announcements</p>
                        <p className="text-xs text-[#777]">Product updates and new features</p>
                      </div>
                      <Switch defaultChecked disabled />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#5b7def] hover:bg-[#4a6ade]" disabled>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}