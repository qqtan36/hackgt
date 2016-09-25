var transactionAmount = 0
var imageuri = ""

//parse the dollar amount in the transaction amount textfield
function parseTextField() {
    transactionAmount = parseFloat($("#deposit").text());
    transactionAmount = document.getElementById('#deposit').value

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
    console.log("updating userBalance")
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
        $(document).find(".table-bordered").find("#balance").text("$"+userBalance);
    })
    .fail(function() {
        console.log("error in updatingBalanceLabel");
    });
}

function repeatLabelUpdating() {
    setInterval(updateBalanceLabel, 6000)
}
$(document).ready(repeatLabelUpdating)
