var f_lines = 'slechtst_denkbare.txt';
var a_lines = [];
var b_lines = [];
var b_beroepen = [];

function loadFile(file, array, boolean_array){
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
				var n_lines = lines.length;
				for (var i = 0; i < n_lines; i++)
				{
					array.push(lines[i]);
					console.log(lines[i]);
				}
				for (var i = 0; i < n_lines; i++)
				{
					boolean_array.push(0);
				}
			}
		}
    } 
	txtFile.send(null);
}

function isArrayFull(array){
	var sum = 0;
	for (var i = 0; i < array.length; i++) 
	{
		sum += array[i];
	}
	return sum == array.length;
}


function printRandom()
{
	if(isArrayFull(b_lines)){
		console.log("No more lines ..");
		return;
	}
	do {
		var id = Math.floor(Math.random() * a_lines.length);
	} while (b_lines[id] != 0)
	document.getElementById("content").innerHTML=a_lines[id];
	$("#content").shuffleLetters();
	b_lines[id] = 1;
}
