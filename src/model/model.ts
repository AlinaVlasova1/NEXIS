export class UpdateEntityRequest {
    id: number;
    title?: string;
    description?: string;
    published: boolean;
    published_from?: string;

    constructor(id: number, title: string, description: string, published: boolean, published_from?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.published = published;
        this.published_from = published_from;
    }
}

export class CreateEntityRequest {
    title?: string;
    description?: string;
    published: boolean;
    published_from?: string;

    constructor(title: string, description: string, published: boolean, published_from?: string) {
        this.title = title;
        this.description = description;
        this.published = published;
        this.published_from = published_from;
    }
}

export class EntityResponse {
    id: number;
    title?: string;
    description?: string;
    published: boolean;
    published_from?: string;

    constructor(id: number, title: string, description: string, published: boolean, published_from?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.published = published;
        this.published_from = published_from;
    }
}