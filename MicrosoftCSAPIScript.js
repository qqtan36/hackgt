function initiateEmotionDectectionAPI() {
    $.ajax({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
        async: true,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8b410633f4c54e9ca89fbb20138254a3");
        },
        type: "POST",
        // Request body
        data: "{'url': 'https://i.imgur.com/pbb73Gs.jpg'}",
    })
    .done(function(data) {
        extractResponseData(data)
    })
    .fail(function() {
        alert("error");
    });
}

function extractResponseData(unparsedResponseJson) {
    var extractedData = unparsedResponseJson[0]["scores"];
    var resultArray = [];

    for(key in extractedData) {
        if (extractedData.hasOwnProperty(key)) {
            resultArray.push(extractedData[key])
        }
    }

    findHighestRatingAndCallMethod(resultArray)
}

function findHighestRatingAndCallMethod(givenArrayOfRatings) {
    var highestRating = givenArrayOfRatings[0]
    for(rating in givenArrayOfRatings) {
        if(givenArrayOfRatings[rating] > highestRating) {
            highestRating = givenArrayOfRatings[rating]
        }
    }

    switch (givenArrayOfRatings.indexOf(highestRating)) {
        case 0:
            console.log("anger detected")
            //call anger here
            break;
        case 4:
            console.log("happiness detected")
            makeADeposit()
            break;
        case 5:
            console.log("neutral detected")
            break;
        case 6:
            console.log("sadess detected")
            payBillAPI()
            //call sadness here
            break;
        default:
            console.log("non default facing expression detected")
            //call non default here
            break;
    }
}

//$(document).ready(initiateEmotionDectectionAPI())
