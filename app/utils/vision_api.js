'use strict';

class VisionAPI {
  call() {
    return this.make_emotion();
  }

  make_emotion() {
    return {
      "emotions": {
        "smile": this.randomize_emotion(),
        "surprise": this.randomize_emotion(),
        "negative": this.randomize_emotion(),
        "attention": this.randomize_attention()
      }
    };
  }

  randomize_emotion() {
    return Math.random() * 20;
  }

  randomize_attention() {
    return Math.random() * 100;
  }
}

module.exports = VisionAPI
