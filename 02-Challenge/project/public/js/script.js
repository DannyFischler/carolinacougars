document.addEventListener('DOMContentLoaded', (event) => {
  // Attempt to get gameId from URL path
  const gameId = window.location.pathname.split('/')[2];
  if (gameId) {
    document.getElementById('gameSlug').value = gameId;
    loadGameDetails(gameId);
  }

  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search-input').value;
    searchAndDisplayGame(searchQuery);
  });

  const commentForm = document.getElementById('comment-form');
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    submitComment();
  });
});

function searchAndDisplayGame(searchQuery) {
  fetch(`/api/games/search/${encodeURIComponent(searchQuery)}`)
    .then(response => response.json())
    .then(data => {
      displayGameInfo(data.gameDetails);
      displayAttributes(data.attributes);
      document.getElementById('gameSlug').value = data.gameDetails.id; // Assuming the game ID is returned here
      selectAttribute('overview'); // Automatically select the "Overview" upon search
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function loadGameDetails(gameId) {
  fetch(`/api/games/search/${gameId}`)
    .then(response => response.json())
    .then(data => {
      displayGameInfo(data.gameDetails);
      displayAttributes(data.attributes);
      displayComments(data.comments);
      selectAttribute('overview');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayGameInfo(gameDetails) {
  const gameInfoDiv = document.getElementById('game-info');
  gameInfoDiv.innerHTML = `<h2>${gameDetails.name}</h2>`; // Add more details as needed
}

function displayAttributes(attributes) {
  const attributesList = document.getElementById('game-attributes-list');
  attributesList.innerHTML = `<li id="overview" onclick="selectAttribute('overview')">Overview</li>` +
    attributes.map(attribute =>
    `<li onclick="selectAttribute('${attribute}')">${attribute}</li>`
  ).join('');
}

function selectAttribute(attribute) {
  document.getElementById('attribute').value = attribute;
  const gameId = document.getElementById('gameSlug').value;
  fetchAndDisplayComments(gameId, attribute);
}

function fetchAndDisplayComments(gameId, attribute) {
  let url = `/api/comments/${gameId}`;
  if (attribute && attribute !== 'overview') {
    url += `/${attribute}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(comments => {
      displayComments(comments);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayComments(comments) {
  const commentsDiv = document.getElementById('comments');
  commentsDiv.innerHTML = comments.map(comment =>
    `<p>${comment.user.user_name}: ${comment.text}</p>`
  ).join('');
}

function submitComment() {
  const gameId = document.getElementById('gameSlug').value;
  const attribute = document.getElementById('attribute').value;
  const commentText = document.getElementById('commentText').value;

  fetch(`/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameSlug: gameId,
      attribute: attribute,
      text: commentText
    }),
  })
  .then(response => response.json())
  .then(comment => {
    addCommentToDisplay(comment);
    document.getElementById('commentText').value = ''; // Clear the input after submission
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function addCommentToDisplay(comment) {
  const commentsDiv = document.getElementById('comments');
  commentsDiv.innerHTML += `<p>${comment.user.user_name}: ${comment.text}</p>`;
}
