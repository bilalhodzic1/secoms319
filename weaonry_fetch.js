fetch(".data.json")
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
  let mainContainer = document.getElementById("main_catalog");
  for (let product_type in data) {
    let div = document.createElement("div");
    div.innerHTML = ``;
    mainContainer.appendChild(div);
    let mainContainer2 = document.getElementById("myProduct");
    for (let element of data[productName]) {
      console.log(element);
      let div2 = document.createElement("div");
      div2.innerHTML = `${element["productId"]} : ${element["shortDescription"]} <br>`;
      mainContainer.appendChild(div2);
    }
  }
}
