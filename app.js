
const button = document.getElementsByTagName("button");
const searchButton = document.getElementById("searchButton");
const randomButton = document.getElementById("randomButton")
const input = document.querySelector("input");
const container = document.getElementById("container");
const resultsarea = document.getElementById("resultsarea");

// Trigger a button click when pressing enter
input.addEventListener("keyup", function(e) {
  e.preventDefault();
  if(e.keyCode == 13) {
    searchButton.click();
  }
});

randomButton.addEventListener("click", function() {
  const randomWikiArticle = "https://en.wikipedia.org/wiki/Special:Random";
  window.open(randomWikiArticle);
});

searchButton.addEventListener("click", function() {
  const ul = document.createElement('ul');
  const h2 = document.createElement('h2');

  function determineButtonState(searchButton) {
    const buttonText = searchButton.textContent;
    if(buttonText == "Search") {
      searchButton.setAttribute("disabled", "disabled");
      searchButton.textContent = "Loading...";
    } else {
      searchButton.removeAttribute("disabled");
      searchButton.textContent = "Search";
    }
  }

  function getRandomBackgroundColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    document.body.style.backgroundColor = color;
  }

  determineButtonState(searchButton);
  getRandomBackgroundColor();

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

    function filterString(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function showErrorMessage() {
      if(input.value === "") {
        h2.textContent = "Please enter a search term before submitting!";
        resultsarea.appendChild(h2);
      } else {
        h2.textContent = "There are no wikipedia entries for " + filterString(input.value) + "!";
        resultsarea.appendChild(h2);
      }
    }

    function createListElement(wikiEntry, wikiLink) {
      let li = document.createElement('li');
      let anchor = document.createElement('a');

      //Set Attributes and Text Content for each list item
      anchor.setAttribute("href", wikiLink);
      anchor.setAttribute("target", "_blank");
      anchor.textContent = wikiEntry;

      //Append list items
      li.appendChild(anchor);
      ul.appendChild(li);
    }

    determineButtonState(searchButton);

    if(input.value !== "") {
      if(data[1].length < 1) {
        showErrorMessage();
      } else {
        // JSON data arrays stored in variables
        let searchResults = data[1];
        let searchDescriptions = data[2];
        let correspondingLinks = data[3];

        // Append heading and unordered list after search is complete
        h2.textContent = "Wikipedia Entries For " + "''" + filterString(input.value) + "''";
        resultsarea.appendChild(h2);
        resultsarea.appendChild(ul);

        // Iterate through results along with their corresponding links and display them on the screen
        for(let i = 0; i < searchResults.length; i++) {
          // Create new element for every iteration
          let wikiEntry = searchResults[i];
          let wikiLink = correspondingLinks[i];
          createListElement(wikiEntry, wikiLink);
        }
      }
    } else {
      showErrorMessage();
    }
  }

  // Get JSON from Wikipedia API
  $.getJSON(url, data, callback)
});
