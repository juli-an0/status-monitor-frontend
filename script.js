const apiUrl = 'https://status-monitor-backend-production.up.railway.app/status/all';

async function loadStatus() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Netzwerkantwort war nicht ok');
    }

    const data = await response.json();

    // Debug: Zeige die Daten in der Konsole
    console.log(data);  // Hier siehst du das Array mit den Dienststatus

    const container = document.getElementById("status-container");
    container.innerHTML = "";

    // Dienste aus dem Array durchgehen
    data.forEach((item) => {
      const { service, status } = item;  // Destructure service und status

      const box = document.createElement("div");
      box.className = "status-box";
      box.innerHTML = `<h3>${service}</h3><p>${status}</p>`;
      container.appendChild(box);
    });
  } catch (err) {
    console.error("Fehler beim Laden des Status:", err);
  }
}

document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const boxes = document.querySelectorAll(".status-box");

  boxes.forEach(box => {
    const name = box.querySelector("h3").textContent.toLowerCase();
    box.style.display = name.includes(query) ? "block" : "none";
  });
});

window.onload = loadStatus;
