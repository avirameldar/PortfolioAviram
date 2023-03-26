//constructor for movie
function Movie(name, length, category, price) {
  this.name = name;
  this.length = length;
  this.category = category;
  this.price = price;
  this.html = document.createElement("div");
  this.html.innerText = `Name: ${this.name}\nLength: ${this.length}\nCategory: ${this.category}\nPrice: ${this.price}$`;
  this.html.className = "movieDiv";
  //delete movie
  this.deleteBtn = document.createElement("button");
  this.deleteBtn.innerText = "Delete";
  this.deleteBtn.className = "deleteBtn";
  this.html.appendChild(this.deleteBtn);
  this.id = this.name + this.length;
  this.deleteBtn.addEventListener("click", () => {
    let theMovieIndex = movies.findIndex((movie) => {
      return movie.id == this.id;
    });
    movies.splice(theMovieIndex, 1);
    showMovies(movies);
  });
}
//create array of movies with data
let movies = [];
movies.push(new Movie("luck", 100, "comedy", 32));
movies.push(new Movie("heart", 85, "drama", 40));
movies.push(new Movie("unholy", 100, "horror", 32));
movies.push(new Movie("blonde", 135, "drama", 25));
movies.push(new Movie("me time", 92, "comedy", 30));
movies.push(new Movie("choose or die", 118, "horror", 36));
movies.push(new Movie("red note", 110, "comedy", 40));

//create div with + sign
let addBlock = document.createElement("div");
addBlock.className = "movieDiv";
addBlock.style.fontSize = "32px";
addBlock.innerText = "+";

//show the movies in the page
function showMovies(movies) {
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = "";
  movies.map((movie) => {
    moviesContainer.appendChild(movie.html);
  });
  moviesContainer.appendChild(addBlock);
}
//function that creates newArray that includes the text from the text input
function searchMovie() {
  //get the value from the search bar
  let searchInputValue = document.getElementById("searchInput").value;
  //filter function
  let newMoviesArray = movies.filter((movie) => {
    return movie.name.includes(searchInputValue);
  });
  showMovies(newMoviesArray);
}

//initial state
showMovies(movies);

//execute the function when text change/entered
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchMovie);
//show the result in console

//on click the + div => show the form
const formContainer = document.getElementById("formContainer");

addBlock.addEventListener("click", () => {
  formContainer.style = "display:block;";
});

//find the btn in the form
const formBtn = document.getElementById("formBtn");
//when click => find all the inpunts values
formBtn.addEventListener("click", () => {
  let newMovieName = document.getElementById("movieName").value;
  let newMovieLength = document.getElementById("movieLength").value;
  let newMovieCategory = document.getElementById("category").value;
  let newMoviePrice = document.getElementById("moviePrice").value;
  //create new Movie
  let myNewMovie = new Movie(
    newMovieName,
    newMovieLength,
    newMovieCategory,
    newMoviePrice
  );
  movies.push(myNewMovie);
  showMovies(movies);

  //hide the form
  formContainer.style = "display:none;";
  //reset the form
  const addForm = document.getElementById("addForm");
  addForm.reset();
});

//filter by category
//step 1 : add event listener
const filterCategory = document.getElementById("categoryFilter");
filterCategory.addEventListener("change", () => {
  //step 2: filter the array
  let filteredMovies = movies.filter((movie) => {
    return movie.category == filterCategory.value;
  });
  //step 3: show to filtered movies
  showMovies(filteredMovies);
});

//filter by len
//step 1: add event listener to the btn
const filterByLenBtn = document.getElementById("filterLenBtn");
filterByLenBtn.addEventListener("click", () => {
  //step 2: get the values
  let fromLen = document.getElementById("fromLen").value;
  let toLen = document.getElementById("toLen").value;
  //step 3: filter
  let filteredMovies = movies.filter((movie) => {
    return movie.length >= fromLen && movie.length <= toLen;
  });
  //step 4: show after filter
  showMovies(filteredMovies);
});

//sort function
//add event listener to the select
const sortBySelect = document.getElementById("sortBySelect");
sortBySelect.addEventListener("change", () => {
  let sortedMovies = movies.sort((a, b) => {
    switch (sortBySelect.value) {
      case "category":
        if (a.category > b.category) {
          return 1;
        }
        if (a.category < b.category) {
          return -1;
        }
        return 0;
        break;
      case "length":
        return a.length - b.length;
        break;
      case "name":
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
        break;
      case "priceLow2High":
        return b.price - a.price;
        break;
      case "PriceHigh2Low":
        return a.price - b.price;
        break;
      default:
        return 0;
        break;
    }
  });
  showMovies(sortedMovies);
});
