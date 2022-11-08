var users = ['Darwin Ma','Jason Cavanaugh', 'Amoni Hawkins', 'Richard Bui'];
function toggleAddItemModal() {
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

  function toggleRemoveItemModal() {
    const keyboard = document.getElementsByClassName("keyboard-img")[0];
    const modal = document.getElementById("remove-item-modal");
    if (modal.classList.contains("active")) {
      modal.classList.remove("active");
      keyboard.classList.remove("active");
    } else {
      keyboard.classList.add("active");
      modal.classList.add("active");
    }
  }

  const newItemForm = document.getElementById("new-item-form");

  newItemForm.onsubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("new-item-name").value;
    users.push(name);
    var list = document.getElementById('users_total');
    document.getElementById("users_total").innerHTML = "";
    for (let i = 0; i < users.length; i++) {

        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(users[i]));
        list.appendChild(entry);

    }
    newItemForm.reset();
    toggleAddItemModal();
  };

  const removeItemForm = document.getElementById("remove-item-form");
  removeItemForm.onsubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("remove-item-name").value;
    var list = document.getElementById('users_total');
    document.getElementById("users_total").innerHTML = "";
    var counter = 0;
    var bool = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i] == name) {

            counter = i;
            bool = true;
            break;

        }

    }
    if (bool == true) {


        for (let i = counter; i < users.length - 1; i++) {

            users[i] = users[i + 1];
    
        }

        users[users.length - 1] = null;
        users.pop();

    }
    for (let i = 0; i < users.length; i++) {

        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(users[i]));
        list.appendChild(entry);

    }
    removeItemForm.reset();
    toggleAddItemModal();
  };


  const displayItems = () => {
    var list = document.getElementById('users_total');
    for (let i = 0; i < users.length; i++) {

        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(users[i]));
        list.appendChild(entry);

    }
    
  };
  window.onload = displayItems;


  
