import create from 'zustand'

interface AuctionStoreProps {
  nounsGraphClient: {} | null
  setNounsGraphClient: (client: any) => void
  currentAuction: {} | null
  setCurrentAuction: (currentAuction: {}) => void
}

export const useAuctionStore = create<AuctionStoreProps>((set) => ({
  nounsGraphClient: null,
  setNounsGraphClient: (nounsGraphClient) => set({ nounsGraphClient }),
  currentAuction: null,
  setCurrentAuction: (currentAuction) => set({ currentAuction})
}))
