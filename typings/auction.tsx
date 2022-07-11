export interface BidProps {
  id: string
  amount: string
  bidder: {
    id: string
  }
}

export interface AuctionProps {
  id: string
  amount: string
  endTime: string
  bids: BidProps[]
}
