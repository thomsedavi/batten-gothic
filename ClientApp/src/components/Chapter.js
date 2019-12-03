import React, { Component } from 'react';
import { TwitterMentionButton, TwitterTweetEmbed } from 'react-twitter-embed';
import { Element, scroller } from 'react-scroll';

export class Chapter extends Component {
  static displayName = Chapter.name;

  constructor(props) {
    super(props);

    this.chapter = props.match.params.chapter;

    this.setSkipRef = this.setSkipRef.bind(this);
    this.renderSections = this.renderSections.bind(this);
    this.renderObjects = this.renderObjects.bind(this);
    this.selectObject = this.selectObject.bind(this);
    this.checkPuzzle = this.checkPuzzle.bind(this);
    this.closePuzzle = this.closePuzzle.bind(this);
    this.skipPuzzle = this.skipPuzzle.bind(this);
    this.toggleRevealPuzzle = this.toggleRevealPuzzle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      loading: true,
      title: "",
      tweet: "",
      objects: [],
      sections: [],
      totalSections: 0,
      solutions: [],
      currentSection: 0,
      confirmSkip: false,
      tabIndex: 0,
      revealPuzzle: false
    };

    fetch(`chapters/chapter${this.chapter}.json`)
      .then(response => response.json())
      .then(data => {
        var objects = [];

        for (var i = 0; i < data.objects.length; i++) {
          objects.push({ "isSelected": false, "value": data.objects[i] });
        }

        this.setState({
          title: data.title,
          tweet: data.tweet,
          sections: data.sections,
          totalSections: data.sections.length,
          objects: objects,
          solutions: data.solutions,
          loading: false
        });
      });
  }

  renderObjects() {
    return (
      this.state.objects.map((x, i) => <button className={"object" + (x.isSelected ? " selected" : "")} key={`object${i}`} data-index={i} onClick={this.selectObject}>{x.value}</button>
      )
    );
  }

  selectObject(event) {
    var index = Number(event.currentTarget.dataset.index);
    var objects = this.state.objects;

    objects[index].isSelected = !objects[index].isSelected;

    this.setState({
      objects: objects,
      confirmSkip: false
    });
  }

  checkPuzzle() {
    var currentSection = this.state.currentSection;
    var revealPuzzle = true;

    if (this.state.currentSection < this.state.solutions.length) {
      var objects = this.state.objects;
      var solution = this.state.solutions[currentSection];

      var isSolved = true;

      for (var i = 0; i < objects.length; i++) {
        var object = objects[i];

        if (object.isSelected && solution.indexOf(object.value) < 0)
          isSolved = false;

        if (!object.isSelected && solution.indexOf(object.value) >= 0)
          isSolved = false;
      }

      if (isSolved) {
        currentSection++;
        revealPuzzle = false;

        for (i = 0; i < objects.length; i++) {
          objects[i].isSelected = false;
        }

        setTimeout(function () {
          scroller.scrollTo(`part${currentSection}`, {
            duration: 500,
            smooth: 'easeInOutQuart'
          });
        }.bind(this), 100);
      }
    }

    this.setState({
      currentSection: currentSection,
      objects: objects,
      confirmSkip: false,
      revealPuzzle: revealPuzzle
    });
  }

  closePuzzle() {
    const revealPuzzle = !this.state.revealPuzzle;
    const objects = this.state.objects;

    for (var i = 0; i < objects.length; i++) {
      objects[i].isSelected = false;
    }

    this.setState({
      objects: objects,
      revealPuzzle: revealPuzzle,
      confirmSkip: false
    })
  }

  toggleRevealPuzzle() {
    const revealPuzzle = !this.state.revealPuzzle;

    this.setState({
      revealPuzzle: revealPuzzle,
      confirmSkip: false
    })

    scroller.scrollTo('image', {
      duration: 500,
      smooth: 'easeInOutQuart'
    });
  }

  skipPuzzle() {
    var currentSection = this.state.currentSection;
    var confirmSkip = this.state.confirmSkip;
    var objects = this.state.objects;
    var revealPuzzle = this.state.revealPuzzle;

    if (confirmSkip) {
      for (var i = 0; i < objects.length; i++) {
        objects[i].isSelected = false;
      }

      confirmSkip = false;
      revealPuzzle = false;
      currentSection++;

      setTimeout(function () {
        scroller.scrollTo(`part${currentSection}`, {
          duration: 500,
          smooth: 'easeInOutQuart'
        });
      }.bind(this), 100);
    } else {
      confirmSkip = true;
    }

    this.setState({
      currentSection: currentSection,
      objects: objects,
      confirmSkip: confirmSkip,
      revealPuzzle: revealPuzzle
    });
  }

  static formatParagraph(paragraph) {
    return (
      paragraph
        .replace(/&ldquo;/g, '<span class="punctuation">&ldquo;</span>')
        .replace(/&rdquo;/g, '<span class="punctuation">&rdquo;</span>')
        .replace(/,/g, '<span class="punctuation">,</span>')
        .replace(/\./g, '<span class="punctuation">.</span>')
        .replace(/&hellip;/g, '<span class="punctuation">&hellip;</span>')
        .replace(/\?/g, '<span class="punctuation">?</span>')
        .replace(/\!/g, '<span class="punctuation">!</span>')
        .replace(/\(/g, '<span class="punctuation">(</span>')
        .replace(/\)/g, '<span class="punctuation">)</span>')
    );
  }

  renderSections() {
    //return (
    //  this.state.sections.map((section, i) => {
    //    return i <= this.state.currentSection
    //      ? <div key={`section${i}`} className={"section" + (i === this.state.currentSection ? " last" : "") + (i === this.state.currentSection && this.state.hideLatest ? " invisible" : "")} ref={(ref) => this.currentSection = ref}>
    //        {section.map((paragraph, j) => <p key={`section${i}paragraph${j}`} dangerouslySetInnerHTML={{
    //          __html: Chapter.formatParagraph(paragraph)
    //        }} />)}
    //        {i !== this.state.currentSection ? <Element name={`part${i + 1}`}><hr /></Element> : null}
    //      </div>
    //      : null
    //  })
    //);

    return (
      this.state.sections.map((section, i) => {
        return <div key={`section${i}`} className={"section" + (i > this.state.currentSection || this.state.revealPuzzle ? " inactive" : " active") + (i == this.state.totalSections - 1 ? " last" : "")}>
          {!this.state.revealPuzzle && i == this.state.currentSection + 1 && <div className="actions options">
            <p className="objective">Do you&hellip;</p>
            <button className="action reveal" onClick={this.toggleRevealPuzzle}>Help me find connections between objects in the picture?</button>
            <p className="objective">Or&hellip;</p>
            <button className={`action skip${this.state.confirmSkip ? " confirm-skip" : ""}`} onClick={this.skipPuzzle} ref={this.setSkipRef}>Skip to the point after i have done this?</button>
          </div>}
          {section.map((paragraph, j) => <p key={`section${i}paragraph${j}`} dangerouslySetInnerHTML={{
            __html: Chapter.formatParagraph(paragraph)
          }} />)}
          {i !== this.state.totalSections - 1 && <Element name={`part${i + 1}`}><hr className={this.state.revealPuzzle || i > this.state.currentSection - 1 ? "test" : ""} /></Element>}
        </div>
      })
    );
  }

  setSkipRef(el) {
    this.skipRef = el;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.skipRef && !this.skipRef.contains(event.target)) {
      this.setState({
        confirmSkip: false
      });
    }
  }

  render() {
    let images = <Element name="image">
      <div className="image-container overlay-container">
        <img src={`/images/chapter${this.chapter}/base.png`} />
        {this.state.revealPuzzle && this.state.currentSection + 1 < this.state.totalSections &&
          <img className="overlay" src={`/images/chapter${this.chapter}/mask${this.state.currentSection + 1}.png`} />}
      </div>
    </Element>;

    let contents = this.state.loading
      ? <div><p>Loading...</p></div>
      : <div>
        <h1>
          {this.state.title}
        </h1>
        {images}
        <div className="puzzle-container">
          <div className="sections">
            {this.renderSections()}
            {this.state.currentSection === this.state.sections.length - 1 && <div className="post-script">
              <p>The challenge in this page supplied by:</p>
              <TwitterTweetEmbed tweetId={this.state.tweet} options={{ align: 'center', cards: 'hidden', conversation: 'none', theme: 'dark', width: '200px' }} />
              <p>To supply your own challenge, please do a tweet at:</p>
              <div style={{ marginTop: "0.5em" }}>
                <TwitterMentionButton screenName={'lotographia'} options={{ size: 'large' }} />
              </div>
            </div>}
          </div>
          {this.state.revealPuzzle && <div className="puzzles">
            <div className="close-puzzle" onClick={this.closePuzzle}>x</div>
            <p className="objective">
              Part {this.state.currentSection + 1}: Which two objects are connected{this.state.currentSection > 0 && " now"}?
            </p>
            <div className="objects">
              {this.renderObjects()}
            </div>
            <div className="actions">
              <button className="action check" onClick={this.checkPuzzle}>check</button>
              <button className={`action skip${this.state.confirmSkip ? " confirm-skip" : ""}`} onClick={this.skipPuzzle} ref={this.setSkipRef}>skip</button>
            </div>
            </div>}
        </div>
      </div>;

    return (
      contents
    );
  }
}
