import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Chapters extends Component {
  static displayName = Chapters.name;

  render() {
    return (
      <div>
        <h1>Chapters</h1>
        <ol>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/chapters/1">A Fork in the Road</NavLink>
          </NavItem>
        </ol>
      </div>
    );
  }
}
