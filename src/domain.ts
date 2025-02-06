import Dhesend from "./index";
import {
    CreateDomainPath,
    DeleteDomainPath,
    GetDomainPath,
    ListDomainPath,
} from "./path";

type CreateDomainResponse = {
    id: string;
    /** Domain name */
    name: string;
    /** Informational message, e.g., "Add these records to your DNS settings." */
    message: string;
    txt: {
        name: string;
        value: string;
    };
    dkim: {
        name: string;
        /** Type of record (e.g., CNAME) */
        type: string;
        value: string;
    }[];
};

type ListDomainResponse = {
    domainName: string;
    status: "Failed" | "NotStarted" | "Pending" | "Success" | "TemporaryFailure";
    createdAt: Date;
    updatedAt: Date;
};

type GetDomainResponse = {
    domainName: string;
    status: "Failed" | "NotStarted" | "Pending" | "Success" | "TemporaryFailure";
    createdAt: Date;
    txt: {
        name: string;
        value: string;
    };
    dkim: {
        name: string;
        type: string;
        value: string;
    }[];
};

type DeleteDomainResponse = {
    success: string;
};

class Domain {
    private readonly dhesend: Dhesend;

    constructor(dhesend: Dhesend) {
        this.dhesend = dhesend;
    };

    async create(domainName: string) {
        if (!domainName.includes(".")) {
            return {
                error: "Provide a valid domain, e.g., `dhesend.com`.",
                data: null
            };
        };

        return this.dhesend.post<CreateDomainResponse>(
            CreateDomainPath,
            JSON.stringify({ domain: domainName })
        );
    };

    async get(domainName: string) {
        return this.dhesend.get<GetDomainResponse>(
            GetDomainPath(domainName),
        );
    };

    async list() {
        return this.dhesend.get<ListDomainResponse[]>(ListDomainPath);
    };

    async delete(domainName: string) {
        return this.dhesend.post<DeleteDomainResponse>(
            DeleteDomainPath,
            JSON.stringify({ domain: domainName })
        );
    };
};

export default Domain;