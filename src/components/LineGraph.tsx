// disable linting due to broken types in @nivo
// https://github.com/plouc/nivo/issues/1413
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import React from 'react'
import { ResponsiveLineCanvas } from '@nivo/line'

import colors from '../colors'

import { drawLine, drawEndCap } from '../utils/lineUtils'

const LineGraph = ({ data }) => (
  <ResponsiveLineCanvas
    data={data.map((val, id) => ({
      id,
      data: val.map((y, x) => ({ x, y })),
    }))}
    colors={[
      colors.purple,
      colors.gray,
      ...data.slice(2).map(() => colors.grayLighter)
    ]}
    layers={[drawLine, drawEndCap]}
    lineWidth={3}
    curve="monotoneX"
    margin={{ top: 5, bottom: 5, right: 5 }}
    isInteractive={false}
  />
)

export default LineGraph
