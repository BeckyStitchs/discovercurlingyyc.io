const accessKey = 'nmFVT0MnvNntAUvo-kWX1OnzlrHgSpZ2ht5ZsC0v6as';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}&query=icecurling&orientation=landscape&per_page=12&page=1`;

const eventsContent = document.getElementById('eventsContent');
const searchBox = document.getElementById('searchBox');

async function fetchPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photos = await response.json();
    displayPhotos(photos);
  } catch (error) {
    console.error('Error fetching data from Unsplash API:', error);
  }
}

function displayPhotos(photos) {
  const cards = photos.map(photo => {
    return `
      <div class="card" data-title="${photo.id}">
        <img src="${photo.urls.small}" alt="${photo.alt_description}">
        <p>${photo.id}</p>
      </div>
    `;
  }).join('');
  eventsContent.innerHTML = cards;
  eventsContent.style.textAlign = "center";
}

function filterCards() {
  const searchTerm = searchBox.value.toLowerCase();
  const cards = cardContent.getElementsByClassName('card');

  for (let card of cards) {
    const title = card.getAttribute('data-title').toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
}

searchBox.addEventListener('keyup', filterCards);

// Fetch photos when the page loads
fetchPhotos();
