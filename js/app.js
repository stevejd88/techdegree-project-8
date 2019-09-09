const randomUsers = 'https://randomuser.me/api/';
const employeeList = document.getElementById('employeeDirectory');
let employees = [];
let info = [];
let index;

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
     section.className = 'employeeContainer';
     section.setAttribute("data-index", i);
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
const modal = document.getElementById("myModal");
const modalContent = document.querySelector('.modal-content');



function getContainerIndex() {
  const btn = event.target.closest('.employeeContainer');
  index = btn.getAttribute("data-index");
  if(index) {
    createModal(index)
  }
}

function createModal(index) {
    let employee = info[index];
    modalContent.innerHTML =
    `
           <button title="close" type="button" class="close">&times;</button>
           <img src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
           <a href="#" class="previous">&laquo;</a>
           <a href="#" class="next">&raquo;</a>
           <div class="info">
             <h2>${employee.name.first} ${employee.name.last}</h2>
             <span>${employee.email}</span>
             <span>${employee.location.city}</span>
           </div>
           <div class="extra-info">
             <hr>
             <p>${employee.phone}</p>
             <p>${employee.location.street} , ${employee.location.state} ${employee.location.postcode}</p>
           </div>
    `;
    modal.style.display = "block";
};



// MODAL POPUP WHEN USER CLICKS ON CARD
document.addEventListener('click', (e) => {
  if (e.target.className === 'info' || e.target.tagName === 'IMG' || e.target.className === 'employeeContainer') {
      createModal();
  } else if( e.target.tagName === 'H2' || e.target.tagName === 'SPAN') {
      createModal();
  }
});



// CLOSING THE MODAL
window.onclick = function(event) {
  if (event.target.tagName === 'BUTTON') {
    modal.style.display = "none";
    modalContent.innerHTML = '';
  }
}

employeeList.addEventListener('click', getContainerIndex)
