import type { FunctionComponent } from "react";
import { LogoRHOSAK } from "./images";

export const RHOSAKLogo: FunctionComponent = () => {
  return (
    <>
      <img src={LogoRHOSAK} alt={""} style={{ height: "70px" }} />
    </>
  );
};
