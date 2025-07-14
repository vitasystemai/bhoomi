import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme, globalStyles } from "@/constants/theme";
import ChatMessage, { MessageType } from "@/components/ChatMessage";
import { Send, Mic } from "lucide-react-native";
import { useChatStore } from "@/store/chat-store";

export default function ChatbotScreen() {
  const { messages, isLoading, sendMessage } = useChatStore();
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList<MessageType>>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim() === "") return;
    
    const userMessage = inputText;
    setInputText("");
    await sendMessage(userMessage);
  };

  const renderEmptyChat = () => (
    <View style={styles.emptyChatContainer}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome to BHOOMI AI</Text>
        <Text style={styles.welcomeText}>
          I can help you with farming advice, crop recommendations, weather
          interpretation, and more. What would you like to know today?
        </Text>
      </View>
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Try asking about:</Text>
        {[
          "What crops are suitable for clay soil?",
          "How to prevent pest attacks on tomatoes?",
          "Best time to sow wheat in northern India?",
          "Organic fertilizers for rice cultivation",
        ].map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionButton}
            onPress={() => {
              setInputText(suggestion);
            }}
          >
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {messages.length === 0 ? (
          renderEmptyChat()
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatMessage message={item} />}
            contentContainerStyle={styles.chatContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.colors.primary} size="small" />
            <Text style={styles.loadingText}>BHOOMI AI is thinking...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask BHOOMI AI..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor:
                    inputText.trim() === ""
                      ? theme.colors.primary + "80"
                      : theme.colors.primary,
                },
              ]}
              onPress={handleSend}
              disabled={inputText.trim() === ""}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyChatContainer: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: "center",
  },
  welcomeCard: {
    backgroundColor: theme.colors.primary + "15",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  welcomeTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  welcomeText: {
    ...theme.typography.body,
    lineHeight: 22,
  },
  suggestionsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  suggestionsTitle: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.sm,
  },
  suggestionButton: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  suggestionText: {
    ...theme.typography.body,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  loadingText: {
    ...theme.typography.bodySmall,
    marginLeft: theme.spacing.sm,
    color: theme.colors.textLight,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    maxHeight: 100,
    ...theme.typography.body,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: theme.spacing.sm,
  },
  micButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.sm,
  },
  sendButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
  },
});