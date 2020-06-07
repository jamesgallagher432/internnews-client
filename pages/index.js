import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { Grid, Box } from 'grommet'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />
    <Grid rows={['small']} align='center' alignCenter='between' gap='small'>
      <Box align='center'>
        <h1 className='title'>Welcome to Next.js!</h1>
        <p className='description'>
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>
      </Box>
    </Grid>
    <Box>
      <Box>
      </Box>
    </Box>
  </div>
)

export default Home'
