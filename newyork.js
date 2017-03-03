
//defining some variables based on NYT's API documentation
var searchTerm = "";
var searchCount = 0;
var startYear = 0;
var endYear = 0;

var articleCounter = 0;

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

function runQuery(nyURL,count){
	$.ajax({
		url: nyURL,
		method: 'GET',
	}).done(function(NTdata) {
		console.log(nyURL, NTdata);
		
		//makes a loop to go over all articles in NYT's system
		for(var i = 0; i < count; i++){

			articleCounter++;

			var article = $("<div>");
			article.attr("id", "article-id-"+articleCounter);
			$("#results-display").append(article);

			if(NTdata.response.docs[i].headline !== 'null'){
			 	$("#article-id-" + articleCounter).append("<h3> " + articleCounter + " " + NTdata.response.docs[i].headline.main +"</h3>");
			}

			if(NTdata.response.docs[i].byline && NTdata.response.docs[i].byline.original){
				$("#article-id-" + articleCounter).append("<h5> " + NTdata.response.docs[i].byline.original + "</h5>");
			}

			if(NTdata.response.docs[i].snippet){
				$("#article-id-" + articleCounter).append("<span> " + NTdata.response.docs[i].snippet + "</span>");
			}

			if(NTdata.response.docs[i].web_url){
				$("#article-id-" + articleCounter).append("<br>URL: <a href='" + NTdata.response.docs[i].web_url + "'>" + NTdata.response.docs[i].web_url + "</a>");
			}
		}
	});
}	

$("#searchBtn").on("click", function() {

	//Empty the section where results to be displayed
	$("#results-display").empty();

	//Set article count to zero
	articleCounter = 0;


	//Get user inputs from the form and assign to the variables
	searchTerm = $("#searchTerm").val().trim();

	//Append search term to the url query
	queryURL = queryURLBase + searchTerm;

	//trimming for spaces
	searchCount = $("#number").val().trim();
	startYear = $("#startYear").val().trim();
	endYear = $("#endYear").val().trim();

	//If user inputs start year then add it to the query
	if (parseInt(startYear)) {
    	queryURL = queryURL + "&begin_date=" + startYear + "0101";
  	}

  	//If user inputs end year then add it to the query
  	if (parseInt(endYear)) {
    	queryURL = queryURL + "&end_date=" + endYear + "0101";
  	}

  	//pass final url query and number of article to the function
  	runQuery(queryURL,searchCount);

});