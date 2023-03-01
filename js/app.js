const loadPhones = async (search, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit);
}

const displayPhones = (phones, datalimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (datalimit && phones.length > 12) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }


    // display no phone found
    const noPhone = document.getElementById("no-found-meassage")
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
        console.log(noPhone)
    }
    else {
        noPhone.classList.add('d-none')
    }


    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
    
                      <div class="card p-5">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                          
                        </div>
                      </div>
                   
    `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loader
    toggleSpinner(false);

}

const processSearch = (datalimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, datalimit);
}

// handle search buttton click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
})

// search input field enter key handler
// code for enter
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {

        processSearch(10);
    }
});


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }

}


// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML=`
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information found'} </p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No bluetooth information found'} </p>
    `
}
loadPhones('apple');