import { storage } from "./storage";
import axios from "axios";

const HELIUS_API_KEY = process.env.HELIUS_API_KEY || "";

interface HeliusWebhookPayload {
  accountData: any[];
  events: any[];
  slot: number;
  blockTime: number;
}

export async function processWebhookEvent(payload: HeliusWebhookPayload, userId: number) {
  try {
    // Extract relevant data from the webhook payload
    const { events, accountData, blockTime } = payload;

    // Process each event based on the user's preferences
    const userPreferences = await storage.getPreferences(userId);
    
    if (!userPreferences) {
      throw new Error("User preferences not found");
    }

    // Get user's database credentials
    const dbCredentials = await storage.getCredentials(userId);
    
    if (!dbCredentials) {
      throw new Error("Database credentials not found");
    }

    // Process NFT bids if enabled
    if (userPreferences.nftBids) {
      // Filter for NFT bid events and process them
      const nftBidEvents = events.filter(event => event.type === 'nft_bid');
      
      if (nftBidEvents.length > 0) {
        // Add log of the processed events
        await storage.createLog({
          userId,
          type: "nft_bid",
          message: `Processed ${nftBidEvents.length} NFT bid events`,
          data: { count: nftBidEvents.length },
          timestamp: new Date(blockTime * 1000),
        });
      }
    }

    // Process token prices if enabled
    if (userPreferences.tokenPrices) {
      // Filter for token price events and process them
      const tokenPriceEvents = events.filter(event => event.type === 'token_price');
      
      if (tokenPriceEvents.length > 0) {
        // Add log of the processed events
        await storage.createLog({
          userId,
          type: "token_price",
          message: `Processed ${tokenPriceEvents.length} token price events`,
          data: { count: tokenPriceEvents.length },
          timestamp: new Date(blockTime * 1000),
        });
      }
    }

    // Process borrowable tokens if enabled
    if (userPreferences.borrowableTokens) {
      // Filter for borrowable token events and process them
      const borrowableTokenEvents = events.filter(event => event.type === 'borrowable_token');
      
      if (borrowableTokenEvents.length > 0) {
        // Add log of the processed events
        await storage.createLog({
          userId,
          type: "borrowable_token",
          message: `Processed ${borrowableTokenEvents.length} borrowable token events`,
          data: { count: borrowableTokenEvents.length },
          timestamp: new Date(blockTime * 1000),
        });
      }
    }

    return {
      success: true,
      message: `Processed ${events.length} events successfully`,
    };
  } catch (error) {
    console.error("Error processing webhook event:", error);
    await storage.createLog({
      userId,
      type: "error",
      message: `Error processing webhook: ${(error as Error).message}`,
      timestamp: new Date(),
    });
    throw error;
  }
}

export async function createHeliusWebhook(userId: number, webhookUrl: string) {
  try {
    const response = await axios.post(`https://api.helius.xyz/v0/webhooks?api-key=${HELIUS_API_KEY}`, {
      accountAddresses: [],
      transactionTypes: ["NFT_SALE", "NFT_BID", "TOKEN_TRANSFER"],
      webhookURL: webhookUrl,
      webhookType: "enhanced",
      encoding: "json",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating Helius webhook:", error);
    throw error;
  }
}

export async function deleteHeliusWebhook(webhookId: string) {
  try {
    await axios.delete(`https://api.helius.xyz/v0/webhooks/${webhookId}?api-key=${HELIUS_API_KEY}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting Helius webhook:", error);
    throw error;
  }
}
