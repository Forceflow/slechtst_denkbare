var f_lines = 'slechtst_denkbare.txt';
var lines = [];
var done_lines = [];

var n_lines;

function loadFile(file, array){
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", file, true);
	txtFile.onreadystatechange = function()
	{
		if (txtFile.readyState === 4) 
		{  // document is ready to parse.
			if (txtFile.status === 200) 
			{  // file is found
				allText = txtFile.responseText; 
				lines = txtFile.responseText.split("\n");
				n_lines = lines.length;
				for (var i = 0; i < n_lines; i++)
				{
					array.push(lines[i]);
					console.log(lines[i]);
				}
				updateStatus();
			}
		}
    } 
	txtFile.send(null);
}

function printRandom(){
	var id = Math.floor(Math.random() * lines.length);
	document.getElementById("content").innerHTML=lines[id];
	$("#content").shuffleLetters();
	done_lines.push(lines.splice(id,1));
	updateStatus();
}

function updateStatus(){
	var loaded = n_lines;
	var available = lines.length;
	document.getElementById("status").innerHTML="Loaded " + loaded + ", available " + available;
}
