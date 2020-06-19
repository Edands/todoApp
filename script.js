/* 
  TDDO: 
    Here's what the app should do:

    When the user first loads the page, the list of to-do items should appear on the page, matching what's in the "database".

    When someone clicks the "add record" button, a new record should be added to the HTML list using default (hard-coded or slightly randomized) information.
    A new record should also be added to the "database".

    When someone clicks the "delete" button next to a record, that record will removed from the list of items in the HTML. 
    That record should also be removed from the "database".

    When someone clicks the "edit" button next to a record, a form should appear, populated with the existing information for that record.

    When that form is saved, the HTML and the "database" of the appropriate record with the edited information shoud be updated.
*/

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

loadStoredRecords();

var recordTitle = document.getElementById("record-title");
var recordSave = document.getElementById("save-new-btn");
var recordNew = document.getElementById("make-new-btn");

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
	recordTitle.style.setProperty("display", "block");
	recordSave.style.setProperty("display", "block");
	recordNew.style.setProperty("display", "none");
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

	//  Change info in newRecord
	newRecord.querySelector(".title").innerHTML = `${input}`;
	newRecord.querySelector(".creation-date").innerHTML = curentDate();
	newRecord.id = uid();
	newRecordID = newRecord.id;
	newRecord.style.setProperty("display", "block");

	//Save to localStorage
	console.log(newRecordID);
	let newRecordHTML = document.getElementById(String(newRecordID)).outerHTML;
	console.log(newRecordHTML);
	localStorage.setItem(newRecordID, newRecordHTML);
	console.log(`${newRecordID} saved to local storage`);

	// Return input field to its original state
	recordTitle.style.setProperty("display", "none");
	recordSave.style.setProperty("display", "none");
	recordNew.style.setProperty("display", "block");
}

// Shows the edit record form

function editRecord(caller) {
	let parentElement = caller.parentNode.id;
	let editForm = document
		.getElementById(parentElement)
		.getElementsByClassName("edit-form")[0];
	if (editForm.style["display"] == "none") {
		editForm.style["display"] = "block";
	} else {
		editForm.style["display"] = "none";
	}
}

// Removes the record TODO: make a confirmation popup

function removeRecord(caller) {
	let parentElement = caller.parentNode.id;
	localStorage.removeItem(parentElement);
	document.getElementById(parentElement).remove();
	console.log(`Record ${parentElement} removed`);
}

// Save the edits into the form TODO: Integrate with localStorage and refactor

function saveForm(caller) {
	let parentElement = caller.parentNode.parentNode.id;
	let editForm = document
		.getElementById(parentElement)
		.getElementsByClassName("edit-form")[0];
	let editInput = editForm.getElementsByClassName("edit-input")[0].value;

	document
		.getElementById(parentElement)
		.getElementsByClassName("title")[0].innerHTML = editInput;

	if (editForm.style["display"] == "none") {
		editForm.style["display"] = "block";
	} else {
		editForm.style["display"] = "none";
	}
	console.log("Form saved");
}
