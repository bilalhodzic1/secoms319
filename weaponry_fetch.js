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
        if (
          !(
            localStorage.getItem(`firearm`) == `true` ||
            localStorage.getItem(`melee`) == `true` ||
            localStorage.getItem(`explosive`) == `true`
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
          localStorage.getItem(`firearm`) == `true` &&
          element["category"] == `Firearm`
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
          localStorage.getItem(`melee`) == `true` &&
          element["category"] == `Close Combat`
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
          localStorage.getItem(`explosive`) == `true` &&
          element["category"] == `Explosives`
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
          localStorage.getItem(`firearm`)
        ) {
          localStorage.removeItem(`firearm`);
        }
        if (
          element["id"] == data[product_type].length &&
          localStorage.getItem(`melee`)
        ) {
          localStorage.removeItem(`melee`);
        }
        if (
          element["id"] == data[product_type].length &&
          localStorage.getItem(`explosive`)
        ) {
          localStorage.removeItem(`explosive`);
        }
      }
    }
  }
}
function storeSmtn() {
  let firearmTrue = document.getElementById("firearm_selector");
  let meleeTrue = document.getElementById("close_combat_selector");
  let explosiveTrue = document.getElementById("explosive_selector");
  localStorage.setItem(`firearm`, firearmTrue.checked);
  localStorage.setItem(`melee`, meleeTrue.checked);
  localStorage.setItem(`explosive`, explosiveTrue.checked);
}
