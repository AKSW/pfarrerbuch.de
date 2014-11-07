

var owCon = new OntoWikiConnection(urlBase + 'jsonrpc');

// click edit btn
$("#rdform-edit-btn").click(function() {
		var container = $('<div class="rdform-container"></div>');
		$("body").append(container);
		var resourceIri = $(this).attr("data-resourceIri");
		
		owCon.getResource( modelIri, resourceIri, function( resData ) {
			var hash = resData.dataHash;
			var owRdform = new OntoWikiRDForm();
			owRdform.$container = container;
			
			owRdform.initForm(resourceIri, resData, function( result ) {
				//var hash = owRdform.$elem.children('#dataHash').val();
                
                owCon.updateResource( modelIri, resourceIri, hash, result, function( updateResult ) {
                	window.location.href = decodeURIComponent(resourceIri);
                } );
			});
			owRdform.$elem.prepend('<p><button class="btn btn-sm close-rdform-btn pull-right" alt="Close title="Close">x</button></p>');	
		});
		
		return false;
});

// click new btn
$("#rdform-new-btn").click(function() {
		var container = $('<div class="rdform-container"></div>');
		$("body").append(container);

		var now = new Date();
		var pID = now.getTime();
		var resourceIri = 'http://pfarrerbuch.comiles.eu/sachsen/person/-'+pID;

		owCon.getResource( modelIri, resourceIri, function( resData ) {
			var hash = resData.dataHash;
			var owRdform = new OntoWikiRDForm();
			owRdform.$container = container;
			owRdform.template = "Person";
			
			owRdform.initForm(resourceIri, resData, function( result ) {					
				var resultId = result["@id"];
	            
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