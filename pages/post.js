import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import LinkList from "../components/linklist";
import {
  Box,
  Text,
  FormField,
  TextInput,
  Button,
  Anchor,
  Heading,
  TextArea,
} from "grommet";
import styled from "styled-components";
import withApollo from "../lib/withApollo";
import { Query, Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import USER_QUERY from "../lib/queries/current_user";
import CREATE_POST from "../lib/mutations/create_post";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function Post() {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const cookies = parseCookies();

  return (
    <div>
      <Head>
        <title>Post | Intern News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {cookies.authentication ? (
        <Query query={USER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return <div>Error</div>;

            const currentUser = data.currentUser[0];

            return <Nav user={currentUser} />;
          }}
        </Query>
      ) : (
        <Nav />
      )}
      <MainBox style={{ backgroundColor: "#F0F0F0", paddingBottom: "5%" }}>
        <Box
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          align="center"
        >
          <Heading level="2">Post</Heading>
          {error && (
            <Text color="red">
              {error}
              <br />
            </Text>
          )}
          <Box style={{ width: "50%" }}>
            <TextInput
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <br />
            <TextInput
              id="url"
              name="url"
              placeholder="URL"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <br />
            or
            <br />
            <TextArea
              id="description"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Mutation
              mutation={CREATE_POST}
              variables={{ title, url, description }}
              onCompleted={(data) =>
                Router.push(`/posts/${data.createLink.slug}`)
              }
              onError={(err) => setError(err.graphQLErrors[0].message)}
            >
              {(postMutation) => (
                <Button
                  primary
                  onClick={postMutation}
                  color="accent-3"
                  label="Create Post"
                  style={{ marginTop: 40, marginBottom: 40 }}
                />
              )}
            </Mutation>
          </Box>
        </Box>
      </MainBox>
    </div>
  );
}

export default withApollo(Post);
