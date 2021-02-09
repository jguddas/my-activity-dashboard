import { useEffect } from 'react'

function ScrollToTopOnMount():null {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

export default ScrollToTopOnMount
