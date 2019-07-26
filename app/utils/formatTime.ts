const padLeft = (string, pad, length) =>
  (new Array(length + 1).join(pad) + string).slice(-length)

export const formatTime = time => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  const finalTime = `${padLeft(minutes, '0', 2)}:${padLeft(seconds, '0', 2)}`

  return finalTime
}

export default formatTime
