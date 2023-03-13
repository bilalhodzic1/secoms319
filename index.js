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
  let mainContainer = document.getElementById("featured_item");
  for (let product_type in data) {
    for (let element of data[product_type]) {
      if (element["featured"] == true) {
        let div = document.createElement("div");
        div.className = `featured_item`;
        div.innerHTML = `<img class="featured_img" src="${element["imgLink"]}" alt="${element["product_name"]}" />
        <h2 class="featured_name">${element["productName"]}</h2>
        <p class="featured_description">${element["Description"]}</p>
        <p class="featured_price">$${element["priceList"]}</p>`;
        mainContainer.appendChild(div);
      }
    }
  }
}
