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
    if (product_type == `Vehicles`) {
      for (let element of data[product_type]) {
        if (
          !(
            localStorage.getItem(`Land`) == `true` ||
            localStorage.getItem(`Air`) == `true` ||
            localStorage.getItem(`Sea`) == `true`
          )
        ) {
          let div = document.createElement("div");
          div.className = `catalog_item`;
          div.innerHTML = `<img class="product_img" src="${element["imgLink"]}" alt="${element["product_name"]}" />
        <h2 class="product_name">${element["productName"]}</h2>
        <p class="product_description">${element["Description"]}</p>
        <p class="product_price">$${element["priceList"]}</p>`;

          mainContainer.appendChild(div);
        }
        if (
          localStorage.getItem(`Land`) == `true` &&
          element["category"] == `Land`
        ) {
          let div = document.createElement("div");
          div.className = `catalog_item`;
          div.innerHTML = `<img class="product_img" src="${element["imgLink"]}" alt="${element["product_name"]}" />
        <h2 class="product_name">${element["productName"]}</h2>
        <p class="product_description">${element["Description"]}</p>
        <p class="product_price">$${element["priceList"]}</p>`;

          mainContainer.appendChild(div);
        }
        if (
          localStorage.getItem(`Air`) == `true` &&
          element["category"] == `Air`
        ) {
          let div = document.createElement("div");
          div.className = `catalog_item`;
          div.innerHTML = `<img class="product_img" src="${element["imgLink"]}" alt="${element["product_name"]}" />
        <h2 class="product_name">${element["productName"]}</h2>
        <p class="product_description">${element["Description"]}</p>
        <p class="product_price">$${element["priceList"]}</p>`;

          mainContainer.appendChild(div);
        }

        if (
          localStorage.getItem(`Sea`) == `true` &&
          element["category"] == `Sea`
        ) {
          let div = document.createElement("div");
          div.className = `catalog_item`;
          div.innerHTML = `<img class="product_img" src="${element["imgLink"]}" alt="${element["product_name"]}" />
        <h2 class="product_name">${element["productName"]}</h2>
        <p class="product_description">${element["Description"]}</p>
        <p class="product_price">$${element["priceList"]}</p>`;
          mainContainer.appendChild(div);
        }
        if (
          element["id"] == data[product_type].length &&
          localStorage.getItem(`Land`)
        ) {
          localStorage.removeItem(`Land`);
        }
        if (
          element["id"] == data[product_type].length &&
          localStorage.getItem(`Air`)
        ) {
          localStorage.removeItem(`Air`);
        }
        if (
          element["id"] == data[product_type].length &&
          localStorage.getItem(`Sea`)
        ) {
          localStorage.removeItem(`Sea`);
        }
      }
    }
  }
}
function storeSmtn() {
  let landTrue = document.getElementById("land_selector");
  let airTrue = document.getElementById("air_selector");
  let seaTrue = document.getElementById("sea_selector");
  localStorage.setItem(`Land`, landTrue.checked);
  localStorage.setItem(`Air`, airTrue.checked);
  localStorage.setItem(`Sea`, seaTrue.checked);
}
