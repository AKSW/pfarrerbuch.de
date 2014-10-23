$("#rdform-edit-btn").click(function() {

	$("body").append('<div class="rdform-container"><form class="rdform form-horizontal"</form></div>');
	$(".rdform").prepend('<p><button class="btn btn-sm btn-close pull-right" alt="Close title="Close">x</button></p>');	
	$(".rdform-container").hide();

	var con = new OntoWikiConnection(urlBase + 'jsonrpc');
	con.getResource( modelIri, resourceIri );
	$(".rdform-container").show();

	$(document).keyup(function(e) {
	  if (e.keyCode == 27) { window.location.reload(); }   // esc
	});

	return false;
});

$("#rdform-new-btn").click(function() {

	$("body").append('<div class="rdform-container"><form class="rdform form-horizontal"</form></div>');
	$(".rdform-container").hide();

	var con = new OntoWikiConnection(urlBase + 'jsonrpc');
	$('#editable').prop('checked', true);
	$('#dataHash').val('');
	con.initRDForm( undefined );
	$(".rdform-container").show();

	return false;
});

$("body").on("click", ".btn-close", function() {
	//reload window to re-initial all files
	window.location.reload();

	//$(".rdform-container").remove();
	return false;
})