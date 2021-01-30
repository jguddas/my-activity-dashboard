import React from 'react'
import { useDispatch } from 'react-redux'

import parseGpx from '../utils/parseGpx'
import mapGpx from '../utils/mapGpx'

import { loadGpx } from '../actions/ActivityActions'

import PageHeaderButton from './PageHeaderButton'

function UploadButton({ disabled, setLoading: setLoadingProps }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const fileSelector = React.useRef()
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
      files.reduce((acc, file, idx, arr) => acc.then(() => {
        const nextLoading = arr.length - idx - 1
        if (setLoadingProps && !nextLoading) {
          setLoadingProps(false)
        }
        setLoading(nextLoading)
        return loadFile(file)
      }), Promise.resolve())
      if (setLoadingProps) setLoadingProps(!!files.length)
      setLoading(files.length)
    })
  })

  return (
    <PageHeaderButton
      color="secondary"
      disabled={loading || disabled}
      icon="upload"
      onClick={() => fileSelector.current.click()}
    >
      {loading ? `Upload (${loading})` : 'Upload'}
    </PageHeaderButton>
  )
}

export default UploadButton
