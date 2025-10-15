// Tarot Card Management Admin Script

window.addEventListener('DOMContentLoaded', function () {
  const cardForm = document.getElementById('card-form');
  const cardsContainer = document.getElementById('cards-container');
  const logoutBtn = document.getElementById('logout-btn');
  const clearAllBtn = document.getElementById('clear-all');

  // Check if admin is logged in (optional)
  // const currentUser = localStorage.getItem('currentUser');
  // if (!currentUser) {
  //   alert('Please log in first.');
  //   window.location.href = 'login.html';
  //   return;
  // }

  // Load tarot cards
  let tarotCards = JSON.parse(localStorage.getItem('tarotCards')) || [];

  function displayCards() {
    cardsContainer.innerHTML = '';
    if (tarotCards.length === 0) {
      cardsContainer.innerHTML = '<p>No cards available.</p>';
      return;
    }
    tarotCards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.classList.add('card-item');
      cardEl.innerHTML = `
        <img src="${card.image}" alt="${card.name}">
        <h3>${card.name}</h3>
        <p>${card.meaning}</p>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      cardsContainer.appendChild(cardEl);
    });
  }

  function saveCards() {
    localStorage.setItem('tarotCards', JSON.stringify(tarotCards));
  }

  // Add or Edit Card
  cardForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('card-name').value.trim();
    const meaning = document.getElementById('card-meaning').value.trim();
    const image = document.getElementById('card-image').value.trim();
    const editIndex = document.getElementById('edit-index').value;

    if (!name || !meaning || !image) {
      alert('Please fill in all fields.');
      return;
    }

    if (editIndex === '') {
      tarotCards.push({ name, meaning, image });
    } else {
      tarotCards[editIndex] = { name, meaning, image };
      document.getElementById('edit-index').value = '';
    }

    saveCards();
    displayCards();
    cardForm.reset();
  });

  // Edit or Delete card using event delegation
  cardsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
      const i = e.target.dataset.index;
      const card = tarotCards[i];
      document.getElementById('card-name').value = card.name;
      document.getElementById('card-meaning').value = card.meaning;
      document.getElementById('card-image').value = card.image;
      document.getElementById('edit-index').value = i;
    } else if (e.target.classList.contains('delete-btn')) {
      const i = e.target.dataset.index;
      if (confirm('Delete this card?')) {
        tarotCards.splice(i, 1);
        saveCards();
        displayCards();
      }
    }
  });

  // Clear all
  clearAllBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete all cards?')) {
      tarotCards = [];
      saveCards();
      displayCards();
    }
  });

  // Logout
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });

  // Initial render
  displayCards();
});
