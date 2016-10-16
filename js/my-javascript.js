
$(function() {


    var t = Handlebars.compile($('#entry-template').html());




    console.log( "ready!" );
    var demoRef = firebase.database().ref('demo');
    demoRef.on('child_added', function(data) {
        console.log( data.val())



        $('#donations').append(
            t({donation: data.val()})

        );

    });
});