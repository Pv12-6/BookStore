document.addEventListener("DOMContentLoaded", function () {
  let itemCheckboxes = Array.from(document.querySelectorAll(".item-checkbox"));
  const checkoutBtn = document.querySelector(".checkout-btn");
  const totalAmountEl = document.getElementById("total-amount");
  const selectedCountEl = document.getElementById("selected-count");

  function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "₫";
  }

  function updateRowTotal(row) {
    const price = Number(row.querySelector(".product-price").dataset.price) || 0;
    const qty = Number(row.querySelector(".quantity").value) || 0;
    const total = price * qty;
    row.querySelector(".total-price").textContent = formatMoney(total);
    return { total, qty };
  }

  function updateTotal() {
    let grandTotal = 0;
    let selectedCount = 0;
    itemCheckboxes.forEach(cb => {
      const row = cb.closest("tr");
      const { total, qty } = updateRowTotal(row);
      if (cb.checked) {
        grandTotal += total;
        selectedCount += qty;
      }
    });
    totalAmountEl.textContent = formatMoney(grandTotal);
    selectedCountEl.textContent = selectedCount;
  }

  // cập nhật danh sách checkbox khi DOM thay đổi
  function refreshCheckboxes() {
    itemCheckboxes = Array.from(document.querySelectorAll(".item-checkbox"));
    itemCheckboxes.forEach(cb => {
      cb.addEventListener("change", updateTotal);
    });
  }

  refreshCheckboxes();
  updateTotal();

  // Xử lý nút thanh toán
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      refreshCheckboxes(); // đảm bảo lấy danh sách mới
      const selectedItems = itemCheckboxes.filter(cb => cb.checked);
      if (selectedItems.length === 0) {
        alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán.");
        return;
      }

      // Điều hướng sang trang thanh toán (projects/checkout.html)
      // giữ behavior đơn giản và không sử dụng popup ở đây
      window.location.href = 'checkout.html';
    });
  }

  const footerSelectAll = document.getElementById('footer-select-all');
  if (footerSelectAll) {
    footerSelectAll.addEventListener('change', () => {
      itemCheckboxes = Array.from(document.querySelectorAll('.item-checkbox'));
      itemCheckboxes.forEach(cb => cb.checked = footerSelectAll.checked);
      updateTotal();
    });
  }

});
