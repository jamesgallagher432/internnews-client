import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import LinkList from '../components/linklist'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import withApollo from '../lib/withApollo'

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function Home() {
    return (
      <div>
        <Head>
          <title>Intern News</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav />
        <MainBox style={{ backgroundColor: "#F0F0F0" }}>
          <LinkList />
        </MainBox>
      </div>
    );
};

export default withApollo(Home);
