var socket = io.connect('http://localhost:3000');

        let message_data = [];
        socket.on('server-send-data', function (data) {
            message_data = data;
            _li = '';
            data.forEach(item => {
                _li += `<li class="list-group-item">
                            <span class="badge">${item.author}</span>
                            ${item.text} ..
                        </li>`;
            });

            $('#message-list').html(_li);
        })

        socket.on('server-send', function (data) {
            _li = '';
            let message = {
                text: data,
                author: 'bkap',
                date: new Date()
            };
            
            message_data.push(message);

            message_data.forEach(item => {
                _li += `<li class="list-group-item">
                            <span class="badge">${item.author}</span>
                            ${item.text} ..
                        </li>`;
            });

            $('#message-list').html(_li);
        })

        $('#send').click(function () {
            var text = $('#text-mesage').val();
            socket.emit('client-send', text);
        })