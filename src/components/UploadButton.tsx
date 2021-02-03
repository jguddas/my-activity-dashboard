import React from 'react'
import { useDispatch } from 'react-redux'

import parseGpx from '../utils/parseGpx'
import mapGpx from '../utils/mapGpx'

import { loadGpx } from '../actions/ActivityActions'

import PageHeaderButton from './PageHeaderButton'

function UploadButton({ disabled, setLoading: setLoadingProps }) {
  const dispatch = useDispatch()
  const [{ isLoading, loading }, setLoadingState] = React.useState({
    isLoading: false,
    loading: 0,
  })
  const fileSelector = React.useRef()
  const setLoading = React.useCallback((_isLoading:boolean, value:number) => {
    setLoadingState({ isLoading: _isLoading, loading: value })
    setLoadingProps(_isLoading, value)
  }, [setLoadingProps])
  React.useEffect(() => {
    const loadFile = (file) => new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        dispatch(loadGpx({
          id: file.name.replace(/\.\w*$/, ''),
          ...mapGpx(parseGpx(e.target.result).gpx),
        }))
        resolve()
      }
      reader.readAsText(file)
    })
    fileSelector.current = document.createElement('input')
    fileSelector.current.setAttribute('type', 'file')
    fileSelector.current.setAttribute('accept', '.gpx')
    fileSelector.current.setAttribute('multiple', 'multiple')
    fileSelector.current.addEventListener('input', () => {
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
      color="secondary"
      disabled={isLoading || disabled}
      icon="upload"
      onClick={() => fileSelector.current.click()}
    >
      {isLoading && loading > 0 ? `Upload (${loading})` : 'Upload'}
    </PageHeaderButton>
  )
}

export default UploadButton
