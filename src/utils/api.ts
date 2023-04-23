export const api = {
  get: async <T>({ url }: { url: string }) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { data: (await response.json()) as T, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },
  post: async <T>({ url, body }: { url: string; body: any }) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body && JSON.stringify(body),
      });
      return { data: (await response.json()) as T, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },
};
