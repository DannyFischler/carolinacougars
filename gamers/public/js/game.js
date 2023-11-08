const searchGame = async (event) => {

  event.preventDefault();

  // const gameSearchText = JSON.stringify(document.querySelector('#inputGame').value.trim());
console.log("CALL OF DUTY");
  document.location.assign(`api/games/search/call-of-duty`);
};

document
.querySelector('#search-button')
.addEventListener('click', searchGame);