const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.querySelector(".close");

btn.onclick = function(e) {
  e.preventDefault(); // prevent default link behavior
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// Optional: click outside the modal to close
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
