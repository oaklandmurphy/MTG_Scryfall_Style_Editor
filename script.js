var endpoint = "https://api.scryfall.com/"

function display_default() {
	// print the current guess for the card being searched
	$("#card_title").text("No Card Searched");

	// print the current guess for the oracle text of the card being searched
	$("#card_oracle_text").text("No Card Searched");

	//show the image of the current card being searched
	$('#card_img_front').attr('src', "https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1561757042");

}

// set all feilds to default values on page access
display_default()

// activated when the search bar is edited
$(document).ready(function(){
    $("#card_name_search").on("input", function(){

        // store the current input in the bar
        var card_searched = $(this).val()
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
						// store relevant card data
						var card_title = data.name
						var card_oracle_text = data.oracle_text
						var card_img_front = data.image_uris.large

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
    });
});
