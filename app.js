const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.getElementById("container");
const resultsarea = document.getElementById("resultsarea");

// Trigger a button click when pressing enter
input.addEventListener("keyup", function(e) {
  e.preventDefault();
  if(e.keyCode == 13) {
    button.click();
  }
});

button.addEventListener("click", function() {

  // Remove previous results after every search
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

    // Heading and unordered list reset after every search
    let h2 = document.createElement('h2');
    let ul = document.createElement('ul');

    // JSON data arrays stored in variables
    let searchResults = data[1];
    let searchDescriptions = data[2];
    let hrefs = data[3];

    // Append heading and unordered list after search is complete
    h2.textContent = "Wikipedia Entries For " + input.value;
    resultsarea.appendChild(h2);
    resultsarea.appendChild(ul);

    // Iterate through results along with their corresponding links and display them on the screen
    for(let i = 0; i < searchResults.length; i++) {
      // Create new element for every iteration
      let entry = searchResults[i];
      let li = document.createElement('li');
      let anchor = document.createElement('a');

      //Set Attributes and Text Content for each list item
      anchor.setAttribute("href", hrefs[i]);
      anchor.setAttribute("target", "_blank");
      anchor.textContent = searchResults[i];

      //Append list items
      li.appendChild(anchor);
      ul.appendChild(li);
    }
  }

  // Get JSON from Wikipedia API
  $.getJSON(url, data, callback);
});
