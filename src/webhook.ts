import { WebhookEvent } from "./constants";
import Dhesend from "./index";
import { CreateWebhookPath, DeleteWebhookPath, GetWebhookPath, ListWebhookPath, RefreshWebhookSecretPath, UpdateWebhookStatusPath } from "./path";

const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

interface CreateWebhookInput {
    /**
     * Webhook endpoint URL
     * @example "https://xyz.com/api/webhook"
     */
    endpoint: string;
    /**
     * List of events the webhook should listen to.
     * Supported events: `email:sent`, `email:delivered`, `email:opened`, `email:clicked`, `email:bounced`, `email:failed`, `email:complaint`
     */
    events: WebhookEvent[];
}

type CreateWebhookResponse = {
    id: string;
    /** Secret token to verify incoming webhook requests */
    secret: string;
};

type ListWebhookResponse = {
    id: string;
    endpoint: string;
    events: WebhookEvent[];
    createdAt: Date;
    status: "enabled" | "disabled";
    secret: string;
};

type RefreshSecrectResponse = {
    id: string;
    /** New secret token for webhook verification */
    secret: string;
};

type DeleteWebhookResponse = {
    success: string;
};

type UpdateStatusResponse = {
    id: string;
    /** Updated status of the webhook */
    status: "enabled" | "disabled";
};

class Webhook {
    private readonly dhesend: Dhesend;

    constructor(dhesend: Dhesend) {
        this.dhesend = dhesend;
    };

    async create(params: CreateWebhookInput) {
        const { endpoint, events } = params;

        if (!urlRegex.test(endpoint)) {
            return {
                data: null,
                error: "Provide a valid webhook endpoint, e.g., `https://xyz.com/api/webhook`."
            };
        };

        return this.dhesend.post<CreateWebhookResponse>(
            CreateWebhookPath,
            JSON.stringify({ endpoint, events })
        );
    };

    async get(webhookId: string) {
        return this.dhesend.get<ListWebhookResponse>(
            GetWebhookPath(webhookId),
        );
    };

    async list() {
        return this.dhesend.get<ListWebhookResponse[]>(ListWebhookPath);
    };

    /** Refreshes the secret token of a specified webhook.*/
    async refreshSecret(webhookId: string) {
        return this.dhesend.post<RefreshSecrectResponse>(
            RefreshWebhookSecretPath,
            JSON.stringify({ webhookId })
        );
    };

    async delete(webhookId: string) {
        return this.dhesend.post<DeleteWebhookResponse>(
            DeleteWebhookPath,
            JSON.stringify({ webhookId })
        );
    };

    async updateStatus(webhookId: string, status: "enabled" | "disabled") {
        return this.dhesend.post<UpdateStatusResponse>(
            UpdateWebhookStatusPath,
            JSON.stringify({ webhookId, status })
        );
    };
};

export default Webhook;