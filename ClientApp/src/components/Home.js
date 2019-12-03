import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Lotographia</h1>
        <p>A work-in-progress tale about some travellers who do some stuff, which so far has one chapter containing no dialogue.</p>
        <p>Progress so far:</p>
        <ul>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/chapters">This Table of Contentment</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/chapters/1">A Fork in the Road</NavLink>
          </NavItem>
        </ul>
      </div>
    );
  }
}
