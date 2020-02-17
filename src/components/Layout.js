import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const Main = styled.main`
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

  return (
    <>
      <NavBar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
