/******s**********
    
    Assignment 6 Javascript
    Name:
    Date:
    Description:

*****************/

const itemDescription = ["MacBook", "The Razer", "WD My Passport", "Nexus 7", "DD-45 Drums"];
const itemPrice = [1899.99, 79.99, 179.99, 249.99, 119.99];
const itemImage = ["mac.png", "mouse.png", "wdehd.png", "nexus.png", "drums.png"];
let numberOfItemsInCart = 0;
let orderTotal = 0;

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */


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
	if ( confirm('Clear order?') )
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

	//check if user entered input into shopping cart
	var quant = ["qty1", "qty2", "qty3", "qty4", "qty5"]
	for(var i = 0; i<quant.length; i++){
		var q = document.getElementById(quant[i]);
		count += q.value;
	}
		if(count <= 0){
			alert("You have no items in your cart.")
			qty1.focus();
			qty1.select();

			return errorFlag = true;
		}
	

	var requiredTextFields = ["fullname","address", "city","postal","email","cardname","cardnumber"];
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


	//check if the user selected a option for province
	if(document.getElementById("province").selectedIndex == 0){
		document.getElementById("province_error").style.display = "block";
		errorFlag = true;
	}

	//check if user selected month
		if(document.getElementById("month").selectedIndex == 0){
		document.getElementById("month_error").style.display = "block";
		errorFlag = true;
	}

	//check if valid postal code
	if(formFieldHasInput(document.getElementById("postal"))){

			var regexPostal = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);
			var postalValue = document.getElementById("postal").value;

			if(!regexPostal.test(postalValue) ){
				document.getElementById("postalformat_error").style.display = "block";
				//postal.focus();
				//postal.select();
				//postal code invalid error selects it too early if i do this
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

	//validate the user selected a card
	var cards = ["visa", "amex", "mastercard"];
	var cardChecked = false;

	for(var i = 0; i<cards.length && !cardChecked; i++){


		if(document.getElementById(cards[i]).checked){
			cardChecked = true;
		}
	}

	//if none selected 
	if(!cardChecked){
		document.getElementById("cardtype_error").style.display = "block";
	}


	//check if credit card 10 numbers
	if(formFieldHasInput(document.getElementById("cardnumber"))){
		var credit = trim(document.getElementById("cardnumber").value);
		if(credit < 1000000000 || credit > 9999999999){
			document.getElementById("invalidcard_error").style.display = "block";
			errorFlag = true;
		}

		//check if credit card is valid
		var checker = [4,3,2,7,6,5,4,3,2];
		var count2 = 0;
		for(j=0; j <= 8; j++){
			
			count2 += credit.charAt(j) * checker[j];
		}

		var remainder = count2 % 11;

		if((11 - (count2%11)) != credit.charAt(9)){

			errorFlag = true;
			document.getElementById("invalidcard_error").style.display = "block";
		}
	}
	
	return errorFlag;

}

/*
 * Adds an item to the cart and hides the quantity and add button for the product being ordered.
 *
 * param itemNumber The number used in the id of the quantity, item and remove button elements.
 */
