fetch("data.json")
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
    if (product_type == `Weapons`) {
      for (let element of data[product_type]) {
        let div = document.createElement("div");
        div.className = `catalog_item`;
        div.innerHTML = `<img class="product_img" src="${element["imgLink"]}" alt="${element["product_name"]}" />
        <h2 class="product_name">${element["productName"]}</h2>
        <p class="product_description">${element["Description"]}</p>
        <p class="product_price">${element["priceList"]}</p>`;
        console.log(mainContainer);
        mainContainer.appendChild(div);
      }
    }
  }
}
