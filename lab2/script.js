"use strict";

// Obiekty przechowujące listy
const lists = {
    "mało-pilne": document.getElementById("list-malo-pilne"),
    "pilne": document.getElementById("list-pilne"),
    "na-wczoraj": document.getElementById("list-na-wczoraj")
};

// Stos do przechowywania usuniętych elementów
const deletedItemsStack = [];

// Funkcja dodawania wpisu do wybranej listy
const add = () => {
    const text = document.getElementById("text");
    const listSelect = document.getElementById("list-select");
    const selectedListId = listSelect.value;
    const selectedList = lists[selectedListId];

    if (text.value === "") {
        console.log("Pole jest puste");

        const modal = document.getElementById("my-modal");
        modal.setAttribute("open", "true"); 

        return;
    }

    const listItem = document.createElement("li");
    listItem.innerText = `${text.value}`;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    listItem.appendChild(deleteButton); 

    listItem.addEventListener("click", () => {
        listItem.classList.toggle("zrobione");
        if (listItem.classList.contains("zrobione")) {
            const currentDate = new Date();
            const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
            const dateSpan = document.createElement("span");
            dateSpan.innerText = ` - Zrobione: ${formattedDate}`;
            listItem.appendChild(dateSpan);
        } else {
            const dateSpan = listItem.querySelector("span");
            if (dateSpan) {
                dateSpan.remove(); 
            }
        }
    });

    
    deleteButton.addEventListener("click", () => {
        const taskText = listItem.innerText.trim();
        document.getElementById("deleteTaskText").innerText = taskText;
        const deleteModal = document.getElementById('modal_usun');
        deleteModal.setAttribute("open", "true"); 
    });

    selectedList.append(listItem);
}

// Funkcja usuwania elementu
const deleteItem = () => {
  const listItem = document.querySelector("li.zrobione");
  if (listItem && listItem.parentNode) {
      const parent = listItem.parentNode;
      deletedItemsStack.push({ item: listItem, parent: parent }); 
      listItem.remove();
  }
}

// Funkcja cofania ostatniego usunięcia
const undoDelete = () => {
  if (deletedItemsStack.length > 0) {
      const { item, parent } = deletedItemsStack.pop(); 
      parent.appendChild(item); 
  }
}
const updateList = () => {
  const searchInput = document.getElementById("search-input").value.trim();
  const caseInsensitive = document.getElementById("case-insensitive-checkbox").checked;

  for (const key in lists) {
      const list = lists[key];
      const listItems = list.getElementsByTagName("li");

      for (const listItem of listItems) {
          const text = listItem.innerText.trim();
          const searchValue = caseInsensitive ? searchInput.toLowerCase() : searchInput;

          if (caseInsensitive) {
              if (text.toLowerCase().includes(searchValue)) {
                  listItem.style.display = "";
              } else {
                  listItem.style.display = "none";
              }
          } else {
              if (text.includes(searchValue)) {
                  listItem.style.display = "";
              } else {
                  listItem.style.display = "none";
              }
          }
      }
  }
}

// Nasłuchuj zmian w polu wyszukiwania i przełączniku
document.getElementById("search-input").addEventListener("input", updateList);
document.getElementById("case-insensitive-checkbox").addEventListener("change", updateList);
window.onload = () => {
    const closingButton = document.getElementById("closing");
    closingButton.addEventListener("click", () => {
        const modal = document.getElementById("my-modal");
        modal.removeAttribute("open"); 
    });

    const modalUsunTakButton = document.getElementById("tak");
    modalUsunTakButton.addEventListener("click", () => {
        deleteItem(); 
        const deleteModal = document.getElementById('modal_usun');
        deleteModal.removeAttribute("open"); 
    });

    const modalUsunNieButton = document.getElementById("nie");
    modalUsunNieButton.addEventListener("click", () => {
        const deleteModal = document.getElementById('modal_usun');
        deleteModal.removeAttribute("open"); 
    });

    const undoButton = document.getElementById("undo-button");
    undoButton.addEventListener("click", () => {
        undoDelete();
    });
}
