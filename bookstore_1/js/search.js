const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

searchBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("search-name").value.toLowerCase();
  const categoryInput = document.getElementById("search-category").value;
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;

  const filteredBooks = books.filter(book => {
    const matchName = book.title.toLowerCase().includes(nameInput);
    const matchCategory = categoryInput === "all" || book.category === categoryInput;
    const matchPrice = book.price >= minPrice && book.price <= maxPrice;

    return matchName && matchCategory && matchPrice;
  });

  renderSearchResults(filteredBooks);
});

function renderSearchResults(results) {
  searchResults.innerHTML = "";

  if(results.length === 0){
    searchResults.innerHTML = "<p>Không tìm thấy sách phù hợp.</p>";
    return;
  }

  results.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book-item");
    div.innerHTML = `
      <p>${book.title} - ${book.category} - ${book.price.toLocaleString()}₫</p>
    `;
    searchResults.appendChild(div);
  });
}
