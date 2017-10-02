var topics = ["Lil Uzi Vert", "Kanye West", "Travis Scott", "Cardi B", "Migos", "Chance The Rapper", "Kendrick Lamar"];

function renderButtons() {

  $("#topic-buttons").empty();

  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("topicButton")
    newButton.attr("data-person", topics[i]);
    newButton.text(topics[i]);
    $("#topic-buttons").append(newButton);
  }
}

$("#add-button").on("click", function(event){
  event.preventDefault();
  var newTopic = $("#newSearch").val().trim();
  topics.push(newTopic);
  renderButtons();
})
renderButtons();

$(document).on("click", ".topicButton", function() {
  var topicSearch = $(this).attr("data-person");
  var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=dc6zaTOxFJmzC&limit=10");
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(gifs) {

console.log(gifs);
// $("#put-gif-here").empty();
$("#put-gif-here").html("");
for (var i = 0; i < 10; i++) {

    var gifStillURL = gifs.data[i].images.fixed_height_small_still.url;
    var gifURL = gifs.data[i].images.fixed_height_small.url;
    var newDiv = $("<div>");
    var showRating = $("<p>");
    var rating = gifs.data[i].rating;
    console.log(rating);
    showRating.text(rating);
    var newGif = $("<img>");
    newGif.addClass("gif");
    newGif.attr("src", gifStillURL);
    newGif.attr("data-animate", gifURL);
    newGif.attr("data-still", gifStillURL);
    newGif.attr("data-state", "still");
    newDiv.prepend(newGif);
    newDiv.append(showRating);
    $("#put-gif-here").append(newDiv);
}
  })
  })

$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  console.log(state)
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
  
});

