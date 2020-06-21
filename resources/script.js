// Load previously stored records in localStorage
function loadStoredRecords() {
	var localStoreItems = localStorage.length;
	console.log(localStoreItems);

	if (localStoreItems != 0) {
		for (i = 0; i < localStoreItems; i++) {
			let storageKeys = Object.keys(localStorage);
			let storedRecordsDiv = document.getElementById("stored-records");
			let storageValues = localStorage.getItem(storageKeys[i]);
			let stringToNode = document
				.createRange()
				.createContextualFragment(storageValues);
			storedRecordsDiv.appendChild(stringToNode);
			console.log[`appended ${storageKeys[i]} to stored-records`];
		}
	} else {
		console.log("theres is not items stored");
	}
}

// Make a live clock
function displayClock() {
	let display = new Date().toLocaleTimeString();
	document.getElementById("live-clock").innerHTML = display;
	setTimeout(displayClock, 1000);
}

// Load this functions onload
function start() {
	loadStoredRecords();
	displayClock();
}

// Generates a random unique id for new records
const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Gets the current date in the format MM/DD/YY , HH:MM:SS
function curentDate() {
	return new Date().toLocaleString();
}

// Shows the input field for new records
function makeNewRecord() {
	document
		.getElementById("input-container")
		.style.setProperty("display", "block");
	document
		.getElementById("edit-container")
		.style.setProperty("display", "none");
}

// Shows the reoe and edit buttons
function editButtons() {
	editBtn = document.getElementsByClassName("edit-btn");
	reBtn = document.getElementsByClassName("remove-btn");

	for (let index = 0; index < editBtn.length; index++) {
		if (editBtn[index].style["display"] == "none") {
			editBtn[index].style.setProperty("display", "flex");
			reBtn[index].style.setProperty("display", "flex");
		} else {
			editBtn[index].style.setProperty("display", "none");
			reBtn[index].style.setProperty("display", "none");
		}
	}
}

// Gets the input text, clones a hidden template and appends it to stored-records with a unique id

function saveNewRecord() {
	// Gets the inptup value and clones hidden template
	let input = document.getElementById("record-title").value;
	let recordTemplate = document.getElementById("record00");
	let recordClone = recordTemplate.cloneNode(true);
	let storedRecordsDiv = document.getElementById("stored-records");
	storedRecordsDiv.appendChild(recordClone);
	let newRecord = storedRecordsDiv.lastChild;

	let newRecordTitle = newRecord.querySelector(".title");
	let newRecordDate = newRecord.querySelector(".creation-date");
	let newRecordCheck = newRecord.getElementsByClassName("checkbox")[0];

	//  Update info in newRecord
	newRecordTitle.innerHTML = `${input}`;
	newRecordDate.innerHTML = curentDate();
	newRecord.id = uid();
	newRecordID = newRecord.id;

	newRecordCheck.setAttribute("id", `${newRecordID}Check`);
	newRecordTitle.setAttribute("for", `${newRecordID}Check`);
	newRecordDate.setAttribute("for", `${newRecordID}Check`);

	newRecord.style.setProperty("display", "block");

	//Save to localStorage
	console.log(newRecordID);
	let newRecordHTML = document.getElementById(String(newRecordID)).outerHTML;
	console.log(newRecordHTML);
	localStorage.setItem(newRecordID, newRecordHTML);
	console.log(`${newRecordID} saved to local storage`);

	// Return input field to its original state
	document
		.getElementById("input-container")
		.style.setProperty("display", "none");
	document
		.getElementById("edit-container")
		.style.setProperty("display", "block");
}

// Shows the edit record form

function editRecord(caller) {
	let parentElement = caller.parentNode.parentNode.id;
	let editForm = document
		.getElementById(parentElement)
		.getElementsByClassName("edit-form")[0];

	if (editForm.style["display"] == "none") {
		editForm.style["display"] = "flex";
	} else {
		editForm.style["display"] = "none";
	}
}

// Removes the record TODO: make a confirmation popup

function removeRecord(caller) {
	let parentElement = caller.parentNode.parentNode.id;

	localStorage.removeItem(parentElement);
	document.getElementById(parentElement).remove();

	console.log(`Record ${parentElement} removed`);
}

// Save the edits into the form TODO: Integrate with localStorage and refactor

function saveForm(caller) {
	// Get record of edit form
	let parentElementID = caller.parentNode.parentNode.id;
	let parentElement = document.getElementById(parentElementID);
	let editForm = parentElement.getElementsByClassName("edit-form")[0];
	let editInput = editForm.getElementsByClassName("edit-input")[0].value;

	// Edit new title and new date
	parentElement.getElementsByClassName("title")[0].innerHTML = editInput;
	parentElement.querySelector(".creation-date").innerHTML = curentDate();

	// Return the form to its original state
	if (editForm.style["display"] == "none") {
		editForm.style["display"] = "flex";
	} else {
		editForm.style["display"] = "none";
	}

	// Update info in localStorage
	console.log(parentElementID);
	let newRecordHTML = parentElement.outerHTML;
	console.log(newRecordHTML);
	localStorage.setItem(parentElementID, newRecordHTML);
	console.log(`${parentElementID} edited in local storage`);

	console.log("Form saved");
}

//
function doneRecord(caller) {
	let parentElementID = caller.parentNode.id;
	let parentElement = document.getElementById(parentElementID);
	let editTitle = parentElement.getElementsByClassName("title")[0];
	let editDate = parentElement.getElementsByClassName("creation-date")[0];

	if (editTitle.style["text-decoration-line"] == "none") {
		editTitle.style.setProperty("text-decoration-line", "line-through");
		editDate.style.setProperty("text-decoration-line", "line-through");
	} else {
		editTitle.style.setProperty("text-decoration-line", "none");
		editDate.style.setProperty("text-decoration-line", "none");
	}
}
