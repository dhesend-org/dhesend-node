import { BASE_URL, DEFAULT_USER_AGENT } from "./constants";
import { ErrorResponse } from "./types";
import Email from "./email";
import ApiKey from "./api-key";
import Domain from "./domain";
import Webhook from "./webhook";

const userAgent = process?.env?.DHESEND_USER_AGENT || DEFAULT_USER_AGENT;

class Dhesend {
    readonly key: string;
    readonly baseUrl: string;
    private readonly headers?: Record<string, string>;
    readonly email: Email;
    readonly apiKey: ApiKey;
    readonly domain: Domain;
    readonly webhook: Webhook;

    constructor(key?: string, headers?: Record<string, string>, baseUrl?: string) {
        this.key = key || process?.env?.DHESEND_API_KEY!;
        if (!this.key) {
            throw new Error("Missing API key. Pass it to constructor `new Dhesend(api_key)`")
        };

        this.headers = headers || {
            "Authorization": `Bearer ${this.key}`,
            "User-Agent": userAgent,
        };

        this.email = new Email(this);
        this.apiKey = new ApiKey(this);
        this.domain = new Domain(this);
        this.webhook = new Webhook(this);
        this.baseUrl = baseUrl || BASE_URL
    };

    async fetchRequest<T>(path: string, options: RequestInit): Promise<{ data: T | null; error: ErrorResponse | null; }> {
        try {
            const response = await fetch(`${this.baseUrl}/${path}`, {
                ...options,
                headers: {
                    ...options.headers,
                    ...this.headers
                }
            });

            if (!response.ok) {
                try {
                    const error = await response.json();

                    return {
                        data: null,
                        error: typeof error === "object" ? error?.error : error || "Oops! Something went wrong, please try again later.",
                    };
                } catch (error) {
                    if (error instanceof SyntaxError) {
                        return {
                            data: null,
                            error: "Internal server error. We are not able to process your request right now, please try again later."
                        };
                    };

                    if (error instanceof Error) {
                        return {
                            data: null,
                            error: JSON.stringify({ ...error }),
                        };
                    };

                    return {
                        data: null,
                        error: "Oops! Something went wrong, please try again later.",
                    };
                };
            };

            const data = await response.json();
            return {
                data: data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error: error as string
            };
        };
    };

    async post<T>(path: string, body: string | FormData, headers: Record<string, string> = {}) {
        if (!(body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        };

        const requestOptions: RequestInit = {
            method: "POST",
            headers: headers,
            body: body
        };

        return this.fetchRequest<T>(path, requestOptions);
    };

    async get<T>(path: string, headers?: {}) {
        const requestOptions: RequestInit = {
            headers: {
                ...headers,
                "Content-Type": "application/json"
            },
        };

        return this.fetchRequest<T>(path, requestOptions);
    };
};

export default Dhesend;
export * from "./types";