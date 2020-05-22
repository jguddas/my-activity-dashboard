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
    } = this.props

    this.map = L.map(this.mapId, {
      attributionControl: false,
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
    })

    L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
      detectRetina: true,
    }).addTo(this.map)

    L.polyline(cords, {
      color: strokeColor,
      weight: 5,
      lineJoin: 'round',
      smoothFactor,
    }).addTo(this.map)
    const line = L.polyline(cords, {
      color: fillColor,
      weight: 3,
      lineJoin: 'round',
      smoothFactor,
    }).addTo(this.map)
    L.circleMarker(cords[cords.length - 1], {
      radius: 3,
      color: strokeColor,
      fillColor,
      fill: true,
      fillOpacity: 1,
      weight: 1,
    }).addTo(this.map)
    L.circleMarker(cords[0], {
      radius: 3,
      color: strokeColor,
      fillColor,
      fill: true,
      fillOpacity: 1,
      weight: 1,
    }).addTo(this.map)
    this.map.fitBounds(line.getBounds(), { padding: [2, 2] })
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
