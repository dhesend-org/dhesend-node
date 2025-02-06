import type Dhesend from "./index";
import { MAX_ATTACHMENTS_SIZE, MAX_EMAIL_ATTACHMENTS } from "./constants";
import { GetEmailPath, ListEmailPath, SendEmailPath } from "./path";
import { EmailStatus, SendEmailPayload, Tag } from "./types";

const createEmailFormData = (payload: SendEmailPayload): FormData => {
    const form = new FormData();

    if (payload.from) form.append("from", payload.from);
    if (payload.to) form.append("to", JSON.stringify(payload.to));
    if (payload.cc) form.append("cc", JSON.stringify(payload.cc));
    if (payload.bcc) form.append("bcc", JSON.stringify(payload.bcc));
    if (payload.replyTo) form.append("replyTo", JSON.stringify(payload.replyTo));
    if (payload.tags) form.append("tags", JSON.stringify(payload.tags));
    if (payload.htmlBody) form.append("htmlBody", payload.htmlBody);
    if (payload.textBody) form.append("textBody", payload.textBody);

    form.append("subject", payload.subject);

    if (payload.attachments && payload.attachments.every(item => item instanceof File)) {
        payload.attachments.forEach(item => {
            form.append("attachments", item);
        });
    };

    return form;
};

type SendEmailResponse = {
    messageId: string;
};

type ListEmailResponse = {
    next: boolean;
    emails: {
        to: string;
        subject: string;
        id: string;
        createdAt: Date;
        status: EmailStatus;
    }[];
};

type GetEmailResponse = {
    /** Unique identifier for the email */
    id: string;
    /** Sender's email address */
    from: string;
    /** Tags associated with the email */
    tags: Tag[] | null;
    /** List of recipient email addresses */
    to: string[];
    /** List of CC recipients */
    cc: string[] | null;
    /** List of BCC recipients */
    bcc: string[] | null;
    /** List of Reply-To email addresses */
    replyTo: string[] | null;
    /** Subject of the email */
    subject: string;
    /** HTML content of the email */
    htmlBody: string | null;
    /** Plain text content of the email */
    textBody: string | null;
    /** Current status of the email */
    status: EmailStatus;
    /** Timestamp when the email was created */
    createdAt: string;
    /** Timestamp when the email was completed (if applicable) */
    completedAt: string | null;
    /** Timestamp when the email was scheduled (if applicable) */
    scheduledAt: string | null;
};

class Emails {
    private readonly dhesend: Dhesend;

    constructor(dhesend: Dhesend) {
        this.dhesend = dhesend;
    };

    async send(payload: SendEmailPayload) {
        if (payload.attachments) {
            if (payload.attachments.length > MAX_EMAIL_ATTACHMENTS) {
                return {
                    data: null,
                    error: `You can attach up to ${MAX_EMAIL_ATTACHMENTS} attachments.`
                };
            };

            if (payload.attachments.every(item => item instanceof File)) {
                const totalSize = payload.attachments.reduce((acc, curr) => acc + curr.size, 0);
                if (totalSize > MAX_ATTACHMENTS_SIZE * 1024 * 1024) {
                    return {
                        data: null,
                        error: `Total attachment size must not exceed ${MAX_ATTACHMENTS_SIZE} MB.`
                    };
                };

                return this.dhesend.post<SendEmailResponse>(
                    SendEmailPath,
                    createEmailFormData(payload)
                );
            };
        };

        return this.dhesend.post<SendEmailResponse>(
            SendEmailPath,
            JSON.stringify(payload)
        );
    };

    async list(filterParams?: string) {
        return this.dhesend.get<ListEmailResponse>(`${ListEmailPath}${filterParams}`);
    };

    async get(id: string) {
        return this.dhesend.get<GetEmailResponse>(GetEmailPath(id));
    };
};

export default Emails;
