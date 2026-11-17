// Last.fm API wrapper built with async/await and fetch.
// This wrapper provides functions to search for artists,
// get artist information,
// album information,
// and track information
// using the Last.fm API.
const baseUrl = "https://ws.audioscrobbler.com/2.0/";
const apikey = "b0e55bbf825216cf5da9118c2f70a98c";

//function to build a url with method and params
function buildUrl(method, params) {
  const url = new URL(baseUrl);

  url.searchParams.append("method", method);
  url.searchParams.append("api_key", apikey);
  url.searchParams.append("format", "json");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  return url;
}

// Reusable API request function
async function apiRequest(method, params) {
  const url = buildUrl(method, params);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  // Last.fm can return API errors in a JSON response
  if (data.error) {
    throw new Error(`Last.fm API error: ${data.message}`);
  }

  console.log(`API Request to ${method} successful. Response:`, data);

  return data;
}

// Search Artist
async function SearchArtist(artist) {
  const data = await apiRequest("artist.search", { artist });

  return data.results.artistmatches;
}

// Get Artist Information
async function GetArtistInfo(artist) {
  const data = await apiRequest("artist.getinfo", { artist });

  return data.artist;
}

// Get top album by artist
async function GetTopAlbumByArtist(artist) {
  const data = await apiRequest("artist.getTopAlbums", { artist });

  return data.topalbums;
}

// Get Album Information
async function GetAlbumInfo(artist, album) {
  const data = await apiRequest("album.getinfo", {
    artist,
    album,
  });

  return data.album;
}

// Get Track Information
async function GetTrackInfo(artist, track) {
  const data = await apiRequest("track.getinfo", {
    artist,
    track,
  });

  return data.track;
}

export default {
  SearchArtist,
  GetArtistInfo,
  GetAlbumInfo,
  GetTrackInfo,
  GetTopAlbumByArtist,
};
