function initClient(){
    gapi.client.init({
        apiKey: '<YOUR_GoogleAPIKey_HERE>',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
        clientId: '338520836323-m3lpdcddioot9ea5vlk2eu8ojlghdrrj.apps.googleusercontent.com',
        scope: 'profile'
    }).then(function(){
        getPeople();
    });

}