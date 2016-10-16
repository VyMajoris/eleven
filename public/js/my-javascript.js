
function parseMoneyUs(value) {
	var tmp = "";
	var i;
	for (i = 0; i < value.length; ++i) {
		if (value[i] == '.') {
			continue;
		} else if (value[i] == ',') {
			tmp += '.';
		} else {
			tmp += value[i];
		}
	}
	return parseFloat(tmp);
}

function parseMoneyPt(value) {
	value = value.toString();
	if (value.length - value.lastIndexOf('.') > 2) {
	   value = value.slice(0,5);
	} else {
		value += '0';
	}
	return value.replace('.', ',');
}

$(function() {


    var t = Handlebars.compile($('#entry-template').html());

    console.log( "ready!" );
    var demoRef = firebase.database().ref('demo');
	
    demoRef.child("list").on('child_added', function(data) {
		var value = data.val();
        console.log("demo", value)

        $('#donations').append(
            t({donation: value})
        );
		var total = parseMoneyUs(value.total) + parseMoneyUs($("#money").text());
		$('#money').text(parseMoneyPt(total));
    });
	
	/**
    demoRef.child("total").on('value', function(data) {
        console.log("total", data.val())

        $('#money').text(data.val());
    });
	/**/
});