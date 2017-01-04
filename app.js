const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.getElementById("container");
const resultsarea = document.getElementById("resultsarea");

button.addEventListener("click", function() {

  // Remove previous results
  while (resultsarea.firstChild) {
    resultsarea.removeChild(resultsarea.firstChild);
  }

  // AJAX URL and query strings values
  const url = "https://en.wikipedia.org/w/api.php?callback=?";
  const data = {
    "action" : "opensearch",
    "search" : input.value,
    "format" : "json"
  }

  // AJAX Callback function
  function callback(data) {
    console.log(data);
    let h2 = document.createElement('h2');
    let searchResults = data[1];
    let searchDescriptions = data[2];
    let hrefs = data[3];

    h2.textContent = "Wikipedia Entries For " + input.value;
    resultsarea.appendChild(h2);

    // Iterate through results and display them on the screen
    for(let i = 0; i < searchResults.length; i++) {
      let entry = searchResults[i];
      let paragraph = document.createElement('p');
      paragraph.textContent = entry;
      resultsarea.appendChild(paragraph);
    }
  }

  $.getJSON(url, data, callback);
});
