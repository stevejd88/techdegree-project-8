const randomUsers = 'https://randomuser.me/api/';
const employeeList = document.getElementById('employeeDirectory');


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
  const employees = data[0];

  generateHTML(employees);
})

function generateHTML(data) {
   data.results.forEach(person => {
     const section = document.createElement('section');
     employeeList.appendChild(section);
     html= `<div class="card">
     <img src="${person.picture.large}" alt="${person.name.first} ${person.name.last}">
     <div class="info">
       <h2>${person.name.first} ${person.name.last}</h2>
       <span>${person.email}</span>
       <span>${person.location.city}</span>
     </div>
     </div>`;
     console.log(html);
     section.innerHTML = html;
   });
}





//-----------------------------
// MODAL CODE
//-----------------------------
// Get the modal
const modal = document.getElementById("myModal");
// Get the card that opens the modal
const card = document.querySelector('.card');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


// When the user clicks on the card, open the modal
document.addEventListener('click', (e) => {
  const cardClick = e.target;
  if (e.target.tagName === 'SECTION' || 'IMG' || 'SPAN') {
    modal.style.display = "block";
  }
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', (e) => {
  if (e.target.className === 'close') {
    modal.style.display = "none";
  }
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
