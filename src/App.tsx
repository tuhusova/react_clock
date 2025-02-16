import React, { Component } from 'react';
import { Clock } from './component/Clock';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);
  return `Clock-${value}`;
}

type AppState = {
  hasClock: boolean;
  clockName: string;
};

export class App extends Component<{}, AppState> {
  private nameTimerId: number | null = null;

  state: AppState = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount(): void {
    this.nameTimerId = window.setInterval(() => {
      this.setState(prevState => {
        const newClockName = getRandomName();

        // eslint-disable-next-line no-console
        console.warn(`Renamed from ${prevState.clockName} to ${newClockName}`);

        return { clockName: newClockName };
      });
    }, 3300);

    document.addEventListener('contextmenu', this.hideClock);
    document.addEventListener('click', this.showClock);
  }

  componentWillUnmount(): void {
    if (this.nameTimerId) {
      window.clearInterval(this.nameTimerId);
    }

    document.removeEventListener('contextmenu', this.hideClock);
    document.removeEventListener('click', this.showClock);
  }

  hideClock = (event: MouseEvent): void => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  showClock = (): void => {
    this.setState({ hasClock: true });
  };

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
}


