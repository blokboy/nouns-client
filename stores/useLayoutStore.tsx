import create from 'zustand'
import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/abstract-provider'

interface LayoutStoreProps {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  signer: Signer | null
  setSigner: (signer: Signer) => void
  provider: Provider | null
  setProvider: (provider: Provider) => void
}

export const useLayoutStore = create<LayoutStoreProps>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  signer: null,
  setSigner: (signer: Signer) => set({ signer }),
  provider: null,
  setProvider: (provider: Provider) => set({ provider }),
}))
