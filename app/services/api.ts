const API_BASE = import.meta.env.VITE_API_URL;

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function isApiError(error: unknown): error is ApiErrorShape {
  return (
    error !== null &&
    typeof error === "object" &&
    "message" in error
  );
}

async function parseResponse(response: Response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }
    return response.text();
  } catch (e) {
    return null;
  }
}

export type ApiErrorShape = {
  message: string;
  status?: number;
  code?: number;
};

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    const data = await parseResponse(response);

    if (!response.ok || (isObject(data) && data.code === 1000)) {
      throw {
        message: (isObject(data) && typeof data.message === 'string') 
          ? data.message 
          : `請求失敗 (${response.status})`,
        status: response.status,
        code: isObject(data) ? (data.code as number) : undefined
      } satisfies ApiErrorShape;
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw { message: "連線逾時，請檢查網路狀態" } satisfies ApiErrorShape;
    }
    if (isApiError(error)) throw error;

    throw { message: "發生預期外的錯誤" } satisfies ApiErrorShape;
  }
}

export const api = {
  get: <TResponse>(url: string, params?: Record<string, string>) => {
    const urlWithParams = params
      ? `${url}?${new URLSearchParams(params).toString()}`
      : url;
    return request<TResponse>(urlWithParams, { method: "GET" });
  },
  patch: <TResponse, TBody>(url: string, body: TBody) =>
    request<TResponse>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};
