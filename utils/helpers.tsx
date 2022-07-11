import { isAddress } from "ethers/lib/utils"

/**
 * Create snippet of wallet address or
 * return address if it is not a "address"
 * as defined by Ethers.
 *
 * @param addr
 * @returns {string || null}
 */

export const walletSnippet = (addr: string) => {
  if (!addr) {
    return null
  }

  return isAddress(addr) ? addr.substring(0, 5) + "..." + addr.substring(addr.length - 5, addr.length) : addr
}
