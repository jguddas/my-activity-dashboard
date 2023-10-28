import React from 'react'
import L, { Map as LMap } from 'leaflet'
import styled from 'styled-components'
import screenfull from 'screenfull'
import findLast from 'lodash/findLast'
import findLastIndex from 'lodash/findLastIndex'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'

import colors from '../colors'

type MapTrkpt = [number, number, number?, number?, number?]

export type MapActivity = {
  id?: string
  trkpts: MapTrkpt[]
  endpt: MapTrkpt
}

interface Map extends LMap {
  _onResize: () => void
}

interface Props extends RouteComponentProps {
  activity: MapActivity
  children?: React.ReactNode
  className?: string
  scrollWheelZoom?: boolean
  height?: number|string
  width?: number|string
  matchedActivities?: MapActivity[]
  trimEnd?: number,
  smoothFactor?: number
  fillColor?: string
  strokeColor?: string
  controls?: boolean
  setFullscreen?: (val: boolean) => void
  dragging?: boolean
}

type State = { isFullscreen: boolean }

const getLatLon = (
  [lat, lon]:[number, number]|MapTrkpt,
) => [lat, lon] as L.LatLngTuple

class ActivityMap extends React.Component<Props, State> {
  static defaultProps = {
    height: 200,
    width: '100%',
    matchedActivities: [],
    smoothFactor: 4,
    fillColor: colors.purple,
    strokeColor: '#000000',
    controls: false,
  }

  mapId = `map-${Math.ceil(Math.random() * 10000000)}`

  containerRef = React.createRef<HTMLDivElement>()

  map:Map|null = null

  matchedLines:L.Polyline[] = []

  matchedMarkers:L.CircleMarker[] = []

  marker:L.CircleMarker|null = null

  line:L.Polyline|null = null

  bounds:L.LatLngBounds|null = null

  stroke: L.Polyline|null = null

  constructor(props:Props) {
    super(props)
    this.state = { isFullscreen: screenfull.isEnabled ? screenfull.isFullscreen : false }
  }

  componentDidMount() {
    const { controls, scrollWheelZoom, dragging } = this.props

    this.map = L.map(this.mapId, {
      attributionControl: false,
      zoomControl: false,
      dragging: controls && (dragging || !L.Browser.touch),
      touchZoom: controls,
      doubleClickZoom: controls,
      scrollWheelZoom: controls && scrollWheelZoom !== false,
      boxZoom: controls,
      keyboard: controls,
      tap: false,
    }) as Map

    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png",
      { detectRetina: true }
    ).addTo(this.map);

    this.addMarkersAndLines()
    this.fitBounds()

