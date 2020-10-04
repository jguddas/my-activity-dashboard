import { createReducer } from '@reduxjs/toolkit'
import { unionBy } from 'lodash'

import { addSplit } from '../actions/SplitActions.js'

export default createReducer({ splits: [] }, {
  [addSplit]: (state, action) => ({
    ...state,
    splits: unionBy([action.payload], state.splits, 'id'),
  }),
})
