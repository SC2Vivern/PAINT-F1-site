var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
var round = parseInt(urlParams.get("round"), 10)
var newUrl = "http://ergast.com/api/f1/2022/" + round + "/results.json"

fetch(newUrl, requestOptions)
.then(response => response.text())
.then(text => {
  var downloadedDoc = JSON.parse(text)
  var myObj = downloadedDoc.MRData.RaceTable.Races[0].Results
  var title = downloadedDoc.MRData.RaceTable.Races[0].raceName

  let texter = "<h1>" + title + "</h1>"
  texter += "<table border='1'style=\"display:inline-table;\">"
  texter += "<tr><th scope=\"col\">Position</th><th scope=\"col\">Team</th><th scope=\"col\">Driver</th><th scope=\"col\">Status</th><th scope=\"col\">Points</th></tr>"
  for (let x in myObj) {
    texter += "<tr><td>" + myObj[x].position + "</td><td width=200><a href=\"" + myObj[x].Constructor.url + "\">" + "<img src=\"img/" + myObj[x].Constructor.constructorId + ".jpg\" style=\"object-fit: contain; width: 30px; height: 20px; padding-right: 5px;\">" + myObj[x].Constructor.name + "</a></td><td>" + "<a href=\"Driver.html?driverId="+ myObj[x].Driver.driverId +"\">" + myObj[x].Driver.familyName + "</a></td><td>" + myObj[x].status + "</td><td>" + myObj[x].points + "</td></tr>";
  }
  texter += "</table>"

  table.innerHTML = texter
})
.catch(error => table.textContent = "HTML received corrupted data");
