import create from "zustand"
import { AuctionProps } from "typings/auction"

interface AuctionStoreProps {
  nounsGraphClient: {} | null
  setNounsGraphClient: (client: any) => void
  currentAuction: AuctionProps | null
  setCurrentAuction: (currentAuction: AuctionProps) => void
  nounsContract: {} | null
  setNounsContract: (nounsContract: {}) => void
}

export const useAuctionStore = create<AuctionStoreProps>(set => ({
  nounsGraphClient: null,
  setNounsGraphClient: nounsGraphClient => set({ nounsGraphClient }),
  currentAuction: null,
  setCurrentAuction: currentAuction => set({ currentAuction }),
  nounsContract: null,
  setNounsContract: nounsContract => set({ nounsContract }),
}))
