import React from 'react'

type Props = {
  newLocation: string
}

const Error301Page = ({ newLocation }: Props):JSX.Element => (
  <div className="page text-center">
    <div className="container">
      <h1 className="h1 mt-0 mb-4 display-1 text-muted mb-5">301</h1>
      <h2 className="h2 mt-0 mb-4">Oops... You just found an error page...</h2>
      <h4 className="h4 mt-0 mb-4 text-muted font-weight-normal mb-7">
        We are sorry but the page you have requested has moved...
      </h4>
      <a
        className="btn btn-purple"
        type="button"
        href={newLocation}
      >
        <i className="fe fe-arrow-up-right mr-2" />
        Go to new Location
      </a>
    </div>
  </div>
)

export default Error301Page
