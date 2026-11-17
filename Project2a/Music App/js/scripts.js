// Importing the lastFMAPI module to use its functions for searching artists
import lastFMAPI from "./lib/lastfmapi.js";
// ==========================================
// DOM Element Selectors
// ==========================================
const mainContainer = document.querySelector("main");
const artistList = document.getElementById("artistList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const searchResultsContainer = document.getElementById(
  "searchResultsContainer",
);
const artistInfoContainer = document.getElementById("artistInfoContainer");

// Album Info elements
const albumInfoContainer = document.getElementById("albumInfoContainer");
const albumTitle = document.getElementById("albumTitle");

// Track Info elements
const trackInfoContainer = document.getElementById("trackInfoContainer");

// State variables to store fetched data
let currentSearchResults = [];
let currentArtistInfo = null;
let currentAlbumInfo = null;
let currentTrackInfo = null;

// ==========================================
// Event Listeners
// ==========================================

// Handle dropdown selection changes
if (artistList) {
  artistList.addEventListener("change", async (event) => {
    const selectedArtist = event.target.value;
    if (!selectedArtist) return;

    if (searchInput) {
      searchInput.value = selectedArtist;
    }

    await handleArtistSearch(selectedArtist);
  });
}

// Handle search button clicks
if (searchButton && searchInput) {
  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    await handleArtistSearch(query);
  });
}

// ==========================================
// Data Fetching Logic
// ==========================================

async function handleArtistSearch(artistName) {
  try {
    if (searchResultsContainer)
      searchResultsContainer.innerHTML = "<p>Loading...</p>";

    if (artistInfoContainer)
      artistInfoContainer.innerHTML = "<p>Loading...</p>";

    const matches = await lastFMAPI.SearchArtist(artistName);

    // Clean up search results
    const searchTerm = artistName.toLowerCase().trim();

    currentSearchResults = (matches.artist || [])
      .filter((artist) => artist.name)
      .filter(
        (artist, index, self) =>
          index ===
          self.findIndex(
            (a) => a.name.toLowerCase() === artist.name.toLowerCase(),
          ),
      )
      .sort((a, b) => {
        // Put exact matches first
        if (a.name.toLowerCase() === searchTerm) return -1;
        if (b.name.toLowerCase() === searchTerm) return 1;
        return 0;
      })
      .slice(0, 5);

    if (currentSearchResults.length > 0) {
      const topMatchName = currentSearchResults[0].name;

      currentArtistInfo = await lastFMAPI.GetArtistInfo(topMatchName);
      currentAlbumInfo = await lastFMAPI.GetTopAlbumByArtist(topMatchName);

      displaySearchResults(currentSearchResults);
      displayArtistInfo(currentArtistInfo);
      displayAlbumInfo(topMatchName, currentAlbumInfo);
      displayTrackInfo(topMatchName, currentArtistInfo);
    } else {
      if (searchResultsContainer)
        searchResultsContainer.innerHTML = "<p>No results found.</p>";

      if (artistInfoContainer)
        artistInfoContainer.innerHTML = "<p>No info found.</p>";
    }
  } catch (error) {
    console.error("Error during search execution:", error);

    if (searchResultsContainer)
      searchResultsContainer.innerHTML = "<p>Failed to load data.</p>";

    if (artistInfoContainer) artistInfoContainer.innerHTML = "";
  }
}

// ==========================================
// DOM Rendering Functions
// ==========================================

// Render list of search results using standard DOM creation
function displaySearchResults(artists) {
  if (!searchResultsContainer) return;
  searchResultsContainer.innerHTML = "";

  artists.forEach((artist) => {
    // Create container card for each artist result
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card");

    // Create and append artist name element
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.innerHTML = `<strong>${artist.name}</strong>`;
    itemDiv.appendChild(nameDiv);

    // Conditionally create and append artist image if available
    const imgUrl =
      artist.image && artist.image[2] ? artist.image[2]["#text"] : "";
    if (imgUrl) {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = artist.name;
      img.style.maxWidth = "80px";
      img.style.borderRadius = "4px";
      itemDiv.appendChild(img);
    }
    searchResultsContainer.appendChild(itemDiv);
    mainContainer.style.display = "grid";
  });
}

