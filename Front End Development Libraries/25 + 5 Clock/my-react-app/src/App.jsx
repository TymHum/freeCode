import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timeLeft: 25 * 60,
      intervalID: null,
    };
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.countDown = this.countDown.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
  }

  handleLengthChange(type, amount) {
    const { timerState, timerType, sessionLength, breakLength } = this.state;
    if (timerState === "running") return;

    if (type === "session") {
      const newSessionLength = Math.min(Math.max(sessionLength + amount, 1), 60);
      this.setState({
        sessionLength: newSessionLength,
        timeLeft: timerType === "Session" ? newSessionLength * 60 : this.state.timeLeft,
      });
    } else if (type === "break") {
      const newBreakLength = Math.min(Math.max(breakLength + amount, 1), 60);
      this.setState({
        breakLength: newBreakLength,
        timeLeft: timerType === "Break" ? newBreakLength * 60 : this.state.timeLeft,
      });
    }
  }

  startStop() {
    const { timerState } = this.state;
    if (timerState === "stopped") {
      this.setState({
        timerState: "running",
        intervalID: setInterval(this.countDown, 1000),
      });
    } else {
      clearInterval(this.state.intervalID);
      this.setState({
        timerState: "stopped",
        intervalID: null,
      });
    }
  }

  reset() {
    clearInterval(this.state.intervalID);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timeLeft: 25 * 60,
      intervalID: null,
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  countDown() {
    const { timeLeft, timerType, breakLength, sessionLength } = this.state;
    if (timeLeft === 0) {
      this.audioBeep.play();
      this.switchTimer(timerType === "Session" ? breakLength * 60 : sessionLength * 60, timerType === "Session" ? "Break" : "Session");
    } else {
      this.setState({
        timeLeft: timeLeft - 1,
      });
    }
  }

  switchTimer(newTime, newType) {
    this.setState({
      timeLeft: newTime,
      timerType: newType,
    });
  }

  formatTimeLeft() {
    const minutes = Math.floor(this.state.timeLeft / 60);
    const seconds = this.state.timeLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  render() {
    const { breakLength, sessionLength, timerType, timerState } = this.state;

    return (
      <div className="container">
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <button id="break-decrement" onClick={() => this.handleLengthChange("break", -1)}>
            -
          </button>
          <div id="break-length">{breakLength}</div>
          <button id="break-increment" onClick={() => this.handleLengthChange("break", 1)}>
            +
          </button>
        </div>

        <div className="length-control">
          <div id="session-label">Session Length</div>
          <button id="session-decrement" onClick={() => this.handleLengthChange("session", -1)}>
            -
          </button>
          <div id="session-length">{sessionLength}</div>
          <button id="session-increment" onClick={() => this.handleLengthChange("session", 1)}>
            +
          </button>
        </div>

        <div id="timer" className="timer-wrapper">
          <div id="timer-label">{timerType}</div>
          <div id="time-left">{this.formatTimeLeft()}</div>
        </div>

        <div className="timer-control">
          <button id="start_stop" onClick={this.startStop}>
            {timerState === "running" ? "Pause" : "Start"}
          </button>
          <button id="reset" onClick={this.reset}>
            Reset
          </button>
        </div>

        <audio id="beep" ref={(audio) => (this.audioBeep = audio)} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" preload="auto" />
      </div>
    );
  }
}

export default App
