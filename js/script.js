/*Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) { 
  const itemsPerPage = 9;
  const startIndex = (page * itemsPerPage) - itemsPerPage
  const endIndex = page * itemsPerPage;
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';

  for (let i = 0; i < list.length; i++) {
    let lis = list[i];
    if (i >= startIndex && i < endIndex) {
      let studentItem = `
          <li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src=${lis.picture.medium} alt="Profile Picture">
              <h3>${lis.name.first} ${lis.name.last}</h3>
              <span class="email">${lis.email}</span>
            </div>
            <div class="joined-details">
              <span class="date">Joined ${lis.registered.date}</span>
            </div>
          </li>
        `;

      studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  let numOfPages = Math.ceil(list.length / 9);
  let linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';
  for (let i = 1; i <= numOfPages; i++) {
    let button = `
        <li>
        <button type="button">${i}</button>
        </li>
      `;

    linkList.insertAdjacentHTML('beforeend', button);
    const buttonActive = document.querySelector('li button');
    buttonActive.className = 'active';
  }

  linkList.addEventListener('click', (e) => {
    const button = e.target;
    const pageNumber = button.textContent;
    const buttonActive = linkList.querySelector('.active');
    if (e.target.tagName === 'BUTTON') {
      buttonActive.className = '';
      button.className = 'active';
      showPage(list, pageNumber);
    }
  });

}


 // search 

function addSearchBar() {
  const header = document.querySelector('.header');
  const inputForm = document.createElement('label');
  inputForm.innerHTML = `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button id="submit" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  `;

  header.appendChild(inputForm);
}
// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();

// filters results
function searchBar(searchInput, list) {
  let resultArray = [];
  for (let i = 0; i < list.length; i++) {
    const firstName = list[i].name.first.toLowerCase();
    const lastName = list[i].name.last.toLowerCase();
    if (searchInput.value.length !== 0 && firstName.includes(searchInput.value.toLowerCase()) || lastName.includes(searchInput.value.toLowerCase())) {
      resultArray.push(list[i]);
      showPage(resultArray, 1)
      addPagination(resultArray);
    } else if (resultArray.length === 0) {
      document.querySelector('.student-list').innerHTML = 'No Results';
      document.querySelector('.link-list').innerHTML = '';
    }
  }
}

const search = document.querySelector('#search');
// Event listener on keyup for search filtering
search.addEventListener('keyup', () => {
  searchBar(search, data);
});
