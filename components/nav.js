import React from 'react'
import Link from 'next/link'
import { Header, Box, Anchor } from 'grommet'
import styled from 'styled-components'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Router from 'next/router'

const links = [
  { href: '/about', label: 'About'},
  { href: '/register', label: 'Register'},
  { href: '/login', label: 'Sign In'}
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

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
  const cookies = parseCookies();

  return (
    <StyledHeader background="white">
      <div direction="row">
        <Link href='/'>
          <SpecialLink>Intern News</SpecialLink>
        </Link>
      </div>
      <RightDiv direction="row" gap="medium">
        {!user ? (
          <div>
            {links.map(({ key, href, label }) => (
              <Link key={key} href={href}>
                <SpecialLink>{label}</SpecialLink>
              </Link>
            ))}
          </div>
        ) : (
          <div gap="medium">
            <Link href={`/users/${user.id}`}><SpecialLink>{user.username}</SpecialLink></Link>
            <Link href={`/about`}><SpecialLink>About</SpecialLink></Link>
            <Anchor style={{ fontWeight: 400, color: "black" }} onClick={() => { destroyCookie(null, 'authentication'); Router.push('/') }}>Logout</Anchor>
          </div>
        )}
      </RightDiv>
    </StyledHeader>
  )
}

export default Nav
