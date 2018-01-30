 $(document).ready(function() {


	var topics = ["alligator","ant","bear","bee","bird","camel","cat","cheetah","chicken","chimpanzee","cow","crocodile","deer",
	"dog","dolphin","duck","eagle","elephant","fish","fly","fox","frog",
	"giraffe","goat","goldfish","hamster","hippopotamus","horse","kangaroo",
	"kitten","lion","lobster","monkey","octopus","owl","panda","pig","puppy",
	"rabbit","rat","scorpion","seal","shark","sheep","snail","snake","spider",
	"squirrel","tiger","turtle","wolf","zebra"];

	init_aButtons();


	function init_aButtons() {

		$("#animalButtons").empty();

		for (var i=0; i<topics.length;i++){
		//debugger;
			var aButton = $("<button>");
			aButton.attr({
				type:"button",
				class: "aButton btn btn-light",
			    id:"aButton_"+topics[i], 
			    value:topics[i],
			});
			aButton.text(topics[i]);
			$("#animalButtons").append($(aButton));

		  }
	 }




	$("#addAnimal").on("click", function(event) {
		  event.preventDefault();

		  var aName = $("#animal-input").val().trim();
		  topics.push(aName);
		  $("#animal-input").val("");
		  init_aButtons();
	});



	$(document).on("click", ".aButton", function() {
		  $("#animals").empty();
		  var animal= $(this).attr("value");
		  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + 
		                 "&limit=10&api_key=XVUA89s4qwJmyvWwdNznBxDdApFHADPx";

	      $.ajax({
	        url: queryURL,
	        method: "GET"
	      }).then(function(response) {
	        console.log(response);

		    var results = response.data;


		    for (var i = 0; i < results.length; i++) {

		      var aDiv = $("<div>").addClass("gif");
		      var aRating = $("<p>").html("Rating: " + results[i].rating);
		      var aImg = $("<img>");
		      aImg.attr("src", results[i].images.fixed_height_still.url);
		      aImg.attr("data-still", results[i].images.fixed_height_still.url);
		      aImg.attr("data-animate", results[i].images.fixed_height.url);
		      aImg.attr("data-state", "still");
		      aDiv.append(aImg); 
		      aDiv.append(aRating);


		      $("#animals").append(aDiv);
		    }
		  });

	});

	$(document).on("click", ".gif", function() {

	     var imgfound = $(this).find("img");
		 var state = imgfound.attr("data-state");
	   
	      switch(state) {
	        case "still":
	          imgfound.attr("src", imgfound.attr("data-animate"));
	          imgfound.attr("data-state","animate");
	           break;

	        case "animate":
	           imgfound.attr("src", imgfound.attr("data-still"));
	           imgfound.attr("data-state", "still");
	        }

	});


})
