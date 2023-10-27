function searchGame() {
  const gameName = document.getElementById('gameName').value;

  // Call the backend route to search for the game
  fetch(`/search?game=${gameName}`)
  .then(response => response.json())
  .then(data => {
      // Display game details
      const gameDetailsDiv = document.getElementById('gameDetails');
      gameDetailsDiv.innerHTML = `<h3>${data.title}</h3>
                                  <img src="${data.image}" alt="${data.title}">
                                  <p>${data.description}</p>`;
      
      // Display comments (you can enhance this)
      const commentsSection = document.getElementById('commentsSection');
      data.comments.forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.innerText = comment;
          commentsSection.appendChild(commentDiv);
      });

      // Add a form to submit new comments
      const commentForm = document.createElement('form');
      commentForm.innerHTML = `<input type="text" name="comment" placeholder="Add a comment">
                               <input type="submit" value="Submit">`;
      commentsSection.appendChild(commentForm);
  });
}
