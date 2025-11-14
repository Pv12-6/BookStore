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
        updateTotal(); // cập nhật lại tổng tiền sau khi đóng popup
      });
    });
  }
});
