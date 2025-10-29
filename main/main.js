const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.querySelector(".close");

// Open modal
btn.onclick = function(e) {
  e.preventDefault();
  modal.style.display = "block";
};

// Close modal
span.onclick = function() {
  modal.style.display = "none";
};

// Close when clicking outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
