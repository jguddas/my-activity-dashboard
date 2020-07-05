import { createReducer } from '@reduxjs/toolkit'
import { unionBy } from 'lodash'

import { addSegment } from '../actions/SegmentActions.js'

export default createReducer({ segments: [] }, {
  [addSegment]: (state, action) => ({
    ...state,
    segments: unionBy([action.payload], state.segments, 'id'),
  }),
})