function addItemToCart(itemNumber)
{
	// Get the value of the quantity field for the add button that was clicked 
	let quantityValue = trim(document.getElementById("qty" + itemNumber).value);

	// Determine if the quantity value is valid
	if ( !isNaN(quantityValue) && quantityValue != "" && quantityValue != null && quantityValue != 0 && !document.getElementById("cartItem" + itemNumber) )
	{
		// Hide the parent of the quantity field being evaluated
		document.getElementById("qty" + itemNumber).parentNode.style.visibility = "hidden";

		// Determine if there are no items in the car
		if ( numberOfItemsInCart == 0 )
		{
			// Hide the no items in cart list item 
			document.getElementById("noItems").style.display = "none";
		}

		// Create the image for the cart item
		let cartItemImage = document.createElement("img");
		cartItemImage.src = "images/" + itemImage[itemNumber - 1];
		cartItemImage.alt = itemDescription[itemNumber - 1];

		// Create the span element containing the item description
		let cartItemDescription = document.createElement("span");
		cartItemDescription.innerHTML = itemDescription[itemNumber - 1];

		// Create the span element containing the quanitity to order
		let cartItemQuanity = document.createElement("span");
		cartItemQuanity.innerHTML = quantityValue;

		// Calculate the subtotal of the item ordered
		let itemTotal = quantityValue * itemPrice[itemNumber - 1];

		// Create the span element containing the subtotal of the item ordered
		let cartItemTotal = document.createElement("span");
		cartItemTotal.innerHTML = formatCurrency(itemTotal);

		// Create the remove button for the cart item
		let cartItemRemoveButton = document.createElement("button");
		cartItemRemoveButton.setAttribute("id", "removeItem" + itemNumber);
		cartItemRemoveButton.setAttribute("type", "button");
		cartItemRemoveButton.innerHTML = "Remove";
		cartItemRemoveButton.addEventListener("click",
			// Annonymous function for the click event of a cart item remove button
			function()
			{
				// Removes the buttons grandparent (li) from the cart list
				this.parentNode.parentNode.removeChild(this.parentNode);

				// Deteremine the quantity field id for the item being removed from the cart by
				// getting the number at the end of the remove button's id
				let itemQuantityFieldId = "qty" + this.id.charAt(this.id.length - 1);

				// Get a reference to quanitity field of the item being removed form the cart
				let itemQuantityField = document.getElementById(itemQuantityFieldId);
				
				// Set the visibility of the quantity field's parent (div) to visible
				itemQuantityField.parentNode.style.visibility = "visible";

				// Initialize the quantity field value
				itemQuantityField.value = "";

				// Decrement the number of items in the cart
				numberOfItemsInCart--;

				// Decrement the order total
				orderTotal -= itemTotal;

				// Update the total purchase in the cart
				document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);

				// Determine if there are no items in the car
				if ( numberOfItemsInCart == 0 )
				{
					// Show the no items in cart list item 
					document.getElementById("noItems").style.display = "block";
				}				
			},
			false
		);

		// Create a div used to clear the floats
		let cartClearDiv = document.createElement("div");
		cartClearDiv.setAttribute("class", "clear");

		// Create the paragraph which contains the cart item summary elements
		let cartItemParagraph = document.createElement("p");
		cartItemParagraph.appendChild(cartItemImage);
		cartItemParagraph.appendChild(cartItemDescription);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Quantity: "));
		cartItemParagraph.appendChild(cartItemQuanity);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Total: "));
		cartItemParagraph.appendChild(cartItemTotal);		

		// Create the cart list item and add the elements within it
		let cartItem = document.createElement("li");
		cartItem.setAttribute("id", "cartItem" + itemNumber);
		cartItem.appendChild(cartItemParagraph);
		cartItem.appendChild(cartItemRemoveButton);
		cartItem.appendChild(cartClearDiv);

		// Add the cart list item to the top of the list
		let cart = document.getElementById("cart");
		cart.insertBefore(cartItem, cart.childNodes[0]);

		// Increment the number of items in the cart
		numberOfItemsInCart++;

		// Increment the total purchase amount
		orderTotal += itemTotal;

		// Update the total puchase amount in the cart
		document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);
	}		
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
	//Add event listener for submit
	document.getElementById("orderform").addEventListener("submit", validate, false);
	//Add reset listener
	document.getElementById("orderform").reset();
	//does it want id clear??
	document.getElementById("orderform").addEventListener("reset", resetForm, false);
	//add listeners for adding all items
		document.getElementById("addMac").addEventListener("click", 
	function(){
			addItemToCart(1)
	});
		document.getElementById("addMouse").addEventListener("click", 
	function(){
			addItemToCart(2)
	});
		document.getElementById("addWD").addEventListener("click", 
	function(){
			addItemToCart(3)
	});
		document.getElementById("addNexus").addEventListener("click", 
	function(){
			addItemToCart(4)
	});
		document.getElementById("addDrums").addEventListener("click", 
	function(){
			addItemToCart(5)
	});

`		`
	//	Populate the year select with up to date values
	hideErrors();
	let year = document.getElementById("year");
	let currentDate = new Date();
	for(let i = 0; i < 7; i++){
		let newYearOption = document.createElement("option");
		newYearOption.value = currentDate.getFullYear() + i;
		newYearOption.innerHTML = currentDate.getFullYear() + i;
		year.appendChild(newYearOption);
	}

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);












