const url = "/api/user"

function codeAddress() {
     const urlParams = new URLSearchParams(window.location.search);
     const myParam = urlParams.get('t');
     const user = urlParams.get('user')

     localStorage.getItem('user', JSON.stringify(user));
     localStorage.setItem('token', JSON.stringify(myParam));
     
     document.getElementById('user').innerHTML = user
}
window.onload = codeAddress;

async function getUsers() {
     let users = await fetch(url).then(data => data.json())
     let userDivs = ''
     users.data.forEach(user => {
          userDivs +=
               `<div class="user">
                    <span class="email">${user.email}</span>
                    <span class="delete" onclick="deleteStaff('${user.email}')">X</span>
               </div>`
     });

     document.getElementById('container').innerHTML = userDivs
}

async function deleteStaff(email) {
     const token = JSON.parse(localStorage.getItem('token'))
     await fetch(url, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token })
     })
     getUsers();
}

getUsers();