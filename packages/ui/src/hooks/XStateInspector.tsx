import { inspect } from "@xstate/inspect";
import type { VoidFunctionComponent } from "react";
import { useEffect, useState } from "react";

export const XStateInspector: VoidFunctionComponent = () => {
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const inspector = inspect({
      iframe: popup
        ? false
        : () =>
            document.getElementById(
              "mas-xstate-inspector"
            ) as HTMLIFrameElement,
    });
    return () => {
      inspector && inspector.disconnect();
    };
  }, [popup]);
  return (
    <div
      style={{
        height: "50vh",
        resize: "vertical",
        display: "flex",
        flexFlow: "column",
        overflow: "auto",
        backgroundColor: "red",
      }}
    >
      <iframe id={"mas-xstate-inspector"} style={{ flex: "1" }} />
      <label>
        <input
          type="checkbox"
          checked={popup}
          onChange={() => setPopup((v) => !v)}
        />{" "}
        open in popup
      </label>
    </div>
  );
};

export default XStateInspector;
