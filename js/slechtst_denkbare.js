var f_lines = 'slechtst_denkbare.txt';
var lines = [];
var done_lines = [];

// Configure how often the public shoud be asked for input
var public_interval_counter = 1; // put this to 0 to start with public input
var public_interval = 5; // how many cards until public input
var MAX_PUBLIC_INTERVAL = 30; // the maximum number of cards until public input

var started_from_local_storage;

String.prototype.isEmpty = function () {
	return (this.length === 0 || !this.trim());
};

function saveLinesToStorage() {
	localStorage["lines"] = JSON.stringify(lines);
	localStorage["done_lines"] = JSON.stringify(done_lines);
}

function savePublicIntervalToStorage() {
	localStorage["public_interval"] = public_interval;
}

function loadLinesFromStorage() {
	if (localStorage["lines"] == null) {
		return false;
	}
	if (localStorage["done_lines"] == null) {
		return false;
	}
	lines = JSON.parse(localStorage["lines"]);
	done_lines = JSON.parse(localStorage["done_lines"]);

	if (typeof localStorage["public_interval"] !== 'undefined' && localStorage["public_interval"] !== null) {
		public_interval = localStorage["public_interval"];
	}
	return true;
}

function hideImage() {
	document.getElementById("image").src = '';
	document.getElementById("image").style.display = 'none';
}

function showimage(url) {
	if (url !== undefined) {
		document.getElementById("image").src = "img/" + url;
		document.getElementById("image").style.display = 'block';
	}
	else {
		hideImage();
	}
}

function show(text) {
	document.getElementById("content").innerHTML = text;
	$("#content").shuffleLetters();
}

function show(text, image) {
	document.getElementById("content").innerHTML = text;
	$("#content").shuffleLetters({ callback: function () { showimage(image); } });
}

function start() {
	// GET LINES
	// Try local storage
	if (loadLinesFromStorage()) {
		console.log("Found local storage.")
		started_from_local_storage = true;
		welcome();
		return;
	}
	else // Try to load from file 
	{
		console.log("Found no local storage, trying to load from file.")
		started_from_local_storage = false;
		var txtFile = new XMLHttpRequest();
		txtFile.open("GET", f_lines, true);
		txtFile.onreadystatechange = function () {
			if (txtFile.readyState === 4) // document is ready to parse.
			{
				if (txtFile.status === 200) // file is found
				{
					allText = txtFile.responseText;
					lines = txtFile.responseText.split("\n");
					n_lines = lines.length;
					for (var i = 0; i < n_lines; i++) {
						lines.push(lines[i].trim());
					}
					lines = lines.slice(1, n_lines - 1);
					saveLinesToStorage();
					welcome(); // only start welcome here, because ASYNC
					return;
				}
			}
		}
		txtFile.send(null);
	}
}

function printRandom() {
	hideImage();
	if (public_interval_counter % public_interval != 0) {
		if (lines.length == 0) {
			error("DE SUGGESTIES ZIJN OP, LULLO");
			return;
		}
		var id = Math.floor(Math.random() * lines.length);
		var splitted = lines[id].split("$");
		//if(splitted.length == 1 || splitted[1].isEmpty()){
		show(splitted[0]);
		//}else{show(splitted[0], splitted[1]);}
		done_lines.push(lines.splice(id, 1));
	}
	else {
		show("Slechtst denkbare ... (iets uit het publiek)");
	}
	public_interval_counter++;
	updateStatus();
	saveLinesToStorage();
}

function updateStatus() {
	var total = lines.length + done_lines.length;
	var available = lines.length;
	var status = available + "/" + total;
	document.getElementById("status").innerHTML = status;
	document.getElementById("interval").innerHTML = (public_interval > 0 ? 'Om de ' + public_interval + ' suggesties': 'Geen publieksinput');
}

function welcome() {
	show("Slechtst Denkbare App");
	updateStatus();
}

// Not used anymore because of reset cards
function resetApp() {
	localStorage.clear();
	lines = [];
	done_lines = [];
	public_interval_counter = 1;
	public_interval = 5;
	start();
}

function resetCards() {
	localStorage.removeItem("lines");
	localStorage.removeItem("done_lines");
	lines = [];
	done_lines = [];
	public_interval_counter = 1;
	start();
}

function setPublicInterval() {
	var input = prompt("Hoeveel items tussen elke vraag voor publieksinput?", public_interval);
	var input_parsed = parseInt(input, 10);
	if ((!Number.isInteger(input_parsed)) || input_parsed < 0) {
		console.log("Supplied number " + input_parsed + " is not an integer. Public interval stays at " + public_interval);
		return;
	}
	console.log("Setting public interval to " + input_parsed);
	public_interval = input_parsed;
	updateStatus();
	savePublicIntervalToStorage();
}

function getIntegerPublicInterval() {
	value = parseInt(public_interval, 10);
}

function decreasePublicInterval() {
	public_interval = parseInt(public_interval, 10) - 1;
	if (public_interval < 0) {
		public_interval = 0;
	}
	updateStatus();
	savePublicIntervalToStorage();
}

function increasePublicInterval() {
	public_interval = parseInt(public_interval, 10) + 1;
	if (public_interval > MAX_PUBLIC_INTERVAL) {
		public_interval = MAX_PUBLIC_INTERVAL;
	}
	updateStatus();
	savePublicIntervalToStorage();
}

function error(text) {
	show(text, 'error.jpg');
}

$(window).keyup(function (e) {
	e.stopPropagation();
	if (e.which === 32) {
		printRandom();
	}
});

// Make tooltips work
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})