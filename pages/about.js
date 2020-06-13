import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import {
  Box,
  Text,
  Anchor,
  Heading,
} from "grommet";
import styled from "styled-components";
import withApollo from "../lib/withApollo";
import { Query } from "react-apollo";
import { parseCookies } from "nookies";
import USER_QUERY from "../lib/queries/current_user";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function About() {
  const cookies = parseCookies();
  return (
    <div>
      <Head>
        <title>About | Intern News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {cookies.authentication ? (
        <Query query={USER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
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
          align="left"
        >
          <Heading level="2">About</Heading>
          <Text>
            Intern News is a news aggregator for interns and young people
            interested in tech.
          </Text>
          <Heading level="4">The Team</Heading>
          <Text>
            Intern News was built by{" "}
            <Anchor color="gray" href="https://jamesg.app">
              James Gallagher
            </Anchor>
            .
          </Text>
        </Box>
      </MainBox>
    </div>
  );
}

export default withApollo(About);
