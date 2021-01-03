import React from 'react'
import { ResponsiveLineCanvas } from '../nivo-line.esm.js'

import colors from '../colors.js'

import { drawLine, drawEndCap } from '../utils/lineUtils.js'

const LineGraph = ({ data }) => (
  <ResponsiveLineCanvas
    data={data.map((val, id) => ({
      id,
      data: val.map((y, x) => ({ x, y })),
    })).reverse()}
    colors={[
      colors['gray-lighter'],
      colors.gray,
      colors.purple,
    ]}
    layers={[drawLine, drawEndCap]}
    lineWidth={3}
    curve="monotoneX"
    margin={{ top: 5, bottom: 5, right: 5 }}
    isInteractive={false}
  />
)

export default LineGraph
