var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://ergast.com/api/f1/current.json", requestOptions)
.then(response => response.text())
.then(text => {
  var downloadedDoc = JSON.parse(text)
  var myObj = downloadedDoc.MRData.RaceTable.Races
  var currentDate = new Date
  var nextRace = true

  let texter = "<table border='1'style=\"display:inline-table;\">"
  texter += "<tr><th scope=\"col\">Date</th><th scope=\"col\">Race</th></tr>"
  for (let x in myObj) {
    var myDate = myObj[x].date
    var round = myObj[x].round
    var dateArray = myDate.split("-")
    var raceDate = new Date(dateArray[0], dateArray[1]-1, dateArray[2])
    if (raceDate < currentDate){
      texter += "<tr style=\"background-color:#FF8C00\"><td>" + myDate + "</td><td>" + "<a href=\"RaceResults.html?round="+ round +"\">" + myObj[x].raceName + "</a></td></tr>";
  } else {
    if (nextRace){
    texter += "<tr style=\"background-color:#ADFF2F\"><td>" + myDate + "</td><td>" + myObj[x].raceName + "</td></tr>";
    nextRace = false
  } else {
    texter += "<tr><td>" + myDate + "</td><td>" + myObj[x].raceName + "</td></tr>";
  }
}
  }
  texter += "</table>"

  table.innerHTML = texter
})
.catch(error => table.textContent = "HTML received corrupted data");
