 soundManager.url = '/';
          soundManager.onready(function() {
            soundManager.createSound({
            id: 'mySound',
            url: 'toe.mp3'
        });
          soundManager.play('mySound');