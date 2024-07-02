import React from "react";

const IconWithBadge = ({ icon, badgeCount, collapsed, navbar }) => {
  const badgeStyle = collapsed
    ? {
        position: "absolute",
        top: "0.7rem",
        right: "0.1rem",
        background: "var(--cancelled)",
        borderRadius: "50%",
        height: "12px",
        width: "12px",
        transform: "translate(50%, -50%)",
      }
    : navbar
    ? {
        position: "absolute",
        top: "-2rem",
        right: "-0.5rem",
        background: "var(--cancelled)",
        color: "white",
        borderRadius: "50%",
        padding: "0",
        height: "18px",
        width: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
      }
    : {
        position: "absolute",
        top: "10px",
        right: "0",
        background: "var(--cancelled)",
        color: "white",
        borderRadius: "50%",
        padding: "0",
        height: "18px",
        width: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        transform: "translate(50%, -50%)",
      };

  return (
    <div style={{ position: "relative" }}>
      {icon}
      {badgeCount > 0 && <div style={badgeStyle}>{collapsed ? null : badgeCount}</div>}
    </div>
  );
};

export default IconWithBadge;
