import { useEffect, useRef } from 'react'

// Taken from https://codesandbox.io/s/l240mp2pm7, referenced by https://overreacted.io/making-setinterval-declarative-with-react-hooks/

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return null
  }, [delay])
}

export default useInterval
