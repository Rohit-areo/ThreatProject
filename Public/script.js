const socket = io();
const threatLog = document.getElementById('threat-log');
const ctx = document.getElementById('threatChart').getContext('2d');

// Chart Setup
const threatChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Threat Level',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Update chart with real-time data
socket.on('newThreatData', (data) => {
  threatChart.data.labels.push(data.time);
  threatChart.data.datasets[0].data.push(data.threatLevel);
  threatChart.update();

  // Add to log
  const newLogItem = document.createElement('li');
  newLogItem.textContent = `${data.time} - Threat Level: ${data.threatLevel}`;
  threatLog.appendChild(newLogItem);
});

// Add manual threat (e.g., from admin panel)
function addManualThreat() {
  fetch('/api/threats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      time: new Date().toLocaleTimeString(),
      threatLevel: Math.floor(Math.random() * 6),
      description: 'Manually created threat'
    })
  })
  .then(response => response.json())
  .then(data => console.log('Threat added:', data));
}

// Fetch past threats on load
window.onload = () => {
  fetch('/api/threats')
    .then(res => res.json())
    .then(threats => {
      threats.forEach(threat => {
        threatChart.data.labels.push(threat.time);
        threatChart.data.datasets[0].data.push(threat.threatLevel);
        const logItem = document.createElement('li');
        logItem.textContent = `${threat.time} - Threat Level: ${threat.threatLevel}`;
        threatLog.appendChild(logItem);
      });
      threatChart.update();
    });
};
