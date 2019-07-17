import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Index extends Component {
  static displayName = Index.name;

  render () {
    return (
      <div>
        <h1>Chapters</h1>
        <ul>
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/chapters/prologue">Prologue</NavLink>
          </NavItem>
        </ul>
      </div>
    );
  }
}
