$(function(){
    //Get users
    $(document).ready(() => {
        $.ajax({
            url: '/getusers',
            success:(response) => {
                response.users.forEach((user) => {
                    $('#sender').append('\<option value = ' + user.id + '>' + user.username + '</option>');
                    $('#receiver').append('\<option value = ' + user.id + '>' + user.username + '</option>')
                });
            }
        })
    });
    //GET On-Change of Left dropdown box
    $('#sender').on('change', () => {
        $('#messages').html('  ');
        let sender = $('#sender');
        let receiver = $('#receiver');
        if(sender.val() !== receiver.val()){
            $.ajax({
                url: '/getmessages',
                method: 'GET',                   
                data: {
                    sender: sender.val(),
                    receiver: receiver.val()
                },
                success: (response) => {
                    response.users.forEach((user) => {
                    if(user.leftuser === sender.val()){
                        $('#messages').append('\<p style="text-align:left">' + user.message +'<p>')
                    }else{
                        $('#messages').append('\<p style="text-align:right">' + user.message +'<p>')
                    }
                    console.log(user.leftuser);
                    })
                }
            });
        }
    });
    //GET On-Change of Right dropdown box
    $('#receiver').on('change', () => {
        $('#messages').html('  ');
        let sender = $('#sender');
        let receiver = $('#receiver');
        if(sender.val() !== receiver.val()){
            $.ajax({
                url: '/getmessages',
                method: 'GET',                   
                data: {
                    sender: receiver.val(),
                    receiver: sender.val()
                },
                success: (response) => {
                    response.users.forEach((user) => {
                    if(user.leftuser === sender.val()){
                        $('#messages').append('\<p style="text-align:left">' + user.message +'<p>')
                    }else{
                        $('#messages').append('\<p style="text-align:right">' + user.message +'<p>')
                    }
                    console.log(user.leftuser);
                    })
                }
            });
        }
    });
    //POST by Left User
    $('#buttonS').on('click', () => {
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
                message: message1.val(),
            }),
            success: function(response){
                console.log(response);
                message1.val('');
                $('#sender').change();
            } 
            });
        }else {
            alert("Cannot send text to yourself");
        }
    });
    //POST by Right User
    $('#buttonR').on('click', () => {
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
                sender: receiver.val(),
                receiver: sender.val(),
                message: message2.val()
            }),
            success: function(response){
                console.log(response);
                message2.val('');
                $('#sender').change();
            } 
            });
        }else{
            alert("Cannot send text to yourself");
        }
    });
    
})