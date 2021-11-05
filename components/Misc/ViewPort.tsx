import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IViewport {
  width: number | undefined,
  height: number | undefined
}

const ViewportContext = createContext<IViewport>({
  width: 1024,
  height: 768
})

export const ViewportProvider: FC = ({ children }) => {
  const [width, setWidth] = useState<number | undefined>()
  const [height, setHeight] = useState<number | undefined>()

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  )
}

export function useViewport() {
  return useContext<IViewport>(ViewportContext)
}