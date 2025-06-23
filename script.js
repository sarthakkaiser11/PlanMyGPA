// ---------- SGPA Section ----------
function calculateSGPA() {
    const rows = document.querySelectorAll("#sgpa-body tr");
    let totalCredits = 0, totalWeighted = 0;

    rows.forEach((row) => {
        const credit = parseFloat(row.querySelector(".credit")?.value || 0);
        const grade = parseFloat(row.querySelector(".grade")?.value || 0);

        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            totalWeighted += credit * grade;
        }
    });

    const sgpa = totalCredits > 0 ? (totalWeighted / totalCredits).toFixed(2) : "N/A";
    document.getElementById("sgpa-output").textContent = `Your SGPA is: ${sgpa}`;
}

document.getElementById("calc-sgpa").addEventListener("click", calculateSGPA);

document.getElementById("add-sgpa-row").addEventListener("click", () => {
    const table = document.getElementById("sgpa-body");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="text" placeholder="e.g. DBMS" /></td>
      <td><input type="number" class="credit" min="0" step="0.5" /></td>
      <td>
        <select class="grade">
          <option value="">Select</option>
          <option value="10">A</option>
          <option value="9">A-</option>
          <option value="8">B</option>
          <option value="7">B-</option>
          <option value="5">C</option>
          <option value="2">E</option>
        </select>
      </td>
      <td><button class="remove-row">❌</button></td>
    `;
    table.appendChild(newRow);
});

// Delegate row deletion
document.getElementById("sgpa-body").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-row")) {
        e.target.closest("tr").remove();
    }
});

