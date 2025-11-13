export interface EventLinkProps {
  baseUrl?: string;
  appTheme?: 'dark' | 'light';
  title?: string;
  imageUrl?: string;
  companyName?: string;
  onClose?: () => void;
  onSuccess?: (connection: ConnectionRecord) => void;
  onError?: (error: string) => void;
  selectedConnection?: string;
  showNameInput?: boolean;
  token: {
    url: string;
    headers?: Record<string, unknown>;
  }
}

export interface EventLinkWindowProps {
  // linkTokenEndpoint: string;
  // linkHeaders?: Record<string, unknown>;
  baseUrl?: string;
  appTheme?: 'dark' | 'light';
  environment?: "sandbox" | "production";
  title?: string;
  imageUrl?: string;
  companyName?: string;
  onClose?: () => void;
  selectedConnection?: string;
  showNameInput?: boolean;
  token: {
    url: string;
    headers?: Record<string, unknown>;
  }
}

export interface ConnectionRecord {
  _id: string;
  platformVersion: string;
  connectionDefinitionId: string;
  name: string;
  key: string;
  environment: string;
  platform: string;
  secretsServiceId: string;
  identity?: string;
  identityType?: 'user' | 'team' | 'organization' | 'project';
  settings: {
    parseWebhookBody: boolean;
    showSecret: boolean;
    allowCustomEvents: boolean;
    oauth: boolean;
  };
  throughput: {
    key: string;
    limit: number;
  };
  createdAt: number;
  updatedAt: number;
  updated: boolean;
  version: string;
  lastModifiedBy: string;
  deleted: boolean;
  tags: string[];
  active: boolean;
  deprecated: boolean;
}
export interface EventProps {
  data: {
    messageType: string;
    message: ConnectionRecord | string;
  }
}