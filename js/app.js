const randomUsers = 'https://randomuser.me/api/';
const employeeList = document.getElementById('employeeDirectory');
let section;
let employees = [];
let card = [];



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
     section = document.createElement('section');
     employeeList.appendChild(section);
     const html =
     `
            <button title="close" type="button" class="close">&times;</button>
            <img src="${info[i].picture.large}" alt="${info[i].name.first} ${info[i].name.last}">
            <a href="#" class="previous">&laquo;</a>
            <a href="#" class="next">&raquo;</a>
            <div class="info">
              <h2>${info[i].name.first} ${info[i].name.last}</h2>
              <span>${info[i].email}</span>
              <span>${info[i].location.city}</span>
            </div>
            <div class="extra-info">
              <hr>
              <p>${info[i].phone}</p>
              <p>${info[i].location.street} , ${info[i].location.state} ${info[i].location.postcode}</p>
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
const modal = document.getElementById("myModal");
const modalContent = document.querySelector('.modal-content');

// DISPLAYING EXTRA INFO TO THE MODAL
function extraInfo() {
  modal.style.display = "block";
  modalContent.children[0].style.display= "block";
  modalContent.children[5].style.display= "block";
  modalContent.children[2].style.display= "inline";
  modalContent.children[3].style.display= "inline";
}


// MODAL POPUP WHEN USER CLICKS ON CARD
document.addEventListener('click', (e) => {
  if (e.target.className === 'info' || e.target.tagName === 'IMG') {
      modalContent.innerHTML = e.target.parentNode.innerHTML;
      extraInfo();
  } else if( e.target.tagName === 'H2' || e.target.tagName === 'SPAN') {
      modalContent.innerHTML = e.target.parentNode.parentNode.innerHTML;
      extraInfo();
  } else if (e.target.tagName === 'SECTION' ) {
      modalContent.innerHTML = e.target.innerHTML;
      extraInfo();
  }
});

// NEXT BUTTON EVENT HANDLER
document.addEventListener('click', (e) => {
  if (e.target.className === 'next') {
    // console.log(card[0].nextElementSibling.innerHTML);
    for (let i = 0; i < card.length; i++) {
        modalContent.innerHTML = card[i].nextSibling.innerHTML;
        extraInfo();
    }
  }
});


// CLOSING THE MODAL
window.onclick = function(event) {
  if (event.target.tagName === 'BUTTON') {
    modal.style.display = "none";
    modalContent.innerHTML = '';
  }
}
