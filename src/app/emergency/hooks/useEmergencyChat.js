import { useEffect, useState } from "react";
import { getAblyClient } from "@/lib/ablyClient";

// useEmergencyChat manages all conversation and messaging state for the emergency chat sidebar, including Ably subscriptions for real-time updates
export function useEmergencyChat({ email, setChatOpen }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [newChatEmail, setNewChatEmail] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  // loadConversations fetches all conversations the current user is a participant of
  async function loadConversations() {
    if (!email) return;
    const res = await fetch("/api/conversations", {
      headers: { "x-user-email": email },
      cache: "no-store",
    });
    const data = await res.json().catch(() => []);
    setConversations(Array.isArray(data) ? data : []);
  }

  // loadMessages fetches all messages for a given conversation id
  async function loadMessages(conversationId) {
    if (!email || !conversationId) return;
    const res = await fetch(
      `/api/messages?conversationId=${encodeURIComponent(conversationId)}`,
      { headers: { "x-user-email": email }, cache: "no-store" }
    );
    const data = await res.json().catch(() => []);
    setMessages(Array.isArray(data) ? data : []);
  }

  // startOrOpenConversation opens an existing conversation with the given user or creates a new one, then optionally pre-fills the message input
  async function startOrOpenConversation(otherUserEmail, presetText = "") {
    if (!email || !otherUserEmail) return;
    const lower = otherUserEmail.trim().toLowerCase();
    if (!lower || lower === email) return;

    setChatOpen(true);
    setChatError("");

    let conversation =
      conversations.find((c) => c.participants?.includes(lower)) || null;

    if (!conversation) {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email, otherUserEmail: lower }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setChatError(data.error || "Could not start chat.");
        return;
      }
      conversation = data;
      await loadConversations();
    }

    setSelectedConversation(conversation);
    await loadMessages(String(conversation._id));
    if (presetText) setChatText(presetText);
  }

  // handleStartChat validates the new-chat email input and creates a conversation, publishing Ably events so both sides see it immediately
  async function handleStartChat() {
    setChatError("");
    const otherUserEmail = newChatEmail.trim().toLowerCase();
    if (!email) return;
    if (!otherUserEmail) {
      setChatError("Enter an email address to start a chat.");
      return;
    }
    if (otherUserEmail === email) {
      setChatError("You cannot message yourself.");
      return;
    }

    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: email, otherUserEmail }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setChatError(data.error || "Could not start chat.");
      return;
    }

    await loadConversations();
    setSelectedConversation(data);
    setNewChatEmail("");
    await loadMessages(String(data._id));

    // notify both participants so the new conversation appears in their sidebar immediately
    try {
      const ably = getAblyClient();
      await ably.channels
        .get(`user:${otherUserEmail}`)
        .publish("new-conversation", {
          conversationId: String(data._id),
          with: email,
        });
      await ably.channels.get(`user:${email}`).publish("conversation-updated", {
        conversationId: String(data._id),
      });
    } catch (err) {
      console.error("ABLY start chat publish error:", err);
    }
  }

  // handleSelectConversation switches the active thread and loads its messages
  async function handleSelectConversation(conversation) {
    setSelectedConversation(conversation);
    await loadMessages(String(conversation._id));
    setChatError("");
  }

  // handleSendMessage posts a new message to the API and publishes Ably events so both participants see it in real time
  async function handleSendMessage() {
    const text = chatText.trim();
    if (!text || !selectedConversation || !email) return;

    const otherUser = selectedConversation.participants.find(
      (p) => p !== email
    );
    if (!otherUser) {
      setChatError("Could not determine who to send this message to.");
      return;
    }

    setChatLoading(true);
    setChatError("");

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: String(selectedConversation._id),
        senderEmail: email,
        receiverEmail: otherUser,
        text,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setChatLoading(false);

    if (!res.ok) {
      setChatError(data.error || "Could not send message.");
      return;
    }

    setChatText("");
    await loadConversations();
    await loadMessages(String(selectedConversation._id));

    // publish to the conversation channel and both user channels so the thread updates everywhere
    try {
      const ably = getAblyClient();
      const convChannel = ably.channels.get(
        `conversation:${selectedConversation._id}`
      );
      await convChannel.publish("new-message", {
        conversationId: String(selectedConversation._id),
        senderEmail: email,
        receiverEmail: otherUser,
        text,
      });
      await ably.channels.get(`user:${email}`).publish("conversation-updated", {
        conversationId: String(selectedConversation._id),
      });
      await ably.channels
        .get(`user:${otherUser}`)
        .publish("conversation-updated", {
          conversationId: String(selectedConversation._id),
        });
    } catch (err) {
      console.error("ABLY send publish error:", err);
    }
  }

  // subscribe to the user's personal Ably channel to reload conversations when a new one is created or updated
  useEffect(() => {
    if (!email) return;
    const channel = getAblyClient().channels.get(`user:${email}`);
    const handler = (msg) => {
      if (msg?.name === "conversation-updated" || msg?.name === "new-conversation") {
        loadConversations();
      }
    };
    channel.subscribe(handler);
    return () => channel.unsubscribe(handler);
  }, [email]);

  // subscribe to the active conversation's channel to reload messages when a new one arrives
  useEffect(() => {
    const id = selectedConversation?._id;
    if (!id || !email) return;
    const channel = getAblyClient().channels.get(`conversation:${id}`);
    const handler = (msg) => {
      if (msg?.name === "new-message") {
        loadMessages(id);
        loadConversations();
      }
    };
    channel.subscribe(handler);
    return () => channel.unsubscribe(handler);
  }, [selectedConversation?._id, email]);

  return {
    conversations,
    selectedConversation,
    messages,
    chatText,
    setChatText,
    newChatEmail,
    setNewChatEmail,
    chatLoading,
    chatError,
    loadConversations,
    startOrOpenConversation,
    handleStartChat,
    handleSelectConversation,
    handleSendMessage,
  };
}
