var resultArrayForWithdraws = []
var resultArrayForPurchases = []
var resultArrayForTransfers = []
var resultArrayForDeposits = []

function AccountActivities() {

    $.ajax({
        url: "http://api.reimaginebanking.com/accounts/57e6c723dbd835571461253f/withdrawals?key=e2352ee557f1453da0a2eb28fbc5c5a7",
        async: true,
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type","application/json");
        },
        type: "GET"
    })
    .done(function(data) {
        for (var i = 0; i < 5; i++) {
            var tempArray = [];
            tempArray.push(data[i]["transaction_date"]);
            tempArray.push(data[i]["amount"].toFixed(2));
            resultArrayForWithdraws.push(tempArray)
        }
        //console.log(resultArray)
    })
    .fail(function() {
        console.log("error retrieving withdrawals")
    });

    $.ajax({
        url: "http://api.reimaginebanking.com/accounts/57e6c723dbd835571461253f/transfers?key=e2352ee557f1453da0a2eb28fbc5c5a7",
        async: true,
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type","application/json");
        },
        type: "GET"
    })
    .done(function(data) {
        for (var i = 0; i < 5; i++) {
            var tempArray = [];
            tempArray.push(data[i]["transaction_date"]);
            tempArray.push(data[i]["amount"].toFixed(2));
            resultArrayForTransfers.push(tempArray)
        }
        //console.log(resultArray)
    })
    .fail(function() {
        console.log("error retrieving transfers")
    });

    $.ajax({
        url: "http://api.reimaginebanking.com/accounts/57e6c723dbd835571461253f/deposits?key=e2352ee557f1453da0a2eb28fbc5c5a7",
        async: true,
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type","application/json");
        },
        type: "GET"
    })
    .done(function(data) {
        for (var i = 0; i < 5; i++) {
            var tempArray = [];
            tempArray.push(data[i]["transaction_date"]);
            tempArray.push(data[i]["amount"].toFixed(2));
            resultArrayForDeposits.push(tempArray)
        }
        //console.log(resultArray)
    })
    .fail(function() {
        console.log("error retrieving transfers")
    });

    $.ajax({
        url: "http://api.reimaginebanking.com/accounts/57e6c723dbd835571461253f/purchases?key=e2352ee557f1453da0a2eb28fbc5c5a7",
        async: true,
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type","application/json");
        },
        type: "GET"
    })
    .done(function(data) {
        for (var i = 0; i < ; i++) {
            var tempArray = [];
            tempArray.push(data[i]["transaction_date"]);
            tempArray.push(data[i]["amount"].toFixed(2));
            resultArrayForPurchases.push(tempArray)
        }
        //console.log(resultArray)
    })
    .fail(function() {
        console.log("error retrieving purchases")
    });

}
