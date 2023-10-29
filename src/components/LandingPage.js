import React, { useState } from "react";
import { Text, Flex, StyledLink, Background } from "./Styles";
import styled from "styled-components";
import heroImg from "../img/hero.jpg";
import Testimonial from "./Testimonial";
import { testimonialsImport, shuffle } from "../utils/testimonials.js";

const Hero = styled.div`
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${heroImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  height: 25vw;
  min-height: 220px;
  width: 100%;
`;

const TestimonialContainer = styled(Flex)`
  display: flex;
`;

const Main = styled(Flex)`
  display: flex;
  flex-direction: column;
`;

const LandingPage = (props) => {
  const [show, setShow] = useState(false);
  const [testimonials, setTestimonials] = useState(
    shuffle(testimonialsImport).slice(2)
  );
  console.log(testimonials);

  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <Main as="main">
        <Hero>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin="0 auto"
          >
            <Background padding="2em">
              <Text textAlign="center" as="h2" fontSize={[4, 6]} color="white">
                Create Worksheets
              </Text>
              <StyledLink
                display="inline-block"
                padding="0.6rem 1.2rem"
                borderRadius="4px"
                fontSize="0.8rem"
                color="blue"
                fontWeight="bold"
                bg="rgba(255,255,255,1)"
                to="/register"
              >
                Get Started
              </StyledLink>
            </Background>
          </Flex>
        </Hero>
        <TestimonialContainer
          maxWidth="1200px"
          margin={"0 auto"}
          textAlign="center"
          my={"40px"}
          p={`0px 15px`}
        >
          {testimonials.map((testimonial, i) => {
            return (
              <Testimonial
                id={i}
                text={testimonial.text}
                author={testimonial.author}
              />
            );
          })}
        </TestimonialContainer>
      </Main>
    </>
  );
};
//
export default LandingPage;
