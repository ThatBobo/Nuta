export interface OpixClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class Opix {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: OpixClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? "https://opix-io.lovable.app/api";
  }

  private async request(path: string, method: string = "GET", body?: any) {
    const headers: Record<string, string> = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    };

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  invites = {
    create: (data: any) => this.request("/invites/create", "POST", data),
    list: () => this.request("/invites/list")
  };

  events = {
    track: (data: any) => this.request("/events/track", "POST", data),
    list: () => this.request("/events/list")
  };

  authorizations = {
    create: (data: any) => this.request("/authorizations/create", "POST", data),
    list: () => this.request("/authorizations/list"),
    revoke: (id: string) => this.request("/authorizations/revoke", "POST", { id })
  };

  validateKey = () => this.request("/keys/validate");
}

export const createClient = (_clientId: string, apiKey: string) => {
  return new Opix({ apiKey });
};
