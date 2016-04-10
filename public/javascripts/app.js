$(document).ready(function () {

    $('.deletebtn').click(function () {
        var id = this.dataset.id

        $.ajax({
            url: '/notes/delete/' + id,
            error: function (err) {
                console.log(err);
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                location.href = '/';
            },
            type: 'DELETE'
        });
    });

    $('#updatebtn').click(function () {
        var id = this.dataset.id;
        var title = $('#editorTitle').val();
        var body = $('#editorBody').val()
        console.log("trying to update " + id);

        $.ajax({
            url: '/notes/update/' + id,
            data: {
                format: 'json',
                title: title,
                body: body
            },
            error: function () {
                $('#message').text("Not could not be saved!");
                $('#message').addClass("error");
            },
            dataType: 'json',
            success: function (data) {
                $('#message').text("Note updated!");
                location.href = '/';
            },
            type: 'POST'
        });
    })

    $('#savebtn').click(function () {
        var title = $('#editorTitle').val();
        var body = $('#editorBody').val();
        // if there is at least one thing filled, save
        if (title != "" || body != "") {
            $('#message').text("");
            $('#message').removeClass("error");
            $('#message').text("Saving . . .");
            console.log(title);
            console.log(body);
            $.ajax({
                url: '/notes/create',
                data: {
                    format: 'json',
                    title: title,
                    body: body
                },
                error: function () {
                    $('#message').text("Not could not be saved!");
                    $('#message').addClass("error");
                },
                dataType: 'json',
                success: function (data) {
                    $('#message').text("Note saved!");
                    location.href = '/';
                },
                type: 'POST'
            });
        } else {
            $('#message').text("Please write a note to save it!");
            $('#message').addClass("error");
        }

    });
});