
// ================== DROPDOWN NGƯỜI DÙNG ==================
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const menu = document.querySelector(".user-menu");

  if (!dropdown || !menu) return;

  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    menu.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      menu.classList.remove("active");
    }
  });
});