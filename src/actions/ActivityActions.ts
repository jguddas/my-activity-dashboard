/* eslint-disable import/prefer-default-export */
import { createAction } from '@reduxjs/toolkit'

import { Activity } from '../types/activity'

export const loadGpx = createAction<Activity>('LOAD_GPX')
