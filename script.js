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
