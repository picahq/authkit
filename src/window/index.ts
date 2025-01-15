import { EventLinkWindowProps } from "../types";

export class EventLinkWindow {
  private linkTokenEndpoint: string;
  private linkHeaders?: object;
  private baseUrl?: string;
  private onClose?: () => void;
  private title?: string;
  private selectedConnection?: string;
  private showNameInput?: boolean;
  private appTheme?: "dark" | "light";

  constructor(props: EventLinkWindowProps) {
    this.linkTokenEndpoint = props.token.url;
    this.linkHeaders = props.token.headers;
    this.baseUrl = props.baseUrl;
    this.onClose = props.onClose;
    this.title = props.title;
    this.selectedConnection = props.selectedConnection;
    this.showNameInput = props.showNameInput;
    this.appTheme = props.appTheme;
  }

  private _getBaseUrl() {
    if (this.baseUrl) {
      return this.baseUrl;
    }
    return "https://authkit.integrationos.com";
  }

  public openLink() {
    const container = document.createElement("iframe");

    const jsonString = JSON.stringify({
      linkTokenEndpoint: this.linkTokenEndpoint,
      linkHeaders: this.linkHeaders,
      title: this.title,
      selectedConnection: this.selectedConnection,
      showNameInput: this.showNameInput,
      appTheme: this.appTheme,
    });

    const base64Encoded = btoa(jsonString);
    const urlParams = { data: base64Encoded };
    const queryString = new URLSearchParams(urlParams).toString();

    const url = `${this._getBaseUrl()}?${queryString}`;

    document.body.appendChild(container);
    container.style.height = "100%";
    container.style.width = "100%";
    container.style.position = "fixed";
    container.style.display = "hidden";
    container.style.visibility = "hidden";
    container.style.zIndex = "9999"
    container.style.backgroundColor = "transparent";
    container.style.inset = "0px";
    container.style.borderWidth = "0px";
    container.id = `event-link`;
    container.src = url;
    container.style.overflow = "hidden auto";

    container.onload = () => {
      setTimeout(() => {
        container.style.display = "block";
        container.style.visibility = "visible";
      }, 100);
      container.contentWindow?.postMessage(
        {
          linkTokenEndpoint: this.linkTokenEndpoint,
          linkHeaders: this.linkHeaders,
          title: this.title,
          selectedConnection: this.selectedConnection,
          showNameInput: this.showNameInput,
          appTheme: this.appTheme,
        },
        url
      );
    };
  }

  public closeLink() {
    const iFrameWindow = document.getElementById(
      `event-link`
    ) as HTMLIFrameElement;
    if (iFrameWindow) {
      iFrameWindow.remove();
    }
    this.onClose?.();
  }
}

export const createWindow = (props: EventLinkWindowProps) => {
  return new EventLinkWindow(props);
};
