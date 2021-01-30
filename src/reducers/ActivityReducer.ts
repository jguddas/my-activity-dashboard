/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs'
import unionBy from 'lodash/unionBy'
import { createReducer } from '@reduxjs/toolkit'

import { loadGpx } from '../actions/ActivityActions'

export default createReducer({ activities: [] }, {
  [loadGpx]: (state, action) => ({
    ...state,
    activities: unionBy([action.payload], state.activities, 'id')
      .sort((a, b) => dayjs(b.startTime).diff(a.startTime)),
  }),
})
