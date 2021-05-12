import { createElement } from 'react'
import { render } from 'react-dom'

const createInstance = (Component:React.ElementType):Promise<any> => (
  new Promise<any>((resolve) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    let called = false
    const ref = (e:any) => {
      if (!called) {
        called = true
        resolve(e)
      }
    }
    render(createElement(Component, { ref }), div)
  })
)

export default createInstance
