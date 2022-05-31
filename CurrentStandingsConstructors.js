var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://ergast.com/api/f1/current/constructorStandings.json", requestOptions)
.then(response => response.text())
.then(text => {
  var downloadedDoc = JSON.parse(text)
  var myObj = downloadedDoc.MRData.StandingsTable.StandingsLists[0].ConstructorStandings

  let texter = "<table border='1'style=\"display:inline-table;\">"
  texter += "<tr><th scope=\"col\">Position</th><th scope=\"col\">Team</th><th scope=\"col\">Points</th></tr>"
  for (let x in myObj) {
    texter += "<tr><td>" + myObj[x].position + "</td><td><a href=\"" + myObj[x].Constructor.url + "\">" + myObj[x].Constructor.name + "</a></td><td>" + myObj[x].points + "</td></tr>";
  }
  texter += "</table>"

  table.innerHTML = texter
})
.catch(error => table.textContent = "HTML received corrupted data");
