fetch("./data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error:" + err);
  });
function appendData(data) {
  let mainContainer = document.getElementById("myData");
  for (let product_type in data) {
    for (let element of data[product_type]) {
      if (element[""] == `Ceiling Fan`) {
        if (element["size"] == `65 inches`) {
          let div2 = document.createElement("div");
          div2.innerHTML = `${element["productId"]} : ${element["shortDescription"]} <br>`;
          mainContainer.appendChild(div2);
        }
      }
    }
  } // end of for
}
