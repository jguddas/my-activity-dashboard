import React from 'react'
import { write as writeClipboard } from 'clipboardy'
import { stringify } from 'query-string'
import { useSelector } from '../store'

import PageHeaderButton from './PageHeaderButton'

import { encode } from '../utils/trkptString'
import simplifyTrkpts from '../utils/simplifyTrkpts'
import formatDuration from '../utils/formatDuration'

import { AToBSplit, ATobSplitMatch } from '../types/split'

type Props = {
  splitMatch: ATobSplitMatch
  split: AToBSplit
}

const share = (title:string, text:string, url:string) => {
  if (navigator?.share) {
    navigator.share({ title, text, url })
  } else {
    writeClipboard(url)
    alert('link coppied to clipboard')
  }
}

const ShareButton = ({ splitMatch, split }: Props):JSX.Element|null => {
  const athlete = useSelector((state) => state.Strava.athlete)
  if (!athlete) return null
  return (
    <PageHeaderButton
      className=""
      onClick={() => share(
        'My Activity Dasboard',
        `I completed ${split.name} in ${formatDuration(splitMatch.duration)}!`,
        `${window.location.origin}/share?${stringify({
          name: split.name,
          sender: `${athlete.firstname} ${athlete.lastname}`,
          track: encode([
            [split.a[0], split.a[1], 0, 0, 0],
            [split.b[0], split.b[1], 0, 0, 0],
            ...simplifyTrkpts(splitMatch.trkpts, 0.0001),
          ]),
        })}`,
      )}
      icon="share-2"
    >
      Share
    </PageHeaderButton>
  )
}

export default ShareButton
