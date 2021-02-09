import { createReducer } from '@reduxjs/toolkit'
import unionBy from 'lodash/unionBy'

import { addSplit } from '../actions/SplitActions'

import { StoredSplit, DistanceSplit } from '../types/split'

const defaultSplits = [5, 10, 20, 30, 50, 80, 100].map((distance):DistanceSplit => ({
  name: `Default ${distance}km Split`,
  id: `default-distance-${distance}`,
  type: 'distance',
  distance,
}))

type State = { splits: StoredSplit[] }

const initialState = { splits: defaultSplits } as State

export default createReducer(initialState, (builder) => (
  builder
    .addCase(addSplit, (state, action):State => ({
      ...state,
      splits: unionBy([action.payload], state.splits, 'id'),
    }))
))
