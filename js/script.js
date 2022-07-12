/*
Project 5 - Public API Requests
*/

/** 
FETCH FUNCTIONS-------------
*/


/**
* fetch pulls information from the API, catch statement is used to console log an error if there is any
* function references : https://teamtreehouse.com/library/create-a-reusable-fetch-function
* const urlAPI is inserted in function to show an API pathway
*/

const urlAPI = "https://randomuser.me/api/?results=12&nat=US&inc=picture,name,email,cell,dob,location&noinfo";

fetch(urlAPI)
    .then(checkStatus)
    .then(response => response.json())
    .then((data) => { employees = data.results;
     displayEmployees(employees);})
    .catch(error => console.log("Issue fetching data", error))

/**
* checkStatus function is checking to make sure the check status is OK and no errors are produced
* Referencing: https://teamtreehouse.com/library/handling-errors-2 (time 4:51)
*/

    function checkStatus(response){
      if(response.ok){
          return Promise.resolve(response);
      }else{
          return Promise.reject(new Error(response(statusText)));
      }
      }

/*
HELPER FUNCTIONS-----
*/


/**
* displayEmployees function creates a template literal for which the html string will be added to the div element and display the employee information template is referencing lines 51-58 from Index.HTML
* A for loop is created to iterate the template literal through the array of employee data
*/


let employees = [];
const gallery = document.getElementById("gallery");

function displayEmployees(employees) {
  gallery.innerHTML = ""; 
  for (let i = 0; i < employees.length; i++) {
    let employeeHTML = 
    ` 
      <div class="card" data-index="${[i]}">
          <div class="card-img-container">
              <img class="card-img" src="${employees[i].picture.medium}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="employee-name" class="card-name cap">${employees[i].name.first} ${employees[i].name.last}</h3>
              <p class="card-text">${employees[i].email}</p>
              <p class="card-text cap">${employees[i].location.city}, ${employees[i].location.state}</p>
          </div>
      </div>
      `;
    gallery.insertAdjacentHTML("beforeend", employeeHTML); // this technique will allow HTML strings to be added without disrupting the DOM
  }
}
/**
* displayModal function creates a template literal for which the html string will be added to the div element and display the employee information when it is clicked and added to the body element 
* an expression is written destructuring the data object and holding the property value in a variable - referencing https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
* a date variable is created to hold a Date Constructor 
* a template literal is created referencing Index.html lines 74-86
* a getMonth(), getData, getFullYear() method is added to the birthday line 97 referencing the newly created date variable - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
*/
const body = document.querySelector('body');

function displayModal(index) {
  const {picture, name, email, cell, dob, location :{city, street, state, postcode}} = employees[index]; 
  let date = new Date(dob.date); 
  const birthday = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`


  const modalHTML = `
  <div class="modal-container">
      <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
          <p class="modal-text">${email}</p>
          <p class="modal-text cap">${city}</p>
          <hr>
          <p class="modal-text">${cell}</p>
          <p class="modal-text">${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
          <p class="modal-text">Birthday: ${birthday} </p>
      </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML); 
  
  const modalClose = document.getElementById('modal-close-btn'); 
// if the modalClose button is clicked, the modal that appears is closed 
  modalClose.addEventListener('click', (e) =>{ 
    document.body.removeChild(document.body.lastElementChild);
  });
  };
/**
 * EVENT LISTENERS----
 */


//If the employee card is clicked, a modal appears with the following information (picture, name, email, cell, dob, location( city, street, state, postcode))
gallery.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  const index = card.getAttribute('data-index');
  currentModalIndex = index;
  displayModal(currentModalIndex)
  });




