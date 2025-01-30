import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const baseURL = `${config.public.baseURL}/api/website/`;
  // const baseURL = 'http://127.0.0.1:8000/api/website/';

  // Handle the fetch request with error handling
  return useFetch(url, {
    ...options,
    baseURL,
    headers: {
      "accept-language": "en",
      Authorization: authStore.token ? `Bearer ${authStore.token}` : "",
      ...options?.headers,
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo("/auth/signin");
      }
    },
  });
}
