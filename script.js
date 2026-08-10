function addRow() {
    const tableBody = document.querySelector('#quotationTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" class="item"></td>
        <td><input type="number" class="qty" value="0"></td>
        <td><input type="number" class="price" value="0"></td>
        <td class="total">0</td>
        <td><button onclick="removeRow(this)">Remove</button></td>
    `;
    tableBody.appendChild(newRow);
    attachListeners();
}

function removeRow(button) {
    const row = button.closest('tr');
    if (row) row.remove();
    updateGrandTotal();
}

function attachListeners() {
    document.querySelectorAll('#quotationTable tbody tr').forEach(row => {
        row.querySelector('.qty').addEventListener('input', updateGrandTotal);
        row.querySelector('.price').addEventListener('input', updateGrandTotal);
    });
}

function updateGrandTotal() {
    let total = 0;
    document.querySelectorAll('#quotationTable tbody tr').forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const rowTotal = qty * price;
        row.querySelector('.total').textContent = rowTotal.toFixed(2);
        total += rowTotal;
    });
    document.getElementById('grandTotal').textContent = total.toFixed(2);
}

attachListeners();
