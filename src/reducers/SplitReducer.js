import { createReducer } from '@reduxjs/toolkit'
import { unionBy } from 'lodash'

import { addSplit } from '../actions/SplitActions.js'

const defaultSplits = [5, 10, 20, 30, 50, 80, 100].map((distance) => ({
  name: `Default ${distance}km Split`,
  id: `default-distance-${distance}`,
  type: 'distance',
  distance,
}))

export default createReducer({ splits: defaultSplits }, {
  [addSplit]: (state, action) => ({
    ...state,
    splits: unionBy([action.payload], state.splits, 'id'),
  }),
})
