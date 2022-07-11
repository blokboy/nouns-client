import React from "react"
import { ethers } from "ethers"
import { useAuctionStore } from "stores/useAuctionStore"
import { BidProps } from "typings/auction"
import { walletSnippet } from "utils/helpers"

const Auction = () => {
  /*

    import store

   */
  const { currentAuction } = useAuctionStore()

  /*  Construct Bids  */
  const bids = React.useMemo<BidProps[] | undefined>(() => {
    if (!currentAuction) return

    return currentAuction.bids.reduce(
      (acc: BidProps[] = [], cv: { bidder: { id: string }; amount: string; id: string }) => {
        acc.push({
          bidder: cv.bidder,
          amount: cv.amount,
          id: cv.id,
        })

        return acc
      },
      []
    )
  }, [currentAuction])

  return (
    <div className="w-full max-w-[1440px] mx-auto px-8">
      {!!currentAuction && (
        <div className={"max-w-[500px] w-full mx-auto"}>
          <div className={"text-4xl"}>Noun {currentAuction?.id}</div>
          <div className={"flex my-4 py-4 gap-8"}>
            <div>
              <div>Current Bid:</div>
              <div className={"text-2xl"}>Ξ {ethers.utils.formatEther(currentAuction.amount)}</div>
            </div>
            <div>
              <div>Auction Ends In:</div>
              <div className={"text-2xl"}>{currentAuction.endTime}</div>
            </div>
          </div>

          {!!bids && (
            <div>
              <div>Current Bids</div>
              {bids.map(bid => (
                <a
                  href={`https://etherscan.io/tx/${bid.id}`}
                  target="_blank"
                  key={bid.id}
                  className={"flex border-slate-300 hover:border-slate-800 border rounded-lg p-2 justify-between mb-2"}
                >
                  <div>{walletSnippet(bid.bidder.id)}</div>
                  <div className={"font-bold"}>Ξ {ethers.utils.formatEther(bid.amount)}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Auction
