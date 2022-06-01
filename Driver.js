var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
var driverId = urlParams.get("driverId")
var newUrl = "http://ergast.com/api/f1/drivers/" + driverId + ".json"

fetch(newUrl, requestOptions)
  .then(response => response.text())
  .then(text => {
    var downloadedDoc = JSON.parse(text)
    var myObj = downloadedDoc.MRData.DriverTable.Drivers[0]

    let texter = "<h1><a href=\"" + myObj.url + "\">" + myObj.givenName + " " + myObj.familyName + "</a></h1>"
    texter += "<img src=\"img/" + myObj.code + ".jpg\" style=\"object-fit: contain; width: 200px; height: 300px\"> <br>"
    texter += "<b>Date of Birth: </b>" + myObj.dateOfBirth + "<br>"
    texter += "<b>Nationality: </b>" + myObj.nationality + "<br>"
    texter += "<b>Driver number: </b>" + myObj.permanentNumber + "<br>"
    texter += "<b>Driver abbreviation: </b>" + myObj.code

    info.innerHTML = texter
  })
  .catch(error => table.textContent = "HTML received corrupted data");
