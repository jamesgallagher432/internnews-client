import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import LinkList from "../components/linklist";
import { Box } from "grommet";
import styled from "styled-components";
import { Query } from "react-apollo";
import withApollo from "../lib/withApollo";
import { parseCookies } from "nookies";
import USER_QUERY from "../lib/queries/current_user";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function Home() {
  const cookies = parseCookies();
  return (
    <div>
      <Head>
        <title>Intern News</title>
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
        <LinkList />
      </MainBox>
    </div>
  );
}

export default withApollo(Home);
