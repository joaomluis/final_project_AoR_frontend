import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading({ loading }) {
  if (!loading) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        zIndex: 1,
        opacity: loading ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <DotLoader color={"var(--secondary-color)"} loading={loading} css={override} size={30} />
    </div>
  );
}
export default Loading;
