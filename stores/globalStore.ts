export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      countries: [] as Array<any>,
    };
  },
  actions: {
    // 👉 fetch countries
    async fetchCountries() {
      const { $api }: any = useNuxtApp();
      const config = useRuntimeConfig();
      if (import.meta.client) {
        const data: any = await $api("countries", {
          baseURL: `${config.public.baseURL}/api/general/`,
        });
        this.countries = data.data;
      }
    },
    async fetchAll() {
      await Promise.all([this.fetchCountries()]);
    },
  },
  persist: true,
});
