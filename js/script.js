/* Treehouse Techdegree: Data Pagination and Filtering */

//GLOBAL VARIABLES
const itemsPerPage = 9;
const searchBar = `<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button id ="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
const studentList = document.querySelector('.student-list');

/* SearchBar Feature */
const header = document.querySelector('.header');
header.insertAdjacentHTML('beforeend', searchBar);
const searchInput = document.querySelector('#search');
const searchSubmitBtn = document.querySelector('#search-button');

//FUNCTIONS

/*
showPage Function
-Creates and appends the elements needed to display a page of nine students
*/
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentDisplay =
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src= ${list[i].picture.medium} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
                  <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
               </li>`;
         studentList.insertAdjacentHTML('beforeend', studentDisplay);
      };
   };
};

/*
addPagination Function
-Creates and appends the elements required for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
      const button =
         `<li>
      <button type="button">${i}</button>
      </li>`;
      linkList.insertAdjacentHTML('beforeend', button);
      document.querySelector('button').className = 'active';
      linkList.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON') {
            let active = document.querySelector('.active');
            active.className = '';
            e.target.className = 'active';
            showPage(list, e.target.textContent);
         };
      });
   };
};

/*
searchStudents Function
-Filters students to be displayed on page based off search bar input.
*/

function searchStudents(list) {
   let studentMatches = [];
   for (let i = 0; i < list.length; i++) {
      let results = studentMatches;
      const name = list[i].name.first.toLowerCase() + list[i].name.last.toLowerCase();
      if (name.includes(searchInput.value.toLowerCase())) {
         studentMatches.push(list[i]);
         showPage(studentMatches, 1);
         addPagination(studentMatches);
      } else if (studentMatches.length === 0) {
         studentList.innerHTML = '';
         let noResults =
            `  <div class="no-results">
                  <h1>No Results Found</h1>
               </div>`;
         studentList.insertAdjacentHTML('beforeend', noResults);
      };
   };
};

//EVENT LISTENERS
searchInput.addEventListener('keyup', () => { searchStudents(data) });
searchSubmitBtn.addEventListener('click', () => { searchStudents(data) });

// CALL FUNCTIONS
showPage(data, 1);
addPagination(data);