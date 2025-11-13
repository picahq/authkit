import { ConnectionRecord, EventLinkProps, EventProps } from "./types";
import { createWindow } from "./window";

export const useEventLink = (props: EventLinkProps) => {
  const linkWindow = createWindow({ ...props });

  const handleMessage = (event: EventProps) => {
    if (typeof window !== "undefined") {
      const iFrameWindow = document.getElementById(
        `event-link`
      ) as HTMLIFrameElement;
      if (iFrameWindow?.style?.display === "block") {
        switch (event.data?.messageType) {
          case "EXIT_EVENT_LINK":
            props.onClose?.();
            setTimeout(() => {
              linkWindow.closeLink();
            }, 200);
            break;
          case "LINK_SUCCESS":
            props.onSuccess?.(event.data?.message as ConnectionRecord);
            break;
          case "LINK_ERROR":
            props.onError?.(event.data?.message as string);
            break;
        }
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("message", handleMessage);
  }

  const open = () => {
    linkWindow.openLink();
  };

  const close = () => {
    linkWindow.closeLink();
  };

  return { open, close };
};
