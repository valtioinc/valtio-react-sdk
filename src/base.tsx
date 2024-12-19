import React from 'react'
import './assets/styles.css'
import { flattenObject, isValidUrl } from './utils'

export interface ComponentProps {
  appID: string
  host?: string
  language?: 'en' | 'es'
  debug?: boolean
  onLoad?: (detail: any) => void
  onExit?: (detail: any) => void
}

export interface BaseComponentProps extends ComponentProps {
  endpoint?: string
}

export const BaseComponent: React.FC<BaseComponentProps> = ({
  appID,
  host = 'https://app.valtio.io',
  endpoint = '',
  language = 'en',
  onExit = () => {},
  onLoad = () => {},
  debug = false,
  ...extras
}) => {
  if (typeof appID !== 'string') {
    throw new TypeError(`'appID=${appID}' is not valid application ID.`)
  }

  if (!isValidUrl(host)) {
    throw new TypeError(`'host=${host}' is not a valid URL.`)
  }

  if (typeof endpoint !== 'string') {
    throw new TypeError(`'endpoint=${endpoint}' is not valid URL path.`)
  }

  if (!['en', 'es'].includes(language)) {
    throw new TypeError(`'language=${language}' is not a supported language`)
  }

  if (!(onExit instanceof Function)) {
    throw new TypeError(`'onExit=${onExit}' is not a valid callback function.`)
  }

  if (!(onLoad instanceof Function)) {
    throw new TypeError(`'onLoad=${onLoad}' is not a valid callback function.`)
  }

  const params = new URLSearchParams(
    flattenObject({
      embedded: 'true',
      appID,
      language,
      ...extras,
    })
  )
  const url = `${host}/${endpoint}#${params.toString()}`
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
    <div className="valtio-embeddable">
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
        style={{ display: ready ? 'flex' : 'none' }}
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
