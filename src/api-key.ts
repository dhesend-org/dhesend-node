import Dhesend from "./index";
import { CreateApiKeyPath, DeleteApiKeyPath, ListApiKeyPath } from "./path";

type CreateApiTokenResponse = {
    id: string;
    title: string;
    token: string;
};

type ListApiTokenResponse = {
    id: string;
    title: string;
    token: string;
    createdAt: string;
}[];

type DeleteApiTokenResponse = {
    success: string;
};

class ApiKey {
    private readonly dhesend;
    constructor(dhesend: Dhesend) {
        this.dhesend = dhesend;
    };

    async create(title?: string) {
        return this.dhesend.post<CreateApiTokenResponse>(
            CreateApiKeyPath,
            JSON.stringify({ "title": title })
        );
    };

    async list() {
        return this.dhesend.get<ListApiTokenResponse>(
            ListApiKeyPath
        );
    };

    async delete(id: string) {
        return this.dhesend.post<DeleteApiTokenResponse>(
            DeleteApiKeyPath,
            JSON.stringify({ id: id }),
        );
    };
};

export default ApiKey;