// Render detailed artist info and biography cleanly using  DOM methods
function displayArtistInfo(artist) {
  if (!artistInfoContainer) return;

  if (!artist) {
    artistInfoContainer.innerHTML = "<p>No info available.</p>";
    return;
  }

  // Clear previous content
  artistInfoContainer.innerHTML = "";

  // Create main card wrapper
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  // Create name header element
  const nameDiv = document.createElement("div");
  nameDiv.id = "artistName";
  nameDiv.innerHTML = `<h2>${artist.name}</h2>`;
  cardDiv.appendChild(nameDiv);

  // Create image element if available
  const imgUrl =
    artist.image && artist.image[2] ? artist.image[2]["#text"] : "";
  if (imgUrl) {
    const img = document.createElement("img");
    img.id = "artistImage";
    img.src = imgUrl;
    img.alt = artist.name;
    img.style.maxWidth = "120px";
    img.style.borderRadius = "4px";
    cardDiv.appendChild(img);
  }

  // Create biography description element
  const bioDiv = document.createElement("div");
  bioDiv.id = "artistBio";
  bioDiv.innerHTML =
    artist.bio && artist.bio.summary
      ? artist.bio.summary
      : "No description available.";
  cardDiv.appendChild(bioDiv);

  artistInfoContainer.appendChild(cardDiv);
}

// Render album info section
function displayAlbumInfo(artistName, albumInfo) {
  if (!albumInfoContainer) return;

  albumInfoContainer.innerHTML = "";

  if (albumTitle) {
    albumTitle.textContent = `Featured Album / Works by ${artistName}`;
  }

  const albums = albumInfo.album.slice(0, 6) || [];

  for (let album in albums) {
    //create the album card div
    const albumCardDiv = document.createElement("div");
    albumCardDiv.classList.add("albumCard");

    const albumImage = document.createElement("img");
    albumImage.classList.add("albumImage");
    const imgUrl =
      albums[album].image && albums[album].image[2]
        ? albums[album].image[2]["#text"]
        : "";
    albumImage.src = imgUrl;
    albumImage.alt = `${artistName} Album`;
    albumCardDiv.appendChild(albumImage);

    const albumNameDiv = document.createElement("div");
    albumNameDiv.classList.add("albumName");
    albumNameDiv.innerHTML = `<strong>${albums[album].name}</strong>`;
    albumCardDiv.appendChild(albumNameDiv);

    //add event handler to album card to fetch and display album details when clicked
    albumCardDiv.addEventListener("click", async () => {
      try {
        const albumDetails = await lastFMAPI.GetAlbumInfo(
          artistName,
          albums[album].name,
        );
        displayTrackInfo(artistName, albumDetails);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    });

    albumInfoContainer.appendChild(albumCardDiv);
  }
}

// Render track info section
function displayTrackInfo(artistName, albumDetails) {
  trackInfoContainer.innerHTML = "";

  if (!albumDetails || !albumDetails.tracks || !albumDetails.tracks.track) {
    trackInfoContainer.innerHTML = "<p>No track info available.</p>";
    return;
  }

  const trackAlbumCover = document.createElement("img");
  trackAlbumCover.classList.add("trackAlbumCover");
  const imgUrl =
    albumDetails.image && albumDetails.image[2]
      ? albumDetails.image[2]["#text"]
      : "";
  trackAlbumCover.src = imgUrl;
  trackAlbumCover.alt = `${artistName} Album Cover`;
  trackInfoContainer.appendChild(trackAlbumCover);

  const tracks = albumDetails.tracks.track;

  for (let track of tracks) {
    const trackNameDiv = document.createElement("div");
    trackNameDiv.classList.add("trackName");
    trackNameDiv.innerHTML = `<strong>${track.name}</strong>`;

    trackInfoContainer.appendChild(trackNameDiv);
  }
}

// Clear track info section fields
