import { MessageBox } from "react-chat-elements";

function CustomMessageBox({ ...props }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: props.position === "right" ? "flex-end" : "flex-start",
        }}
      >
        {props.position !== "right" ? (
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "0px",
              fontSize: "12px",
              color: "var(--primary-color-darker)",
            }}
          >
            {props.senderName}
          </div>
        ) : null}
        <MessageBox {...props} />
      </div>
    </div>
  );
}

export default CustomMessageBox;
