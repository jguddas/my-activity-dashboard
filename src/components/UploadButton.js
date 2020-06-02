/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Icon } from 'tabler-react'

import parseGpx from '../utils/parseGpx.js'
import mapGpx from '../utils/mapGpx.js'

import { loadGpx } from '../actions/ActivityActions.js'

function UploadButton({ disabled, ...props }) {
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
        if (props.setLoading && !nextLoading) {
          props.setLoading(false)
        }
        setLoading(nextLoading)
        return loadFile(file)
      }), Promise.resolve())
      if (props.setLoading) props.setLoading(!!files.length)
      setLoading(files.length)
    })
  })

  return (
    <Button
      color="secondary"
      disabled={loading || disabled}
      {...props}
      onClick={() => fileSelector.current.click()}
    >
      <Icon name="upload" prefix="fe" className="mr-md-2" />
      <span className="d-none d-md-inline">
        {loading ? `Upload (${loading})` : 'Upload'}
      </span>
    </Button>
  )
}

export default UploadButton
