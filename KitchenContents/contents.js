//toggle add item modal
function toggleAddItemModal() {
  const modal = document.getElementsByClassName("add-item-modal")[0];
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
  } else {
    modal.classList.add("active");
  }
}

const newItemForm = document.getElementsByClassName("new-item-form")[0];

const expiring = [];
const dairy = [];
const fruits = [];
const protein = [];
const veggies = [];
const grains = [];

//add item
newItemForm.onsubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById("new-item-name").value;
  const type = document.getElementById("food-groups-dropdown").value;
  console.log(type);
  let itemList = [];
  //this could be nicer
  switch (type) {
    case "dairy":
      itemList = dairy;
      break;
    case "fruits":
      itemList = fruits;
      break;
    case "grains":
      itemList = grains;
      break;
    case "protein":
      itemList = protein;
      break;
    case "veggies":
      itemList = veggies;
      break;
  }

  const expiration = document.getElementById("expiration-date").value;

  itemList.push({ name, expiration });
  console.log(itemList);
  displayFoodItems(`${type}-lst`, itemList);
  newItemForm.reset();
  toggleAddItemModal();
};

const displayFoodItems = (lstId, itemList) => {
  const lst = document.getElementById(lstId);

  lst.innerHTML = itemList
    .map((item, idx) => {
      return `
      <li class="food-item">
        <h3>${item.name}</h3>
        <span>Expires: ${item.expiration}</span>
      </li>
      `;
    })
    .join("");
};

// display items
const displayItems = () => {
  displayFoodItems("expiring-lst", expiring);
  displayFoodItems("dairy-lst", dairy);
  displayFoodItems("fruits-lst", fruits);
  displayFoodItems("grains-lst", grains);
  displayFoodItems("protein-lst", protein);
  displayFoodItems("veggies-lst", veggies);
};
window.onload = displayItems;

// delete item. Have to add this back in.
const deleteItem = (event, index) => {
  itemList.splice(index, 1);
  getItems();
};
