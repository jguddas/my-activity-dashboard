import React from 'react'

import getCode from '../utils/getCode'
import exampleActivity from '../exampleActivity.json'
import exampleMatchedActivities from '../exampleMatchedActivities.json'

import PageWrapper from './PageWrapper'
import ActivityMapWithSlider from './ActivityMapWithSlider'
import ScrollToTopOnMount from './ScrollToTopOnMount'

import { Trkpt } from '../types/activity.js'

type SkeletonActivity = {
  duration: number
  trkpts: [number, number, number, number][]
  endpt: Trkpt
}

function LandingPage():JSX.Element {
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
            activity={exampleActivity as SkeletonActivity}
            matchedActivities={exampleMatchedActivities as SkeletonActivity[]}
          />
        </div>
      </div>
    </PageWrapper>
  )
}

export default LandingPage
