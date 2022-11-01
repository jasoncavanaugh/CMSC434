const form = document.querySelector("#form");
const input = document.querySelector("#input");
const elements = document.querySelector("#items");
let itemList = [];

//add item
form.onsubmit = async (event) => {
    event.preventDefault();
    const item = input.value;
    await itemList.push(item);
    await getItems();
    form.reset();
};

// display items
const getItems = async () => {
    elements.innerHTML = await itemList
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
        `).join("");
};
window.onload = getItems;

// delete item
const deleteItem = async (event, index) => {
    await itemList.splice(index, 1);
    await getItems();
};