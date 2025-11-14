
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



//tìm kiếm//
const header = document.querySelector(".header");
const miniHeader = document.querySelector(".mini-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    // Khi cuộn xuống dưới 100px
    header.classList.add("hide");
    miniHeader.classList.add("show");
  } else {
    // Khi ở đầu trang
    header.classList.remove("hide");
    miniHeader.classList.remove("show");
  }
});
function setupSearchBox(inputId, btnId) {
  const searchInput = document.getElementById(inputId);
  const searchBtn = document.getElementById(btnId);
  const searchBox = searchBtn.closest(".search-box");

  if (!searchInput || !searchBtn || !searchBox) return;

  // Hiệu ứng hiển thị
  searchBox.addEventListener("mouseenter", () => searchBox.classList.add("active"));
  searchBox.addEventListener("mouseleave", () => {
    if (document.activeElement !== searchInput && searchInput.value.trim() === "") {
      searchBox.classList.remove("active");
    }
  });

  searchInput.addEventListener("focus", () => searchBox.classList.add("active"));
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      if (!searchBox.matches(":hover") && searchInput.value.trim() === "") {
        searchBox.classList.remove("active");
      }
    }, 100);
  });

 

  // Cho phép Enter
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
}

// Gọi cho cả 2 thanh tìm kiếm
setupSearchBox("search-input", "search-btn");       // header chính
setupSearchBox("mini-search-input", "mini-search-btn"); // mini header

function setupAdvancedSearch() {
  const searchInput = document.getElementById("search-btn-adv"); // input từ khóa nâng cao

  const categorySelect = document.getElementById("search-category");
  const searchBtn = document.getElementById("search-btn-adv"); // nút tìm kiếm nâng cao

  

  // Enter cũng kích hoạt nút
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
}
// Chọn popup và nút đóng
const popup = document.getElementById("login-popup");
const closeBtn = document.querySelector(".close-popup");

// Chọn tất cả nút Thêm và Mua
const addButtons = document.querySelectorAll(".add-buy .add");
const buyButtons = document.querySelectorAll(".add-buy .buy");

// Hàm hiển thị popup thêm giỏ hàng
function showPopup() {
  popup.style.display = "block";
  // Tự động ẩn sau 2 giây
  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

// Thêm sự kiện click cho nút Thêm
addButtons.forEach(btn => btn.addEventListener("click", showPopup));

// Nút Mua chuyển đến cart.html
buyButtons.forEach(btn => btn.addEventListener("click", () => {
  window.location.href = "cart.html";
}));

// Nút đóng popup
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});



// ================== SLIDER ẢNH ==================
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let active = 0;
let lengthItems = items.length - 1;

next.onclick = () => {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};

prev.onclick = () => {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};

let refreshInterval = setInterval(() => next.click(), 3000);

function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + 'px';

  // Cập nhật dot
  document.querySelector('.slider .dots li.active')?.classList.remove('active');
  dots[active].classList.add('active');

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => next.click(), 3000);
}

dots.forEach((li, key) => {
  li.addEventListener('click', () => {
    active = key;
    reloadSlider();
  });
});



