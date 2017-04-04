// 'Basic Info' section
$('#name').focus();
function checkName() {
	const nameVal = $('#name').val();
	if(nameVal === '') {
		$('#name').css('border-color', 'red');
		return true;
	}
	else {
		$('#name').css('border-color', '#c1deeb');
		return false;
	}
}

function checkEmail() {
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const emailVal = $('#mail').val();
	if(!emailRegEx.test(emailVal)) {
		$('#mail').css('border-color', 'red');
		return false;
	}
	else {
		$('#mail').css('border-color', '#c1deeb');
		return true;
	}
}

// "Job Role" section of the form
const $title = $('#title');
const $otherTitle = $('#other-title');
$otherTitle.remove();
$title.change(() => {
	const val = $('#title option').filter(':selected').val();
	if(val === 'other') {
		$title.parent().append($otherTitle);
	}
	else {
		$otherTitle.remove();
	}
});

// "T-Shirt Info" section of the form
const $colorsDiv = $('#colors-js-puns');
const $colorOpts = $('#color option');
const $jsPunsOpts = $colorOpts.slice(0,3);
const $iHeartJSOpts = $colorOpts.slice(3,6);
const regEx = /\s*\(.*/;

// First, hide the color section
$colorsDiv.hide();

// Second, change the text to only show the color name
for(let i = 0; i < $colorOpts.length; i += 1) {
	const colorName = $colorOpts[i].innerHTML;
	$colorOpts[i].innerHTML = colorName.replace(regEx, '');
}

// Third, save the groups for later and remove them from the page
$colorOpts.remove();

// Finally, on t-shirt design change, add the correct group of colors back
$('#design').change(() => {
	const val = $('#design option').filter(':selected').val();
	$colorsDiv.show();
	$colorOpts.remove();
	if(val === 'js puns') {
		$('#color').append($jsPunsOpts);
	}
	else if(val === 'heart js') {
		$('#color').append($iHeartJSOpts);
	}
	else {
		$colorsDiv.hide();
	}
	$('#color').prop('selectedIndex', 0);
});

// "Activities" section of the form
let total = 0;
const $totalHTML = $('<div class="total"><p></p></div>');
$('.activities').append($totalHTML);

function addActivityListener(activityName, price, conflictName = '') {
	const $activity = $('.activities input[name=' + activityName + ']');
	$activity.change(() => {
		if($activity.is(':checked')) {
			total += price;
			$('.total p').text('Total: $' + total);
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

addActivityListener('all', 200);
addActivityListener('js-frameworks', 100, 'express');
addActivityListener('js-libs', 100, 'node');
addActivityListener('express', 100, 'js-frameworks');
addActivityListener('node', 100, 'js-libs');
addActivityListener('build-tools', 100);
addActivityListener('npm', 100);

// 'Payment Info' section
$('#credit-card').next().attr('id', 'paypal');
$('#credit-card').next().next().attr('id', 'bitcoin');
const $payment = $('#payment');
const $ccDiv = $('#credit-card');
const $paypalDiv = $('#paypal');
const $bitcoinDiv = $('#bitcoin');

$payment.prop('selectedIndex', 1);
$paypalDiv.hide();
$bitcoinDiv.hide();

$payment.change(() => {
	const val = $('#payment option').filter(':selected').val();
	switch(val) {
		case 'select_method':
			$ccDiv.hide();
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
		case 'credit card':
			$ccDiv.show()
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
		case 'paypal':
			$ccDiv.hide()
			$paypalDiv.show()
			$bitcoinDiv.hide();
			break;
		case 'bitcoin':
			$ccDiv.hide();
			$paypalDiv.hide();
			$bitcoinDiv.show();
			break;
		default:
			$ccDiv.show()
			$paypalDiv.hide();
			$bitcoinDiv.hide();
			break;
	}
});











