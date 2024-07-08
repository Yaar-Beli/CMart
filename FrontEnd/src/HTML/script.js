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
