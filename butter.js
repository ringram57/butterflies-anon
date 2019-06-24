/******s**********
    
    Web Project
    Name:Robbie I
    Date:
    Description:

*****************/


// Uses a regex to remove spaces from a string.
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

//validates form by calling formhaserrors
// param e  A reference to the event object
function validate(e)
{
	//hide errors
	hideErrors();
	//determine if form has errors
	if(formHasErrors()){
		e.preventDefault();
		return false;
	}


	return true;
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement)
{
	// Check if the text field has a value
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		// Invalid entry
		return false;
	}
	
	// Valid entry
	return true;
}



/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{	//is it supposed to be resettig basket too?
	// Confirm that the user wants to reset the form.
	if ( confirm('Reset form?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	var errorFlag = false;
	var count = 0;

	var requiredTextFields = ["fullname","email","message", "phone"];
	//check if any of the text fields are empty
	for(var i = 0; i<requiredTextFields.length; i++)
	{

		var textField = document.getElementById(requiredTextFields[i]);

				if(!formFieldHasInput(textField))
				{
				//dispay message
				document.getElementById(requiredTextFields[i] + "_error").style.display = "block";

					if(!errorFlag)
					{
						textField.focus();
						textField.select();
					}

						errorFlag = true;
				}
	}

	//check if valid phone
	if(formFieldHasInput(document.getElementById("phone"))){
		var regex = new RegExp(/^\d{10}$/);
		var phoneNumberFieldValue = document.getElementById("phone").value;

		if(!regex.test(phoneNumberFieldValue)){
			document.getElementById("phoneformat_error").style.display = "block";
			
			if(!errorFlag){
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}
	}
		
	//check if valid email
	if(formFieldHasInput(document.getElementById("email"))){

		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var emailvalue = document.getElementById("email").value;
		if(!re.test(emailvalue)){

			document.getElementById("emailformat_error").style.display = "block";
			errorFlag = true;
		}
	}

	
	return errorFlag;

}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for ( let i = 0; i < error.length; i++ )
	{
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load()
{
	hideErrors();

	//Add event listener for submit
	document.getElementById("contact").addEventListener("submit", validate, false);
	//Add reset listener
	document.getElementById("contact").reset();
	//does it want id clear??
	document.getElementById("contact").addEventListener("reset", resetForm, false);

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);












