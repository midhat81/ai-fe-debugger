const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function fetchAPI<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}