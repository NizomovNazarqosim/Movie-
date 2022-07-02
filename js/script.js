const elBody = document.querySelector("body");
const elList = document.querySelector(".movie__list");
const numResult = document.querySelector(".movie__result-num");
const elFotmFilter = document.querySelector(".form-filter");
const elSelect = document.querySelector(".select");
const bookmarkedList = document.querySelector(".bookmarked-list");
const nightBtn = document.querySelector(".night");
const dayBtn = document.querySelector(".day");
const bookmarkTitle = document.querySelector(".bookmark-title");

numResult.textContent = films.length;

// start of Bookmark

// Start of Night && day mode

nightBtn.addEventListener("click", function(e){

   elBody.style.backgroundColor = "black";
   bookmarkTitle.style.color = "white";
});

dayBtn.addEventListener("click", function(evt){
  elBody.style.backgroundColor = "white";
  bookmarkTitle.style = "black";
})


// End of Night && day mode


const localStorageBookmark = JSON.parse(window.localStorage.getItem("bookmarks"))
const bookmarks = localStorageBookmark || [];


bookmarkedList.addEventListener("click", function(evt){
  if(evt.target.matches(".bookmark-delete-btn")){
    const bookmarkDeleteId = evt.target.dataset.bookmarkDeleteId;
    const foundBookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id === bookmarkDeleteId);
  bookmarks.splice(foundBookmarkIndex, 1);

  bookmarkedList.innerHTML = null;

  renderBookmars(bookmarks, bookmarkedList);

  window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  if(bookmarks.length === 0){
    window.localStorage.removeItem("bookmarks");
  }
  renderBookmars(bookmarks, bookmarkedList);
  }
})

const renderBookmars = function(arr, htmlElement){
  bookmarkedList.innerHTML = null;
  arr.forEach(bookmark => {
    const bookmarkItem = document.createElement("li");
    const bookmarkDeleteBtn = document.createElement("button");

    bookmarkItem.textContent = bookmark.title;
    bookmarkDeleteBtn.textContent = "Remove";

  window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // setattribute
    bookmarkDeleteBtn.setAttribute("class", "bookmark-delete-btn btn btn-danger");
    bookmarkItem.setAttribute("class", "bookmark-item");

    // Dataset
    bookmarkDeleteBtn.dataset.bookmarkDeleteId = bookmark.id;

    htmlElement.appendChild(bookmarkItem);
    bookmarkItem.appendChild(bookmarkDeleteBtn);
  })
}
renderBookmars(bookmarks, bookmarkedList);

elList.addEventListener("click", function(evt){
if(evt.target.matches(".btn-bookmark")){
  const bookmarkId = evt.target.dataset.bookmarkBtnId;
  
  const foundBookmark = films.find(film => film.id === bookmarkId);

const x = bookmarks.find(e => e.id == bookmarkId) 

if(!x){
  bookmarks.push(foundBookmark);
}

bookmarkedList.innerHTML = null;

window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

 renderBookmars(bookmarks, bookmarkedList)
  

}
})

// end of Bookmark
const renderGenres = function(arr){
    const uniqueGenres = [];
    arr.forEach((film) => {
      film.genres.forEach(genre => {
       if(!uniqueGenres.includes(genre)){
        uniqueGenres.push(genre);
        
       } 
    });
    });

    uniqueGenres.forEach((genre) =>{
    const genreOption = document.createElement("option");
     genreOption.textContent = genre;
     genreOption.value = genre;
    elSelect.appendChild(genreOption);
    })
}

const renderMovies = function(filmsArr, htmlElement){
   filmsArr.forEach((movie) => {
     // Create element
     const newLi = document.createElement("li");
     const newImg = document.createElement("img");
     const newDiv = document.createElement("div");
     const newHeading = document.createElement("h5");
     const btnBookmark = document.createElement("button");
     const overviewDiv = document.createElement("div");
 
     // Set attribute
     newLi.setAttribute("class", "item-for card mb-3");
     newLi.style.width = "18rem";
     newLi.style.height = "660px"
     newLi.style.position = "relative"
     newImg.classList.add("card-img-top");
     newImg.setAttribute("src", movie.poster);
     newDiv.setAttribute("class", "card-body");
     newHeading.setAttribute("class", "card-title");
     btnBookmark.setAttribute("class", "btn-bookmark");
     overviewDiv.setAttribute("class", "description")

    //  dataset
    btnBookmark.dataset.bookmarkBtnId = movie.id;
    overviewDiv.textContent = movie.overview;
     
   
   
     newHeading.textContent = movie.title;
     btnBookmark.textContent = "Bookmark";
     
     const genreList = document.createElement("ul");
    movie.genres.forEach((genre) =>{
        const genresItem = document.createElement("li");
        genresItem.setAttribute("class", "list-unstyled fw-bolder fs-5");

        genresItem.textContent = genre;

        genreList.appendChild(genresItem);
    })

     // Append
     htmlElement.appendChild(newLi);
     newLi.appendChild(newImg);
     newLi.appendChild(newDiv);
     newDiv.appendChild(newHeading);
     newDiv.appendChild(btnBookmark);
    newDiv.appendChild(genreList);
    newDiv.appendChild(overviewDiv)
  
  }
)}
renderMovies(films, elList);
renderGenres(films); 

elFotmFilter.addEventListener("submit", function(evt){
    evt.preventDefault()

    elList.innerHTML= null;
    selectValue = elSelect.value;
    const filteredFilms = []
    films.forEach((film) => {
      if(selectValue === "all" || film.genres.includes(selectValue)){
        filteredFilms.push(film);
      } 
    })

    renderMovies(filteredFilms, elList);
})
