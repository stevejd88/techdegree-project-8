const randomUsers = 'https://randomuser.me/api/';
const employeeList = document.getElementById('employeeDirectory');
let employees = [];
let info = [];

// ---------------------------------------------------------------------------
// FETCH FUNCTION
// ---------------------------------------------------------------------------

function fetchData(url) {
  return fetch(url)
           // .then(checkStatus)
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
}

Promise.all([
  fetchData('https://randomuser.me/api/?results=12')
  /// INSERT MORE FETCH REQUESTS HERE
])
.then(data => {
  employees = data[0];
  generateHTML(employees);
})
// .then( data =>  {
//     return info = data;
// });

// ---------------------------------------------------------------------------
// FUNCTION CREATING HTML FROM DATA IN API REQUEST
// ---------------------------------------------------------------------------
function generateHTML(data) {
   info = data.results;
   data.results.forEach(person => {
     const section = document.createElement('section');
     employeeList.appendChild(section);
     const html= `<div class="card">
     <img src="${person.picture.large}" alt="${person.name.first} ${person.name.last}">
     <div class="info">
       <h2>${person.name.first} ${person.name.last}</h2>
       <span>${person.email}</span>
       <span>${person.location.city}</span>
     </div>
     </div>`;
     // console.log(html);
     section.innerHTML = html;
   });

}


//------------------------------------------------------------------
// MODAL CODE
//------------------------------------------------------------------
// Get the modal
const modal = document.getElementById("myModal");
// Get the card that opens the modal
const card = document.querySelector('.card');
// Get the <span> element that closes the modal
const modalContent = document.querySelector('.modal-content');

// const birthday = function() {
//   const day = info[0].dob.date;
//   console.log(day);
// }

const displayModal = () => {
    modal.style.display = "block";
    for (let i = 0; i < info.length; i++) {
        modalContent.innerHTML =
          `<div class="modalUser">
              <img src="${info[i].picture.large}" alt="${info[i].name.first} ${info[i].name.last}">
              <p>${info[i].name.first} ${info[i].name.last}<p>
              <p>${info[i].email}</p>
              <p>${info[i].location.city}</p>
              <hr>
              <p>${info[i].phone}</p>
              <p>${info[i].location.street} , ${info[i].location.state} ${info[i].location.postcode}</p>
          </div>`;
    }
}

// When the user clicks on the card, open the modal
document.addEventListener('click', (e) => {
  if (e.target.className === 'card' || e.target.className === 'info'){
    displayModal();
  } else if(e.target.tagName === 'IMG' || e.target.tagName==='H2' || e.target.tagName==='SPAN'){
    displayModal();
  } else {
      modal.style.display = "none";
    }
});

// // When the user clicks on <span> (x), close the modal
// span.addEventListener('click', (e) => {
//   if (e.target.tagName === 'BUTTON') {
//     modal.style.display = "none";
//   }
// })

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
