const loadUser =() =>{
fetch('https://randomuser.me/api/?gender=female')
.then(res => res.json())
.then(data => displayUsers(data))


}

const displayUsers = (users) =>{
    const nameTag = document.getElementById('name');
    const genderTag = document.getElementById('gender');

    nameTag.innerHTML = users.results[0].name.first;
    genderTag.innerHTML = users.results[0].gender;
    console.log(users.results[0]);
}

loadUser();