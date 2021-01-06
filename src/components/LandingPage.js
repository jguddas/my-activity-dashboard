import React from 'react'

import getCode from '../utils/getCode.js'
import example from '../example.json'

import PageWrapper from './PageWrapper.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ScrollToTopOnMount from './ScrollToTopOnMount.js'

function LandingPage() {
  return (
    <PageWrapper hideHeader>
      <ScrollToTopOnMount />
      <div className="page-header">
        <div className="page-title">My Activity Dashboard</div>
      </div>
      <div className="row row-deck flex-column-reverse flex-md-row mb-6">
        <div className="col col-12 col-sm-12 col-md-4">
          <div className="d-flex flex-column justify-content-center w-100">
            <div>
              <div className="d-none d-md-block mb-6">
                <h3>
                  <small>
                    Race against yourself and see your progress
                    on Matched Activities and Custom Splits.
                  </small>
                </h3>
                <h3>
                  <small>
                    Simply login with your Strava account and press Sync!
                  </small>
                </h3>
              </div>
              <div className="d-flex justify-content-center justify-content-md-start">
                <button type="button" className="btn btn-purple" onClick={() => getCode()}>
                  <h3 className="mb-0"><small>Login & Open Dashboard</small></h3>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-sm-12 col-md-8 px-md-5">
          <ActivityMapWithSlider
            activity={example[0]}
            matchedActivities={example}
          />
        </div>
      </div>
    </PageWrapper>
  )
}

export default LandingPage
