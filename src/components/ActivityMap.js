import React from 'react'
import L from 'leaflet'
import styled from 'styled-components'
import screenfull from 'screenfull'
import { findLastIndex, findLast } from 'lodash'
import { withRouter } from 'react-router-dom'
import { Button, colors } from 'tabler-react'
import 'leaflet/dist/leaflet.css'

const getLatLon = ([lat, lon]) => [lat, lon]

class ActivityMap extends React.Component {
  static defaultProps = {
    height: 200,
    width: '100%',
    matchedActivities: [],
    smoothFactor: 4,
    fillColor: colors.purple,
    strokeColor: '#000000',
    controls: false,
  }

  constructor(props) {
    super(props)
    this.mapId = `map-${Math.ceil(Math.random() * 10000000)}`
    this.state = { isFullscreen: screenfull.isFullscreen }
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const { controls, scrollWheelZoom, dragging } = this.props

    this.map = L.map(this.mapId, {
      attributionControl: false,
      zoomControl: false,
      dragging: controls && (dragging === 'touch' ? !L.Browser.touch : dragging !== false),
      touchZoom: controls,
      doubleClickZoom: controls,
      scrollWheelZoom: controls && scrollWheelZoom !== false,
      boxZoom: controls,
      keyboard: controls,
      tap: false,
    })

    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', { detectRetina: true }).addTo(this.map)

    this.addMarkersAndLines()
    this.fitBounds()

    screenfull.on('change', this.updateFullscreen)
  }

  componentDidUpdate(previousProps) {
    this.componentDidUpdateZoom(previousProps)
    this.componentDidUpdateTrimEnd(previousProps)
    this.componentDidUpdateActvity(previousProps)
  }

  componentWillUnmount() {
    screenfull.off('change', this.updateFullscreen)
  }

  fitBounds = () => {
    this.map.fitBounds(this.bounds, { padding: [2, 2] })
  }

  updateFullscreen = () => {
    const { setFullscreen } = this.props
    this.setState({ isFullscreen: screenfull.isFullscreen })
    // eslint-disable-next-line no-underscore-dangle
    this.map._onResize()
    if (setFullscreen) setFullscreen(screenfull.isFullscreen)
  }

  addMarkersAndLines = () => {
    const {
      history,
      activity,
      smoothFactor,
      fillColor,
      strokeColor,
      matchedActivities,
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
          .addTo(this.map)
          .on('click', () => history.push(matchedActivity.id))
      ))
    this.stroke = L.polyline(cords, {
      color: strokeColor,
      weight: 5,
      lineJoin: 'round',
      smoothFactor,
    }).addTo(this.map)
    this.line = L.polyline(cords, {
      color: fillColor,
      weight: 3,
      lineJoin: 'round',
      smoothFactor,
    }).addTo(this.map)
    this.bounds = this.line.getBounds()
    this.matchedMarkers = matchedActivities.map((matchedActivity) => (
      L.circleMarker(getLatLon(matchedActivity.endpt), {
        radius: 2,
        color: 'black',
        fillColor: colors.gray,
        fill: true,
        fillOpacity: 1,
        weight: 1,
      })
        .addTo(this.map)
        .on('click', () => history.push(`/activity/${matchedActivity.id}`))
    ))
    this.marker = L.circleMarker(getLatLon(activity.endpt), {
      radius: 3,
      color: strokeColor,
      fillColor,
      fill: true,
      fillOpacity: 1,
      weight: 1,
    }).addTo(this.map)
  }

  removeMarkersAndLines = () => {
    this.marker.remove()
    this.line.remove()
    this.stroke.remove()
    this.matchedLines.forEach((matchedLine) => matchedLine.remove())
    this.matchedMarkers.forEach((matchedMarker) => matchedMarker.remove())
  }

  updateTrimEnd = () => {
    const { trimEnd, activity, matchedActivities } = this.props
    const isNotTrimEnd = (trkpt) => trkpt[3] <= trimEnd
    const lastPtIdx = findLastIndex(activity.trkpts, isNotTrimEnd)
    const cords = activity.trkpts.slice(0, lastPtIdx + 1).map(getLatLon)
    this.stroke.setLatLngs(cords)
    this.line.setLatLngs(cords)
    this.marker.setLatLng(getLatLon(activity.trkpts[lastPtIdx]))
    this.matchedMarkers.forEach((matchedMarker, idx) => (
      matchedMarker.setLatLng(getLatLon(
        findLast(matchedActivities[idx].trkpts, isNotTrimEnd),
      ))
    ))
  }

  componentDidUpdateZoom = (previousProps) => {
    const { scrollWheelZoom, dragging, controls } = this.props
    if (
      scrollWheelZoom !== previousProps.scrollWheelZoom
        || controls !== previousProps.controls
    ) {
      if (controls && scrollWheelZoom !== false) {
        this.map.scrollWheelZoom.enable()
      } else {
        this.map.scrollWheelZoom.disable()
      }
    }
    if (
      dragging !== previousProps.dragging
        || controls !== previousProps.controls
    ) {
      if (controls && (dragging === 'touch' ? !L.Browser.touch : dragging !== false)) {
        this.map.dragging.enable()
      } else {
        this.map.dragging.disable()
      }
    }
  }

  componentDidUpdateTrimEnd = (previousProps) => {
    const { trimEnd } = this.props
    if (trimEnd !== previousProps.trimEnd) {
      this.updateTrimEnd()
    }
  }

  componentDidUpdateActvity(previousProps) {
    const { activity } = this.props
    if (activity.id !== previousProps.activity.id) {
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
            <Button
              className="ml-2 mt-2"
              color="secondary"
              prefix="fe"
              icon={isFullscreen ? 'minimize' : 'maximize'}
              onClick={() => screenfull.toggle(this.containerRef.current)}
            />
            <Button
              className="ml-2 mt-2"
              color="secondary"
              prefix="fe"
              icon="zoom-in"
              onClick={() => this.map.zoomIn()}
            />
            <Button
              className="ml-2 mt-2"
              color="secondary"
              prefix="fe"
              icon="zoom-out"
              onClick={() => this.map.zoomOut()}
            />
            <Button
              className="ml-2 mt-2"
              color="secondary"
              prefix="fe"
              icon="target"
              onClick={this.fitBounds}
            />
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
