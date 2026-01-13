function calculateROI() {
    const employees = parseInt(document.getElementById('roi-employees').value) || 50;
    const hourlyRate = parseInt(document.getElementById('roi-hourly-rate').value) || 50;
    const manualHours = parseInt(document.getElementById('roi-manual-hours').value) || 10;
    const impact = parseFloat(document.getElementById('roi-impact').value) || 0.55;

    const timeSavedPerWeek = manualHours * impact * employees;
    const annualTimeSaved = timeSavedPerWeek * 52;
    const annualSavings = annualTimeSaved * hourlyRate;
    
    const estimatedInvestment = 50000;
    const roi = ((annualSavings - estimatedInvestment) / estimatedInvestment) * 100;
    
    const productivityGain = impact * 100;

    document.getElementById('result-time-saved').textContent = Math.round(timeSavedPerWeek).toLocaleString() + ' hours';
    document.getElementById('result-annual-savings').textContent = '€' + Math.round(annualSavings).toLocaleString();
    document.getElementById('result-roi').textContent = Math.round(roi) + '%';
    document.getElementById('result-productivity').textContent = Math.round(productivityGain) + '%';

    document.querySelectorAll('[id^="result-"]').forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    calculateROI();
});
