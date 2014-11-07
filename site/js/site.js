

var owCon = new OntoWikiConnection(urlBase + 'jsonrpc');

$("#rdform-edit-btn").click(function() {
		var container = $('<div class="rdform-container"></div>');
		$("body").append(container);
		var resourceIri = $(this).attr("data-resourceIri");
		
		owCon.getResource( modelIri, resourceIri, function( resData ) {
			var owRdform = new OntoWikiRDForm();
			owRdform.$container = container;
			//resData.resourceIri = resourceIri;
			
			owRdform.initForm(resourceIri, resData, function( result ) {
				var hash = owRdform.$elem.children('#dataHash').val();
                
                owCon.updateResource( modelIri, resourceIri, hash, result, function( updateResult ) {
                	window.location.href = decodeURIComponent(resourceIri);
                } );
			});
			owRdform.$elem.prepend('<p><button class="btn btn-sm close-rdform-btn pull-right" alt="Close title="Close">x</button></p>');	
		});
		
		return false;
});

// close the current form window
$("body").on("click", ".close-rdform-btn", function() {
	//reload window to re-initial all files
	//var redirectUri = $("#redirectUri").val();
	//window.location.href = decodeURIComponent(redirectUri);
	$(this).parentsUntil(".rdform-container").parent().remove();
	return false;
})
/*
$("#rdform-new-btn").click(function() {

	//var newResourceId = 

	$("body").append('<div class="rdform-container"><form class="rdform form-horizontal"</form></div>');
	$(".rdform-container").hide();

	$('#editable').prop('checked', true);
	// TODO: generate resourceId
	$('#resourceIri').val('http://pfarrerbuch.comiles.eu/sachsen/person/-9999999999');
	$('#redirectUri').val('http://pfarrerbuch.comiles.eu/sachsen/person/-9999999999');

	$("#resourceId").val( '{http://xmlns.com/foaf/0.1/name}' );

	// TODO: dataHash kommt aus leerer Resource!
	$('#dataHash').val('');

	var con = new OntoWikiConnection(urlBase + 'jsonrpc');
	//con.getResource( modelIri, 'http://pfarrerbuch.comiles.eu/sachsen/person/-9999999999' );
	con.getResource( modelIri, resourceIri );
	//con.initRDForm( undefined );
	$(".rdform-container").show();

	return false;
});
*/