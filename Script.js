let characters = [];
let history = [];
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

fetch('data/characters.json')
  .then(response => response.json())
  .then(data => {
    characters = data;
    document.getElementById('rollButton').addEventListener('click', rollCharacter);
    updateInventoryDisplay();
  });

function rollCharacter() {
  const rand = Math.random();
  let cumulative = 0;
  let selected = null;

  for (let char of characters) {
    cumulative += char.Rates;
    if (rand < cumulative) {
      selected = char;
      break;
    }
  }

  if (selected) {
    displayResult(selected);
    history.push(selected);
    updateHistoryDisplay();
    if (!inventory.find(c => c.Name === selected.Name)) {
      inventory.push(selected);
      localStorage.setItem('inventory', JSON.stringify(inventory));
      updateInventoryDisplay();
    }
  }
}

function displayResult(char) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h3>${char.Name}</h3>
    <p>Rarity: ${char.Rarity}</p>
    <p>Type: ${char.Type}</p>
    <img src="https://via.placeholder.com/100x100?text=${encodeURIComponent(char.Name)}" alt="${char.Name}" />
  `;
}

function updateHistoryDisplay() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  history.forEach(char => {
    const li = document.createElement('li');
    li.textContent = `${char.Name} (${char.Rarity})`;
    historyList.appendChild(li);
  });
}

function updateInventoryDisplay() {
  const inventoryList = document.getElementById('inventoryList');
  inventoryList.innerHTML = '';
  inventory.forEach(char => {
    const li = document.createElement('li');
    li.textContent = `${char.Name} (${char.Rarity})`;
    inventoryList.appendChild(li);
  });
}
