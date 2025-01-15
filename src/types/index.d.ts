export interface SourceEventLink {
  openLink: ({
    group,
    integrationTypes,
    linkTokenEndpoint,
    linkHeaders,
  }: SourceEventLinkProps) => void;
  initialize: ({
    baseUrl,
    environment,
  }: {
    baseUrl?: string;
    environment?: "sandbox" | "production";
  }) => void;
}

export interface DestinationEventLink {
  openLink: ({
    group,
    integrationTypes,
    linkTokenEndpoint,
    linkHeaders,
  }: DestinationEventLinkProps) => void;
  initialize: () => void;
}

export type SourceIntegrationTypes =
  | "stripe"
  | "shopify"
  | "adyen"
  | "alchemy"
  | "checkout.com"
  | "circleci"
  | "datadog"
  | "ftp"
  | "github_repos"
  | "gitlab"
  | "pagerduty"
  | "paypal"
  | "shipstation"
  | "square"
  | "webflow"
  | "woocommerce";

export type DestinationIntegrationTypes =
  | "stripe"
  | "bigquery"
  | "elasticsearch"
  | "firestore"
  | "mongodb"
  | "postgresql"
  | "shopify"
  | "webhook";

export interface SourceEventLinkProps {
  group: string;
  integrationTypes?: SourceIntegrationTypes[];
  linkTokenEndpoint: string;
  linkHeaders?: Record<string, unknown>;
  environment?: "sandbox" | "production";
  baseUrl?: string;
  title?: string;
  onSuccess?: (source?: LinkIntegrationResponse) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
}

export interface DestinationEventLinkProps {
  group: string;
  integrationTypes?: DestinationIntegrationTypes[];
  linkTokenEndpoint: string;
  linkHeaders?: Record<string, unknown>;
  environment?: "sandbox" | "production";
  baseUrl?: string;
  title?: string;
  onSuccess?: (destination?: LinkIntegrationResponse) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
}

export interface EventLinkProps {
  baseUrl?: string;
  appTheme?: 'dark' | 'light';
  title?: string;
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

export interface WindowProps {
  group: string;
  linkTokenEndpoint: string;
  connectionType: "source" | "target";
  linkHeaders?: Record<string, unknown>;
  baseUrl?: string;
  environment?: "sandbox" | "production";
  title?: string;
  onClose?: () => void;
  integrationTypes?: string[];
}

export interface EventLinkWindowProps {
  // linkTokenEndpoint: string;
  // linkHeaders?: Record<string, unknown>;
  baseUrl?: string;
  appTheme?: 'dark' | 'light';
  environment?: "sandbox" | "production";
  title?: string;
  onClose?: () => void;
  selectedConnection?: string;
  showNameInput?: boolean;
  token: {
    url: string;
    headers?: Record<string, unknown>;
  }
}

export interface LinkIntegrationResponse {
  _id: string;
  label: string;
  group: string;
  type: string;
  connectionType: string;
  createdAt: number;
  updatedAt?: number;
  expiresAt?: number;
  createdDate: string;
  token: string;
  integration: {
    id: string;
    image: string;
    key: string;
  };
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
  identityType?: 'user' | 'team' | 'organization';
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


type XeroScopes =
  | "offline_access"
  | "accounting.transactions"
  | "accounting.settings"
  | "accounting.contacts"
  | "accounting.attachments"
  | "payroll.employees"
  | "payroll.payruns"
  | "payroll.payslips"
  | "payroll.settings"
  | "payroll.timesheets"
  | "files"
  | "assets"
  | "projects";


type SageScopes = "full_access" | "full_access_with_payroll";

export type OauthDestinations = "xero";
export type OauthScopes<T> = T extends "xero"
  ? XeroScopes
  : T extends "sage"
  ? SageScopes
  : [];

interface OauthDestinationProps<T extends OauthDestinations> {
  scopes: [OauthScopes<T>, ...OauthScopes<T>[]];
  type: T;
  state?: string;
  redirectUri: string;
  clientId: string;
}

export interface EventProps {
  data: {
    messageType: string;
    message: ConnectionRecord | string;
  }
}