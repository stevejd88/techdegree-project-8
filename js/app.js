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


// ---------------------------------------------------------------------------
// FUNCTION CREATING HTML FROM DATA IN API REQUEST
// ---------------------------------------------------------------------------
function generateHTML(data) {
  info = data.results;

  for (let i = 0; i < info.length; i++) {
     const section = document.createElement('section');
     employeeList.appendChild(section);
     const html = `<div class="card" id="user-${[i]} ">
     <img src="${info[i].picture.large}" alt="${info[i].name.first} ${info[i].name.last}">
     <div class="info">
       <h2>${info[i].name.first} ${info[i].name.last}</h2>
       <span>${info[i].email}</span>
       <span>${info[i].location.city}</span>
     </div>
     </div>`;
     // console.log(html);
     section.innerHTML = html;
   };
}


//------------------------------------------------------------------
// MODAL CODE
//------------------------------------------------------------------
// Get the modal
const modal = document.getElementById("myModal");
// Get the card that opens the modal
const card = document.querySelector('.card');
const modalContent = document.querySelector('.modal-content');

// const birthday = function() {
//   const day = info[0].dob.date;
//   console.log(day);
// }
function createModals() {
  for (let i = 0; i < info.length; i++) {
    const div = document.createElement('div');
    div.className = `'modalUser-${i}`;
    modalContent.appendChild(div);
    const html =
        `<img src="${info[i].picture.large}" alt="${info[i].name.first} ${info[i].name.last}">
          <p>${info[i].name.first} ${info[i].name.last}<p>
          <p>${info[i].email}</p>
          <p>${info[i].location.city}</p>
          <hr>
          <p>${info[i].phone}</p>
          <p>${info[i].location.street} , ${info[i].location.state} ${info[i].location.postcode}</p>
        `;
      div.innerHTML = html;
  }
};

function displayModal() {
  modal.style.display = "block";
  createModals();
}

// function displayModal() {
//   modal.style.display = "block";
//   const user = modalContent.children;
//   createModals();
//   for (let i = 0; i < modalContent.length; i++) {
//     if (indexOf(modalContent[i]) === indexOf(employeeList[i])) {
//       user[i].style.display = 'block';
//     }
//   }
// }


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
  if (event.target.className === 'modal' || event.target.className === 'modal-content') {
    modal.style.display = "none";
    modalContent.innerHTML = '';
  }
}
