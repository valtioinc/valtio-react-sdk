import React from 'react'
import './assets/styles.css'

export interface ComponentProps {
  host?: string
  onExit?: (detail: any) => void
  onLoad?: (detail: any) => void
  debug?: boolean
}

export interface BaseComponentProps extends ComponentProps {
  endpoint?: string
}

export const BaseComponent: React.FC<BaseComponentProps> = ({
  host = 'https://app.valtio.io',
  endpoint = '',
  onExit = () => {},
  onLoad = () => {},
  debug = false,
}) => {
  const url = `${host}/${endpoint}#embedded=true`
  const ref = React.useRef<HTMLIFrameElement>(null)
  const [ready, setReady] = React.useState<boolean>(false)

  React.useEffect(() => {
    const el = ref?.current

    const handleMessage = (e: MessageEvent) => {
      if (
        !el || // ref hasn't been updated yet
        !e.isTrusted || // not trusted (generated via dispatchEvent)
        e.origin !== host || // not from our iframe's origin
        e.source !== el.contentWindow // not from our iframe's window
      ) {
        return
    }

      debug && console.info('onMessage', e)
      const { type, detail } = e.data

      if (type === 'exit') {
        onExit && onExit(detail)
    }
      }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
      }
  }, [])

  return (
    <div>
      <div className="valtio-loader" style={{ display: ready ? 'none' : 'flex' }}>
        <div className="sk-wander">
          <div className="sk-wander-cube" />
          <div className="sk-wander-cube" />
          <div className="sk-wander-cube" />
        </div>
      </div>
      <iframe
        ref={ref}
        src={url}
        className="valtio-iframe"
        style={{ display: ready ? "block" : "none" }}
        data-testid="valtio-iframe"
        onLoad={(syntheticEvent) => {
          debug && console.info('onLoad', syntheticEvent.nativeEvent)
          setReady(true)
          onLoad && onLoad({ ready })
        }}
        onError={(syntheticEvent) => {
          debug && console.error('onError', syntheticEvent.nativeEvent)
          alert(`There was an error loading the Valtio Platform`)
        }}
      />
    </div>
  )
}
