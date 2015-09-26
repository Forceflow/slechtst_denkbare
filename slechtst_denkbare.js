var f_beroepen = 'beroepen.txt';
var a_beroepen = [];
var b_beroepen = [];

function getFile(){
    $.get(f_beroepen,function(txt){
        var lines = txt.split("\n");
        for (var i = 0, len = lines.length; i < len; i++) {
            a_beroepen.push(lines[i]);
			console.log(lines[i]);
        }
    }); 
}