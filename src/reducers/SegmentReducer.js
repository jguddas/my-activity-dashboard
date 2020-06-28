/* eslint-disable no-nested-ternary */
import { unionBy } from 'lodash'
import { ADD_SEGMENT } from '../actions/SegmentActions.js'

export default (state, action) => (state ? (
  action.type === ADD_SEGMENT ? ({
    ...state,
    segments: unionBy([action.payload], state.segments, 'id'),
  }) : state
) : ({ segments: [] }))
