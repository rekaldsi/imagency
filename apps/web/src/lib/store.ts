import { create } from 'zustand'

interface User {
  id: string
  email: string
  role: 'creator' | 'buyer'
  firstName: string
  lastName: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}))

interface CartState {
  creatorId: string | null
  licenseConfig: {
    type: 'one-time' | 'subscription' | 'royalty' | null
    useCategory: string | null
    mediaTypes: string[]
    geography: string | null
    duration: string | null
    volume: number
  }
  setCreator: (id: string) => void
  updateLicenseConfig: (config: Partial<CartState['licenseConfig']>) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  creatorId: null,
  licenseConfig: {
    type: null,
    useCategory: null,
    mediaTypes: [],
    geography: null,
    duration: null,
    volume: 1,
  },
  setCreator: (id) => set({ creatorId: id }),
  updateLicenseConfig: (config) =>
    set((state) => ({
      licenseConfig: { ...state.licenseConfig, ...config },
    })),
  clearCart: () =>
    set({
      creatorId: null,
      licenseConfig: {
        type: null,
        useCategory: null,
        mediaTypes: [],
        geography: null,
        duration: null,
        volume: 1,
      },
    }),
}))
