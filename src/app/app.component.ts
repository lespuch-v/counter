import { Component } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';


import JSConfetti from 'js-confetti';
import { emojis } from './datas';

var randomColor = require('randomcolor');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'winorlose';
  color = randomColor();
  fontSiz = this.getRandomFontSize();

  counter: any = 7;
  emoji: string = '';
  wasActive: boolean = true;
  isDisabled: boolean = false;
  public animationsDisabled = true;

  jsConfetti = new JSConfetti();

  getValueCountering() {
    this.wasActive = !this.wasActive;
    this.isDisabled = true;
    this.counter = 7;
    this.animationsDisabled = !this.animationsDisabled;
    
    if (this.counter != 0) {
      const refreshIntervalId = setInterval((counter: number) => {
        this.color = randomColor();
        this.fontSiz = this.getRandomFontSize();
        this.counter--;
        if (this.counter == 0) {
          clearInterval(refreshIntervalId);
          this.reset();
          this.counter = this.setResult();
        }
      }, 1000);
    }
  }

  getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  // Continue here ⭐ set the output to random value Celebrate or NOT
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  setResult() {
    if (this.getRandomInt(2) == 1) {
      this.confettiTrigger();
      return '🥳You have WON🥳';
    } else {
      return '❌LOST❌';
    }
  }

  reset() {
    this.counter = Number(3);
    this.isDisabled = !this.isDisabled;
  }

  confettiTrigger() {
    this.jsConfetti.addConfetti();
    this.jsConfetti.addConfetti({
      emojis: ['⚡️', '💥', '✨', '💫', '🌸', '🔥', '⭐', '🌟', '🌠', "🤞", "🍀", "🐞"],
      confettiRadius: 5,
      confettiNumber: 100,
    });
  }

  getRandomFontSize() {
    return Math.floor(Math.random() * 10) + 3;
  }

  constructor() {
  }
}
