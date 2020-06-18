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

var recordTitle = document.getElementById("record-title");
var recordSave = document.getElementById("save-new-btn");
var recordNew = document.getElementById("make-new-btn");

function makeNewRecord() {
	recordTitle.style.setProperty("display", "block");
	recordSave.style.setProperty("display", "block");
	recordNew.style.setProperty("display", "none");
}

function saveNewRecord() {
	recordTitle.style.setProperty("display", "none");
	recordSave.style.setProperty("display", "none");
	recordNew.style.setProperty("display", "block");
}

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

function removeRecord(caller) {
	let parentElement = caller.parentNode.id;
	document.getElementById(parentElement).remove();
	console.log(`Record ${parentElement} removed`);
}

function saveForm(caller) {
	let parentElement = caller.parentNode.parentNode.id;
	let editForm = document
		.getElementById(parentElement)
		.getElementsByClassName("edit-form")[0];
	if (editForm.style["display"] == "none") {
		editForm.style["display"] = "block";
	} else {
		editForm.style["display"] = "none";
	}
	console.log("Form saved");
}
