// Add Row
document.getElementById("add-row").addEventListener("click", () => {
    const tableBody = document.getElementById("course-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td><input type="text" placeholder="e.g. Course" /></td>
      <td><input type="number" class="credit-input" min="0" step="0.5" /></td>
      <td>
        <select class="grade-select">
          <option value="">--Grade--</option>
          <option value="10">A</option>
          <option value="9">A-</option>
          <option value="8">B</option>
          <option value="7">B-</option>
          <option value="5">C</option>
          <option value="2">E</option>
        </select>
      </td>
      <td><button class="delete-row">❌</button></td>
    `;
    tableBody.appendChild(newRow);
    addDeleteListeners();
});

function addDeleteListeners() {
    document.querySelectorAll(".delete-row").forEach(btn => {
        btn.onclick = () => btn.closest("tr").remove();
    });
}
addDeleteListeners();

// SGPA Calculation
document.getElementById("calculate-sgpa").addEventListener("click", () => {
    const creditInputs = document.querySelectorAll(".credit-input");
    const gradeSelects = document.querySelectorAll(".grade-select");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < creditInputs.length; i++) {
        const credit = parseFloat(creditInputs[i].value);
        const grade = parseFloat(gradeSelects[i].value);

        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            totalPoints += credit * grade;
        }
    }

    const sgpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
    document.getElementById("sgpa-result").innerText = `Your SGPA is: ${sgpa}`;
});

// CGPA Planner (Required SGPA)
document.getElementById("calculate-target-sgpa").addEventListener("click", () => {
    const currentCGPA = parseFloat(document.getElementById("planner-current-cgpa").value);
    const totalCredits = parseFloat(document.getElementById("current-total-credits").value);
    const nextSemCredits = parseFloat(document.getElementById("next-sem-credits").value);
    const targetCGPA = parseFloat(document.getElementById("target-cgpa").value);

    const resultBox = document.getElementById("target-sgpa-result");

    // Validate inputs
    if (
        [currentCGPA, totalCredits, nextSemCredits, targetCGPA].some((val) => isNaN(val)) ||
        totalCredits < 0 || nextSemCredits <= 0
    ) {
        resultBox.innerText = "⚠️ Please enter valid and non-negative numbers.";
        return;
    }

    const requiredTotalPoints = targetCGPA * (totalCredits + nextSemCredits);
    const currentPoints = currentCGPA * totalCredits;
    const requiredSGPA = (requiredTotalPoints - currentPoints) / nextSemCredits;

    if (requiredSGPA > 10.0) {
        resultBox.innerText = `🚫 Not achievable: Required SGPA is ${requiredSGPA.toFixed(2)} > 10.`;
    } else if (requiredSGPA < 0) {
        resultBox.innerText = `❌ Your target CGPA is too low compared to current performance.`;
    } else {
        resultBox.innerText = `🎯 You need an SGPA of at least ${requiredSGPA.toFixed(2)} next semester to reach a CGPA of ${targetCGPA}.`;
    }

});

// Reverse CGPA (After next SGPA)
document.getElementById("calculate-reverse-cgpa").addEventListener("click", () => {
    const currentCGPA = parseFloat(document.getElementById("rev-current-cgpa").value);
    const currentCredits = parseFloat(document.getElementById("rev-current-total-credits").value);
    const expectedSGPA = parseFloat(document.getElementById("rev-expected-sgpa").value);
    const nextCredits = parseFloat(document.getElementById("rev-next-sem-credits").value);

    if ([currentCGPA, currentCredits, expectedSGPA, nextCredits].some(isNaN) || nextCredits <= 0) {
        document.getElementById("reverse-cgpa-result").innerText = "⚠️ Invalid input.";
        return;
    }

    const totalPoints = (currentCGPA * currentCredits) + (expectedSGPA * nextCredits);
    const newCGPA = ((currentCGPA * currentCredits) + (expectedSGPA * nextCredits)) / (currentCredits + nextCredits);

    document.getElementById("reverse-cgpa-result").innerText = `📈 New CGPA: ${newCGPA.toFixed(2)}`;
});

// Dark Mode Toggle
const toggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
}
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    toggle.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem("theme", dark ? "dark" : "light");
});
