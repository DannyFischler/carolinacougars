document.addEventListener('DOMContentLoaded', (event) => {
    const gameId = window.location.pathname.split('/')[2]; // Assuming URL structure like /games/:id
    
    fetch(`/api/games/${gameId}`)
      .then(response => response.json())
      .then(data => {
        const gameInfoDiv = document.getElementById('game-info');
        gameInfoDiv.innerHTML = `
          <h2>${data.name}</h2>
          <!-- You can display other game details here -->
        `;
  
        const commentsDiv = document.getElementById('comments');
        data.Comments.forEach(comment => {
          commentsDiv.innerHTML += `<p>${comment.text}</p>`;
        });
      });
  
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const text = event.target.text.value;
  
      fetch(`/api/games/${gameId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      .then(response => response.json())
      .then(() => {
        window.location.reload();
      });
    });
  });
  