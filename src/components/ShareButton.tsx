import React from 'react'
import { write as writeClipboard } from 'clipboardy'
import { stringify } from 'query-string'
import { useSelector } from '../store'

import PageHeaderButton from './PageHeaderButton'

import { encode } from '../utils/trkptString'
import simplifyTrkpts from '../utils/simplifyTrkpts'
import formatDuration from '../utils/formatDuration'
import alert from '../utils/alert'

import { AToBSplit, ActivitySplit, ATobSplitMatch } from '../types/split'

type Props = {
  splitMatch: Pick<ATobSplitMatch, 'duration' | 'trkpts'>
  split: Pick<AToBSplit, 'name' | 'a' | 'b' | 'type'>|ActivitySplit
}

const share = (title:string, text:string, url:string) => {
  if (navigator?.share) {
    navigator.share({ title, text, url })
  } else {
    alert('Copy link to clipboard', 'Copy').then((confirmed) => {
      if (confirmed) {
        writeClipboard(url)
      }
    })
  }
}

const ShareButton = ({ splitMatch, split }: Props):JSX.Element|null => {
  const athlete = useSelector((state) => state.Strava.athlete)
  const name = split.type === 'matched' ? split.activity.name : split.name
  if (!athlete) return null
  return (
    <PageHeaderButton
      className=""
      onClick={() => {
        const a = split.type === 'matched'
          ? split.activity.trkpts[0]
          : split.a
        const b = split.type === 'matched'
          ? split.activity.trkpts[split.activity.trkpts.length - 1]
          : split.b
        share(
          'My Activity Dasboard',
          `I completed ${name} in ${formatDuration(splitMatch.duration)}`,
          `${window.location.origin}/share?${stringify({
            name,
            sender: `${athlete.firstname} ${athlete.lastname}`,
            track: encode([
              [a[0], a[1], 0, 0, 0],
              [b[0], b[1], 0, 0, 0],
              ...simplifyTrkpts(splitMatch.trkpts, 0.0001),
            ]),
          })}`,
        )
      }}
      icon="share-2"
    >
      Share
    </PageHeaderButton>
  )
}

export default ShareButton
