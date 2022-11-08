window.onload = main;

function main() {
  deleteItem();
  clickItem();
}

function deleteItem() {
    var deleteItem = document.getElementsByClassName("close");
    for (var item = 0; item < deleteItem.length; item++) {
      deleteItem[item].addEventListener("click", function () {
        // every item with close class
        this.parentElement.style.display = "none"; // change display to none
      });
    }
}
  
function clickItem() {
    var lists = document.querySelectorAll("ul");
    lists.forEach((list) => {
      list.addEventListener(
        "click",
        function (entry) {
          if (entry.target.tagName === "LI") {
            // if a list item
            if (entry.target.classList.contains("checked")) {
              entry.target.classList.remove("checked"); // add class of checked
            } else {
              entry.target.classList.add("checked"); // add class of checked
            }
          }
        },
        false
      );
    });
}

function toggleAddItemModal() {
    const modal = document.getElementById("add-item-modal");
    if (modal.classList.contains("active")) {
      modal.classList.remove("active");
    } else {
      modal.classList.add("active");
    }
}

function addItem() {
    var newListItem = document.createElement("li");

    var foodName = document.getElementById("food-name").value;
    var foodGroup = document.getElementById("food-group").value;
    if (foodGroup === "" || foodName === "") {
        return;
    }

    newListItem.append(foodName);
    if (foodGroup === "veggies") {
        document.getElementById("veggies").appendChild(newListItem);
    } else if (foodGroup === "dairy") {
        document.getElementById("dairy").appendChild(newListItem);
    } else if (foodGroup === "fruits") {
        document.getElementById("fruits").appendChild(newListItem);
    } else if (foodGroup === "proteins") {
        document.getElementById("proteins").appendChild(newListItem);
    } else if (foodGroup === "grains") {
        document.getElementById("grains").appendChild(newListItem);
    } else {
        document.getElementById("drinks").appendChild(newListItem);
    }

    toggleAddItemModal();
    document.getElementById("food-name").value = "";
    document.getElementById("food-group").value = "";

    var span = document.createElement("span"); 
    span.className = "close";
    newListItem.appendChild(span); 
    
    var deleteItem = document.getElementsByClassName("close");
    for (item = 0; item < deleteItem.length; item++) {
        deleteItem[item].addEventListener("click", function() { // every item with close class
            this.parentElement.style.display = "none"; // change display to none
        });
    }
}

function voiceInput() {
    alert("Under development!");
}