import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IndexingPreferences } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface IndexingOptionsProps {
  preferences?: IndexingPreferences;
}

export default function IndexingOptions({ preferences }: IndexingOptionsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    nftBids: preferences?.nftBids || false,
    tokenPrices: preferences?.tokenPrices || false,
    borrowableTokens: preferences?.borrowableTokens || false,
  });

  useEffect(() => {
    if (preferences) {
      setFormData({
        nftBids: preferences.nftBids,
        tokenPrices: preferences.tokenPrices,
        borrowableTokens: preferences.borrowableTokens,
      });
    }
  }, [preferences]);

  const savePreferencesMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/indexing/preferences", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Preferences saved",
        description: "Your indexing preferences have been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/profile"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to save preferences",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleChange = (field: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePreferencesMutation.mutate(formData);
  };

  return (
    <div className="bg-[#121212] border border-[#222] rounded-lg p-6">
      <h4 className="text-lg font-medium mb-4">Indexing Preferences</h4>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-[#222] rounded-lg">
            <div>
              <h5 className="font-medium">NFT Bids</h5>
              <p className="text-[#aaa] text-sm">
                Track bidder, bid amount, NFT identifier, timestamp
              </p>
            </div>
            <Switch
              checked={formData.nftBids}
              onCheckedChange={() => handleChange("nftBids")}
              className="data-[state=checked]:bg-[#2ce5c9]"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-[#222] rounded-lg">
            <div>
              <h5 className="font-medium">Token Prices</h5>
              <p className="text-[#aaa] text-sm">
                Monitor token identifier, platform, price, timestamp
              </p>
            </div>
            <Switch
              checked={formData.tokenPrices}
              onCheckedChange={() => handleChange("tokenPrices")}
              className="data-[state=checked]:bg-[#2ce5c9]"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-[#222] rounded-lg">
            <div>
              <h5 className="font-medium">Borrowable Tokens</h5>
              <p className="text-[#aaa] text-sm">
                Capture token identifier, available amount, lender details
              </p>
            </div>
            <Switch
              checked={formData.borrowableTokens}
              onCheckedChange={() => handleChange("borrowableTokens")}
              className="data-[state=checked]:bg-[#2ce5c9]"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            className="bg-[#5b7def] hover:bg-[#4a6cde] text-white"
            disabled={savePreferencesMutation.isPending}
          >
            {savePreferencesMutation.isPending ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </form>
    </div>
  );
}
