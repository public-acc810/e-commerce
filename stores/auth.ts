import type { IUser } from "~/types/auth";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null as String | null,
    user: null as any,
    isAuth: false,
  }),
  actions: {
    // Login
    async login(credentials: {
      email: string;
      password: string;
    }): Promise<any> {
      const { data, error }: any = await useAPI("login", {
        method: "POST",
        body: { ...credentials },
      });
      if (error.value) return error;
      else {
        this.redirectToProfile(data.value.data);
        return false;
      }
    },
    // register
    async register(credentials: IUser): Promise<any> {
      const { data, error }: any = await useAPI("register", {
        method: "POST",
        body: { ...credentials },
      });
      if (error.value) return error;
      else {
        this.redirectToProfile(data.value.data);
        return false;
      }
    },
    // logout
    async logout() {
      this.token = null;
      this.user = null;
      this.isAuth = false;
      await localStorage.clear();
      navigateTo("/auth/signin");
    },
    // Redirect to profile
    async redirectToProfile(data: any) {
      // const cartStore = useCartStore();
      // cartStore.getCartItems();
      this.user = await data;
      this.token = this.user.token;
      this.isAuth = true;
      useLocalStorage("token", this.token);
      navigateTo("/");
    },
  },
  persist: true,
});
