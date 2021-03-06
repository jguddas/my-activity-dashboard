// disable linting due to broken types in @nivo
// https://github.com/plouc/nivo/issues/1413
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import React from 'react'
import { ResponsiveLineCanvas } from '@nivo/line'

import colors from '../colors'

type Props = {
  data: number[]
  selected: number[]
  onClick: (x:number) => void
  isInteractive: boolean
  format: (y:number, x:number) => React.ReactNode
}

const DotGraph = ({
  data,
  selected,
  onClick = () => {},
  isInteractive = false,
  format = (val) => val,
}:Props):JSX.Element => (
  <ResponsiveLineCanvas
    xScale={{ type: 'linear' }}
    yScale={{ type: 'linear', min: 0 }}
    curve="monotoneX"
    margin={{ top: 5, bottom: 0, right: 5, left: 5 }}
    isInteractive={isInteractive}
    lineWidth={3}
    data={[{
      id: 2,
      data: data
        .map((y, x) => ({ y, x }))
        .reduce((acc, val) => [...acc, { y: 0, x: val.x }, val], []),
    }]}
    tooltip={({ point }) => (
      <div style={{
        background: 'white none repeat scroll 0% 0%',
        color: 'inherit',
        fontSize: 'inherit',
        borderRadius: '2px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px',
        padding: '5px 9px',
      }}
      >
        <div style={{ whiteSpace: 'pre', display: 'flex', alignItems: 'center' }}>
          <span>
            {format(data[point.data.x], point.data.x)}
          </span>
        </div>
      </div>
    )}
    onClick={({ data: { x } }) => onClick(x)}
    layers={[({ lineGenerator, series, ctx, lineWidth }) => {
      lineGenerator.context(ctx)
      series[0].data
        .forEach(({ position }, idx, arr) => { // eslint-disable-line consistent-return
          if (position.x === null || position.y === null || !(idx % 2)) {
            return null
          }
          ctx.strokeStyle = 'gray'
          if (selected.map((val) => val * 2 + 1).includes(idx)) {
            ctx.strokeStyle = 'black'
            ctx.lineWidth = lineWidth + 2
            ctx.beginPath()
            lineGenerator([arr[idx - 1].position, position])
            ctx.stroke()
            ctx.strokeStyle = colors.purple
          }
          ctx.lineWidth = lineWidth
          ctx.beginPath()
          lineGenerator([arr[idx - 1].position, position])
          ctx.stroke()
        })
    }, ({ series, ctx }) => {
      series[0].data
        .forEach(({ position }, idx) => { // eslint-disable-line consistent-return
          if (position.x === null || position.y === null || !(idx % 2)) {
            return null
          }
          ctx.strokeStyle = 'black'
          const isSelected = selected.map((val) => val * 2 + 1).includes(idx)
          ctx.fillStyle = isSelected ? colors.purple : colors.gray
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(position.x, position.y, isSelected ? 3 : 2, 0, 2 * Math.PI)
          ctx.stroke()
          ctx.arc(position.x, position.y, isSelected ? 3 : 2, 0, 2 * Math.PI)
          ctx.fill()
        })
    }]}
  />
)

export default DotGraph
