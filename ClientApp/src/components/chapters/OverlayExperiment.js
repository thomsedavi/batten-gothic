import React, { Component } from 'react';

export class OverlayExperiment extends Component {
  static displayName = OverlayExperiment.name;

  constructor(props) {
    super(props);

    this.toggleOverlay = this.toggleOverlay.bind(this);

    this.state = {
      showOverlay: false
    };
  }

  toggleOverlay() {
    var showOverlay = this.state.showOverlay;

    this.setState({
      showOverlay: !showOverlay
    });
  }

  render() {
    return (
      <div>
        <div className="image-container overlay-container">
          <img src="/images/experiment.png" />
          {this.state.showOverlay
            ? <img src="/images/experimentOverlay.png" />
            : null}
        </div>

        <button onClick={this.toggleOverlay}>toggle</button>
      </div>
    );
  }
}
