import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Batten Gothic</h1>
        <p>A work-in-progress tale about some travellers who do some stuff, which so far has one unrelated prologue and no actual chapters.</p>
        <p>Progress so far:</p>
        <ul>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/chapters/index">This Table of Contentment</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/chapters/prologue">This Prologue</NavLink>
          </NavItem>
        </ul>
        <div className="image-container">
          <img src="/images/cover.png" />
        </div>
      </div>
    );
  }
}
