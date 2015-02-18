var owCon = new OntoWikiConnection(urlBase + 'jsonrpc');
var urlBaseWebsafe = urlBase.replace(/[^a-z0-9-_.]/gi,'');
/*
New RDForm
*/
function createForm( owData ) {
	var container = $('<div class="rdform-container"></div>');
	var template = "form_" + urlBaseWebsafe + "." + resourceTemplate + ".html";
	var langFile = "de.js";

	$("body").append( $('<div class="rdform-popup-layer"></div>').append(container));

	var hash = '40cd750bba9870f18aada2478b24840a';
	var data = null;
	var editResource = false;

	if ( typeof owData !== "undefined" ) {
		hash = owData.dataHash;
		data = owData.data;
		editResource = true;
	}

	if ( modelIri.search(/ungarn/) != -1 ) {
		langFile = "hu.js";
	}
		
	var owRdform = new OntoWikiRDForm({
		$container: container,
		template: template,
		hooks: "owrdform_hooks.js",
		lang: langFile,
		data: data
	});
	owRdform.init( function(result){ 
		if ( result ) {
			if ( ! editResource ) {
				resourceUri = result["@id"];
			}
			owCon.updateResource( modelIri, resourceUri, hash, result, function( updateResult ) {
				if ( updateResult == true ) {
					window.location.href = decodeURIComponent(result["@id"]);	
				} else {
					alert(updateResult);
				}
			});
		} else {
			container.hide( "fast", function() { 
				container.remove(); 
			});
		}
		
	});

	//owRdform.settings.$elem.data("resourceUri", resourceUri);
	owRdform.settings.$elem.prepend('<div id="rdform-drag-header"></div>');
	$(container).prepend('<button class="btn btn-default close-rdform-btn pull-right" alt="Close title="Close"><span class="glyphicon glyphicon-remove"></span></button>');
	window.scrollTo(0,0);
	drag_init();
}

// click edit btn
$(".rdform-edit-btn").click(function() {
	owCon.getResource( modelIri, resourceUri, function( resData ) {
		createForm( resData );
	});
	return false;
});

// click new btn
$(".rdform-new-btn").click(function() {
		createForm();
		return false;
});

// close the current form window
$("body").on("click", ".close-rdform-btn", function() {
	var form = $(this).parentsUntil(".rdform-popup-layer");
	form.hide( "fast", function() {
					form.parent().remove();
				});
	return false;
})

// drag and drop functionality for the root form
function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
} 
function drag_over(event) { 
    event.preventDefault(); 
    return false; 
} 
function drop(event) { 
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementsByTagName("form")[0];
    
    var dm1 = document.getElementById("rdform-drag-header");
    
    //console.log(event.clientX, event.dataTransfer.getData("text/plain"), parseInt(offset[0],10));
    //dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.left = (event.clientX + 470 - Math.abs( ( parseInt(offset[0],10) ) + event.clientX ) ) + 'px';
    //dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    dm.style.top = (event.clientY) + 'px';
    event.preventDefault();
    return false;
}
function drag_init() {
	return false;
	//var dm = document.getElementsByTagName("form")[0];
	var dm = document.getElementById("rdform-drag-header");
	$(dm).attr("draggable", "true");
	dm.addEventListener('dragstart',drag_start,false); 
	document.body.addEventListener('dragover',drag_over,false); 
	document.body.addEventListener('drop',drop,false);
}

