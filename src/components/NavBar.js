import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  background-color: lightgrey;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #4e4eb2;
  font-weight: 700;
  display: inline-block;
  margin: 0 15px;
`;

export default function() {
  return (
    <NavBar>
      <StyledNavLink to="/login">Login</StyledNavLink>
      <StyledNavLink to="/register">Register</StyledNavLink>
      <StyledNavLink to="/">Search</StyledNavLink>
    </NavBar>
  );
}
