import { last } from 'lodash'

export const drawEndCap = ({ series, ctx }) => {
  const serie = series.find(({ id }) => id === 0)
  const { position } = last(
    serie.data
      .filter(({ position: { x, y } }) => (x !== null) && (y !== null)),
  )
  ctx.strokeStyle = 'black'
  ctx.fillStyle = serie.color
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(position.x, position.y, 3, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.arc(position.x, position.y, 3, 0, 2 * Math.PI)
  ctx.fill()
}

export const drawLine = ({
  lineGenerator, series, ctx, lineWidth,
}) => {
  lineGenerator.context(ctx)
  series.sort((a, b) => b.id - a.id).forEach((serie) => {
    if (serie.id === 0) {
      ctx.strokeStyle = 'black'
      ctx.lineWidth = lineWidth + 2
      ctx.beginPath()
      lineGenerator(serie.data.map((d) => d.position))
      ctx.stroke()
    }
    ctx.strokeStyle = serie.color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    lineGenerator(serie.data.map((d) => d.position))
    ctx.stroke()
  })
}
