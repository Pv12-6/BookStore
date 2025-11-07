
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

  // Xử lý tìm kiếm
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword === "") {
      alert("Vui lòng nhập từ khóa!");
      return;
    }

    const allBooks = [
      ...(books.kinhte || []),
      ...(books.vanhoc || []),
      ...(books.thieunhi || []),
      ...(books.tieuthuyet || []),
      ...(books.khoahoc || []),
      ...(books.nghethuat || [])
    ];

    const result = allBooks.filter(book =>
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword)
    );

    const slide = document.querySelector(".slide-section");
    const list = document.getElementById("theloai-list");
    const title = document.querySelector("#theloai h2");

    if (slide) slide.style.display = "none";
    if (title) title.textContent = "Kết quả tìm kiếm";

    list.innerHTML = "";
    if (result.length === 0) {
      list.innerHTML = "<p style='padding:20px;'>❌ Không tìm thấy sách phù hợp.</p>";
    } else if (typeof renderBooks === "function") {
      renderBooks("theloai-list", result);
    }

    list.scrollIntoView({ behavior: "smooth" });
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
  const minPrice = document.getElementById("min-price");
  const maxPrice = document.getElementById("max-price");
  const categorySelect = document.getElementById("search-category");
  const searchBtn = document.getElementById("search-btn-adv"); // nút tìm kiếm nâng cao
  const list = document.getElementById("theloai-list");
  const slide = document.querySelector(".slide-section");
  const title = document.querySelector("#theloai h2");

  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const min = parseInt(minPrice.value) || 0;
    const max = parseInt(maxPrice.value) || Infinity;
    const category = categorySelect.value;

    let allBooks = [
      ...(books.kinhte || []),
      ...(books.vanhoc || []),
      ...(books.thieunhi || []),
      ...(books.tieuthuyet || []),
      ...(books.khoahoc || []),
      ...(books.nghethuat || [])
    ];

    let result = allBooks.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(keyword);
      const authorMatch = book.author.toLowerCase().includes(keyword);
      const price = parseInt(String(book.price).replace(/[^\d]/g, ""));
      const priceMatch = price >= min && price <= max;
      const categoryMatch = category === "all" || book.category === category;

      return (titleMatch || authorMatch) && priceMatch && categoryMatch;
    });

    if (slide) slide.style.display = "none";
    if (title) title.textContent = "Kết quả tìm kiếm nâng cao";

    list.innerHTML = "";
    if (result.length === 0) {
      list.innerHTML = "<p style='padding:20px;'>❌ Không tìm thấy sách phù hợp.</p>";
    } else if (typeof renderBooks === "function") {
      renderBooks("theloai-list", result);
    }

    list.scrollIntoView({ behavior: "smooth" });
  });

  // Enter cũng kích hoạt nút
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
}

// Gọi hàm sau khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  setupAdvancedSearch();
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


