const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const messages = require('../../Members');

//Get Messages
// router.get('/', (req, res) => {
//     const msgs = messages.find(users => (users.sender === parseInt(req.body.sender) && users.receiver === parseInt(req.body.receiver)) 
//         || (users.sender === parseInt(req.body.receiver) && users.receiver === parseInt(req.body.sender)));
//     res.json(msgs);
// });

//Save Messages
router.post('/', (req,res) => {
    const msgs = messages.find(users => (users.sender === 1 && users.receiver === 2));
    console.log(req.body.message);
    const ms = req.body.message;
    const m = 0;
    msgs.message1.push(ms);
    // const msgs = messages.find(users => (users.sender === parseInt(req.body.sender) && users.receiver === parseInt(req.body.receiver)) || (users.sender === parseInt(req.body.receiver) && users.receiver === parseInt(req.body.sender)));
    // if(msgs.sender === parseInt(req.body.sender) && msgs.receiver === parseInt(req.body.receiver)){
    //     msgs.message1.push(req.body.message);
    // } else {
    //     msgs.message2.push(req.body.message);
    // }
   res.json(messages);
});

// //Update Member
// router.put('/:id', (req, res) => {
//     const found = messages.some(member => member.id === parseInt(req.params.id));
//     if(found){
//       const updMember = req.body;
//       messages.forEach(member => {
//         if(member.id === parseInt(req.params.id)) {
//             member.name = updMember.name ? updMember.name : member.name;
//             member.email = updMember.email ? updMember.email : member.email;
//             res.json({ msg: 'Member updated', member });
//         }
//       });
//     } else {
//         res.status(400).json({msg: `No member with the id of ${req.params.id}`});
//     }
// });

// //Delete Member
// router.delete('/:id', (req, res) => {
//     const found = messages.some(member => member.id === parseInt(req.params.id));
//     if(found){
//     res.json({
//         msg:'Member Deleted',
//         messages: messages.filter(member => member.id !== parseInt(req.params.id))
//     });
//     } else {
//         res.status(400).json({msg: `No member with the id of ${req.params.id}`});
//     }
// });

module.exports = router;