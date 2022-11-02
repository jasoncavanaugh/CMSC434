//toggle add item modal
function toggleAddItemModal() {
  const modal = document.getElementsByClassName("add-item-modal")[0];
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
  } else {
    modal.classList.add("active");
  }
}

const form = document.getElementsByClassName("new-item-form")[0];

//add item
form.onsubmit = (event) => {
  event.preventDefault();
  const item = input.value;
  itemList.push(item);
  getItems();
  form.reset();
};


const getFoodItems(label, )
// display items
const getItems = () => {
  getExpiring();
  getDairy();
  getFruits();
  getProtein();
  getVeggies();
  elements.innerHTML = itemList
    .map(
      (item, index) => `
        <div class="item">
          <div class="content">
          <input id="edit" class="text" readonly="readonly" type="text" value= ${item}>
          </div>
          <div class="actions">
          <button class="delete" onclick="deleteItem(event, ${index})">Delete</button>
          </div>
        </div>
        `
    )
    .join("");
};
window.onload = getItems;

// delete item
const deleteItem = (event, index) => {
  itemList.splice(index, 1);
  getItems();
};