// ================== DỮ LIỆU SÁCH ==================
const books = {
  kinhte: [
      { title: "Cha Giàu Cha Nghèo", author: "Robert T. Kiyosaki", category: "kinhte", price: 150000, sale: 20, img: "../images/kinhte1.jpg", desc: "Cuốn sách kinh điển giúp bạn thay đổi tư duy về tiền bạc và đầu tư." },
  { title: "Tư Duy Nhanh Và Chậm", author: "Daniel Kahneman", category: "kinhte", price: 210000, sale: 15, img: "../images/kinhte2.jpg", desc: "Giải thích cách con người ra quyết định trong tài chính và cuộc sống." },
  { title: "Nhà Đầu Tư Thông Minh", author: "Benjamin Graham", category: "kinhte", price: 230000, sale: 10, img: "../images/kinhte3.jpg", desc: "Tác phẩm kinh điển của người thầy huyền thoại của Warren Buffett." },
  { title: "Dạy Con Làm Giàu – Tập 2", author: "Robert T. Kiyosaki", category: "kinhte", price: 135000, sale: 10, img: "../images/kinhte4.jpg", desc: "Khám phá cách tư duy để trở nên độc lập tài chính." },
  { title: "Bí Mật Tư Duy Triệu Phú", author: "T. Harv Eker", category: "kinhte", price: 145000, sale: 20, img: "../images/kinhte5.jpg", desc: "Cách người giàu suy nghĩ và hành động khác biệt so với người nghèo." },
  { title: "Đánh Thức Con Người Phi Thường Trong Bạn", author: "Tony Robbins", category: "kinhte", price: 175000, sale: 15, img: "../images/kinhte6.jpg", desc: "Khám phá sức mạnh tiềm ẩn và kỹ năng lãnh đạo bản thân." },
  { title: "Tỷ Phú Bán Giày", author: "Tony Hsieh", category: "kinhte", price: 125000, sale: 10, img: "../images/kinhte7.jpg", desc: "Câu chuyện truyền cảm hứng từ nhà sáng lập Zappos về hạnh phúc trong kinh doanh." },
  { title: "Quốc Gia Khởi Nghiệp", author: "Dan Senor & Saul Singer", category: "kinhte", price: 180000, sale: 15, img: "../images/kinhte8.jpg", desc: "Bí quyết giúp Israel trở thành quốc gia khởi nghiệp hàng đầu thế giới." },
  { title: "Không Đến Một", author: "Peter Thiel", category: "kinhte", price: 160000, sale: 10, img: "../images/kinhte9.jpg", desc: "Bí quyết sáng tạo và xây dựng công ty độc nhất vô nhị trong thời đại mới." },
  { title: "Từ Tốt Đến Vĩ Đại", author: "Jim Collins", category: "kinhte", price: 190000, sale: 15, img: "../images/kinhte10.jpg", desc: "Phân tích lý do vì sao một số công ty đạt được sự vĩ đại và bền vững." },
  { title: "7 Thói Quen Hiệu Quả Trong Lãnh Đạo", author: "Stephen R. Covey", category: "kinhte", price: 135000, sale: 10, img: "../images/kinhte11.jpg", desc: "Những nguyên tắc cốt lõi giúp lãnh đạo thành công và bền vững." },
  { title: "Kinh Tế Học Cơ Bản", author: "Thomas Sowell", category: "kinhte", price: 220000, sale: 10, img: "../images/kinhte12.jpg", desc: "Giúp người đọc hiểu nền tảng vận hành của nền kinh tế hiện đại." },
  { title: "Kinh Tế Học Vui", author: "Steven D. Levitt & Stephen J. Dubner", category: "kinhte", price: 175000, sale: 20, img: "../images/kinhte13.jpg", desc: "Cách kinh tế học lý giải các hiện tượng kỳ lạ trong đời sống." },
  { title: "Tư Duy Tích Cực Trong Kinh Doanh", author: "Norman Vincent Peale", category: "kinhte", price: 110000, sale: 15, img: "../images/kinhte14.jpg", desc: "Tác động của tư duy tích cực đến hiệu suất công việc và thành công tài chính." },
  { title: "Tiền Và Lẽ Sống", author: "Jacob Needleman", category: "kinhte", price: 125000, sale: 10, img: "../images/kinhte15.jpg", desc: "Suy ngẫm sâu sắc về mối quan hệ giữa con người và tiền bạc." },
  { title: "Kinh Tế Học Của Sự Lựa Chọn", author: "Paul Samuelson", category: "kinhte", price: 210000, sale: 5, img: "../images/kinhte16.jpg", desc: "Phân tích cách cá nhân và doanh nghiệp đưa ra quyết định kinh tế." },
  { title: "Kinh Doanh Như Một Cuộc Chơi", author: "Richard Branson", category: "kinhte", price: 165000, sale: 15, img: "../images/kinhte17.jpg", desc: "Triết lý kinh doanh và tinh thần mạo hiểm của nhà sáng lập Virgin Group." },
  { title: "Làm Chủ Tư Duy, Thay Đổi Vận Mệnh", author: "Adam Khoo", category: "kinhte", price: 130000, sale: 20, img: "../images/kinhte18.jpg", desc: "Tư duy tích cực và phương pháp phát triển bản thân trong kinh doanh." },
  { title: "Chiến Lược Đại Dương Xanh", author: "W. Chan Kim & Renée Mauborgne", category: "kinhte", price: 175000, sale: 15, img: "../images/kinhte19.jpg", desc: "Cách tạo ra thị trường mới thay vì cạnh tranh khốc liệt." },
  { title: "Kinh Tế Học Tình Yêu", author: "Paul Oyer", category: "kinhte", price: 120000, sale: 10, img: "../images/kinhte20.jpg", desc: "Áp dụng kinh tế học để hiểu rõ hơn về tình yêu, hôn nhân và các mối quan hệ." }
  ],
 vanhoc: [
    { title: "Nhà Giả Kim", author: "Paulo Coelho", category: "vanhoc", price: 120000, sale: 20, img: "../images/vanhoc1.jpg", desc: "Câu chuyện triết lý đầy cảm hứng về hành trình theo đuổi ước mơ." },
  { title: "Hai Số Phận", author: "Jeffrey Archer", category: "vanhoc", price: 145000, sale: 10, img: "../images/vanhoc2.jpg", desc: "Tiểu thuyết kinh điển về hai cuộc đời đối lập và số phận nghiệt ngã." },
  { title: "Bố Già", author: "Mario Puzo", category: "vanhoc", price: 160000, sale: 15, img: "../images/vanhoc3.jpg", desc: "Biểu tượng bất hủ về quyền lực, gia đình và lòng trung thành." },
  { title: "Ông Già Và Biển Cả", author: "Ernest Hemingway", category: "vanhoc", price: 110000, sale: 10, img: "../images/vanhoc4.jpg", desc: "Câu chuyện về ý chí kiên cường và niềm tin không bao giờ tắt." },
  { title: "Những Người Khốn Khổ", author: "Victor Hugo", category: "vanhoc", price: 180000, sale: 5, img: "../images/vanhoc5.jpg", desc: "Kiệt tác nhân văn về lòng nhân ái và công lý xã hội." },
  { title: "Chuông Nguyện Hồn Ai", author: "Ernest Hemingway", category: "vanhoc", price: 125000, sale: 15, img: "../images/vanhoc6.jpg", desc: "Câu chuyện bi tráng về chiến tranh, tình yêu và con người." },
  { title: "Trăm Năm Cô Đơn", author: "Gabriel García Márquez", category: "vanhoc", price: 155000, sale: 10, img: "../images/vanhoc7.jpg", desc: "Tác phẩm vĩ đại của chủ nghĩa hiện thực huyền ảo." },
  { title: "Giết Con Chim Nhại", author: "Harper Lee", category: "vanhoc", price: 120000, sale: 5, img: "../images/vanhoc8.jpg", desc: "Tiếng nói mạnh mẽ chống lại bất công và định kiến xã hội." },
  { title: "Dám Bị Ghét", author: "Ichiro Kishimi", category: "vanhoc", price: 115000, sale: 20, img: "../images/vanhoc9.jpg", desc: "Cuốn sách triết lý sâu sắc về tự do, hạnh phúc và giá trị bản thân." },
  { title: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry", category: "vanhoc", price: 95000, sale: 0, img: "../images/vanhoc10.jpg", desc: "Câu chuyện giản dị nhưng đầy ý nghĩa về tình yêu và sự trưởng thành." },
  { title: "Chiến Tranh Và Hòa Bình", author: "Lev Tolstoy", category: "vanhoc", price: 190000, sale: 15, img: "../images/vanhoc11.jpg", desc: "Bức tranh hoành tráng về xã hội Nga trong thời kỳ chiến tranh." },
  { title: "Tội Ác Và Hình Phạt", author: "Fyodor Dostoevsky", category: "vanhoc", price: 170000, sale: 10, img: "../images/vanhoc12.jpg", desc: "Tác phẩm triết lý sâu sắc về tội lỗi, chuộc tội và nhân tính." },
  { title: "Đồi Gió Hú", author: "Emily Brontë", category: "vanhoc", price: 125000, sale: 10, img: "../images/vanhoc13.jpg", desc: "Câu chuyện tình yêu mãnh liệt nhưng đầy bi kịch trên vùng đất hoang." },
  { title: "Kiêu Hãnh Và Định Kiến", author: "Jane Austen", category: "vanhoc", price: 135000, sale: 10, img: "../images/vanhoc14.jpg", desc: "Tác phẩm kinh điển về tình yêu, giới tính và địa vị trong xã hội Anh." },
  { title: "Jane Eyre", author: "Charlotte Brontë", category: "vanhoc", price: 140000, sale: 15, img: "../images/vanhoc15.jpg", desc: "Hành trình vượt qua định kiến và tìm kiếm hạnh phúc của Jane Eyre." },
  { title: "Đèn Không Hắt Bóng", author: "Dazai Osamu", category: "vanhoc", price: 115000, sale: 5, img: "../images/vanhoc16.jpg", desc: "Câu chuyện đầy ám ảnh về nỗi cô đơn và bi kịch con người." },
  { title: "Người Đua Diều", author: "Khaled Hosseini", category: "vanhoc", price: 145000, sale: 10, img: "../images/vanhoc17.jpg", desc: "Một câu chuyện cảm động về tình bạn, tội lỗi và sự chuộc lỗi." },
  { title: "Biển Cả Và Hoàng Hôn", author: "Yasunari Kawabata", category: "vanhoc", price: 120000, sale: 15, img: "../images/vanhoc18.jpg", desc: "Một tác phẩm đậm chất thơ của văn học Nhật Bản hiện đại." },
  { title: "Cánh Đồng Bất Tận", author: "Nguyễn Ngọc Tư", category: "vanhoc", price: 95000, sale: 10, img: "../images/vanhoc19.jpg", desc: "Tập truyện ngắn nổi tiếng về nỗi đau, thân phận và sự bao dung." },
  { title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", category: "vanhoc", price: 105000, sale: 20, img: "../images/vanhoc20.jpg", desc: "Truyền cảm hứng sống hết mình, dám theo đuổi đam mê và khát vọng." }
  ],
    thieunhi: [
    { title: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", category: "thieunhi", price: 65000, sale: 10, img: "images/thieunhi1.jpg", desc: "Hành trình phiêu lưu đầy thú vị của Dế Mèn và bài học cuộc sống ý nghĩa." },
    { title: "Harry Potter Và Hòn Đá Phù Thủy", author: "J.K. Rowling", category: "thieunhi", price: 95000, sale: 20, img: "images/thieunhi2.jpg", desc: "Khởi đầu hành trình huyền thoại của cậu bé phù thủy nổi tiếng." },
    { title: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry", category: "thieunhi", price: 75000, sale: 0, img: "images/thieunhi3.jpg", desc: "Câu chuyện cảm động về tình bạn, tình yêu và lòng nhân ái." },
    { title: "Totto-chan Bên Cửa Sổ", author: "Tetsuko Kuroyanagi", category: "thieunhi", price: 88000, sale: 10, img: "images/thieunhi4.jpg", desc: "Câu chuyện đáng yêu về tuổi thơ và giáo dục nhân văn." },
    { title: "Không Gia Đình", author: "Hector Malot", category: "thieunhi", price: 92000, sale: 5, img: "images/thieunhi5.jpg", desc: "Hành trình của cậu bé Rémi đi tìm gia đình và lòng nhân ái." },
    { title: "Cô Bé Lọ Lem", author: "Charles Perrault", category: "thieunhi", price: 45000, sale: 10, img: "images/thieunhi6.jpg", desc: "Câu chuyện cổ tích nổi tiếng về lòng tốt và hạnh phúc." },
    { title: "Pinocchio", author: "Carlo Collodi", category: "thieunhi", price: 49000, sale: 15, img: "images/thieunhi7.jpg", desc: "Cậu bé gỗ và hành trình trở thành người thật đầy bài học." },
    { title: "Peter Pan", author: "J. M. Barrie", category: "thieunhi", price: 60000, sale: 5, img: "images/thieunhi8.jpg", desc: "Cậu bé không bao giờ lớn và vùng đất Neverland huyền ảo." },
    { title: "Cậu Bé Rừng Xanh", author: "Rudyard Kipling", category: "thieunhi", price: 70000, sale: 10, img: "images/thieunhi9.jpg", desc: "Cuộc sống của Mowgli giữa rừng già cùng bầy sói." },
    { title: "Alice Ở Xứ Sở Thần Tiên", author: "Lewis Carroll", category: "thieunhi", price: 82000, sale: 20, img: "images/thieunhi10.jpg", desc: "Chuyến phiêu lưu kỳ diệu của Alice trong thế giới tưởng tượng." },
    { title: "Chú Bé Hạnh Phúc", author: "Oscar Wilde", category: "thieunhi", price: 58000, sale: 0, img: "images/thieunhi11.jpg", desc: "Câu chuyện cảm động về lòng nhân ái và sự hy sinh." },
    { title: "Những Cuộc Phiêu Lưu Của Tom Sawyer", author: "Mark Twain", category: "thieunhi", price: 75000, sale: 10, img: "images/thieunhi12.jpg", desc: "Tuổi thơ hồn nhiên với những trò nghịch ngợm đáng yêu." },
    { title: "Hiệp Sĩ Trong Bộ Áo Giáp Sắt", author: "Robert Fisher", category: "thieunhi", price: 68000, sale: 5, img: "images/thieunhi13.jpg", desc: "Hành trình tìm lại chính mình của một hiệp sĩ cô độc." },
    { title: "Truyện Cổ Andersen", author: "Hans Christian Andersen", category: "thieunhi", price: 99000, sale: 20, img: "images/thieunhi14.jpg", desc: "Tuyển tập truyện cổ tích bất hủ dành cho thiếu nhi." },
    { title: "Cậu Bé Thông Minh", author: "Nguyễn Nhật Ánh", category: "thieunhi", price: 79000, sale: 10, img: "images/thieunhi15.jpg", desc: "Những câu chuyện tuổi thơ hồn nhiên và trong sáng." },
    { title: "Mắt Biếc", author: "Nguyễn Nhật Ánh", category: "thieunhi", price: 89000, sale: 15, img: "images/thieunhi16.jpg", desc: "Câu chuyện tình cảm ngây thơ, trong sáng của tuổi học trò." },
    { title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", author: "Nguyễn Nhật Ánh", category: "thieunhi", price: 97000, sale: 10, img: "images/thieunhi17.jpg", desc: "Câu chuyện tuổi thơ và những ký ức tươi đẹp nơi làng quê." },
    { title: "Harry Potter Và Phòng Chứa Bí Mật", author: "J.K. Rowling", category: "thieunhi", price: 105000, sale: 10, img: "images/thieunhi18.jpg", desc: "Phần tiếp theo với nhiều bí ẩn và phép thuật hấp dẫn." },
    { title: "Chiếc Lá Cuối Cùng", author: "O. Henry", category: "thieunhi", price: 56000, sale: 0, img: "images/thieunhi19.jpg", desc: "Một câu chuyện ngắn đầy nhân văn và cảm động." },
    { title: "Thần Đồng Đất Việt", author: "Lê Linh", category: "thieunhi", price: 48000, sale: 5, img: "images/thieunhi20.jpg", desc: "Truyện tranh hài hước và trí tuệ Việt Nam." }
  ],

  tieuthuyet: [
    { title: "Kiêu Hãnh Và Định Kiến", author: "Jane Austen", category: "tieuthuyet", price: 105000, sale: 10, img: "images/tieuthuyet1.jpg", desc: "Câu chuyện tình yêu kinh điển giữa Elizabeth và Darcy." },
    { title: "Jane Eyre", author: "Charlotte Brontë", category: "tieuthuyet", price: 115000, sale: 15, img: "images/tieuthuyet2.jpg", desc: "Câu chuyện cảm động về nghị lực và tình yêu chân thật." },
    { title: "Đồi Gió Hú", author: "Emily Brontë", category: "tieuthuyet", price: 120000, sale: 10, img: "images/tieuthuyet3.jpg", desc: "Tình yêu mãnh liệt và bi kịch giữa Heathcliff và Catherine." },
    { title: "Bố Già", author: "Mario Puzo", category: "tieuthuyet", price: 125000, sale: 0, img: "images/tieuthuyet4.jpg", desc: "Tiểu thuyết huyền thoại về quyền lực và gia đình mafia." },
    { title: "Chiến Tranh Và Hòa Bình", author: "Leo Tolstoy", category: "tieuthuyet", price: 150000, sale: 10, img: "images/tieuthuyet5.jpg", desc: "Bức tranh hoành tráng về xã hội Nga trong chiến tranh." },
    { title: "Anna Karenina", author: "Leo Tolstoy", category: "tieuthuyet", price: 130000, sale: 15, img: "images/tieuthuyet6.jpg", desc: "Bi kịch của người phụ nữ đi tìm tình yêu đích thực." },
    { title: "Đỏ Và Đen", author: "Stendhal", category: "tieuthuyet", price: 112000, sale: 10, img: "images/tieuthuyet7.jpg", desc: "Cuộc đời nhiều mâu thuẫn của chàng trai đầy tham vọng." },
    { title: "Đại Gia Gatsby", author: "F. Scott Fitzgerald", category: "tieuthuyet", price: 98000, sale: 10, img: "images/tieuthuyet8.jpg", desc: "Giấc mơ Mỹ và bi kịch của Gatsby." },
    { title: "Tiếng Chim Hót Trong Bụi Mận Gai", author: "Colleen McCullough", category: "tieuthuyet", price: 119000, sale: 5, img: "images/tieuthuyet9.jpg", desc: "Câu chuyện tình yêu đầy nước mắt giữa linh mục và cô gái." },
    { title: "Ông Trăm Tuổi Trèo Qua Cửa Sổ Và Biến Mất", author: "Jonas Jonasson", category: "tieuthuyet", price: 95000, sale: 20, img: "images/tieuthuyet10.jpg", desc: "Một hành trình phiêu lưu hài hước và đầy bất ngờ." },
  ],

  khoahoc: [
  { title: "Vũ Trụ Và Những Bí Ẩn", author: "Stephen Hawking", category: "khoahoc", price: 120000, sale: 10, img: "images/khoahoc1.jpg", desc: "Khám phá những bí ẩn về vũ trụ và các định luật vật lý." },
  { title: "Sự Tiến Hóa Của Loài Người", author: "Charles Darwin", category: "khoahoc", price: 98000, sale: 5, img: "images/khoahoc2.jpg", desc: "Hiểu về quá trình tiến hóa và nguồn gốc của loài người." },
  { title: "Hóa Học Vui", author: "John Emsley", category: "khoahoc", price: 85000, sale: 15, img: "images/khoahoc3.jpg", desc: "Những thí nghiệm và kiến thức hóa học thú vị cho mọi lứa tuổi." },
  { title: "Sinh Học Thú Vị", author: "David Attenborough", category: "khoahoc", price: 99000, sale: 10, img: "images/khoahoc4.jpg", desc: "Tìm hiểu về thế giới sinh vật và các hiện tượng sinh học." },
  { title: "Vật Lý Cho Người Mới Bắt Đầu", author: "Richard Feynman", category: "khoahoc", price: 105000, sale: 20, img: "images/khoahoc5.jpg", desc: "Những kiến thức vật lý cơ bản được giải thích dễ hiểu." },
  { title: "Thiên Văn Học Căn Bản", author: "Neil deGrasse Tyson", category: "khoahoc", price: 112000, sale: 10, img: "images/khoahoc6.jpg", desc: "Giới thiệu các khái niệm cơ bản về thiên văn học và vũ trụ." },
  { title: "Khoa Học Mỗi Ngày", author: "Bill Bryson", category: "khoahoc", price: 97000, sale: 15, img: "images/khoahoc7.jpg", desc: "Những kiến thức khoa học thú vị trong đời sống hàng ngày." },
  { title: "Robot Và Trí Tuệ Nhân Tạo", author: "Stuart Russell", category: "khoahoc", price: 125000, sale: 20, img: "images/khoahoc8.jpg", desc: "Giải thích về AI, robot và tương lai công nghệ." },
  { title: "Lịch Sử Khoa Học", author: "Isaac Asimov", category: "khoahoc", price: 89000, sale: 5, img: "images/khoahoc9.jpg", desc: "Tổng quan lịch sử phát triển các ngành khoa học." },
  { title: "Thế Giới Vi Sinh Vật", author: "Paul de Kruif", category: "khoahoc", price: 93000, sale: 10, img: "images/khoahoc10.jpg", desc: "Khám phá các vi sinh vật và ảnh hưởng của chúng đến con người." },
  { title: "Thám Hiểm Đại Dương", author: "Jacques Cousteau", category: "khoahoc", price: 110000, sale: 15, img: "images/khoahoc11.jpg", desc: "Cuộc phiêu lưu khám phá thế giới dưới đại dương." },
  { title: "Khoa Học Và Cuộc Sống", author: "Carl Sagan", category: "khoahoc", price: 102000, sale: 10, img: "images/khoahoc12.jpg", desc: "Những câu chuyện khoa học hấp dẫn gắn với đời sống con người." },
  { title: "Thiên Nhiên Kỳ Diệu", author: "Richard Dawkins", category: "khoahoc", price: 95000, sale: 5, img: "images/khoahoc13.jpg", desc: "Khám phá sự đa dạng và kỳ diệu của thiên nhiên." },
  { title: "Khoa Học Cho Trẻ Em", author: "Nick Arnold", category: "khoahoc", price: 78000, sale: 10, img: "images/khoahoc14.jpg", desc: "Những kiến thức khoa học thú vị dành cho thiếu nhi." },
  { title: "Công Nghệ Tương Lai", author: "Michio Kaku", category: "khoahoc", price: 135000, sale: 20, img: "images/khoahoc15.jpg", desc: "Dự đoán xu hướng khoa học và công nghệ tương lai." },
  { title: "Thế Giới Vật Lý", author: "Brian Greene", category: "khoahoc", price: 125000, sale: 10, img: "images/khoahoc16.jpg", desc: "Khám phá các lý thuyết vật lý hiện đại và vũ trụ." },
  { title: "Bí Ẩn Não Bộ", author: "David Eagleman", category: "khoahoc", price: 98000, sale: 15, img: "images/khoahoc17.jpg", desc: "Tìm hiểu cách não bộ hoạt động và điều khiển hành vi." },
  { title: "Nguyên Tử Và Vật Chất", author: "Richard Feynman", category: "khoahoc", price: 105000, sale: 10, img: "images/khoahoc18.jpg", desc: "Giải thích kiến thức cơ bản về nguyên tử và vật chất." },
  { title: "Khoa Học Không Biên Giới", author: "Bill Bryson", category: "khoahoc", price: 90000, sale: 5, img: "images/khoahoc19.jpg", desc: "Những câu chuyện khoa học thú vị trên toàn cầu." },
  { title: "Bí Ẩn Vũ Trụ", author: "Stephen Hawking", category: "khoahoc", price: 140000, sale: 20, img: "images/khoahoc20.jpg", desc: "Những khám phá mới nhất về vũ trụ và hố đen." }
],

nghethuat: [
  { title: "Lịch Sử Nghệ Thuật Thế Giới", author: "E. H. Gombrich", category: "nghethuat", price: 130000, sale: 10, img: "images/nghethuat1.jpg", desc: "Tìm hiểu các giai đoạn và phong cách nghệ thuật qua các thời kỳ." },
  { title: "Học Vẽ Cơ Bản", author: "Betty Edwards", category: "nghethuat", price: 85000, sale: 15, img: "images/nghethuat2.jpg", desc: "Kỹ thuật cơ bản để vẽ tranh và phát triển khả năng sáng tạo." },
  { title: "Nghệ Thuật Thiết Kế Đồ Họa", author: "Robin Williams", category: "nghethuat", price: 95000, sale: 5, img: "images/nghethuat3.jpg", desc: "Hướng dẫn về nguyên tắc và kỹ năng thiết kế đồ họa hiện đại." },
  { title: "Âm Nhạc Và Cảm Xúc", author: "Oliver Sacks", category: "nghethuat", price: 99000, sale: 10, img: "images/nghethuat4.jpg", desc: "Khám phá mối liên hệ giữa âm nhạc và cảm xúc con người." },
  { title: "Nghệ Thuật Phim Ảnh", author: "David Bordwell", category: "nghethuat", price: 115000, sale: 20, img: "images/nghethuat5.jpg", desc: "Phân tích kỹ thuật và nghệ thuật trong điện ảnh." },
  { title: "Thiết Kế Nội Thất", author: "Francis D.K. Ching", category: "nghethuat", price: 108000, sale: 10, img: "images/nghethuat6.jpg", desc: "Nguyên tắc thiết kế và trang trí không gian sống." },
  { title: "Lịch Sử Âm Nhạc Thế Giới", author: "Donald Jay Grout", category: "nghethuat", price: 120000, sale: 5, img: "images/nghethuat7.jpg", desc: "Khám phá các dòng nhạc và nhạc sĩ nổi tiếng." },
  { title: "Vẽ Tranh Sáng Tạo", author: "Peter Gray", category: "nghethuat", price: 88000, sale: 15, img: "images/nghethuat8.jpg", desc: "Phát triển khả năng sáng tạo thông qua hội họa." },
  { title: "Nghệ Thuật Điêu Khắc", author: "Gaston Lachaise", category: "nghethuat", price: 99000, sale: 10, img: "images/nghethuat9.jpg", desc: "Kỹ thuật và lịch sử của điêu khắc qua các thời đại." },
  { title: "Nhiếp Ảnh Cơ Bản", author: "Michael Freeman", category: "nghethuat", price: 92000, sale: 5, img: "images/nghethuat10.jpg", desc: "Những kiến thức cơ bản để chụp và sáng tạo hình ảnh." },
  { title: "Thiết Kế Thời Trang", author: "Laird Borrelli", category: "nghethuat", price: 110000, sale: 10, img: "images/nghethuat11.jpg", desc: "Nguyên tắc và phong cách thiết kế trang phục hiện đại." },
  { title: "Nhạc Cổ Điển Thế Giới", author: "Alex Ross", category: "nghethuat", price: 115000, sale: 15, img: "images/nghethuat12.jpg", desc: "Khám phá các tác phẩm cổ điển nổi tiếng và nhà soạn nhạc." },
  { title: "Vẽ Tranh Trẻ Em", author: "Ed Emberley", category: "nghethuat", price: 78000, sale: 5, img: "images/nghethuat13.jpg", desc: "Hướng dẫn vẽ tranh đơn giản dành cho trẻ em." },
  { title: "Kiến Trúc Đương Đại", author: "Philip Jodidio", category: "nghethuat", price: 125000, sale: 20, img: "images/nghethuat14.jpg", desc: "Các công trình kiến trúc hiện đại nổi bật trên thế giới." },
  { title: "Hội Họa Thế Giới", author: "Norbert Wolf", category: "nghethuat", price: 120000, sale: 10, img: "images/nghethuat15.jpg", desc: "Những tác phẩm hội họa nổi tiếng và phân tích nghệ thuật." },
  { title: "Nhạc Pop Và Văn Hóa", author: "Simon Frith", category: "nghethuat", price: 95000, sale: 15, img: "images/nghethuat16.jpg", desc: "Khám phá mối quan hệ giữa nhạc pop và xã hội." },
  { title: "Thiết Kế Đồ Họa Hiện Đại", author: "Ellen Lupton", category: "nghethuat", price: 105000, sale: 10, img: "images/nghethuat17.jpg", desc: "Các xu hướng thiết kế đồ họa hiện đại và sáng tạo." },
  { title: "Nghệ Thuật Truyền Thống", author: "Nancy G. Heller", category: "nghethuat", price: 98000, sale: 5, img: "images/nghethuat18.jpg", desc: "Khám phá nghệ thuật dân gian và truyền thống của nhiều quốc gia." },
  { title: "Đồ Họa Chuyên Nghiệp", author: "Adrian Shaughnessy", category: "nghethuat", price: 115000, sale: 10, img: "images/nghethuat19.jpg", desc: "Hướng dẫn các kỹ thuật thiết kế đồ họa chuyên nghiệp." },
  { title: "Thiết Kế Thế Kỷ 21", author: "John Maeda", category: "nghethuat", price: 130000, sale: 20, img: "images/nghethuat20.jpg", desc: "Các xu hướng thiết kế và nghệ thuật trong thế kỷ 21." }
]

};


// ================== HIỂN THỊ SÁCH ==================
function renderBooks(listId, bookData) {
  const list = document.getElementById(listId);
  list.innerHTML = "";

  bookData.forEach(book => {
    const originalPrice = parseInt(String(book.price).replace(/[^\d]/g, ""));
    const salePercent = Number(book.sale) || 0;
    const salePrice = salePercent > 0
      ? Math.round(originalPrice * (1 - salePercent / 100))
      : originalPrice;

    const div = document.createElement("div");
    div.classList.add("book");

    div.innerHTML = `
      <div class="book-img-container">
        <img src="${book.img}" alt="${book.title}">
        ${salePercent > 0 ? `<div class="sale-tag">-${salePercent}%</div>` : ""}
      </div>

      <h4>${book.title}</h4>
      <p class="author">${book.author}</p>

      <div class="book-price">
        ${salePercent > 0
          ? `<span class="old-price">${originalPrice.toLocaleString()}₫</span>
             <span class="new-price">${salePrice.toLocaleString()}₫</span>`
          : `<span class="new-price">${originalPrice.toLocaleString()}₫</span>`
        }
      </div>

      <div class="book-actions">
        <button class="view"><i class="fa-solid fa-eye"></i> Xem thông tin</button>
        <button class="add"><i class="fa-solid fa-cart-plus"></i> Thêm</button>
      </div>
    `;

    // Xem thông tin
    div.querySelector(".view").addEventListener("click", () => {
      const fullBook = { ...book, finalPrice: salePrice, oldPrice: originalPrice, sale: salePercent };
      localStorage.setItem("selectedBook", JSON.stringify(fullBook));
      window.location.href = "book-detail.html";
    });

    // Thêm giỏ hàng
    div.querySelector(".add").addEventListener("click", () => {
      alert(`Bạn cần phải đăng nhập`);
      window.location.href = "login.html";
    });

    list.appendChild(div);
  });
}


// ================== PHÂN TRANG ==================
const booksPerPage = 12;
let currentPage = 1;
let filteredBooks = [];

function renderPagination(totalBooks) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalBooks.length / booksPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active" : "";
    btn.addEventListener("click", () => {
      currentPage = i;
      renderCurrentPage();
    });
    paginationContainer.appendChild(btn);
  }
}

function renderCurrentPage() {
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const booksToShow = filteredBooks.slice(start, end);
  renderBooks("theloai-list", booksToShow);
  renderPagination(filteredBooks);
}


/// ================== LỌC THEO THỂ LOẠI ==================
function filterCategory(category) {
  let allBooks = [
    ...books.kinhte,
    ...books.vanhoc, 
    ...books.thieunhi,
    ...books.tieuthuyet,
    ...books.khoahoc,
    ...books.nghethuat
  ];

  if (category.toLowerCase() === "all") {
    // Hiển thị tất cả sách
    filteredBooks = allBooks;
  } else {
    // Hiển thị sách theo thể loại
    filteredBooks = allBooks.filter(
      book => book.category && book.category.toLowerCase() === category.toLowerCase()
    );
  }

  currentPage = 1;
  renderCurrentPage();
}

// ================== MENU NAV CHỌN THỂ LOẠI ==================
function goToCategory(category) {
  filterCategory(category);

  // Xóa active cũ
  document.querySelectorAll(".category-buttons button")
    .forEach(btn => btn.classList.remove("active"));

  // Gắn active cho nút hiện tại
  const activeBtn = document.querySelector(`.category-buttons button[data-category="${category}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}


// ================== HIỂN THỊ MẶC ĐỊNH ==================
document.addEventListener("DOMContentLoaded", () => {
  filterCategory("all"); // 👉 Mặc định hiển thị tất cả sách khi mở trang
});

