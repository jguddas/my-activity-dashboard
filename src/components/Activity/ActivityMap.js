import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class Activity extends React.Component {
  static defaultProps = {
    height: 200,
    width: 200,
    smoothFactor: 4,
    fillColor: '#a55eea',
    strokeColor: '#000000',
    controls: false,
  }

  constructor(props) {
    super(props)
    this.mapId = `map-${Math.ceil(Math.random() * 10000000)}`
  }

  componentDidMount() {
    const {
      cords,
      smoothFactor,
      fillColor,
      strokeColor,
      controls,
    } = this.props

    this.map = L.map(this.mapId, {
      attributionControl: false,
      zoomControl: false,
      dragging: controls,
      touchZoom: controls,
      doubleClickZoom: controls,
      scrollWheelZoom: controls,
      boxZoom: controls,
      keyboard: controls,
      tap: controls,
    })

    L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
      detectRetina: true,
    }).addTo(this.map)

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
    this.startMarker = L.circleMarker(cords[cords.length - 1], {
      radius: 3,
      color: strokeColor,
      fillColor,
      fill: true,
      fillOpacity: 1,
      weight: 1,
    }).addTo(this.map)
    this.endMarker = L.circleMarker(cords[0], {
      radius: 3,
      color: strokeColor,
      fillColor,
      fill: true,
      fillOpacity: 1,
      weight: 1,
    }).addTo(this.map)
    this.map.fitBounds(this.line.getBounds(), { padding: [2, 2] })
  }

  componentDidUpdate(previousProps) {
    const { cords } = this.props
    if (cords.length !== previousProps.cords.length) {
      this.stroke.setLatLngs(cords)
      this.line.setLatLngs(cords)
      if (cords.length) {
        this.startMarker.setLatLng(cords[0])
        this.endMarker.setLatLng(cords[cords.length - 1])
      }
    }
  }

  render() {
    const { className, height, width } = this.props
    return (
      <div
        id={this.mapId}
        className={className}
        style={{ height, width }}
      />
    )
  }
}

export default Activity
