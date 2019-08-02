let sound = new Howl({
    src: ['./welcomeTest.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.2,
    rate: 1.5,
    onend: function() {
            console.log('Finished!');
        }
});

