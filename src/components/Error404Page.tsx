import React from 'react'
import { useHistory } from 'react-router-dom'

const Error404Page = ():JSX.Element => {
  const history = useHistory()
  return (
    <div className="page text-center">
      <div className="container">
        <h1 className="h1 mt-0 mb-4 display-1 text-muted mb-5">404</h1>
        <h2 className="h2 mt-0 mb-4">Oops... You just found an error page...</h2>
        <h4 className="h4 mt-0 mb-4 text-muted font-weight-normal mb-7">
          We are sorry but the page you have requested can not be found...
        </h4>
        <button
          className="btn btn-purple"
          type="button"
          onClick={() => history.goBack()}
        >
          <i className="fe fe-arrow-left mr-2" />
          Go back
        </button>
      </div>
    </div>
  )
}

export default Error404Page
