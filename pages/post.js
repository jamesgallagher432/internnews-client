import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import LinkList from '../components/linklist'
import { Box, Text, FormField, TextInput, Button, Anchor, Heading, TextArea } from 'grommet'
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
  mutation CreatePost($title: String!, $url: String!, $description: String!) {
    createLink(
      url: $url,
      description: $description,
      title: $title
    ) {
      id
    }
  }
`

function Post() {
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [description, setDescription] = React.useState('');
    return (
      <div>
        <Head>
          <title>Post | Intern News</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav />
        <MainBox style={{ backgroundColor: "#F0F0F0" }}>
          <Box style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }} align="center">
            <Heading level="2">Post</Heading>
            <Box style={{ width: "50%" }}>
              <FormField name="title" htmlfor="title" label="Title">
                <TextInput id="title" name="title"
                  value={title}
                  onChange={event => setTitle(event.target.value)}/>
              </FormField>
              <FormField name="url" htmlfor="url" label="URL">
                <TextInput id="url" name="url"
                  value={url}
                  onChange={event => setUrl(event.target.value)}/>
              </FormField>
              <br />
              or
              <br />
              <FormField name="description" htmlfor="description" label="Description">
                <TextArea id="description" name="description"
                  value={description}
                  onChange={event => setDescription(event.target.value)}/>
              </FormField>
              <Mutation mutation={POST_MUTATION} variables={{ title, url, description }}>
                {postMutation => <Button primary onClick={postMutation}label="Submit" style={{ marginTop: 40, marginBottom: 40 }}/>}
              </Mutation>
            </Box>
            <Text>Don't have an account? <Anchor href="/register" color="gray">Register</Anchor></Text>
          </Box>
          </MainBox>
      </div>
    );
};

export default withApollo(Post);
