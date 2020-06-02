/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'tabler-react'

import parseGpx from '../../parseGpx.js'
import mapGpx from '../../mapGpx.js'

import { loadGpx } from '../../actions/ActivityActions.js'

function UploadButton(props) {
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
        if (props.setLoading) props.setLoading(arr.length - idx - 1 > 0)
        setLoading(arr.length - idx - 1)
        return loadFile(file)
      }), Promise.resolve())
      if (props.setLoading) props.setLoading(!!files.length)
      setLoading(files.length)
    })
  })

  return (
    <Button
      prefix="fe"
      icon="upload"
      color="secondary"
      {...props}
      disabled={loading}
      onClick={() => fileSelector.current.click()}
    >
      {loading ? `Upload (${loading})` : 'Upload'}
    </Button>
  )
}

export default UploadButton
