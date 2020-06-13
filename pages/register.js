import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import {
  Box,
  Text,
  FormField,
  TextInput,
  Button,
  Anchor,
  Heading,
} from "grommet";
import styled from "styled-components";
import withApollo from "../lib/withApollo";
import { Mutation } from "react-apollo";
import Router from "next/router";
import { parseCookies } from "nookies";
import SIGN_UP from "../lib/mutations/sign_up";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function Home() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const cookies = parseCookies();

  if (cookies.authentication) {
    Router.push("/");
  }

  return (
    <div>
      <Head>
        <title>Register | Intern News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <MainBox style={{ backgroundColor: "#F0F0F0", paddingBottom: "5%" }}>
        <Box
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          align="center"
        >
          <Heading level="2">Register</Heading>
          {error && (
            <Text color="red">
              {error}
              <br />
            </Text>
          )}
          <Box style={{ width: "50%" }}>
            <FormField name="username" htmlfor="username" label="Username">
              <TextInput
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormField>
            <FormField name="email" htmlfor="email" label="Email">
              <TextInput
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>
            <FormField name="password" htmlfor="password" label="Password">
              <TextInput
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>
            <Mutation
              mutation={SIGN_UP}
              variables={{ username, email, password }}
              onCompleted={(data) => Router.push("/login")}
              onError={(err) => setError(err.graphQLErrors[0].message)}
            >
              {(postMutation) => (
                <Button
                  primary
                  onClick={postMutation}
                  label="Submit"
                  color="accent-3"
                  style={{ marginTop: 40, marginBottom: 40 }}
                />
              )}
            </Mutation>
          </Box>
          <Text>
            Already have an account?{" "}
            <Anchor href="/login" color="gray">
              Sign in
            </Anchor>
          </Text>
        </Box>
      </MainBox>
    </div>
  );
}

export default withApollo(Home);
