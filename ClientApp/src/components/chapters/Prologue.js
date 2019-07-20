import React, { Component } from 'react';

export class Prologue extends Component {
  static displayName = Prologue.name;

  constructor(props) {
    super(props);

    this.characters = ['a', 'e', 'i', 'k', 'm', 'r', 't'];
    this.solution = ['k', 'a', 'r', 'm', 'a'];

    this.addCharacter = this.addCharacter.bind(this);
    this.selectCharacter = this.selectCharacter.bind(this);

    this.state = {
      selectedIndex: 0,
      attempt: ['_', '_', '_', '_','_'],
      isSolved: false,
      isVisible: false
    };
  }

  addCharacter(event) {
    var character = event.currentTarget.dataset.character;
    var attempt = this.state.attempt;
    var selectedIndex = this.state.selectedIndex;

    attempt[selectedIndex] = character;
    selectedIndex = (selectedIndex + 1) % this.state.attempt.length;

    var isSolved = true;

    for (var i = 0; i < attempt.length; i++) {
      if (attempt[i] !== this.solution[i])
        isSolved = false;
    }

    this.setState({
      attempt: attempt,
      selectedIndex: selectedIndex,
      isSolved: this.state.isSolved || isSolved
    });

    if (isSolved) {
      setTimeout(function () {
        this.setState({
          isVisible: true
        })
      }.bind(this), 1);
    }
  }

  selectCharacter(event) {
    var index = Number(event.currentTarget.dataset.index);

    this.setState({
      selectedIndex: index
    });
  }

  render() {
    var attempt = this.state.attempt.map(
      (x, i) => <div key={"attempt" + i} className={"solution-character" + (i === this.state.selectedIndex ? " selected" : "")} data-index={i} onClick={this.selectCharacter}>{x}</div>
    );

    var buttons = this.characters.map(
      (x, i) => <div key={"input" + i} className="input-character" data-character={x} onClick={this.addCharacter}>{x}</div>
    );

    return (
      <div>
        <h1>Introduction from The Narrator</h1>
        <p>I met a traveller from a distant time, on Paraparaumu Beach one day. They had long silver hair and very young skin, and were wearing (I think) what people in the future might expect people in the present day to be wearing. Standing out in the way that can only be achieved by people trying to blend in.</p>
        <p>They were waiting for something. I asked what.</p>
        <p>&ldquo;Inspiration,&rdquo; they said.</p>
        <p>We sat and waited, and I shared some of my contemporary sandwich, and they shared some of their future wisdom (which is just like the wisdom of today, but with greater benefit of hindsight).</p>
        <p>Some children played with kites nearby, but the traveller paid no attention to them. A small seagull circled the seas and appeared to be enjoying life.</p>
        <p>Eventually a dog came by. It was an unhappy looking dog, possibly lost and definitely unfed. Its name (if I remember correctly) was unknown, and it did not appear to be interested in making itself our problem.</p>
        <p>&ldquo;Please wait the future,&rdquo; said the traveller, stopping me from asking the question that had been forming, and possibly getting some sentences crossed over.</p>
        <p>At that moment there was a distant splash; the dog startled and ran out into the ocean. It got pushed back by some waves, and submerged by others, and paid no attention to any of them and eventually got lost to view.</p>
        <p>When it returned it was carrying something that I mistook for a deflated football, but it wasn&rsquo;t. The dog let it down carefully and then cared for it, and I could see that this dog, too, had once been hurt and then cared for.</p>
        <p>&ldquo;That was it,&rdquo; said the traveller. &ldquo;Five months after this moment, I will decide to become a poet.&rdquo;</p>
        <p>I got confused momentarily and thought they were talking about their present self in the past tense, but one of the children was also nearby, their hand hanging limply from their kite and their jaw hanging even more limply, and I chose to make an Inference.</p>
        <p>&ldquo;I had hoped,&rdquo; they said, &ldquo;that if I had watched it all over again&hellip;&rdquo;</p>
        <p>Whatever the end to that sentence would have been, they had clearly not got back what they were hoping for. Without a single glance over at the child with the kite, the traveller stood up and walked away into the dunes, hair getting caught up in (I think) the winds of time.</p>
        <p>Anyway that&rsquo;s the story of the time I met a time traveller. If you were to solve the picture puzzle on this page it might reveal a further significance about the tale&hellip;</p>

        <div className={"hidden-text" + (this.state.isSolved ? " revealed" : "") + (this.state.isVisible ? " visible" : "")}>
          <hr />
          <p>Or you might find that it has no further significance. It is a disposable tale to introduce you to the concepts that will be used in the main entries found in this journal. Each entry will have a few pages of text followed by a hidden object puzzle that will unlock even more pages of text. Most pictures should contain more than one set of hidden objects.</p>
          <p>I hope you choose to stick around.</p>
        </div>

        <div className="image-container">
          <img className="image" src="/images/prologue.png" />
        </div>

        {!this.state.isSolved
          ? <div>
            <div className="solution-characters">{attempt}</div>
            <div className="input-characters">{buttons}</div>
          </div> : null}
      </div>
    );
  }
}
