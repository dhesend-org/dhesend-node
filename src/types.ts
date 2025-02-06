export type ErrorResponse = string | { field: string; message: string }[];

/** Represents a tag associated with an email */
export type Tag = {
    /**
     * Name of the email tag.
     * Must contain only ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-).
     * Length must not exceed 256 characters.
     */
    name: string;
    /**
     * Value of the email tag.
     * Must contain only ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-).
     * Length must not exceed 256 characters.
     */
    value: string;
};

type Attachment = {
    /** URL of the attachment. */
    url: string;
    /** Optional. The file name for the attachment. If not provided, it will be derived from the `url` property. */
    filename?: string;
    /** Optional. The content type for the attachment. If not provided, it will be derived from the `url`. */
    contentType?: string;
};

export interface SendEmailPayload {
    /**
     * The sender's email address. To include a display name, use the format "Your Name <sender@domain.com>".
     */
    from?: string;
    /**
     * The recipient's email address(es).
     * Accepts an array of strings. Maximum of 50 recipients.
     */
    to: string[];
    /**
     * Optional. The carbon copy (CC) recipient's email address(es). 
     * Accepts an array of strings.
     */
    cc?: string[];
    /**
     * Optional. The blind carbon copy (BCC) recipient's email address(es).
     *  Accepts an array of strings.
     */
    bcc?: string[];
    /**
     * Optional. The reply-to email address(es). Accepts an array of strings.
     */
    replyTo?: string[];
    /**
     * The subject line of the email.
     */
    subject: string;
    /**
     * The HTML version of the email content.
     */
    htmlBody?: string;
    /**
     * The plain text version of the email content.
     */
    textBody?: string;
    /**
     * Optional. Tags for categorizing or labeling the email.
     */
    tags?: Tag[];
    /**
     * Optional. Attachments for the email. Can include up to 15 files per email, with a maximum total size of 25 MB.
     */
    attachments?: File[] | Attachment[];
};

export type EmailStatus = "delivery" | "scheduled" | "sent" | "complaint" | "bounce" | "failed" | "opened" | "clicked";