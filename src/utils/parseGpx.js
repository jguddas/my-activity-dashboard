import { xml2js } from 'xml-js'

export default (src, args = {}) => xml2js(src, { compact: true, ...args })
