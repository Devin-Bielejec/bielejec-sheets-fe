import React from "react";
import styled from "styled-components";

const date = new Date();

const FooterStyled = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function Footer() {
  return (
    <FooterStyled>
      <p>Devin Bielejec &copy; {date.getFullYear()}</p>
    </FooterStyled>
  );
}
