function makeADeposit() {

    //var amountToBeDeposited = transactionAmount
    var amountToBeDeposited = 2.00
    var date = new Date();
    var transactionDate = date.getFullYear() + date.getMonth() + date.getDate()
    var apiDataObject = {
        "medium": "balance",
        "transaction_date": transactionDate,
        "amount": amountToBeDeposited,
        "description": "Automated With Emotional Banking"
    }

    $.ajax({
        url: "http://api.reimaginebanking.com/accounts/57e6c723dbd835571461253f/deposits?key=e2352ee557f1453da0a2eb28fbc5c5a7",
        async: true,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
        },
        type: "POST",
        // Request body
        data: JSON.stringify(apiDataObject),
    })
    .done(function(data) {
        depositCompletionHandler(data)
    })
    .fail(function() {
        alert("error");
    });
}

function depositCompletionHandler(givenData) {
    console.log(givenData);
}
