import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";

export type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { text, isUser } = message;

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
          {text}
        </Text>
      </View>
      <Text style={styles.time}>
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  botContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
  },
  botBubble: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  text: {
    fontSize: 16,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: theme.colors.text,
  },
  time: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginTop: 4,
    marginHorizontal: 8,
  },
});