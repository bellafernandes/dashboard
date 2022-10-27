import React from "react";

const styles = {
  borderRadius: 10,
  backgroundColor: "yellow",
  padding: 20,
  boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.2)",
  width: "100%"
};

const Notification = ({ content }) => <div style={styles}>{content}</div>;

export default Notification;
