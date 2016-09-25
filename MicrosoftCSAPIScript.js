function initiateEmotionDectectionAPI() {
var blob = dataURItoBlob(imageuri);
//console.log("blob: " + blob);
    $.ajax({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
        async: false,
        beforeSend: function(xhrObj){
            // Request headers
            //xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Content-Type","application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8b410633f4c54e9ca89fbb20138254a3");
        },
        type: "POST",
        // Request body
        //data: "{'url': 'https://i.imgur.com/pbb73Gs.jpg'}",
        //data: "{'url':" + imageuri + "}"
        data: blob,
        processData: false
    })
    .done(function(data) {
        extractResponseData(data)
    })
    .fail(function() {
        console.log("error in microsoftCSAPIScript");
    });
}
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:'application/octet-stream'});

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
            jAlert('Try taking picture again', 'Alert Dialog');
            break;
    }
}
