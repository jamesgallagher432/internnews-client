import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "../components/link";
import { Box, Text, Anchor } from "grommet";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import withApollo from "../lib/withApollo";
import { useQuery } from "@apollo/react-hooks";
import Loading from "./loading";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
`;

const NEW_FEED_QUERY = gql`
  {
    allLinks {
      id
      url
      description
      title
      slug
      by {
        id
        username
      }
      upvotes {
        id
      }
      comments {
        id
      }
      createdAt
    }
  }
`;

const TOP_FEED_QUERY = gql`
  {
    allLinks(order: "top") {
      id
      url
      description
      title
      slug
      by {
        id
        username
      }
      upvotes {
        id
      }
      comments {
        id
      }
      createdAt
    }
  }
`;

const BEST_FEED_QUERY = gql`
  {
    allLinks(order: "best") {
      id
      url
      description
      title
      slug
      by {
        id
        username
      }
      upvotes {
        id
      }
      comments {
        id
      }
      createdAt
    }
  }
`;

function LinkList() {
  const [isTop, setIsTop] = useState("feed");

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          marginBottom: 5,
        }}
      >
        View:{" "}
        <Anchor onClick={() => setIsTop("feed")} color="gray">
          Feed
        </Anchor>{" "}
        <Anchor onClick={() => setIsTop("best")} color="gray">
          Top
        </Anchor>{" "}
        <Anchor onClick={() => setIsTop("new")} color="gray">
          New
        </Anchor>
      </div>
      {isTop === "feed" && (
        <Query query={TOP_FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error</div>;

            const linksToRender = data.allLinks;

            return (
              <div>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  {linksToRender.map((link) => (
                    <Link key={link.id} link={link} />
                  ))}
                </div>
              </div>
            );
          }}
        </Query>
      )}
      {isTop === "best" && (
        <Query query={BEST_FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error</div>;

            const linksToRender = data.allLinks;

            return (
              <div>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  {linksToRender.map((link) => (
                    <Link key={link.id} link={link} />
                  ))}
                </div>
              </div>
            );
          }}
        </Query>
      )}
      {isTop === "new" && (
        <Query query={NEW_FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error</div>;

            const linksToRender = data.allLinks;

            return (
              <div>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  {linksToRender.map((link) => (
                    <Link key={link.id} link={link} />
                  ))}
                </div>
              </div>
            );
          }}
        </Query>
      )}
    </div>
  );
}

export default withApollo(LinkList);
