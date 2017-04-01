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

// "T-Shirt Info" section of the form
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

// "Activities" section of the form
let total = 0;
const $totalHTML = $('<div class="total"><p></p></div>');
$('.activities').append($totalHTML);

function toggleActivity(toggleName, price, hasConflict, effectedName) {
	$('.activities input[name=' + toggleName + ']').change(() => {
		if($('.activities input[name=' + toggleName + ']').is(':checked')) {
			total += price;
			$('.total p').text('Total: $' + total);
			if(hasConflict) {
				disableActivity(effectedName);
			}
		}
		else {
			total -= price;
			$('.total p').text('Total: $' + total);
			if(hasConflict) {
				enableActivity(effectedName);
			}
		}
	});
}

function disableActivity(effectedName) {
	$('input[name=' + effectedName + ']').prop('disabled', true);
	$('input[name=' + effectedName + ']').parent().addClass('disabled');
}

function enableActivity(effectedName) {
	$('input[name=' + effectedName + ']').prop('disabled', false);
	$('input[name=' + effectedName + ']').parent().removeClass('disabled');
}

toggleActivity('all', 200, false, '');
toggleActivity('js-frameworks', 100, true, 'express');
toggleActivity('express', 100, true, 'js-frameworks');
toggleActivity('js-libs', 100, true, 'node');
toggleActivity('node', 100, true, 'js-libs');
toggleActivity('build-tools', 100, false, '');
toggleActivity('npm', 100, false, '');

