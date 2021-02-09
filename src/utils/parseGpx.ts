import { xml2js, ElementCompact } from 'xml-js'

const parseGpx = (src:string):ElementCompact => (
  xml2js(src, { compact: true })
)

export default parseGpx
