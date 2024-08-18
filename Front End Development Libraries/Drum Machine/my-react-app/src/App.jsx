import React from 'react';
import './App.css';

const buttons = {
  Q: { name: "Heater-1", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  W: { name: "Heater-2", sound: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" },
  E: { name: "Heater-3", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  A: { name: "Heater-4", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  S: { name: "Clap", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  D: { name: "Open-HH", sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  Z: { name: "Kick-n-Hat", sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  X: { name: "Kick", sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  C: { name: "Closed-HH", sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
};

class App extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    $("#drum-pad").empty();

    Object.keys(buttons).forEach((key) => {
      const button = buttons[key];
      const buttonElement = $(`
        <button class="drum-pad" id="${button.name}">
          ${key}
          <audio class="clip" id="${key}" src="${button.sound}"></audio>
        </button>
      `);

      buttonElement.on('click', () => this.playSound(key));

      $('#drum-pad').append(buttonElement);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    if (buttons[key]) {
      this.playSound(key);

      const buttonElement = $(`#${buttons[key].name}`);
      buttonElement.addClass('active');
        

      setTimeout(() => {
        buttonElement.removeClass('active');
      }, 100);
    }
  }

  playSound(id) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    if (buttons[id]) {
      document.getElementById("display").innerText = buttons[id].name;
    }
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="drum-pad" className="buttons_container">

        </div>
        <div id="display"></div>
      </div>
    );
  }
}

export default App;
