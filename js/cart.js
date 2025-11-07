
document.addEventListener("DOMContentLoaded", function () {
  const itemCheckboxes = document.querySelectorAll(".item-checkbox");
  const selectAll = document.getElementById("select-all");
  const footerSelectAll = document.getElementById("footer-select-all");
  const totalAmount = document.getElementById("total-amount");
  const selectedCount = document.getElementById("selected-count");

  function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "₫";
  }

  function updateTotal() {
    let total = 0;
    let count = 0;
    itemCheckboxes.forEach(cb => {
      if (cb.checked) {
        const row = cb.closest("tr");
        const price = Number(row.querySelector(".product-price").dataset.price);
        const quantity = Number(row.querySelector(".quantity").value);
        total += price * quantity;
        count++;
      }
    });
    totalAmount.textContent = formatMoney(total);
    selectedCount.textContent = count;
  }

  // chọn tất cả
  function toggleAll(checked) {
    itemCheckboxes.forEach(cb => cb.checked = checked);
    footerSelectAll.checked = checked;
    selectAll.checked = checked;
    updateTotal();
  }

  selectAll.addEventListener("change", e => toggleAll(e.target.checked));
  footerSelectAll.addEventListener("change", e => toggleAll(e.target.checked));
  itemCheckboxes.forEach(cb => cb.addEventListener("change", updateTotal));

  document.querySelectorAll(".quantity").forEach(qty => {
    qty.addEventListener("change", updateTotal);
  });
});

// js/cart.js (ví dụ đặt tên file)
document.addEventListener("DOMContentLoaded", function () {
  const itemCheckboxes = Array.from(document.querySelectorAll(".item-checkbox"));
  const selectAllTop = document.getElementById("select-all");
  const footerSelectAll = document.getElementById("footer-select-all");
  const totalAmountEl = document.getElementById("total-amount");
  const selectedCountEl = document.getElementById("selected-count");
  const deleteBtn = document.querySelector(".delete-btn");
  const qtyInputs = Array.from(document.querySelectorAll(".quantity"));

  function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "₫";
  }

  function updateRowTotal(row) {
    const price = Number(row.querySelector(".product-price").dataset.price) || 0;
    const qty = Number(row.querySelector(".quantity").value) || 0;
    const total = price * qty;
    const totalCell = row.querySelector(".total-price");
    totalCell.textContent = formatMoney(total);
    return { total, qty };
  }

  function updateTotal() {
    let grandTotal = 0;
    let selectedItemsCount = 0; // tổng số lượng các sản phẩm được tick
    itemCheckboxes.forEach(cb => {
      const row = cb.closest("tr");
      const { total, qty } = updateRowTotal(row);
      if (cb.checked) {
        grandTotal += total;
        selectedItemsCount += qty;
      }
    });

    totalAmountEl.textContent = formatMoney(grandTotal);
    selectedCountEl.textContent = selectedItemsCount;
  }

  function toggleAll(checked) {
    itemCheckboxes.forEach(cb => cb.checked = checked);
    if (selectAllTop) selectAllTop.checked = checked;
    if (footerSelectAll) footerSelectAll.checked = checked;
    updateTotal();
  }

  // event listeners
  if (selectAllTop) selectAllTop.addEventListener("change", e => toggleAll(e.target.checked));
  if (footerSelectAll) footerSelectAll.addEventListener("change", e => toggleAll(e.target.checked));

  itemCheckboxes.forEach(cb => cb.addEventListener("change", () => {
    // đồng bộ 2 checkbox select-all: nếu tất cả item checked => check all, nếu không => uncheck all
    const allChecked = itemCheckboxes.every(c => c.checked);
    if (selectAllTop) selectAllTop.checked = allChecked;
    if (footerSelectAll) footerSelectAll.checked = allChecked;
    updateTotal();
  }));

  qtyInputs.forEach(q => {
    q.addEventListener("change", function () {
      if (this.value < 1) this.value = 1;
      updateTotal();
    });
  });

  // delete selected rows
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      const toRemove = itemCheckboxes.filter(c => c.checked);
      if (toRemove.length === 0) {
        alert("Chưa chọn sản phẩm nào để xóa.");
        return;
      }
      if (!confirm(`Bạn có chắc muốn xóa ${toRemove.length} sản phẩm đã chọn?`)) return;
      toRemove.forEach(cb => {
        const row = cb.closest("tr");
        if (row) row.remove();
      });
      // refresh node lists
      // (nếu bạn muốn tiếp tục dùng itemCheckboxes, cần cập nhật lại biến; đơn giả dùng reload)
      location.reload();
    });
  }

  // khởi tạo hiển thị ban đầu
  updateTotal();
});
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

      const total = totalAmountEl.textContent;
      const count = selectedCountEl.textContent;

      // Tạo popup thanh toán thành công
      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100%";
      popup.style.height = "100%";
      popup.style.backgroundColor = "rgba(0,0,0,0.5)";
      popup.style.display = "flex";
      popup.style.justifyContent = "center";
      popup.style.alignItems = "center";
      popup.style.zIndex = "9999";

      popup.innerHTML = `
        <div style="background:#fff;padding:20px;border-radius:10px;text-align:center;min-width:800px;font-size:20px" >
          <h2 style="color:#4CAF50;">Thanh toán thành công!</h2>
          <p>Số sản phẩm: <strong>${count}</strong></p>
          <p>Tổng tiền: <strong>${total}</strong></p>
          <button id="closePopup" style="margin-top:20px;padding:10px 20px;cursor:pointer;">Đóng</button>
        </div>
      `;

      document.body.appendChild(popup);

      document.getElementById("closePopup").addEventListener("click", () => {
        popup.remove();
        // Xóa các sản phẩm đã thanh toán
        selectedItems.forEach(cb => cb.closest("tr").remove());
        updateTotal(); // cập nhật lại tổng tiền
      });
    });
  }
});
