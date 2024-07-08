function showDropdown() {
    document.getElementById('dropdownContent').classList.remove('hidden');
  }

  function hideDropdown() {
    document.getElementById('dropdownContent').classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
    loadCard();
    loadFooter();
    setupEditButton();
});

function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            console.log('Navbar content loaded.');
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

function loadCard() {
    fetch('Card.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('card').innerHTML = data;
            console.log('Card content loaded.');
        })
        .catch(error => {
            console.error('Error loading card:', error);
        });
}

function loadFooter() {
    fetch('Footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            console.log('Footer content loaded.');
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}


function setupEditButton() {
    const editButton = document.getElementById('editButton');
    editButton.addEventListener('click', function () {
        if (editButton.textContent === 'Edit') {
            editButton.textContent = 'Save';
            console.log('Edit mode enabled');
            // Add your logic to enable editing fields here
        } else {
            editButton.textContent = 'Edit';
            console.log('Edit mode disabled');
            // Add your logic to save changes here
        }
    });
}