document.addEventListener('DOMContentLoaded', (event) => {
  const gameId = window.location.pathname.split('/')[2]; // Assumes URL structure like /games/:id

  // Adjusted to match the endpoint in gameRoutes.js
  fetch(`/api/games/search/${gameId}`)
    .then(response => response.json())
    .then(data => {
      const gameInfoDiv = document.getElementById('game-info');
      // Here you'll need to adjust according to the actual game details you want to display
      gameInfoDiv.innerHTML = `
        <h2>${data.gameDetails.name}</h2>
        <!-- Add more game details here -->
      `;

      const commentsDiv = document.getElementById('comments');
      // The comments are now part of the data object, not nested under data.Comments
      data.comments.forEach(comment => {
        commentsDiv.innerHTML += `<p>${comment.text}</p>`;
      });
    });

  const commentForm = document.getElementById('comment-form');
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = event.target.text.value;

    // Adjusted to match the endpoint in commentRoutes.js
    fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameName: gameId, text }), // Assuming gameName is the name you use to search
    })
    .then(response => response.json())
    .then(() => {
      window.location.reload(); // Reload to see new comments
    })
    .catch(error => console.error('Error:', error));
  });
});
