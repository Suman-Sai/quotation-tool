function addRow() {
  const tableBody = document.querySelector("#quotationTable tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" class="item" placeholder="Item name"></td>
    <td><input type="text" class="qty" placeholder="Qty (e.g. 258 ft)"></td>
    <td><input type="number" class="price" placeholder="Price"></td>
    <td><input type="number" class="total" placeholder="Enter total"></td>
    <td><button onclick="removeRow(this)">Remove</button></td>
  `;
  tableBody.appendChild(newRow);
  attachListeners(newRow);
}

function removeRow(btn) {
  btn.closest("tr").remove();
  calculateTotals();
}

function attachListeners(row) {
  const qtyField = row.querySelector(".qty");
  const priceField = row.querySelector(".price");
  const totalField = row.querySelector(".total");

  // Trigger calculation whenever user types
  [qtyField, priceField, totalField].forEach(field => {
    field.addEventListener("input", calculateTotals);
  });
}

function calculateTotals() {
  const rows = document.querySelectorAll("#quotationTable tbody tr");
  let subtotal = 0;

  rows.forEach(row => {
    // Extract only numeric part from qty (e.g. "258 ft" → 258)
    const qtyText = row.querySelector(".qty").value;
    const qty = parseFloat(qtyText.replace(/[^0-9.]/g, "")) || 0;

    const price = parseFloat(row.querySelector(".price").value);
    const totalField = row.querySelector(".total");

    if (!isNaN(price) && price > 0) {
      const autoTotal = qty * price;
      totalField.value = autoTotal.toFixed(2);
      subtotal += autoTotal;
    } else {
      const manualTotal = parseFloat(totalField.value) || 0;
      subtotal += manualTotal;
    }
  });

  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("gstAmount").textContent = gst.toFixed(2);
  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
      document.getElementById("amountWords").textContent = numberToWords(Math.round(grandTotal)) + " Rupees Only";
    }

    // 🔹 Initialize listeners for first row
    document.querySelectorAll("#quotationTable tbody tr").forEach(attachListeners);
    // Convert number to words (Indian numbering system)
function numberToWords(num) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
                "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
                "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num === 0) return "Zero";

  function convert(n) {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
  }

  return convert(num);
}

// Print quotation cleanly
function printQuotation() {
  document.querySelectorAll(".btn").forEach(btn => btn.style.display = "none");
  window.print();
  document.querySelectorAll(".btn").forEach(btn => btn.style.display = "inline-block");
}
