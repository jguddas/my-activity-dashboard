import Alert from '../components/Alert'
import createInstance from './createInstance'

const instance = createInstance(Alert)

export default (message:string, confirmText?:string): Promise<boolean> => (
  instance.then(({ call }) => call(message, confirmText))
)
