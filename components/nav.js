import React from "react";
import Link from "next/link";
import { Header, Box, Anchor } from "grommet";
import styled from "styled-components";
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

const StyledHeader = styled(Header)`
  padding: 20px;
`;

const RightDiv = styled(Box)`
  .rightMenu {
    flex: 1;
    padding-right: 20px;
  }
`;

const SpecialLink = styled(Anchor)`
  color: black;
  font-weight: 400;
  margin-right: 20px;
`;

function Nav({ user }) {
  return (
    <StyledHeader background="white">
      <div direction="row">
        <Link href="/">
          <Anchor style={{ marginRight: 20 }} color="blue">Intern News</Anchor>
        </Link>
        {user && (
          <Link href={`/about`}>
            <SpecialLink>About</SpecialLink>
          </Link>
        )}
        {user && (
          <Link href={`/post`}>
            <SpecialLink>Post</SpecialLink>
          </Link>
        )}
      </div>
      <RightDiv direction="row" gap="medium">
        {!user ? (
          <div>
            <Link href={`/about`}>
              <SpecialLink>About</SpecialLink>
            </Link>
            <Link href={`/register`}>
              <SpecialLink>Register</SpecialLink>
            </Link>
            <Link href={`/login`}>
              <SpecialLink>Login</SpecialLink>
            </Link>
          </div>
        ) : (
          <div gap="medium">
            <Link href={`/users/${user.id}`}>
              <SpecialLink>{user.username}</SpecialLink>
            </Link>
            <Anchor
              style={{ fontWeight: 400, color: "black" }}
              onClick={() => {
                destroyCookie(null, "authentication");
                Router.push("/");
              }}
            >
              Logout
            </Anchor>
          </div>
        )}
      </RightDiv>
    </StyledHeader>
  );
}

export default Nav;
