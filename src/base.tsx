import React from "react";
import "assets/styles.css";

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
  const [ready, setReady] = React.useState<boolean>(false);

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
    <div>
      <div
        className="valtio-loader"
        style={{ display: ready ? "none" : "flex" }}
      >
        <div className="sk-wander">
          <div className="sk-wander-cube"></div>
          <div className="sk-wander-cube"></div>
          <div className="sk-wander-cube"></div>
        </div>
      </div>
      <iframe
        src={url}
        className="valtio-iframe"
        style={{ display: ready ? "block" : "none" }}
        data-testid="valtio-iframe"
        onLoad={() => {
          setReady(true);
        }}
        onError={() => alert(`There was an error loading the Valtio Platform`)}
      />
    </div>
  );
};
