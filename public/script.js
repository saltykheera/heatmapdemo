document.addEventListener("DOMContentLoaded", function () {
  const divs = document.querySelectorAll(".clickable");
  divs.forEach((div) => {
    div.addEventListener("click", function () {
      const divId = this.id;
      sendData(divId);
    });
  });
});

function sendData(divId) {
  fetch("/click", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ div: divId }),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
