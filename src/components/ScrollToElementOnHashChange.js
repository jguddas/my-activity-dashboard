import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToElementOnHashChange({ id, className, children }) {
  const { hash } = useLocation()
  const isMounted = useRef(false)
  const ref = useRef()

  const onChange = () => {
    if (hash === `#${id}` && ref.current) {
      const top = ref.current.getBoundingClientRect().y + window.scrollY - 16
      if (window.innerHeight / 2 < top || window.scrollY || isMounted.current) {
        window.scrollTo({ top, behavior: isMounted.current ? 'smooth' : 'auto' })
      }
    }
    isMounted.current = true
  }

  useEffect(onChange, [hash])

  return (
    <div className={className} id={id} ref={ref}>
      {children}
    </div>
  )
}

export default ScrollToElementOnHashChange
