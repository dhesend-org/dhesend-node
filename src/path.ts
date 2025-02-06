// Email paths
export const SendEmailPath = "email/send";
export const ListEmailPath = "email/list";
export const GetEmailPath = (id: string): `email/${string}` => `email/${id}`;

// Domain paths
export const CreateDomainPath = "domain/create"
export const ListDomainPath = "domain/list";
export const GetDomainPath = (domain: string): `domain/${string}` => `domain/${domain}`;
export const DeleteDomainPath = "domain/delete";

// Api-key paths
export const CreateApiKeyPath = "apikey/create";
export const ListApiKeyPath = "apikey/list";
export const DeleteApiKeyPath = "apikey/delete";

// Webhook paths
export const CreateWebhookPath = "webhook/create";
export const ListWebhookPath = "webhook/list";
export const GetWebhookPath = (id: string): `webhook/${string}` => `webhook/${id}`;
export const DeleteWebhookPath = "webhook/delete";
export const RefreshWebhookSecretPath = "webhook/refresh-secret";
export const UpdateWebhookStatusPath = "webhook/update-status";