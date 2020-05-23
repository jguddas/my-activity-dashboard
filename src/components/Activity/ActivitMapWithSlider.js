import React, { useState } from 'react'
import styled from 'styled-components'
import { round } from 'lodash'
import {
  Card, Button, Form, colors,
} from 'tabler-react'

import formatDuration from '../../formatDuration.js'

import ActivityMap from './ActivityMap.js'

function ActivityMapWithSlider({ activity }) {
  const [{ playing, time }, setState] = useState({
    time: activity.duration / 60000,
  })

  const requestRef = React.useRef()
  const previousTimeRef = React.useRef()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animate = (newTime) => {
    if (previousTimeRef.current !== undefined) {
      setState((previousState) => {
        const deltaTime = newTime - previousTimeRef.current
        const nexttime = previousState.time + deltaTime * 0.01
        const inRange = nexttime < activity.duration / 60000
        return (
          previousState.playing ? ({
            playing: inRange,
            time: inRange ? nexttime : Math.ceil(activity.duration / 60000),
          }) : previousState
        )
      })
    }
    previousTimeRef.current = newTime
    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animate])

  return (
    <Card>
      <ActivityMap
        cords={
          activity.trkpts
            .filter((trkpt) => trkpt[3] < time * 60000)
            .map(([lat, lon]) => [lat, lon])
        }
        controls
        smoothFactor={3}
        height={350}
        width={null}
      />
      <MyCardBody>
        <div className="d-flex">
          <Button
            icon={playing ? 'pause' : 'play'}
            prefix="fe"
            color="purple"
            className="mr-4"
            onClick={() => setState((previousState) => ({
              playing: !previousState.playing,
              time: previousState.time % (activity.duration / 60000),
            }))}
          />
          <MyRangeSlider
            type="range"
            className="form-control custom-range"
            onChange={(e) => setState(({ time: Number(e.target.value) }))}
            step={0.1}
            min={0}
            max={Math.ceil(activity.duration / 60000)}
            value={round(time, 2)}
          />
          <Form.MaskedInput
            className="w-9 ml-4 form-control text-center"
            onChange={(e) => {
              const [hours, minutes, seconds] = e.target.value.split(':')
              const nexttime = (
                parseInt(hours, 10) * 60
                + parseInt(minutes, 10)
                + parseInt(seconds, 10) / 60
              )
              if (nexttime <= Math.ceil(activity.duration / 60000)) {
                setState({ time: nexttime })
              }
            }}
            onClick={() => setState((previousState) => ({
              time: previousState.time,
              playing: false,
            }))}
            mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
            value={formatDuration(time * 60000)}
          />
        </div>
      </MyCardBody>
    </Card>
  )
}

export default ActivityMapWithSlider

const MyCardBody = styled(Card.Body)`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
`

const MyRangeSlider = styled.input`
  &:focus::-webkit-slider-thumb {
    border-color: ${() => colors.purple};
    background-color: ${() => colors.purple};
  }

  &:focus::thumb {
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
