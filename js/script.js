// "Job Role" section of the form
$('#other-title').hide();
$('#title').change(() => {
	const val = $('#title option:selected').text();
	if(val === 'Other') {
		$('#other-title').show();
	}
	else {
		$('#other-title').hide();
	}
});

// "T-Shirt Info" section of the form
/* 
For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
*/

// First hide the color section
$('#colors-js-puns').hide();

// Next change the text of the colors

$('#design').change(() => {
	const val = $('#design option:selected').text();
	if(val === 'Theme - JS Puns') {
		$('#colors-js-puns').show();
		$('#color option[value=cornflowerblue]').attr('disabled', false);
		$('#color option[value=darkslategrey]').attr('disabled', false);
		$('#color option[value=gold]').attr('disabled', false);
		$('#color option[value=tomato]').attr('disabled', true);
		$('#color option[value=steelblue]').attr('disabled', true);
		$('#color option[value=dimgrey]').attr('disabled', true);
	}
	else if(val === 'Theme - I ♥ JS') {
		$('#colors-js-puns').show();
		$('#color option[value=tomato]').attr('disabled', false);
		$('#color option[value=steelblue]').attr('disabled', false);
		$('#color option[value=dimgrey]').attr('disabled', false);
		$('#color option[value=cornflowerblue]').attr('disabled', true);
		$('#color option[value=darkslategrey]').attr('disabled', true);
		$('#color option[value=gold]').attr('disabled', true);
	}
	else {
		$('#colors-js-puns').hide();
	}
});