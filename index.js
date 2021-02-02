var key = "keyhDRuD4wmfBz81S";
var canCome = true;
var allValidCodes;

document.onload = loadFunctions();

async function loadFunctions() {
  allValidCodes = await getTableAsArray("AccessCodes");
}

function registerGuests() {
  var canComeString = "";
  if (canCome) {
    canComeString = "Yes";
  } else {
    canComeString = "No";
  }

  var guestNames = [];
  var guestCodes = getAllInputCodes();
  guestCodes.forEach((guestCodeElement) => {
    var guestlistID;
    allValidCodes.forEach((validCodeElement) => {
      if (guestCodeElement == validCodeElement.Value) {
        guestlistID = validCodeElement.Guestlist[0];
        guestNames.push(validCodeElement.Name[0]);
      }
    });
    registerInputCode(canComeString, guestlistID);
  });

  var alertString = "";
  if (canCome) {
    alertString = "Du har svart at følgende gjester KAN komme: ";
  } else {
    alertString = "Du har svart at følgende gjester IKKE kan komme: ";
  }
  guestNames.forEach(element => {
    alertString += element;
    alertString += ", ";
  });
  
  alert(alertString);
}

function registerInputCode(canComeString, guestID) {
  const url =
    "https://api.airtable.com/v0/appqnI6pIFXvSmsEX/Guestlist/" + guestID;
  const request = {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        CanCome: [canComeString],
      },
    }),
  };
  fetch(url, request);
}

function canComeClicked() {
  canCome = true;
  registerGuests();
}

function canNotComeClicked() {
  canCome = false;
  registerGuests();
}

function getAllInputCodes() {
  var allCodes = [];
  var code = $(".guestCode1").val();
  if (code != "") {
    allCodes.push(code);
  }
  var code = $(".guestCode2").val();
  if (code != "") {
    allCodes.push(code);
  }
  var code = $(".guestCode3").val();
  if (code != "") {
    allCodes.push(code);
  }
  var code = $(".guestCode4").val();
  if (code != "") {
    allCodes.push(code);
  }
  return allCodes;
}

async function getTableAsArray(tableName) {
  var requestResult;
  var dataArray = [];
  const url = "https://api.airtable.com/v0/appqnI6pIFXvSmsEX/" + tableName;
  const request = {
    headers: {
      Authorization: "Bearer " + key,
    },
  };
  await fetch(url, request)
    .then((resp) => resp.json())
    .then((data) => (requestResult = data));
  requestResult.records.forEach((element) => {
    dataArray.push(element.fields);
  });
  return dataArray;
}
