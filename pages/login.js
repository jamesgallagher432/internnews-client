import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import LinkList from '../components/linklist'
import { Box, Text, FormField, TextInput, Button, Anchor, Heading } from 'grommet'
import styled from 'styled-components'
import withApollo from '../lib/withApollo'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

const POST_MUTATION = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signinUser(
      credentials: {
        email: $email,
        password: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`

function Home() {
    const [email, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
      <div>
        <Head>
          <title>Login | Intern News</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav />
        <MainBox style={{ backgroundColor: "#F0F0F0" }}>
          <Box style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }} align="center">
            <Heading level="2">Sign In</Heading>
            <Box style={{ width: "50%" }}>
              <FormField name="email" htmlfor="email" label="Email">
                <TextInput id="email" name="email"
                  value={email}
                  onChange={event => setUsername(event.target.value)}/>
              </FormField>
              <FormField name="password" htmlfor="password" label="Password">
                <TextInput id="password" name="password" type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}/>
              </FormField>
              <Text><Anchor href="/forgot" color="gray">Forgot your password?</Anchor></Text>
              <Mutation mutation={POST_MUTATION} variables={{ email, password }}>
                {postMutation => <Button primary onClick={postMutation}label="Submit" style={{ marginTop: 40, marginBottom: 40 }}/>}
              </Mutation>
            </Box>
            <Text>Don't have an account? <Anchor href="/register" color="gray">Register</Anchor></Text>
          </Box>
          </MainBox>
      </div>
    );
};

export default withApollo(Home);
