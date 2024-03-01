function setMessagesRead(rooms, room) {
  return [...rooms].map((el) => {
    if (room.dialogId === el.dialogId) {
      return { ...el, unreadMessages: 0 };
    } else {
      return el;
    }
  });
}

export default setMessagesRead