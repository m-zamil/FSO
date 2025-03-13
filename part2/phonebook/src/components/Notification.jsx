const Notification = ({ message }) => {
  if (message) {
    return <div className={message.type}>{message.content}</div>;
  } else return null;
};
export default Notification;
