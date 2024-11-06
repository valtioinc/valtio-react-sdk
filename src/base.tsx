import React from "react";

export interface ComponentProps {
  host?: string;
  onExit?: (detail: any) => void;
  onInit?: (detail: any) => void;
  onLoad?: (detail: any) => void;
}

export interface BaseComponentProps extends ComponentProps {
  endpoint?: string;
}

export const BaseComponent: React.FC<BaseComponentProps> = ({
  host = "https://app.valtio.io",
  endpoint = "",
  onExit = () => {},
  onInit = () => {},
  onLoad = () => {},
}) => {
  const url = `${host}/${endpoint}`;
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    const el = ref?.current;

    const handleExit = (e: Event) =>
      onExit && onExit((e as CustomEvent).detail);

    if (el) {
      el.addEventListener("exit", handleExit);
    }

    return () => {
      if (el) {
        el.removeEventListener("exit", handleExit);
      }
    };
  }, [onExit]);

  React.useEffect(() => {
    const el = ref?.current;

    const handleInit = (e: Event) =>
      onInit && onInit((e as CustomEvent).detail);

    if (el) {
      el.addEventListener("init", handleInit);
    }

    return () => {
      if (el) {
        el.removeEventListener("init", handleInit);
      }
    };
  }, [onInit]);

  React.useEffect(() => {
    const el = ref?.current;

    const handleLoad = (e: Event) =>
      onLoad && onLoad((e as CustomEvent).detail);

    if (el) {
      el.addEventListener("load", handleLoad);
    }

    return () => {
      if (el) {
        el.removeEventListener("load", handleLoad);
      }
    };
  }, [onLoad]);

  return (
    <iframe
      src={url}
      // width={screen.width}
      width="100%"
      height="100%"
      frameBorder={0}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "scroll",
      }}
      data-testid="valtio-iframe"
    />
  );
};
