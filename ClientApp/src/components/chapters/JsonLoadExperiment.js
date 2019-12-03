import React, { Component } from 'react';

export class JsonLoadExperiment extends Component {
  static displayName = JsonLoadExperiment.name;

  constructor(props) {
    super(props);

    this.chapter = props.match.params.chapter;

    this.selectObject = this.selectObject.bind(this);
    this.renderObjects = this.renderObjects.bind(this);
    this.renderSection = this.renderSection.bind(this);

    this.state = {
      loading: true
    };

    fetch(`chapters/chapter${this.chapter}.json`)
      .then(response => response.json())
      .then(data => {
        var objects = [];

        for (var i = 0; i < data.objects.length; i++)
        {
          objects.push({"isSelected": false, "value": data.objects[i]});
        }

        var sections = [];

        for (var i = 0; i < data.sections.length; i++) {
          var section = data.sections[i];

          sections.push({
            "index": i,
            "answers": section.answers,
            "paragraphs": section.paragraphs,
            "isSolved": i === 0 ? true : false
          });
        }

        this.setState({
          objects: objects,
          sections: sections,
          loading: false
        });
      });
  }

  selectObject(event) {
    var index = Number(event.currentTarget.dataset.index);
    var objects = this.state.objects;

    objects[index].isSelected = !objects[index].isSelected;

    this.setState({
      objects: objects
    });
  }

  renderObjects(objects) {
    return (
      objects.map((x, i) => <button className={"object" + (x.isSelected ? " selected" : "")} key={`attempt${i}`} data-index={i} onClick={this.selectObject}>{x.value}</button>
      )
    );
  }

  renderSection(section) {
    console.log(section);

    var paragraphs = section.paragraphs.map((x, i) =>
      <p key={`section${section.index}paragraph${i}`} dangerouslySetInnerHTML={{ __html: x }} />
    );

    return (
      <div key={`section${section.index}`}>
        {paragraphs}
      </div>
    );
  }

  render() {
    let images = <div className="image-container overlay-container">
      <img src={`/images/chapter${this.chapter}/base.png`} />
      <img src={`/images/chapter${this.chapter}/mask1.png`} />
    </div>;

    let contents = this.state.loading
      ? <div><p>Loading...</p></div>
      : <div>
        {this.renderSection(this.state.sections[0])}
        <div className="the-buttons">{this.renderObjects(this.state.objects)}</div>
        <button>submit</button>
      </div>;

    return (
      contents
    );
  }
}
