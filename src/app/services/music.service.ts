import { Injectable } from '@angular/core';

@Injectable()
export class MusicService {
    private audio;
    constructor(){
        this.audio = new Audio();
        this.audio.src = 'assets/background.mp3';
        this.audio.load();
    }

    playBackground() {
        this.audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.audio.play();
    }
};