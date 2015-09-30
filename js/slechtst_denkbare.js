var f_lines = 'slechtst_denkbare.txt';
var lines = [];
var done_lines = [];

var n_lines;

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

function hideImage(){
	document.getElementById("image").src='';
	document.getElementById("image").style.display = 'none';
}

function showimage(url){
	if (url !== undefined) {
		document.getElementById("image").src="img/"+url;
		document.getElementById("image").style.display = 'block';
	}
	else{
		hideImage();
	}
}

function show(text, image){
	document.getElementById("content").innerHTML=text;
	$("#content").shuffleLetters({callback:function(){showimage(image);}});
}

function loadFile(file, array)
{
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", file, true);
	txtFile.onreadystatechange = function()
	{
		if (txtFile.readyState === 4) // document is ready to parse.
		{  
			if (txtFile.status === 200) // file is found
			{  
				allText = txtFile.responseText; 
				lines = txtFile.responseText.split("\n");
				n_lines = lines.length;
				for (var i = 0; i < n_lines; i++)
				{
					array.push(lines[i].trim());
				}
				updateStatus();
				show("Welkom op de slechtst denkbare impro-avond");
			}
		}
    } 
	txtFile.send(null);
}

function printRandom()
{
	hideImage();
	if(lines.length == 0){error("DE SUGGESTIES ZIJN OP, LULLO");return;}
	var id = Math.floor(Math.random() * lines.length);
	var splitted = lines[id].split("$");
	if(splitted.length == 1 || splitted[1].isEmpty()){
		show(splitted[0]);
	}
	else{
		show(splitted[0], splitted[1]);
	}
	done_lines.push(lines.splice(id,1));
	updateStatus();
}

function updateStatus()
{
	var loaded = n_lines;
	var available = lines.length;
	document.getElementById("status").innerHTML="Loaded " + loaded + ", available " + available;
}

function error(text){
	show(text, 'error.jpg');
	
}