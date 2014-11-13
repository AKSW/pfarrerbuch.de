
var owCon = new OntoWikiConnection(urlBase + 'jsonrpc');

// click edit btn
$("#rdform-edit-btn").click(function() {
		var container = $('<div class="rdform-container"></div>');
		var template = "form_pfarrerbuch-" + $(this).attr("data-resourceTemplate") + ".html";
		var resourceIri = $(this).attr("data-resourceIri");

		$("body").append(container);

		owCon.getResource( modelIri, resourceIri, function( resData ) {
			var hash = resData.dataHash;
			var owRdform = new OntoWikiRDForm({
				$container: container,
				template: template,
				hooks: "hooks_pfarrerbuch.js",
				lang: "pfarrerbuch_de.js",
				data: resData.data
			});
			owRdform.init( function(result){ 
				owCon.updateResource( modelIri, resourceIri, hash, result, function( updateResult ) {
					window.location.href = decodeURIComponent(result["@id"]);
				});
			});
			owRdform.settings.$elem.data("resourceIri", resourceIri);
			owRdform.settings.$elem.prepend('<p><button class="btn btn-default close-rdform-btn pull-right" alt="Close title="Close"><span class="glyphicon glyphicon-remove"></span></button></p>');
			owRdform.settings.$elem.find(".rdform-submit-btn-group div").prepend('<button type="reset" class="btn btn-default close-rdform-btn">Abbrechen</button>  ');
		});			
		
		return false;
});

// click new btn
$("#rdform-new-btn").click(function() {
		var container = $('<div class="rdform-container"></div>');
		var template = "form_pfarrerbuch-" + $(this).attr("data-resourceTemplate") + ".html";

		$("body").append(container);

		var owRdform = new OntoWikiRDForm({
			$container: container,
			template: template,
			hooks: "hooks_pfarrerbuch.js",
			lang: "pfarrerbuch_de.js",
		});
		owRdform.init( function(result){ 
			var hash = '40cd750bba9870f18aada2478b24840a';
			owCon.updateResource( modelIri, result["@id"], hash, result, function( updateResult ) {
				window.location.href = decodeURIComponent(result["@id"]);
			});
		});
		owRdform.settings.$elem.prepend('<p><button class="btn btn-default close-rdform-btn pull-right" alt="Close title="Close"><span class="glyphicon glyphicon-remove"></span></button></p>');
		owRdform.settings.$elem.find(".rdform-submit-btn-group div").prepend('<button type="reset" class="btn btn-default close-rdform-btn">Abbrechen</button>  ');
		
		return false;
});

// close the current form window
$("body").on("click", ".close-rdform-btn", function() {
	var form = $(this).parentsUntil(".rdform-container");
	form.hide( "fast", function() {
					form.parent().remove();
				});
	return false;
})

// close a subform
$("body").on("click", ".close-subrdform-btn", function() {
	var form = $(this).parentsUntil(".rdform");
	$(this).parentsUntil(".rdform").parent().parentsUntil(".col-xs-9").parent().find("input,button").show();
	form.hide( "fast", function() {
					form.parent().remove();
				});	
	return false;
})