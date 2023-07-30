// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))


const url = 'https://jsonplaceholder.typicode.com/todos/1';

// fetch(url)
// .then(res => res.json())
// .then(data => console.log(data))


function loadData(){
    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data));
}