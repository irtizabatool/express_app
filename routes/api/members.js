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
    if(req.body.sender === req.body.receiver){
        res.send("You Cannot Send Message to Yourself");
    }else{
    const msgs = messages.find(users => (users.sender === parseInt(req.body.sender) 
        && users.receiver === parseInt(req.body.receiver)) 
        || (users.sender === parseInt(req.body.receiver)
        && users.receiver === parseInt(req.body.sender)));
    //console.log(req.body.message);
    const sms = req.body.smessage;
    const rms = req.body.rmessage;
    if(rms === ''){
        if(msgs.sender === parseInt(req.body.sender)){
            msgs.message1.push(sms);
        } else {
            msgs.message2.push(sms);
        }
    }
    else{
        if(msgs.sender === parseInt(req.body.sender)){
            msgs.message2.push(rms);
        } else {
            msgs.message1.push(rms);
        }
    }
    //const ms = req.body.message;
    
   res.redirect('/');
}
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