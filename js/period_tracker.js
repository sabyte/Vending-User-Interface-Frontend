document.getElementById('periodForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const lastPeriodDate = new Date(document.getElementById('lastPeriodDate').value);
    const cycleLength = parseInt(document.getElementById('cycleLength').value);

    if (isNaN(lastPeriodDate.getTime()) || isNaN(cycleLength) || cycleLength <= 0) {
        alert('Please enter valid inputs.');
        return;
    }

    const nextPeriodDate = new Date(lastPeriodDate.getTime());
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h5>Your next period is expected to start on: ${nextPeriodDate.toDateString()}</h5>`;
});
