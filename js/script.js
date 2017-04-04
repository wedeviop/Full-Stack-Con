/* This script contains all the functionality for the interactive form.
   The JavaScript is organized by fieldset section, in the order it appears in the HTML.
   After all section functionality is completed, the rest of the script contains form validation functionality
*/

// ************************************ //
//           BASIC INFO SECTION         //
// ************************************ //

const $nameInput = $('#name');
const $title = $('#title');
const $otherTitle = $('#other-title');

// Focus the Name input field when document loads
$nameInput.focus();

// Remove the Other Title input field once document loads
$otherTitle.remove();

// Listener for adding Other Title input field when user selects "Other"
$title.change(() => {
	const val = $('#title option').filter(':selected').val();
	if(val === 'other') {
		$title.parent().append($otherTitle);
	}
	else {
		$otherTitle.remove();
	}
});

// ************************************ //
//         T-SHIRT INFO SECTION         //
// ************************************ //

const $colorsDiv = $('#colors-js-puns');
const $colorSelect = $('#color');
const $colorOpts = $('#color option');
const $jsPunsOpts = $colorOpts.slice(0,3);
const $iHeartJSOpts = $colorOpts.slice(3,6);
const designTypeRegEx = /\s*\(.*/;

// Hide the color section
$colorsDiv.hide();

// Change the text to only show the color name
// i.e. Removes the text ' (JS Puns shirt only)' from each color
for(let i = 0; i < $colorOpts.length; i += 1) {
	const colorName = $colorOpts[i].innerHTML;
	$colorOpts[i].innerHTML = colorName.replace(designTypeRegEx, '');
}

// On t-shirt design change, add the correct group of colors back
$('#design').change(() => {
	const val = $('#design option').filter(':selected').val();
	
	$colorsDiv.show();
	// Remove any lingering options
	$colorOpts.remove();

	// Only append appropriate group of options	
	if(val === 'js puns') {
		$colorSelect.append($jsPunsOpts);
	}
	else if(val === 'heart js') {
		$colorSelect.append($iHeartJSOpts);
	}
	else {
		$colorsDiv.hide();
	}
	$colorSelect.prop('selectedIndex', 0);
});

// ************************************ //
//    REGISTER FOR ACTIVITIES SECTION   //
// ************************************ //

const $totalHTML = $('<div class="total"><p></p></div>');
let total = 0;

// append html elements that displays the total cost of activities
$('.activities').append($totalHTML);

// Adds all the listeners for the activities checkboxes
addActivityListener('all', 200);
addActivityListener('js-frameworks', 100, 'express');
addActivityListener('js-libs', 100, 'node');
addActivityListener('express', 100, 'js-frameworks');
addActivityListener('node', 100, 'js-libs');
addActivityListener('build-tools', 100);
addActivityListener('npm', 100);

// EFFECTS: adds a change listener to an activity checkbox,
//          when checked, calculates the price of the total and updates the html text
function addActivityListener(activityName, price, conflictName = '') {
	
	const $activity = $('.activities input[name=' + activityName + ']');
	
	$activity.change(() => {
		if($activity.is(':checked')) {
			total += price;
			$('.total p').text('Total: $' + total);
			// in case of conflict, toggle the conflicting activity
			if(conflictName !== '') {
				toggleActivity(conflictName, false);
			}
		}
		else {
			total -= price;
			$('.total p').text('Total: $' + total);
			if(conflictName !== '') {
				toggleActivity(conflictName, true);
			}
		}
	});
}

// EFFECTS: toggles the activity to be enabled or disabled based on "enable" boolean
function toggleActivity(activityName, enable) {
	
	const $activity = $('.activities input[name=' + activityName + ']');
	
	if(enable) {
		$activity.prop('disabled', false);
		$activity.parent().removeClass('disabled');
	}
	else {
		$activity.prop('disabled', true);
		$activity.parent().addClass('disabled');
	}

}

// ************************************ //
//         PAYMENT INFO SECTION         //
// ************************************ //

// Add IDs to paypal and bitcoin paragraphs for easy selection
$('#credit-card').next().attr('id', 'paypal');
$('#credit-card').next().next().attr('id', 'bitcoin');

const $payment = $('#payment');
const $ccDiv = $('#credit-card');
const $paypalDiv = $('#paypal');
const $bitcoinDiv = $('#bitcoin');

// Default credit card option as selected and hide others
$payment.prop('selectedIndex', 1);
$paypalDiv.hide();
$bitcoinDiv.hide();

// On payment type change, display the correct payment type fields or info
$payment.change(() => {
	const val = $('#payment option').filter(':selected').val();
	switch(val) {
		case 'select_method':
			$ccDiv.hide();
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
		case 'credit card':
			$ccDiv.show();
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
		case 'paypal':
			$ccDiv.hide();
			$paypalDiv.show();
			$bitcoinDiv.hide();
			break;
		case 'bitcoin':
			$ccDiv.hide();
			$paypalDiv.hide();
			$bitcoinDiv.show();
			break;
		default:
			$ccDiv.show();
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
	}
});

// ************************************ //
// FORM VALIDATION FUNCTIONS AND EVENTS //
// ************************************ //

// EFFECTS: Compares the regEx to the input val and returns true if matched
//          Adds an error class and appends an error message when not matched
function isValidInput($input, regEx, val, message='') {

	if(regEx.test(val)) {
		// Remove possible error class and error message when test passes
		$input.removeClass('error');
		
		if($input.prev().filter('.error-message').length !== 0) {
			$input.prev().remove();
		}
		
		return true;
	}
	else {
		$input.addClass('error');
		
		// Check for empty versus malformatted input, display appropriate message
		if(val === '') {
			message = ('Please enter your ').concat(message);
		}
		else {
			message = 'Your ' + message + ' is formatted incorrectly'
		}

		// Check for existence of error message, add html to document, or change text
		if($input.prev().filter('.error-message').length === 0)
			$input.before('<p class="error-message">'+ message +'</p>');
		else {
			$input.prev().filter('.error-message').text(message);
		}

		return false;
	}

}

function isValidActivity() {
	const $activities = $('.activities input');
	const $errorHTML = $('<p class="error-message">Please select at least one activity.</p>');
	if($activities.filter(':checked').length) {
		$('.activities > .error').remove();
		return true;
	}
	else {
		if($('.activities > .error-message').length === 0)
			$('.activities legend').after($errorHTML);
		return false;
	}
}

function realtimeValidation() {
	const nameRegEx = /[a-zA-Z]{1,}/;

	const $emailInput = $('#mail');
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	$nameInput.bind('input', () => {isValidInput($nameInput, nameRegEx, $nameInput.val(), 'name')});
	$emailInput.bind('input', () => {isValidInput($emailInput, emailRegEx, $emailInput.val(), 'email')});
}

realtimeValidation();

function validateForm() {
	const nameRegEx = /[a-zA-Z]{1,}/;
	const nameVal = $nameInput.val();

	const $emailInput = $('#mail');
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const emailVal = $emailInput.val();
	
	const $ccInput = $('#cc-num');
	const ccRegEx = /^[0-9]{13,16}$/;
	const ccVal = $ccInput.val();
	
	const $zipInput = $('#zip');
	const zipRegEx = /^[0-9]{5}$/;
	const zipVal = $zipInput.val();
	
	const $cvvInput = $('#cvv');
	const cvvRegEx = /^[0-9]{3}$/;
	const cvvVal = $cvvInput.val();

	let isValid = true;
	if(!isValidInput($nameInput, nameRegEx, nameVal, 'name')) {
		isValid = false;
	}
	if(!isValidInput($emailInput, emailRegEx, emailVal, 'email')) {
		isValid = false;
	}
	if(!isValidActivity()) {
		isValid = false;
	}
	if($('#payment option').filter(':selected').val() === 'credit card') {
		if(!isValidInput($ccInput, ccRegEx, ccVal, 'card number')) {
			isValid = false;
		}
		if(!isValidInput($zipInput, zipRegEx, zipVal, 'zip code')) {
			isValid = false;
		}
		if(!isValidInput($cvvInput, cvvRegEx, cvvVal, 'CVV')) {
			isValid = false;
		}
	}

	return isValid;
}

$('form').submit((ev) => {
	if(validateForm()) {
		return;
	}
	else {
		ev.preventDefault();
	}
});