    if (screenfull.isEnabled) {
      screenfull.on('change', this.updateFullscreen)
    }
  }

  componentDidUpdate(previousProps:Props) {
    this.componentDidUpdateZoom(previousProps)
    this.componentDidUpdateTrimEnd(previousProps)
    this.componentDidUpdateActvity(previousProps)
  }

  componentWillUnmount() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.updateFullscreen)
    }
  }

  fitBounds = () => {
    if (this.map && this.bounds) {
      this.map.fitBounds(this.bounds, { padding: [2, 2] })
    }
  }

  updateFullscreen = () => {
    const { setFullscreen } = this.props
    this.setState({ isFullscreen: screenfull.isEnabled ? screenfull.isFullscreen : false })
    // eslint-disable-next-line no-underscore-dangle
    this.map?._onResize()
    if (setFullscreen) {
      setFullscreen(screenfull.isEnabled ? screenfull.isFullscreen : false)
    }
  }

  addMarkersAndLines = () => {
    const {
      history,
      activity,
      smoothFactor,
      fillColor,
      strokeColor,
      matchedActivities = [],
    } = this.props

    const cords = activity.trkpts.map(getLatLon)

    this.matchedLines = matchedActivities
      .concat(activity)
      .map((matchedActivity) => (
        L.polyline(matchedActivity.trkpts.map(getLatLon), {
          color: 'gray',
          weight: 3,
          lineJoin: 'round',
          smoothFactor,
        })
      ).on('click', () => {
        if (matchedActivity.id) {
          history.push(matchedActivity.id)
        }
      }))

    this.stroke = L.polyline(cords, {
      color: strokeColor,
      weight: 5,
      lineJoin: 'round',
      smoothFactor,
    })
    this.line = L.polyline(cords, {
      color: fillColor,
      weight: 3,
      lineJoin: 'round',
      smoothFactor,
    })
    this.bounds = this.line.getBounds()
    this.matchedMarkers = matchedActivities
      .map((matchedActivity) => (
        L.circleMarker(getLatLon(matchedActivity.endpt), {
          radius: 2,
          color: 'black',
          fillColor: colors.gray,
          fill: true,
          fillOpacity: 1,
          weight: 1,
        }).on('click', ():void => {
          if (matchedActivity.id) {
            history.push(`/activity/${matchedActivity.id}`)
          }
        })
      ))
    this.marker = L.circleMarker(getLatLon(activity.endpt), {
      radius: 3,
      color: strokeColor,
      fillColor,
      fill: true,
      fillOpacity: 1,
      weight: 1,
    })
    if (this.map) {
      this.matchedLines.map((matchedLine) => (
        this.map && matchedLine.addTo(this.map)
      ))
      this.stroke.addTo(this.map)
      this.line.addTo(this.map)
      this.matchedMarkers.forEach((matchedMarker) => (
        this.map && matchedMarker.addTo(this.map)
      ))
      this.marker.addTo(this.map)
    }
  }

  removeMarkersAndLines = () => {
    this.marker?.remove()
    this.line?.remove()
    this.stroke?.remove()
    this.matchedLines.forEach((matchedLine) => matchedLine.remove())
    this.matchedMarkers.forEach((matchedMarker) => matchedMarker.remove())
  }

  updateTrimEnd = () => {
    const { trimEnd, activity, matchedActivities = [] } = this.props
    if (!trimEnd) return
    const isNotTrimEnd = (trkpt:MapTrkpt) => !!trkpt[3] && trkpt[3] <= trimEnd
    let lastPtIdx = findLastIndex(activity.trkpts, isNotTrimEnd)
    if (lastPtIdx === -1) lastPtIdx = 0
    const cords = activity.trkpts.slice(0, lastPtIdx + 1).map(getLatLon)
    this.stroke?.setLatLngs(cords)
    this.line?.setLatLngs(cords)
    this.marker?.setLatLng(getLatLon(activity.trkpts[lastPtIdx]))
    this.matchedMarkers.forEach((matchedMarker, idx) => {
      const lastTrkpt = findLast(matchedActivities[idx].trkpts, isNotTrimEnd)
      if (lastTrkpt) {
        matchedMarker.setLatLng(getLatLon(lastTrkpt))
      }
    })
  }

  componentDidUpdateZoom = (previousProps:Props) => {
    const { scrollWheelZoom, dragging, controls } = this.props
    if (
      scrollWheelZoom !== previousProps.scrollWheelZoom
        || controls !== previousProps.controls
    ) {
      if (controls && scrollWheelZoom !== false) {
        this.map?.scrollWheelZoom.enable()
      } else {
        this.map?.scrollWheelZoom.disable()
      }
    }
    if (
      dragging !== previousProps.dragging
        || controls !== previousProps.controls
    ) {
      if (controls && (dragging || !L.Browser.touch)) {
        this.map?.dragging.enable()
      } else {
        this.map?.dragging.disable()
      }
    }
  }

  componentDidUpdateTrimEnd = (previousProps:Props) => {
    const { trimEnd } = this.props
    if (trimEnd !== previousProps.trimEnd) {
      this.updateTrimEnd()
    }
  }

  componentDidUpdateActvity(previousProps:Props) {
    const { activity } = this.props
    if (('id' in activity && activity.id) !== ('id' in previousProps.activity && previousProps.activity.id)) {
      this.removeMarkersAndLines()
      this.addMarkersAndLines()
      this.updateTrimEnd()
    }
  }

  render() {
    const { className, children, height, width, controls } = this.props
    const { isFullscreen } = this.state

    return (
      <div style={{ width }} ref={this.containerRef}>
        {controls ? (
          <MyControl>
            <button
              className="btn btn-secondary ml-2 mt-2"
              type="button"
              onClick={() => (
                screenfull.isEnabled
                  && this.containerRef.current
                  && screenfull.toggle(this.containerRef.current)
              )}
            >
              <i className={`fe fe-${isFullscreen ? 'minimize' : 'maximize'}`} />
            </button>
            <button
              className="btn btn-secondary ml-2 mt-2"
              type="button"
              onClick={() => this.map?.zoomIn()}
            >
              <i className="fe fe-zoom-in" />
            </button>
            <button
              className="btn btn-secondary ml-2 mt-2"
              type="button"
              onClick={() => this.map?.zoomOut()}
            >
              <i className="fe fe-zoom-out" />
            </button>
            <button
              className="btn btn-secondary ml-2 mt-2"
              type="button"
              onClick={() => this.fitBounds()}
            >
              <i className="fe fe-target" />
            </button>
          </MyControl>
        ) : null}
        <div
          id={this.mapId}
          className={className}
          style={{ height, width }}
        />
        {children}
      </div>
    )
  }
}

export default withRouter(ActivityMap)

const MyControl = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1000;
`
