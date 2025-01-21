// Autor Danilo Ramos A
// Variables globales
let participants = [];

// Elementos del DOM
const participantNameInput = document.getElementById('participantName');
const addParticipantButton = document.getElementById('addParticipant');
const generateSecretFriendsButton = document.getElementById('generateSecretFriends');
const participantsList = document.getElementById('list');
const resultDiv = document.getElementById('result');
const resultList = document.getElementById('resultList');

// Función para agregar un participante
addParticipantButton.addEventListener('click', () => {
  const name = participantNameInput.value.trim();
  if (name && !participants.includes(name)) {
    participants.push(name);
    updateParticipantsList();
    participantNameInput.value = '';
  }
  if (participants.length >= 2) {
    generateSecretFriendsButton.disabled = false;
  }
});

// Actualiza la lista de participantes en el DOM
function updateParticipantsList() {
  participantsList.innerHTML = '';
  participants.forEach(participant => {
    const li = document.createElement('li');
    li.textContent = participant;
    participantsList.appendChild(li);
  });
}

// Función para generar los amigos secretos
generateSecretFriendsButton.addEventListener('click', () => {
  if (participants.length < 2) return;

  const shuffledParticipants = [...participants];
  shuffleArray(shuffledParticipants);

  const assignments = {};
  shuffledParticipants.forEach((participant, index) => {
    assignments[participant] = shuffledParticipants[(index + 1) % shuffledParticipants.length];
  });

  showResults(assignments);
});

// Función para mezclar un array (algoritmo de Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Muestra los resultados en el DOM
function showResults(assignments) {
  resultDiv.style.display = 'block';
  resultList.innerHTML = '';
  
  for (const participant in assignments) {
    const li = document.createElement('li');
    li.textContent = `${participant} -> ${assignments[participant]}`;
    resultList.appendChild(li);
  }
}
