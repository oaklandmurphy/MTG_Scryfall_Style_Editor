var endpoint = "https://api.scryfall.com/"

// sets all displays to the default setting
function display_default() {
	// print the current guess for the card being searched
	$("#card_title").text("No Card Searched");

	// print the current guess for the oracle text of the card being searched
	$("#card_oracle_text").text("No Card Searched");

	//show the image of the current card being searched
	$('#card_img_front').attr('src', "https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1561757042");

}

// searches the Scryfall API .5 seconds after the user finishes typing
$(document).ready(function(){
	$('#card_name_search').bind('input keyup', function(){
	    var $this = $(this);
	    var delay = 500; // 2 seconds delay after last input

	    // handle debouncing
	    clearTimeout($this.data('timer'));
	    $this.data('timer', setTimeout(function(){
	        $this.removeData('timer');


	        // store the current input in the bar
	        var card_searched = document.getElementById('card_name_search').value
	        console.log(card_searched)

	        // if the serch is too short to match any cards show the default
	        if(card_searched.length < 2) {	

				display_default()

			//otherwise search
	        }else {

		        // try to access the scryfall api for matching cards
		        $.getJSON("https://api.scryfall.com/cards/autocomplete?q=" + card_searched, function(choices){
					
					// if there are no matches show the default
		        	if(choices.data.length == 0) {
		        		display_default()

		        	// otherwise grab the best match's data
		        	}else {

			        	var best_match = choices.data[0]

			        	console.log(choices)

			        	$.getJSON("https://api.scryfall.com/cards/named?fuzzy=" + best_match, function(data){

			        		console.log(data)
							
							// store relevant card data
							var card_title = data.name
							var card_oracle_text
							var card_img_front

							//check for strange layouts
							if(typeof(data.card_faces) != "undefined") {
								card_oracle_text = data.card_faces[0].oracle_text + "\r\n//\r\n" + data.card_faces[1].oracle_text

								//deal with transform cards
								if(data.layout == "transform" || data.layout == "modal_dfc" || data.layout == "flip") {
									card_img_front = data.card_faces[0].image_uris.large
								}else {
									card_img_front = data.image_uris.large
								}
							}else {
								card_oracle_text = data.oracle_text
								card_img_front = data.image_uris.large
							}

							

							// print the current guess for the card being searched
							$("#card_title").text(card_title);

							// print the current guess for the oracle text of the card being searched
							$("#card_oracle_text").text(card_oracle_text);

							//show the image of the current card being searched
							$('#card_img_front').attr('src', card_img_front);
						});
		        	}
				});
	    	}
	    }, delay));
	});
});
