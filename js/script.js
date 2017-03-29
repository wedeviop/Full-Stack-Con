// "Job Role" section of the form
const $jobRoleSelector = $('#title');
$jobRoleSelector.change(() => {
	const val = $('#title option:selected').text();
	if(val === 'Other') {
		$jobRoleSelector.parent().append('<input type="text" id="other-title" placeholder="Your Job Role">');
	}
})