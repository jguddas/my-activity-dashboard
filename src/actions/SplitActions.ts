/* eslint-disable import/prefer-default-export */
import { createAction } from '@reduxjs/toolkit'

import { StoredSplit } from '../types/split'

export const addSplit = createAction<StoredSplit>('ADD_SPLIT')
