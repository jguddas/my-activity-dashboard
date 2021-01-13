import React, { useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import screenfull from 'screenfull'
import maxBy from 'lodash/maxBy.js'
import round from 'lodash/round.js'
import MaskedInput from 'react-text-mask'

import colors from '../colors.js'
import formatDuration from '../utils/formatDuration.js'

const ActivityMap = React.lazy(() => import(
  /* webpackChunkName: "activity-map" */
  './ActivityMap.js'
))

function ActivityMapWithSlider({ activity, matchedActivities, factor = 0.005 }) {
  const maxActivityDurationInMinutes = useMemo(() => Math.ceil(
    maxBy([activity].concat(matchedActivities), 'duration').duration / 60000,
  ), [activity, matchedActivities])
  const requestRef = useRef()
  const matchedTimeRef = useRef()
  const [
    { playing, time },
    setState,
  ] = useState({ time: maxActivityDurationInMinutes })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animate = (newTime) => {
    if (matchedTimeRef.current !== undefined) {
      setState((matchedState) => {
        const deltaTime = newTime - matchedTimeRef.current
        const nexttime = matchedState.time + deltaTime * factor
        const inRange = nexttime < maxActivityDurationInMinutes
        return (
          matchedState.playing ? ({
            playing: inRange,
            time: inRange ? nexttime : maxActivityDurationInMinutes,
          }) : matchedState
        )
      })
    }
    matchedTimeRef.current = newTime
    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animate])

  const [isFullscreen, setFullscreen] = useState(screenfull.isFullscreen)

  const height = isFullscreen ? 'calc(100vh - 87px)' : 350

  const body = (
    <MyCardBody className="card-body bg-white">
      <div className="d-flex">
        <button
          className="btn btn-purple mr-4"
          type="button"
          onClick={() => setState((matchedState) => ({
            playing: !matchedState.playing,
            time: matchedState.time % (maxActivityDurationInMinutes),
          }))}
        >
          <i className={`fe fe-${playing ? 'pause' : 'play'}`} />
        </button>
        <MyRangeSlider
          type="range"
          className="form-control custom-range"
          onChange={(e) => setState(({ time: Number(e.target.value) }))}
          step={0.1}
          min={0}
          max={maxActivityDurationInMinutes}
          value={round(time, 2)}
        />
        <MaskedInput
          className="form-control w-9 ml-4 form-control text-center"
          onChange={(e) => {
            const [hours, minutes, seconds] = e.target.value.split(':')
            const nexttime = (
              parseInt(hours, 10) * 60
              + parseInt(minutes, 10)
              + parseInt(seconds, 10) / 60
            )
            if (nexttime <= maxActivityDurationInMinutes) {
              setState({ time: nexttime })
            }
          }}
          onClick={() => setState((matchedState) => ({
            time: matchedState.time,
            playing: false,
          }))}
          mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
          value={formatDuration(time * 60000)}
        />
      </div>
    </MyCardBody>
  )

  return (
    <div className="card">
      <React.Suspense fallback={(
        <>
          <div style={{ height }} />
          {body}
        </>
)}
      >
        <ActivityMap
          key={activity.id}
          activity={activity}
          matchedActivities={matchedActivities}
          trimEnd={time * 60000}
          controls
          scrollWheelZoom={isFullscreen}
          dragging={isFullscreen || 'touch'}
          setFullscreen={setFullscreen}
          smoothFactor={3}
          height={height}
        >
          {body}
        </ActivityMap>
      </React.Suspense>
    </div>
  )
}

export default ActivityMapWithSlider

const MyCardBody = styled.div`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
`

const MyRangeSlider = styled.input`
  &:focus::-webkit-slider-thumb {
    border-color: ${() => colors.purple};
    background-color: ${() => colors.purple};
  }

  &:focus::-moz-range-thumb {
    border-color: ${() => colors.purple};
    background-color: ${() => colors.purple};
  }

  &:focus::-ms-thumb {
    border-color: ${() => colors.purple};
    background-color: ${() => colors.purple};
  }

  &::-webkit-slider-runnable-track {
    border-radius: 2px;
    height: 4px;
    background: ${() => colors.purple};
    background-color: ${() => colors.purple};
  }

  &::-moz-range-progress {
    border-radius: 2px;
    height: 4px;
    background: ${() => colors.purple};
    background-color: ${() => colors.purple};
  }

  &::-ms-fill-lower {
    border-radius: 2px;
    height: 4px;
    background: ${() => colors.purple};
    background-color: ${() => colors.purple};
  }
`
