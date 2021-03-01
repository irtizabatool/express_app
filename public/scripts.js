$(function(){
    $('#sender').on('change', () => {
        $('#sMessages').text('');
        $('#rMessages').text('');
        let senderVal = $('#sender');
        let receiverVal = $('#receiver');
        if(senderVal.val() !== receiverVal.val()){
            $.ajax({
                url: '/messages',
                contentType: 'application/json',
                success: function(response){
                    const arr = response.messages.find(users => (users.sender === parseInt(senderVal.val()) 
                    && users.receiver === parseInt(receiverVal.val())) 
                    || (users.sender === parseInt(receiverVal.val())
                    && users.receiver === parseInt(senderVal.val())));
                    if(arr.sender === parseInt(senderVal.val())) {
                        $('#sMessages').text(arr.message1);
                        $('#rMessages').text(arr.message2);
                        console.log(arr.message1);
                        console.log(arr.message2);
                    }else {
                        $('#sMessages').text(arr.message2);
                        $('#rMessages').text(arr.message1);
                        console.log(arr.message2);
                        console.log(arr.message1);
                    }
                }
            });
        }
    });

    $('#receiver').on('change', () => {
        $('#sMessages').text('');
        $('#rMessages').text('');
        let senderVal = $('#sender');
        let receiverVal = $('#receiver');
        if(senderVal.val() !== receiverVal.val()){
            $.ajax({
                url: '/messages',
                contentType: 'application/json',
                success: function(response){
                    const arr = response.messages.find(users => (users.sender === parseInt(senderVal.val()) 
                    && users.receiver === parseInt(receiverVal.val())) 
                    || (users.sender === parseInt(receiverVal.val())
                    && users.receiver === parseInt(senderVal.val())));
                    if(arr.sender === parseInt(senderVal.val())){
                        $('#sMessages').text(arr.message1);
                        $('#rMessages').text(arr.message2);
                        console.log(arr.message1);
                        console.log(arr.message2);
                    }else {
                        $('#sMessages').text(arr.message2);
                        $('#rMessages').text(arr.message1);
                        console.log(arr.message2);
                        console.log(arr.message1);
                    }
                }
            });
        }
    });

    $('#buttonS').on('click', () => {
        $('#sMessages').text('');
        $('#rMessages').text('');
        let sender = $('#sender');
        let receiver = $('#receiver');
        let message1 = $('#smessage');
        let message2 = '';
        if(sender.val() !== receiver.val()){
            $.ajax({
            url: '/messages',
            method:'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                sender: sender.val(),
                receiver: receiver.val(),
                message1: message1.val(),
                message2: message2
            }),
            success: function(response){
                // console.log(response);
                message1.val('');
                $('#sender').change();
            } 
            });
        }else {
            alert("Cannot send text to yourself");
        }
    });

    $('#buttonR').on('click', () => {
        $('#sMessages').text('');
        $('#rMessages').text('');
        let sender = $('#sender');
        let receiver = $('#receiver');
        let message1 = '';
        let message2 = $('#rmessage');
        if(sender.val() !== receiver.val()){
            $.ajax({
            url: '/messages',
            method:'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                sender: sender.val(),
                receiver: receiver.val(),
                message1: message1,
                message2: message2.val()
            }),
            success: function(response){
                //console.log(message.val());
                message2.val('');
                $('#sender').change();
            } 
            });
        }else{
            alert("Cannot send text to yourself");
        }
    });
    
})