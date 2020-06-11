import React from 'react'
import Link from 'next/link'
import { Header, Box } from 'grommet'
import styled from 'styled-components'

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

const SpecialLink = styled.a`
  color: black;
`;

const Nav = () => (
  <StyledHeader background="white">
    <div direction="row">
      <Link href='/'>
        <SpecialLink>Home</SpecialLink>
      </Link>
    </div>
    <RightDiv direction="row" gap="medium">
      {links.map(({ key, href, label }) => (
        <Link key={key} href={href}>
          <SpecialLink>{label}</SpecialLink>
        </Link>
      ))}
    </RightDiv>
  </StyledHeader>
)

export default Nav
