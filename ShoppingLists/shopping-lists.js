window.onload = main;

function main() {
  deleteItem();
  clickItem();
  // document.getElementById("create").onclick = create;
  // document.getElementById("add-list").onclick = storeValue;
  // document.getElementById("add-button").onclick = add;
  // document.getElementById("add-item").onclick = addItem;
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

function toggleCreateListModal() {
  const modal = document.getElementById("add-item-modal");
  console.log(modal);
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
  } else {
    modal.classList.add("active");
  }
}

// function createList() {
//   alert(
//     "Under development: Create list button will not work after pressing close"
//   );
//   document.getElementById("add-list-form").style.display = "block";
// }

// function add() {
//   document.getElementById("add-item-form").style.display = "block";
// }

// function addItem() {
//   var newListItem = document.createElement("li");

//   var foodName = document.getElementById("food-name").value;
//   var foodGroup = document.getElementById("food-group").value;

//   newListItem.append(foodName);
//   if (foodGroup === "veggies") {
//     document.getElementById("veggies").appendChild(newListItem);
//   } else if (foodGroup === "dairy") {
//     document.getElementById("dairy").appendChild(newListItem);
//   } else if (foodGroup === "fruits") {
//     document.getElementById("fruits").appendChild(newListItem);
//   } else if (foodGroup === "proteins") {
//     document.getElementById("proteins").appendChild(newListItem);
//   } else if (foodGroup === "grains") {
//     document.getElementById("grains").appendChild(newListItem);
//   } else {
//     document.getElementById("drinks").appendChild(newListItem);
//   }

//   document.getElementById("food-name").value = "";
//   document.getElementById("food-group").value = "";
//   document.getElementById("add-item-form").style.display = "none";

//   var span = document.createElement("span");
//   span.className = "close";
//   newListItem.appendChild(span);

//   var deleteItem = document.getElementsByClassName("close");
//   for (item = 0; item < deleteItem.length; item++) {
//     deleteItem[item].addEventListener("click", function () {
//       // every item with close class
//       this.parentElement.style.display = "none"; // change display to none
//     });
//   }
// }

// function storeValue() {
//   var listName = document.getElementById("list-name").value;
//   localStorage.setItem("listValue", listName);
//   document.getElementById("list-name").value = "";
//   window.location.href = "newlist.html";
// }
