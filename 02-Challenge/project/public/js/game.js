const searchGame = async (event) => {
  event.preventDefault();

  const searchText = document.querySelector("#inputGame").value.trim();
  if (searchText) {
  document.location.replace(`games/search/${searchText}`);
  } else {
    alert("enter a game to search!");
  }
};

const addComment = async (event) => {
    event.preventDefault();
  
    const commentText = document.querySelector("#inputComment").value.trim();
  };

document.querySelector("#search-button").addEventListener("click", searchGame);

document.querySelector("#comment-button").addEventListener("click", addComment);
