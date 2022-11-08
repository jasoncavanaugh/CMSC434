//toggle add item modal
function toggleAddItemModal() {
  console.log("Add item modal");
  const keyboard = document.getElementsByClassName("keyboard-img")[0];
  const modal = document.getElementById("add-item-modal");
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
    keyboard.classList.remove("active");
  } else {
    keyboard.classList.add("active");
    modal.classList.add("active");
  }
}

//toggle edit item modal
function toggleEditItemModal() {
  console.log("Edit item modal");
  const modal = document.getElementById("edit-item-modal");
  const keyboard = document.getElementsByClassName("keyboard-img")[0];
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
    keyboard.classList.remove("active");
  } else {
    modal.classList.add("active");
    keyboard.classList.add("active");
  }
}

const lstIdToItemList = {
  "expiring-lst": JSON.parse(localStorage.getItem("expiring-lst")) || [],
  "dairy-lst": JSON.parse(localStorage.getItem("dairy-lst")) || [],
  "fruits-lst": JSON.parse(localStorage.getItem("fruits-lst")) || [],
  "protein-lst": JSON.parse(localStorage.getItem("protein-lst")) || [],
  "veggies-lst": JSON.parse(localStorage.getItem("veggies-lst")) || [],
  "grains-lst": JSON.parse(localStorage.getItem("grains-lst")) || [],
};

const newItemForm = document.getElementById("new-item-form");

//Submit add item form
newItemForm.onsubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById("new-item-name").value;
  const type = document.getElementById("new-food-groups-dropdown").value;
  const expirationStr = document.getElementById("new-expiration-date").value;
  console.log("Here");
  console.log(name);
  if (name === "" || type === "" || expirationStr === "") {
    console.log("Here");
    alert("Please fill out name, food group, and expiration date.");
    return;
  }
  const expiration = getExpirationDate(expirationStr);
  let location = document.getElementById("location").value;
  if (location === "") location = "None";
  addItem(name, type, expiration, location);
  newItemForm.reset();
  toggleAddItemModal();
};

function getExpirationDate(dateString) {
  const dateArr = dateString.split("-");
  const expiration = new Date(
    parseInt(dateArr[0], 10),
    parseInt(dateArr[1], 10) - 1,
    parseInt(dateArr[2], 10)
  );
  return expiration;
}
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  console.log(utc1);
  console.log(utc2);

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function addItem(name, type, expiration, location) {
  console.log("Name Is: " + name);
  console.log("Location Is: " + location);
  const now = new Date();
  const diff = dateDiffInDays(now, expiration);
  let idOfListToRerender = diff <= 3 ? "expiring-lst" : `${type}-lst`;

  const itemList = lstIdToItemList[idOfListToRerender];
  itemList.push({
    name,
    expiration: expiration.toISOString().substring(0, 10),
    type: type,
    location,
  });

  displayFoodItems(idOfListToRerender, itemList);
}

const displayFoodItems = (lstId) => {
  const domList = document.getElementById(lstId);
  const itemList = lstIdToItemList[lstId];
  console.log(lstIdToItemList);
  console.log(itemList);

  // itemList.sort((a, b) => (a.name < b.name ? -1 : 1));

  domList.innerHTML = itemList
    .map((item, idx) => {
      return `
      <li class="food-item">
        <h3 class="name">${item.name}</h3>
        <div class="right">
          <div class="delete-edit-wrapper">
            <i class="material-icons edit-btn" onclick="onClickEditItem('${lstId}', ${idx})">edit</i>
            <i class="material-icons delete-btn" onclick="deleteItem('${lstId}',${idx})">close</i>
          </div>
          <span class="expiration">Expires: ${item.expiration}</span>
          <span class="expiration">Location: ${item.location}</span>
        </div>
      </li>
      `;
    })
    .join("");
  localStorage.setItem(lstId, JSON.stringify(itemList));
};

// display items
const displayItems = () => {
  displayFoodItems("expiring-lst");
  displayFoodItems("dairy-lst");
  displayFoodItems("fruits-lst");
  displayFoodItems("grains-lst");
  displayFoodItems("protein-lst");
  displayFoodItems("veggies-lst");
};
window.onload = displayItems;

const deleteItem = (lstId, index) => {
  lstIdToItemList[lstId].splice(index, 1);
  displayFoodItems(lstId);
};

const onClickEditItem = (lstId, index) => {
  const item = lstIdToItemList[lstId][index];
  toggleEditItemModal();
  document.getElementById("edit-item-name").value = item.name;
  const type = item.type;
  document.getElementById("edit-food-groups-dropdown").value = type; // const expiration = getExpirationDate(
  document.getElementById("edit-expiration-date").value = item.expiration;
  document.getElementById("edit-location").value = item.location;

  const editItemForm = document.getElementById("edit-item-form");
  editItemForm.onsubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("edit-item-name").value;
    const type = document.getElementById("edit-food-groups-dropdown").value;
    const expiration = getExpirationDate(
      document.getElementById("edit-expiration-date").value
    );
    const location = document.getElementById("edit-location").value;
    const newListId = `${type}-lst`;
    if (
      lstId !== newListId ||
      name !== item.name ||
      expiration.toISOString().substring(0, 10) !== item.expiration ||
      location !== item.location
    ) {
      let switchLists = false;
      if (
        lstId !== newListId ||
        (dateDiffInDays(new Date(), expiration) <= 1 &&
          dateDiffInDays(new Date(), new Date(item.expiration)) > 1) ||
        (dateDiffInDays(new Date(), expiration) >= 1 &&
          dateDiffInDays(new Date(), new Date(item.expiration)) < 1)
      ) {
        console.log("Here");
        lstIdToItemList[lstId].splice(index, 1);
        switchLists = true;
        displayFoodItems(lstId);
      }
      editItem(newListId, name, expiration, location, index, switchLists, type);
    }
    toggleEditItemModal();
  };
};

const editItem = (
  newListId,
  name,
  expiration,
  location,
  index,
  switchLists,
  type
) => {
  const now = new Date();
  const diff = dateDiffInDays(now, expiration);
  let idOfListToRerender = diff <= 1 ? "expiring-lst" : newListId;
  if (switchLists) {
    lstIdToItemList[idOfListToRerender].push({
      name,
      expiration: expiration.toISOString().substring(0, 10),
      type: type,
      location,
    });
  } else {
    lstIdToItemList[idOfListToRerender][index] = {
      name,
      expiration: expiration.toISOString().substring(0, 10),
      type: type,
      location,
    };
  }
  displayFoodItems(idOfListToRerender);
};
