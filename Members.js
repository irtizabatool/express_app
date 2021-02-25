const messages = [
    { sender: 1, receiver : 2, message1: ["messages from Alice to Bob", "hey"], message2: ["messages from Bob to Alice"]},
    { sender: 1, receiver : 3, message1: ["messages from user 1 -3"], message2: ["messages from user 3-1"]},
    { sender: 1, receiver : 4, message1: ["messages from user 1 -4"], message2: ["messages from user 4-1"]},
    { sender: 1, receiver : 5, message1: ["messages from user 1 -5"], message2: ["messages from user 5-1"]},
    { sender: 2, receiver : 3, message1: ["messages from user 2 -3"], message2: ["messages from user 3-2"]},
    { sender: 2, receiver : 4, message1: ["messages from user 2 -4"], message2: ["messages from user 4-2"]},
    { sender: 2, receiver : 5, message1: ["messages from user 2 -5"], message2: ["messages from user 5-2"]},
    { sender: 3, receiver : 4, message1: ["messages from user 3 -4"], message2: ["messages from user 4-3"]},
    { sender: 3, receiver : 5, message1: ["messages from user 3 -5"], message2: ["messages from user 5-3"]},
    { sender: 4, receiver : 5, message1: ["messages from user 4 -5"], message2: ["messages from user 5-4"]}
];

module.exports = messages;