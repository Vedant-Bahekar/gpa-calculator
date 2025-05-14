const form = document.getElementById('gpaForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', e => {
  e.preventDefault();
  const credits = [4, 4, 4, 3, 2, 2, 1];
  const grades = Array.from(document.querySelectorAll('.grade')).map(i => parseFloat(i.value));
  const expected = parseFloat(document.getElementById('expected').value);
  const totalCredits = credits.reduce((a, b) => a + b, 0);
  const weightedSum = grades.reduce((s, g, i) => s + g * credits[i], 0);
  const gpa = +(weightedSum / totalCredits).toFixed(2);
  let msg = `Your GPA: ${gpa}`;
  if (!isNaN(expected)) msg += expected <= gpa ? ` (✅ Met ${expected})` : ` (⚠️ Below ${expected})`;
  resultDiv.textContent = msg;
  const prevCgpa = parseFloat(document.getElementById('prevCgpa').value);
  const prevCredits = parseFloat(document.getElementById('prevCredits').value);
  if (!isNaN(prevCgpa) && !isNaN(prevCredits) && prevCredits > 0) {
    const newCgpa = ((prevCgpa * prevCredits) + (gpa * totalCredits)) / (prevCredits + totalCredits);
    document.getElementById('newCgpa').value = newCgpa.toFixed(2);
  }
});
