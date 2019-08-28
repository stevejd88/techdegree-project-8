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

     // return data;
   });
}
