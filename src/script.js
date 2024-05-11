window.onload=function(){
// Pobierz elementy DOM
var modal = document.getElementById('modal');
var btnOpenModal = document.getElementById("openModal");
var spanCloseModal = document.getElementsByClassName("close")[0];
modal.style.display = "none";
// Po kliknięciu przycisku otwierającego modal, pokaż modal
btnOpenModal.onclick = function() {
  modal.style.display = "block";
}

// Po kliknięciu na przycisk zamykający modal, ukryj modal
spanCloseModal.onclick = function() {
  modal.style.display = "none";
}

// Po kliknięciu w obszar poza modalem, ukryj modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}