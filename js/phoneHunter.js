const loadPhone = async(phone, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '' ;
    // display only 10 phones at a time
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');


    }

    //display no phone found
    const noPhoneFound = document.getElementById('no-phone');
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none');
    }
    else{
        noPhoneFound.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">
                            Details
                        </button>
                    </div>
                  </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
    
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field').value;
    loadPhone(searchField, dataLimit);
}

const searchPhone =() =>{
    // toggleSpinner(true);
    // const searchField = document.getElementById('search-field').value;
    // loadPhone(searchField);
    processSearch(10);
}

// search input field by enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    // console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('loader');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}

// show all phones
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
});

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
    const phoneTitle = document.getElementById('phoneDetailsModalLabel');
    const modalBody = document.getElementById('phone-details');
    phoneTitle.innerText = phone.name;
    modalBody.innerHTML =`
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "no date over here"}</p>
    <img class="img-fluid" src = "${phone.image} ">
    `

}

loadPhone("iphone");