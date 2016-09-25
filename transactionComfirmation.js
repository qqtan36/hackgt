var accountID = Cookies.get("accountID");
var lastConfirmedIdx = Cookies.get("lastConfirmedIdx"); //index of last confirmed transaction
var suspiciousList = Cookies.get("suspiciousList");
var APIKEY_APPEND = "?key=e2352ee557f1453da0a2eb28fbc5c5a7";
var URL_HEAD = "http://api.reimaginebanking.com/";
var accountObj;
var purchasesObj;

function GetAccount(id) {
  var builtURL = URL_HEAD + "accounts/" + id + "/customer" + APIKEY_APPEND;
  var found = -1; //0=not found, 1=found, -1=answer not yet arrived
  $.ajax({type: "GET",
        url : builtURL,
        async : false })
  .done(function(data) {
    accountObj = data;
    found = 1;
  })
  .fail(function(xhr, status, error) {
    found = 0;
  });
  return found;
}

function GetPurchases() {
  var builtURL = URL_HEAD + "accounts/" + accountID + "/purchases" + APIKEY_APPEND;
  var found = -1;
  $.ajax({type: "GET",
        url : builtURL,
        async : false })
  .done(function(data) {
    purchasesObj = data;
    found = 1;
  })
  .fail(function(xhr, status, error) {
    found = 0;
  });

  return found;
}

function CheckAccount() {
  if (typeof accountID === 'undefined') {
   while (true) {
    IDstr = prompt("Enter your account ID");
    if (IDstr == null)  //hit cancel
      break;
    if (IDstr == "")
      continue;

    var found = GetAccount(IDstr);
    if (found == 1) {
      Cookies.set("accountID", IDstr, {Path: "/", expires: 2147483647 });
      accountID = IDstr;
      return;
    }
   }
 }
}

function CancelPurchase(id) {
  //var builtURL = URL_HEAD + "purchases/" + id + APIKEY_APPEND;
  // var found = -1;
  // $.ajax({type: "PUT",
  //       url : builtURL,
  //       async : false })
  // .done(function(data) {
  //   found = 1;
  // })
  // .fail(function(xhr, status, error) {
  //   found = 0;
  // });
  //
  // return found;

  //put on suspiciousList
  suspiciousList.push(id);
  Cookies.set("suspiciousList", suspiciousList, {Path: "/", expires: 2147483647 });
}

function CheckTransactionLoop() {
  if (GetPurchases() == 1) {
    if (typeof lastConfirmedIdx === 'undefined') {
      lastConfirmedIdx = purchasesObj.length - 1;
      Cookies.set("lastConfirmedIdx", lastConfirmedIdx, {Path: "/", expires: 2147483647});
    }
    else {
      if (purchasesObj.length - 1 > lastConfirmedIdx) {
        var numDeleted = 0;
        for (var i = Number(lastConfirmedIdx) + 1; i < purchasesObj.length; i++) {
          var inSuspList = false;

          for (var ii = 0; ii < suspiciousList.length; ii++) {
            if (suspiciousList[ii] == purchasesObj[i]._id) {
              inSuspList = true;
              break;
            }
          }
          if (inSuspList == true)
            continue;

          var choseYes = confirm("Please confirm this transaction. Select <Cancel> to mark as suspicious:\nDesc.: " + purchasesObj[i].description + "\nAmount: " + purchasesObj[i].amount);
          if (choseYes == false) { //delete purchase
            CancelPurchase(purchasesObj[i]._id);
          //  numDeleted++;
          }
        }

        // if (numDeleted > 0)
        //   Cookies.set("lastConfirmedIdx", lastConfirmedIdx - numDeleted, {Path: "/", expires: 2147483647});
        lastConfirmedIdx = purchasesObj.length - 1; //have processed all remaining purchases
        Cookies.set("lastConfirmedIdx", lastConfirmedIdx, {Path: "/", expires: 2147483647});
      }
    }
    $("#lol").html("all purchases confirmed");
  }
  setTimeout(CheckTransactionLoop, 10000);
}

function transactionConfirmLoop() {
  if (typeof suspiciousList === 'undefined')
    suspiciousList = {};

  CheckAccount();
  CheckTransactionLoop();
}
