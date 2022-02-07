import React from "react";
import '../index.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div className="timer">
        <h1>Таймер</h1>
        <h2>Сейчас: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default App;
