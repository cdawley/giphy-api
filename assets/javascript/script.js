
arraySearchTerms = ['cats', 'dogs', 'giraffes', 'werewolves'];
let giphyAPIKey = 'Bh0kYM8xvGpGmk4mSawtFmR7lK9DDVT2';

function createSearchButton(searchTerm) {

    newButton = $("<button>");
    newButton.addClass("btn btn-secondary result-button");
    newButton.data("search", searchTerm);
    newButton.text(searchTerm);

    $("div#buttons-div").append(newButton);

}

function fillSearchButtons() {
    $("div#buttons-div").empty();

    for (let i = 0; i < arraySearchTerms.length; i++) {
        createSearchButton(arraySearchTerms[i]);
    }
}

function giphySearch(searchTerm, results) {

  let queryURL = 'https://api.giphy.com/v1/gifs/search' + '?api_key=' + giphyAPIKey + '&q=' + searchTerm + '&limit=' + results;
  console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET",
}).then( function (response) {
    console.log("response: " + JSON.stringify(response) + "\n");
  let theData = response.data;
  console.log(theData.length + " images");
  for (let i = 0; i < theData.length; i++) {
//header - body - title - text
console.log([i] + "start");

    let imgDiv = $("div#results-div");

    let imgAnimated = theData[i].images.fixed_height.url;
    let imgStill = theData[i].images.fixed_height_still.url;
    let imgRating = theData[i].rating;
    let imgTitle = theData[i].title;

console.log("\n\n" + response + "\n\n");

    let newImg = $("<img>");
    newImg.attr("src", imgStill);
    newImg.data("animate", imgAnimated);
    newImg.data("still", imgStill);
    newImg.data("state", "still");
    newImg.addClass("d-block mx-auto search-gif");
    cardBody = $("<div class=\"card-body bg-secondary align-content-center\">").append(newImg);

    let cardTitle = $("<h4>");
    cardTitle.text(imgTitle);
    cardTitle.addClass("card-title bg-dark text-light text-center");

    cardText = $("<h4 class=\"card-text text-center\">");
    ratingBadge = $("<span class=\"badge\">");

//switch background color of badge according rating (Bootstrap)
    switch (theData[i].rating) {
      case "y":
      ratingBadge.addClass("badge-success");
      break;
      case "g":
      ratingBadge.addClass("badge-info");
      break;
      case "pg":
      ratingBadge.addClass("badge-primary");
      break;
      case "pg-13":
      ratingBadge.addClass("badge-warning");
      break;
      case "r":
      ratingBadge.addClass("badge-danger");
      break;
    }
    ratingBadge.text(imgRating);


    cardText.html("Rated ");
    cardText.append(ratingBadge);
    cardBody.append(cardText);

    let newCard = $("<figure class=\"card bg-secondary m-2\">")
    newCard.addClass("search-result");
    newCard.append(cardTitle);
    newCard.append(cardBody);


    imgDiv.append(newCard);

    console.log(newCard + "\n");

  }
});

};
