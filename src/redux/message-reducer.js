let initialStore = {
  arrMessages: [
    "some message 1",
    "some message 2",
    "some message 3",
    "some message 4",
    "some message 5",
  ],
  arrNames: [
    { name: "Vlad", id: "1" },
    { name: "Andrey", id: "2" },
    { name: "Mark", id: "3" },
    { name: "Sasha", id: "4" },
  ]
}

const SEND_MESSAGE = "SEND_MESSAGE"

export const messageReducer = (state = initialStore, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let stateCopy = {...state}
      stateCopy.arrMessages = [...state.arrMessages]
      stateCopy.arrMessages.push(action.newMessageBody);
      return stateCopy;
    }
    default:
      return state;
  }
};

export const sendMessage = (newMessageBody) => ({ type: 'SEND_MESSAGE', newMessageBody})
