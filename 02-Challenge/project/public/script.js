document.addEventListener('DOMContentLoaded', (event) => {
  const gameId = window.location.pathname.split('/')[2];
  document.getElementById('gameSlug').value = gameId;

  fetch(`/api/games/search/${gameId}`)
    .then(response => response.json())
    .then(data => {
      const gameInfoDiv = document.getElementById('game-info');
      gameInfoDiv.innerHTML = `<h2>${data.gameDetails.name}</h2>`;

      const attributesDiv = document.getElementById('game-attributes');
      attributesDiv.innerHTML = data.attributes.map(attribute =>
        `<li onclick="selectAttribute('${attribute}')">${attribute}</li>`
      ).join('');

      const commentsDiv = document.getElementById('comments');
      commentsDiv.innerHTML = data.comments.map(comment =>
        `<p>${comment.user.user_name}: ${comment.text}</p>`
      ).join('');
    });

  const commentForm = document.getElementById('comment-form');
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = document.getElementById('commentText').value;
    const attribute = document.getElementById('attribute').value;

    fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameSlug: gameId,
        category: attribute,
        text
      }),
    })
    .then(response => response.json())
    .then(comment => {
      // Append the new comment to the comments div and include user information
      const commentsDiv = document.getElementById('comments');
      commentsDiv.innerHTML += `<p>${comment.user.user_name}: ${comment.text}</p>`; // Assumes the backend returns the comment with user info
      document.getElementById('commentText').value = ''; // Clear the input after submission
    })
    .catch(error => console.error('Error:', error));
  });
});

function selectAttribute(attribute) {
  document.getElementById('attribute').value = attribute;
  fetchAndDisplayComments(window.location.pathname.split('/')[2], attribute);
}

function fetchAndDisplayComments(gameId, attribute) {
  fetch(`/api/comments/${gameId}/${attribute}`)
    .then(response => response.json())
    .then(comments => {
      const commentsDiv = document.getElementById('comments');
      commentsDiv.innerHTML = ''; // Clear previous comments
      comments.forEach(comment => {
        // Update to include the username with the comment
        commentsDiv.innerHTML += `<p>${comment.user.user_name}: ${comment.text}</p>`; 
      });
    })
    .catch(error => console.error('Error:', error));
}
