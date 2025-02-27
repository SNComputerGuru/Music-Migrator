// Array to store selected playlist URLs
let playlistArray = []; 

function authenticateSpotify() {
    const clientId = '087c95c9cc6f4a44b76be5dfe0d6c3d9';
    const redirectUri = 'http://localhost:5500/callback.html';
    const scope = 'user-library-read playlist-read-private playlist-read-collaborative';
    const responseType = 'token';

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
}

// Get parameters for the callback URL
function getHashParams() {
    const hashParams = {};
    const hash = window.location.hash.substring(1);
    const params = hash.split('&');

    for (let i = 0; i < params.length; i++) {
        const [key, value] = params[i].split('=');
        hashParams[key] = decodeURIComponent(value);
    }
    return hashParams;
}

function redirectToPlaylists() {
    const hashParams = getHashParams();
    const accessToken = hashParams.access_token;
    const tokenType = hashParams.token_type;

    if (accessToken && tokenType) {
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('token_type', tokenType);

        const playlistsUrl = "display-playlists.html";
        window.location.href = playlistsUrl;
    } else {
        alert("Please try again...");
    }
}

function getPlaylists() {
    const access_token = sessionStorage.access_token;

    if (!access_token) {
        alert("Access token is missing. Please log in again.");
        return;
    }

    const URL = "https://api.spotify.com/v1/me/playlists";

    fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(response => response.json())
    .then(data => {
        try {
            for (let i = 0; i < data.items.length; i++) {
                displayPlaylist(data.items[i]);
            }
            document.getElementById("get-playlist-button").disabled = true;

        } catch (error) {
            console.error('Error displaying playlists:', error);
        }
    })
    .catch(error => {
        console.error('Error fetching playlists:', error);
    });
}

function displayPlaylist(data) {
    const Pimage = data.images[0]?.url;
    const Pname = data.name;
    const playlistUrl = data.external_urls.spotify;
    if (Pimage && Pname) {
        const playlistContainer = document.getElementById('playlist-container');

        const template = playlistContainer.firstElementChild;
        const playlistCopy = template.cloneNode(true);

        playlistCopy.style.display = 'inline-block';
        playlistCopy.classList.add('playlist');

        const playlistImage = playlistCopy.children[0];
        const playlistName = playlistCopy.children[1];

        playlistImage.src = Pimage;
        playlistName.textContent = Pname;

        playlistCopy.addEventListener('click', () => onPlaylistClick(playlistCopy, playlistUrl));

        playlistContainer.appendChild(playlistCopy);
    }
}

function onPlaylistClick(element, playlistUrl) {
    const index = playlistArray.indexOf(playlistUrl);

    if (index === -1) {
        playlistArray.push(playlistUrl);
        element.classList.add('selected');
    } else {
        playlistArray.splice(index, 1);
        element.classList.remove('selected');
    }

    console.log(playlistArray);
}


function proceedToYTMusicLogin(){

}