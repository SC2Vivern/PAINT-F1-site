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
    texter += "<tr><td>" + myObj[x].position + "</td><td width=200><a href=\"" + myObj[x].Constructor.url + "\">" + "<img src=\"img/" + myObj[x].Constructor.constructorId + ".jpg\" style=\"object-fit: contain; width: 30px; height: 20px; padding-right: 5px;\">" + myObj[x].Constructor.name + "</a></td><td>" + myObj[x].points + "</td></tr>";
  }
  texter += "</table>"

  table.innerHTML = texter
})
.catch(error => table.textContent = "HTML received corrupted data");
