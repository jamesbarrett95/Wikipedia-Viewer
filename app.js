const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", function() {

  const url = "https://en.wikipedia.org/w/api.php?callback=?";
  const data = {
    "action" : "query",
    "titles" : input.value,
    "prop" : "revisions",
    "rvprop" : "content",
    "format" : "json",
  }

  function callback(data) {
    console.log(data);
  }

  $.getJSON(url, data, callback);
});
