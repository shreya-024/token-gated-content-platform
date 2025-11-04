export default function NoAccess() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "600" }}>Access Denied</h2>
      <p style={{ fontSize: "20px", color: "#555" }}>
        You don’t hold the required token.
      </p>
    </div>
  );
}
