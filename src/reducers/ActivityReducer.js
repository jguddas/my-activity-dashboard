/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs'
import { unionBy } from 'lodash'

import { LOAD_GPX } from '../actions/ActivityActions.js'

export default (state, action) => (state ? (
  action.type === LOAD_GPX
    ? {
      ...state,
      activities: unionBy([action.payload], state.activities, 'id')
        .sort((a, b) => dayjs(b.startTime).diff(a.startTime)),
    }
    : state
) : { activities: [] })
