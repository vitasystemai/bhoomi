import { create } from "zustand";
import { MessageType } from "@/components/ChatMessage";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface ChatState {
  messages: MessageType[];
  isLoading: boolean;
  addMessage: (text: string, isUser: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      addMessage: (text, isUser) => {
        const newMessage: MessageType = {
          id: Date.now().toString(),
          text,
          isUser,
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },
      sendMessage: async (text) => {
        if (!text.trim()) return;

        // Add user message
        get().addMessage(text, true);
        
        // Set loading state
        set({ isLoading: true });
        
        try {
          // Prepare the messages for the AI API
          const messages = [
            {
              role: "system",
              content: "You are BHOOMI AI, an agricultural assistant that helps farmers with crop advice, weather interpretation, and farming best practices. Keep responses concise, practical and focused on agriculture. Provide specific, actionable advice when possible.",
            },
            {
              role: "user",
              content: text,
            },
          ];
          
          // Make API request
          const response = await fetch("https://toolkit.rork.com/text/llm/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
          });
          
          if (!response.ok) {
            throw new Error("Failed to get response from AI");
          }
          
          const data = await response.json();
          
          // Add AI response
          get().addMessage(data.completion, false);
        } catch (error) {
          console.error("Error sending message:", error);
          get().addMessage(
            "Sorry, I'm having trouble connecting right now. Please try again later.",
            false
          );
        } finally {
          set({ isLoading: false });
        }
      },
      clearMessages: () => {
        set({ messages: [] });
      },
    }),
    {
      name: "bhoomi-chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);