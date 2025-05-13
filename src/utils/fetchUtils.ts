const BASE_URL = 'http://localhost:3001'; // Replace with your actual base URL

// Type for request options
type RequestOptions = RequestInit & {
  headers?: HeadersInit;
};

// Generic fetch wrapper
async function fetchWrapper<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    // Add Authorization or other default headers here
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Fetch error');
    }

    // Assume response is JSON
    return await response.json();
  } catch (error) {
    console.error(`Fetch error on ${url}:`, error);
    throw error;
  }
}

// Shorthand methods with generics
export function get<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
  return fetchWrapper<T>(endpoint, { ...options, method: 'GET' });
}

export function post<T = any, B = any>(
  endpoint: string,
  body: B,
  options?: RequestOptions
): Promise<T> {
  return fetchWrapper<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export function put<T = any, B = any>(
  endpoint: string,
  body: B,
  options?: RequestOptions
): Promise<T> {
  return fetchWrapper<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

export function del<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
  return fetchWrapper<T>(endpoint, { ...options, method: 'DELETE' });
}
