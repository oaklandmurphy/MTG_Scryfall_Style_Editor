var endpoint = "https://api.scryfall.com/"
var named = "cards/named?fuzzy="
var search = "cards/search?fuzzy="


// activated when the serach bar is edited
$(document).ready(function(){
    $("#card_name_search").on("input", function(){

        // store the current input in the bar
        var card_searched = $(this).val()

        // try to access the scryfall
        $.getJSON("https://api.scryfall.com/cards/named?fuzzy=" + card_searched, function(data){
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
    });
});
