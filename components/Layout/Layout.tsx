import React from "react"
import Nav from "./Nav"
import { useLayoutStore } from "stores/useLayoutStore"
import { useSigner } from "wagmi"

type Props = {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const { data } = useSigner()

  const { setSigner, setProvider } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()

  const signer = React.useMemo(() => {
    return data
  }, [data])

  React.useEffect(() => {
    if (!!signer) {
      const provider = signer?.provider
      setSigner(signer)
      if (!!provider) {
        setProvider(provider)
      }
    }
  }, [signer])

  /* add mobile flag to layout store  */
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  return (
    <React.Fragment>
      <Nav />
      {children}
    </React.Fragment>
  )
}

export default Layout
