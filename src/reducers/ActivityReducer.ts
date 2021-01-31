/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs'
import unionBy from 'lodash/unionBy'
import { createReducer } from '@reduxjs/toolkit'

import { loadGpx } from '../actions/ActivityActions'

import { Activity } from '../types/activity'

type State = { activities: Activity[] }

const initialState = { activities: [] } as State

export default createReducer(initialState, (builder) => (
  builder
    .addCase(loadGpx, (state, action):State => ({
      ...state,
      activities: unionBy([action.payload], state.activities, 'id')
        .sort((a, b) => dayjs(b.startTime).diff(a.startTime)),
    }))
))
