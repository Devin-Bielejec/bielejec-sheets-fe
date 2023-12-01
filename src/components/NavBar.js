import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  background-color: white;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #4e4eb2;
  font-weight: 700;
  display: inline-block;
  margin: 0 15px;
`;

export default function () {
  return (
    <NavBar>
      <StyledNavLink to="/search">Search</StyledNavLink>
      <StyledNavLink to="/preview">Preview</StyledNavLink>
      <StyledNavLink to="/create">Create</StyledNavLink>
      <StyledNavLink to="/login">Login</StyledNavLink>
      <StyledNavLink to="/register">Register</StyledNavLink>
    </NavBar>
  );
}
