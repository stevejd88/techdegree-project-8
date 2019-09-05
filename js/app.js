const randomUsers = 'https://randomuser.me/api/';
const employeeList = document.getElementById('employeeDirectory');
let employees = [];
let info = [];
let card = [];
let users = [];

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
     const html =
     `
         <div class="card" id="user-${[i]} ">
           <img src="${info[i].picture.large}" alt="${info[i].name.first} ${info[i].name.last}">
           <a href="#" class="previous">&laquo;</a>
           <div class="info">
             <h2>${info[i].name.first} ${info[i].name.last}</h2>
             <span>${info[i].email}</span>
             <span>${info[i].location.city}</span>
           </div>
           <a href="#" class="next">&raquo;</a>
           <div class="extra-info">
             <hr>
             <p>${info[i].phone}</p>
             <p>${info[i].location.street} , ${info[i].location.state} ${info[i].location.postcode}</p>
            </div>
         </div>
     `;
     // console.log(html);
     section.innerHTML = html;
     card.push(section);
   };
}


//------------------------------------------------------------------
// MODAL CODE
//------------------------------------------------------------------
// Get the modal
const modal = document.getElementById("myModal");
// Get the card that opens the modal
const modalContent = document.querySelector('.modal-content');


// When the user clicks on the card, open the modal
document.addEventListener('click', (e) => {
  modal.style.display = "block";
  if (e.target.className === 'info' || e.target.tagName === 'IMG') {
      modalContent.innerHTML = e.target.parentNode.innerHTML;
      modalContent.children[4].style.display= "block";
      modalContent.children[1].style.display= "inline";
      modalContent.children[3].style.display= "inline";
  } else if( e.target.tagName === 'H2' || e.target.tagName === 'SPAN') {
      modalContent.innerHTML = e.target.parentNode.parentNode.innerHTML;
      modalContent.children[4].style.display= "block";
      modalContent.children[1].style.display= "inline";
      modalContent.children[3].style.display= "inline";
  } else if (e.target.className === 'card' ) {
      modalContent.innerHTML = e.target.innerHTML;
      modalContent.children[4].style.display= "block";
      modalContent.children[1].style.display= "inline";
      modalContent.children[3].style.display= "inline";
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
