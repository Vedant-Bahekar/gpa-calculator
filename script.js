window.addEventListener('DOMContentLoaded', () => {
    const numInput = document.getElementById('numSubjects');
    const scaleSelect = document.getElementById('scale');
    const createBtn = document.getElementById('createTable');
    const form = document.getElementById('gpaForm');
    const resultDiv = document.getElementById('result');
    const prevCgpaInput = document.getElementById('prevCgpa');
    const prevCreditsInput = document.getElementById('prevCredits');
    const cgpaBtn = document.getElementById('calculateCgpa');
    const cgpaResultDiv = document.getElementById('cgpaResult');

    function showError(msg) {
        alert(msg);
    }

    createBtn.addEventListener('click', e => {
        e.preventDefault();
        const n = +numInput.value;
        const scale = +scaleSelect.value;
        form.innerHTML = '';
        resultDiv.textContent = '';
        if (!n || n < 1) return showError('Enter a valid number of subjects.');

        const table = document.createElement('table');
        table.innerHTML = `
        <thead>
          <tr>
            <th>Subject</th>
            <th>Credit</th>
            <th>Grade (0-${scale})</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: n }).map(() => (
            `<tr>
              <td><input type="text" class="subj" placeholder="Name" required></td>
              <td><input type="number" class="credit" step="0.5" min="0" required></td>
              <td><input type="number" class="grade" step="0.01" min="0" max="${scale}" required></td>
            </tr>`
        )).join('')}
        </tbody>`;
        form.appendChild(table);

        const calcBtn = document.createElement('button');
        calcBtn.textContent = 'Calculate GPA';
        calcBtn.className = 'btn';
        calcBtn.addEventListener('click', ev => {
            ev.preventDefault();
            const credits = [...form.querySelectorAll('.credit')].map(i => +i.value);
            const grades = [...form.querySelectorAll('.grade')].map(i => +i.value);
            const totalCredit = credits.reduce((a, b) => a + b, 0);
            const weightedSum = credits.reduce((sum, c, i) => sum + c * grades[i], 0);
            if (!totalCredit) return showError('Credits must sum to more than zero.');
            const gpa = (weightedSum / totalCredit).toFixed(2);
            resultDiv.textContent = `Your GPA is ${gpa} / ${scale}`;
        });
        form.appendChild(calcBtn);
    });

    cgpaBtn.addEventListener('click', e => {
        e.preventDefault();
        const prevCgpa = +prevCgpaInput.value;
        const prevCredits = +prevCreditsInput.value;
        if (prevCgpa < 0 || prevCredits < 0) return showError('Enter valid previous CGPA and credits.');
        const match = resultDiv.textContent.match(/GPA is ([\d.]+)/);
        if (!match) return showError('Calculate GPA first.');

        const currGpa = +match[1];
        const currCredits = [...form.querySelectorAll('.credit')].reduce((a, i) => a + +i.value, 0);
        const totalCredits = prevCredits + currCredits;
        if (!totalCredits) return showError('Total credits must be more than zero.');
        const cumulative = ((prevCgpa * prevCredits + currGpa * currCredits) / totalCredits).toFixed(2);
        cgpaResultDiv.textContent = `Your cumulative CGPA is ${cumulative}`;
    });
});