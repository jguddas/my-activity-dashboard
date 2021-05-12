import React, { useEffect, useState } from 'react'

import PageHeaderButton from './PageHeaderButton'

let promptEvent:any
window.addEventListener('beforeinstallprompt', (e:any) => {
  e.preventDefault()
  promptEvent = e
})

const InstallButton = ():JSX.Element|null => {
  const [canBeInstalled, setCanBeInstalled] = useState(!!promptEvent)
  useEffect(() => {
    const listener = (e:any) => {
      e.preventDefault()
      setCanBeInstalled(true)
    }
    window.addEventListener('beforeinstallprompt', listener)
    return () => window.removeEventListener('beforeinstallprompt', listener)
  }, [])
  if (!canBeInstalled) return null
  return (
    <PageHeaderButton
      onClick={async () => {
        await promptEvent?.prompt?.()
        setCanBeInstalled(false)
      }}
      className="mr-1"
      icon="plus-circle"
    >
      Install
    </PageHeaderButton>
  )
}

export default InstallButton
