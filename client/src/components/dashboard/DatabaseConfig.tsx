import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatabaseCredentials } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface DatabaseConfigProps {
  credentials?: DatabaseCredentials;
}

export default function DatabaseConfig({ credentials }: DatabaseConfigProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<DatabaseCredentials>({
    hostname: credentials?.hostname || "",
    port: credentials?.port || "5432",
    username: credentials?.username || "",
    password: credentials?.password || "",
    databaseName: credentials?.databaseName || "",
  });

  const saveCredentialsMutation = useMutation({
    mutationFn: async (data: DatabaseCredentials) => {
      const response = await apiRequest("POST", "/api/database/credentials", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Credentials saved",
        description: "Your database credentials have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/profile"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to save credentials",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const validateConnectionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/database/validate", {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Connection validated",
        description: "Successfully connected to your database.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/profile"] });
    },
    onError: (error) => {
      toast({
        title: "Connection failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCredentialsMutation.mutate(formData);
  };

  const handleValidate = () => {
    validateConnectionMutation.mutate();
  };

  return (
    <div className="bg-[#121212] border border-[#222] rounded-lg p-6 mb-8">
      <h4 className="text-lg font-medium mb-4">Neon Postgres Credentials</h4>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hostname" className="text-[#aaa]">Hostname</Label>
            <Input
              id="hostname"
              name="hostname"
              value={formData.hostname}
              onChange={handleChange}
              placeholder="db.neon.tech"
              className="bg-[#1e1e1e] border-[#333] text-white"
            />
          </div>
          <div>
            <Label htmlFor="port" className="text-[#aaa]">Port</Label>
            <Input
              id="port"
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="5432"
              className="bg-[#1e1e1e] border-[#333] text-white"
            />
          </div>
          <div>
            <Label htmlFor="username" className="text-[#aaa]">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
              className="bg-[#1e1e1e] border-[#333] text-white"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-[#aaa]">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-[#1e1e1e] border-[#333] text-white"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="databaseName" className="text-[#aaa]">Database Name</Label>
            <Input
              id="databaseName"
              name="databaseName"
              value={formData.databaseName}
              onChange={handleChange}
              placeholder="helisync_data"
              className="bg-[#1e1e1e] border-[#333] text-white"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Button 
            type="submit" 
            className="bg-[#5b7def] hover:bg-[#4a6cde] text-white"
            disabled={saveCredentialsMutation.isPending}
          >
            {saveCredentialsMutation.isPending ? "Saving..." : "Save Credentials"}
          </Button>
          <Button
            type="button"
            onClick={handleValidate}
            className="bg-[#2ce5c9] hover:bg-[#25c6ad] text-black"
            disabled={validateConnectionMutation.isPending || !credentials}
          >
            {validateConnectionMutation.isPending ? "Validating..." : "Validate Connection"}
          </Button>
        </div>
      </form>
    </div>
  );
}
