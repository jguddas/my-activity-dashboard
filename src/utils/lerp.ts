const lerp = (
  [x0, y0]:[number, number],
  [x1, y1]:[number, number],
  i:number,
):number => y0 + ((y1 - y0) / (x1 - x0)) * (i - x0)

export default lerp
