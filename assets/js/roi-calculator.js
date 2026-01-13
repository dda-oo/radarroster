function calculateROI() {
    const employees = parseInt(document.getElementById('roi-employees').value) || 50;
    const hourlyRate = parseFloat(document.getElementById('roi-hourly-rate').value) || 50;
    const manualHoursPerWeek = parseFloat(document.getElementById('roi-manual-hours').value) || 8;
    const dataQualityIssuesPerMonth = parseInt(document.getElementById('roi-data-issues').value) || 15;
    const avgCostPerIssue = parseFloat(document.getElementById('roi-cost-per-issue').value) || 500;
    
    const productivityGain = 0.55;
    const timeToInsightImprovement = 0.70;
    
    const totalManualHoursPerWeek = manualHoursPerWeek * employees;
    const hoursSavedPerWeek = totalManualHoursPerWeek * productivityGain;
    const annualTimeSavings = hoursSavedPerWeek * 52 * hourlyRate;
    
    const annualDataQualityCost = dataQualityIssuesPerMonth * 12 * avgCostPerIssue;
    const dataQualitySavings = annualDataQualityCost * 0.70;
    
    const fasterInsightsValue = employees * hourlyRate * 4 * 52 * timeToInsightImprovement;
    
    const totalAnnualValue = annualTimeSavings + dataQualitySavings + fasterInsightsValue;
    
    const estimatedInvestment = 50000 + (employees * 200);
    const netROI = ((totalAnnualValue - estimatedInvestment) / estimatedInvestment) * 100;
    const paybackMonths = Math.ceil((estimatedInvestment / totalAnnualValue) * 12);
    
    document.getElementById('result-time-saved').textContent = Math.round(hoursSavedPerWeek).toLocaleString() + ' hours/week';
    document.getElementById('result-annual-savings').textContent = '€' + Math.round(annualTimeSavings).toLocaleString();
    document.getElementById('result-data-quality-savings').textContent = '€' + Math.round(dataQualitySavings).toLocaleString();
    document.getElementById('result-insight-value').textContent = '€' + Math.round(fasterInsightsValue).toLocaleString();
    document.getElementById('result-total-value').textContent = '€' + Math.round(totalAnnualValue).toLocaleString();
    document.getElementById('result-roi').textContent = Math.round(netROI) + '%';
    document.getElementById('result-payback').textContent = paybackMonths + ' months';
    
    document.querySelectorAll('[id^="result-"]').forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    calculateROI();
    
    const inputs = ['roi-employees', 'roi-hourly-rate', 'roi-manual-hours', 'roi-data-issues', 'roi-cost-per-issue'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', calculateROI);
            if (element.type === 'range') {
                element.addEventListener('change', calculateROI);
            }
        }
    });
});
