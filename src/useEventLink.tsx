import { ConnectionRecord, EventLinkProps, EventProps } from "./types";
import { createWindow } from "./window";

// Track processed messages to prevent duplicates (defense-in-depth)
const processedMessages = new Set<string>();
const MESSAGE_EXPIRY_MS = 5000;

export const useEventLink = (props: EventLinkProps) => {
  const linkWindow = createWindow({ ...props });

  let messageHandler: ((event: MessageEvent) => void) | null = null;
  let isListenerActive = false;

  const handleMessage = (event: MessageEvent) => {
    if (typeof window === "undefined") return;

    const iFrameWindow = document.getElementById("event-link") as HTMLIFrameElement;
    if (!iFrameWindow || iFrameWindow.style.display !== "block") return;

    const eventData = (event as unknown as EventProps).data;
    if (!eventData?.messageType) return;

    // Deduplication: prevent processing same message type within expiry window
    const dedupeKey = `${eventData.messageType}-${JSON.stringify(eventData.message)}`;
    if (processedMessages.has(dedupeKey)) {
      return;
    }
    processedMessages.add(dedupeKey);
    setTimeout(() => processedMessages.delete(dedupeKey), MESSAGE_EXPIRY_MS);

    switch (eventData.messageType) {
      case "EXIT_EVENT_LINK":
        props.onClose?.();
        setTimeout(() => {
          close();
        }, 200);
        break;
      case "LINK_SUCCESS":
        props.onSuccess?.(eventData.message as ConnectionRecord);
        break;
      case "LINK_ERROR":
        props.onError?.(eventData.message as string);
        break;
    }
  };

  const open = () => {
    // Remove existing listener first (defensive)
    if (messageHandler && isListenerActive) {
      window.removeEventListener("message", messageHandler);
    }

    messageHandler = handleMessage;

    if (typeof window !== "undefined") {
      window.addEventListener("message", messageHandler);
      isListenerActive = true;
    }

    linkWindow.openLink();
  };

  const close = () => {
    // Clean up listener when closing
    if (typeof window !== "undefined" && messageHandler && isListenerActive) {
      window.removeEventListener("message", messageHandler);
      isListenerActive = false;
      messageHandler = null;
    }

    linkWindow.closeLink();
  };

  return { open, close };
};
