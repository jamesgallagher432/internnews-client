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
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(
      username: $username,
      authProvider: {
        credentials: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }
  }
`

function Home() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
      <div>
        <Head>
          <title>Register | Intern News</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav />
        <MainBox style={{ backgroundColor: "#F0F0F0" }}>
          <Box style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }} align="center">
            <Heading level="2">Register</Heading>
            <Box style={{ width: "50%" }}>
              <FormField name="username" htmlfor="username" label="Username">
                <TextInput id="username" name="username"
                  value={username}
                  onChange={event => setUsername(event.target.value)}/>
              </FormField>
              <FormField name="email" htmlfor="email" label="Email">
                <TextInput id="email" name="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}/>
              </FormField>
              <FormField name="password" htmlfor="password" label="Password">
                <TextInput id="password" name="password" type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}/>
              </FormField>
              <Mutation mutation={POST_MUTATION} variables={{ username, email, password }}>
                {postMutation => <Button primary onClick={postMutation}label="Submit" style={{ marginTop: 40, marginBottom: 40 }}/>}
              </Mutation>
            </Box>
            <Text>Already have an account? <Anchor href="/login" color="gray">Sign in</Anchor></Text>
          </Box>
          </MainBox>
      </div>
    );
};

export default withApollo(Home);
