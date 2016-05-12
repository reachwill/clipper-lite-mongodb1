var player;


function onYouTubeIframeAPIReady() {
    alert('API ready')
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {

        }
    });
}