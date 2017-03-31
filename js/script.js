// Focus Name input on page load
$('#name').focus();

// "Job Role" section of the form
const $otherTitle = $('#other-title');
$('#other-title').remove();
$('#title').change(() => {
	const val = $('#title option:selected').text();
	if(val === 'Other') {
		$('#title').parent().append($otherTitle);
	}
	else {
		$('#other-title').remove();
	}
});

// First, hide the color section
$('#colors-js-puns').hide();
// Second, change the text to only show the color name
const $colorOpts = $('#color option');
const regEx = /\s*\(.*/;
for(let i = 0; i < $colorOpts.length; i += 1) {
	const colorName = $colorOpts[i].innerHTML;
	$colorOpts[i].innerHTML = colorName.replace(regEx, '');
}
// Third, save the groups for later and remove them from the page
const $jsPunsOpts = $colorOpts.slice(0,3);
const $iHeartJSOpts = $colorOpts.slice(3,6);
$colorOpts.remove();

// Finally, on t-shirt design change, add the correct group of colors back
$('#design').change(() => {
	const val = $('#design option:selected').text();
	$('#colors-js-puns').show();
	$colorOpts.remove();
	if(val === 'Theme - JS Puns') {
		$('#color').append($jsPunsOpts);
	}
	else if(val === 'Theme - I \u2665 JS') {
		$('#color').append($iHeartJSOpts);
	}
	else {
		$('#colors-js-puns').hide();
	}
	$('#color')[0].selectedIndex = 0;
});

/*
”Register for Activities” section of the form:
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

function toggleActivity(toggleName, effectedName) {
	$('input[name=' + toggleName + ']').change(() => {
	if($('input[name=' + toggleName + ']').is(':checked')) {
		$('input[name=' + effectedName + ']').prop('disabled', true);
		$('input[name=' + effectedName + ']').parent().addClass('disabled');
	}
	else {
		$('input[name=' + effectedName + ']').prop('disabled', false);
		$('input[name=' + effectedName + ']').parent().removeClass('disabled');
	}
});
}

toggleActivity('js-frameworks', 'express');
toggleActivity('express', 'js-frameworks');
toggleActivity('js-libs', 'node');
toggleActivity('node', 'js-libs');

