import { version } from '../package.json';

/**Base url for all requests */
export const BASE_URL = "https://dhesend.onrender.com";

/**Default user agent for all fetch requests */
export const DEFAULT_USER_AGENT = `resend-node:${version}`;

/** Max attachments size in MB */
export const MAX_ATTACHMENTS_SIZE = 25;

/** Maximum number of attachments */
export const MAX_EMAIL_ATTACHMENTS = 15;

/** Supported webhook events */
export const WebhookEvents = [
    "email:sent",
    "email:delivered",
    "email:opened",
    "email:clicked",
    "email:bounced",
    "email:failed",
    "email:complaint"
] as const;

export type WebhookEvent = typeof WebhookEvents[number];