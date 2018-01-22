// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = "";
var startYear = 0;
var endYear = 0;

const proxyurl = "https://cors-anywhere.herokuapp.com/";

var queryURLBase = "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=dbfb261c-c806-45fb-88b1-25755e6de05e";

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

function runQuery(chosenStation, queryURLBase) {

    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called martadata

    $.ajax({
            url: proxyurl + queryURLBase,
            method: "GET"
        })

        .done(function(response) {
            //form input variables 
            var martadata = response;


            // Logging the URL so we have access to it for troubleshooting
            console.log("------------------------------------");
            console.log("Full Data:");
            console.log(martadata);
            console.log("------------------------------------");


            var trainNumber = [];
            var trainDirection = [];
            var currentStation = [];
            var nextArrival = [];
            var trainLine = [];

            // parse JSON and Display in TABLE
            for (var i = 0; i < martadata.length; i++) {


                console.log(numResults + "==" + martadata[i].STATION);

                if (martadata[i].STATION == numResults || numResults == "ALL") {

                    /*
                                        //trainNumber.push(martadata[i].TRAIN_ID);
                                        console.log(martadata[i].TRAIN_ID);
                                        //trainDirection.push(martadata[i].DIRECTION);
                                        console.log(martadata[i].DIRECTION);
                                        //finalDestination.push(martadata[i].DESTINATION);
                                        console.log(martadata[i].DESTINATION);
                                        //nextArrival.push(martadata[i].NEXT_ARR);
                                        console.log(martadata[i].NEXT_ARR);
                                        //trainLine.push(martadata[i].LINE);
                                        console.log(martadata[i].LINE);
                    */


                    $('#targetbody').append($('<tr>')
                        .append($('<td>').append(i))
                        .append($('<td>').append(martadata[i].TRAIN_ID))
                        .append($('<td>').append(martadata[i].DIRECTION))
                        .append($('<td>').append(martadata[i].STATION))
                        .append($('<td>').append(martadata[i].NEXT_ARR))
                        .append($('<td>').append(martadata[i].LINE))

                    ) // <tr>


                } // IF Station === 

            }

            //console.log(allTrains);

            //  .fail(function() {
            //  alert( "Error with MARTA Ajax Call, please check your URL string" );

        }); // ; for .done & .fail




}



// METHODS
// ==========================================================

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {

    event.preventDefault();

    articleCounter = 0;

    var searchURL = queryURLBase;

    numResults = $("#num-records-select").val();

    searchTerm = document.getElementById("search-term").value.trim();
    //searchTerm = $("#search-term").val().trim();
    console.log(searchTerm);

    //$('#targetname' ).append(",   " + searchTerm) ; 
    $("h5").append(",   " + searchTerm) ; 
    $("h5").append("<br><br> Please press Clear Results to refresh your Search." ) ; 


    runQuery(numResults, queryURLBase);
});

// This button clears the top articles section
$("#clear-all").on("click", function() {
    articleCounter = 0;
    $("#well-section").empty();
    location.reload();
});