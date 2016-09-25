var transactionAmount = 0
var imageuri = ""

//parse the dollar amount in the transaction amount textfield
function parseTextField() {
    transactionAmount = parseFloat($("#deposit").text());

    initiateEmotionDectectionAPI();
}

//update the camera status label to off
function updateCameraStatusLabelToFalse() {

}

//update the camera status label to On
function updateCameraStatusLabelToTrue() {

}

//take picture of the user
function takePicOfTheUser() {
}

function updateBalanceLabel() {
    $.ajax({
        url: "http://api.reimaginebanking.com/accounts?type=Checking&key=e2352ee557f1453da0a2eb28fbc5c5a7",
        async: true,
        beforeSend: function(xhrObj){
            // Request headers
            //xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Content-Type","application/json");
        },
        type: "GET",
        // Request body
        //data: "{'url': 'https://i.imgur.com/pbb73Gs.jpg'}",
        //data: "{'url':" + imageuri + "}"
    })
    .done(function(data) {
        var userBalance = data[0]["balance"].toFixed(2);
        $.find(".table-bordered").find("td:eq(1)").text(userBalance)
    })
    .fail(function() {
        console.log("error in updatingBalanceLabel");
    });
}
