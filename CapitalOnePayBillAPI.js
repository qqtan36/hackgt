function payBillAPI() {

    var amountToBePaid = transactionAmount
    var date = new Date();
    var transactionDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    var apiDataObject = {
        "medium": "balance",
        "payee_id": "57e6e88fdbd835571461257d",
        "transaction_date": transactionDate,
        "amount": transactionAmount,
        "description": "Automated With Emotional Banking"
    }

    $.ajax({
        url: "http://api.reimaginebanking.com/accounts/57e6c723dbd835571461253f/transfers?key=e2352ee557f1453da0a2eb28fbc5c5a7",
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
    window.alert("Transaction is successful")
}
