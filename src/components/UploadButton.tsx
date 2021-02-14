import React from 'react'
import { useDispatch } from 'react-redux'

import parseGpx from '../utils/parseGpx'
import mapGpx from '../utils/mapGpx'

import { loadGpx } from '../actions/ActivityActions'

import PageHeaderButton from './PageHeaderButton'

type Props = {
  disabled?: boolean
  setLoading: (isLoading:boolean, loading:number) => void
}

function UploadButton({ disabled = false, setLoading: setLoadingProps }:Props):JSX.Element {
  const dispatch = useDispatch()
  const [{ isLoading, loading }, setLoadingState] = React.useState({
    isLoading: false,
    loading: 0,
  })
  const fileSelector = React.useRef<HTMLInputElement>()
  const setLoading = React.useCallback((_isLoading:boolean, value:number) => {
    setLoadingState({ isLoading: _isLoading, loading: value })
    setLoadingProps(_isLoading, value)
  }, [setLoadingProps])
  React.useEffect(() => {
    const loadFile = (file:File) => new Promise<void>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          dispatch(loadGpx({
            ...mapGpx(parseGpx(e.target.result.toString())),
            id: file.name.replace(/\.\w*$/, ''),
          }))
        }
        resolve()
      }
      reader.readAsText(file)
    })
    fileSelector.current = document.createElement('input')
    fileSelector.current.setAttribute('type', 'file')
    fileSelector.current.setAttribute('accept', '.gpx')
    fileSelector.current.setAttribute('multiple', 'multiple')
    fileSelector.current.addEventListener('input', () => {
      if (!fileSelector.current?.files) return
      const files = Array.from(fileSelector.current.files)
      files.reduce((acc, file, idx, arr) => acc
        .then(() => loadFile(file))
        .then(() => {
          const nextLoading = arr.length - idx - 1
          setLoading(!!nextLoading, nextLoading)
        }).catch(() => setLoading(false, 0)),
      Promise.resolve())
      setLoading(!!files.length, files.length)
    })
  })

  return (
    <PageHeaderButton
      disabled={isLoading || disabled}
      icon="upload"
      onClick={() => fileSelector.current?.click()}
    >
      {isLoading && loading > 0 ? `Upload (${loading})` : 'Upload'}
    </PageHeaderButton>
  )
}

export default UploadButton
