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
import TOP_FEED_QUERY from "../lib/queries/top_feed";
import BEST_FEED_QUERY from "../lib/queries/best_feed";
import NEW_FEED_QUERY from "../lib/queries/new_feed";
import CURRENT_USER from "../lib/queries/current_user";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
`;

function LinkList() {
  const [isTop, setIsTop] = useState("feed");

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 25,
          borderRadius: 10,
          marginBottom: 5
        }}
      >
        View:{" "}
        <Anchor onClick={() => setIsTop("feed")} color="gray" style={{ paddingRight: 5 }}>
          Feed
        </Anchor>{" "}
        <Anchor onClick={() => setIsTop("best")} color="gray" style={{ paddingRight: 5 }}>
          Top
        </Anchor>{" "}
        <Anchor onClick={() => setIsTop("new")} color="gray">
          New
        </Anchor>
      </div>
        <Query query={CURRENT_USER}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;

            const currentUser = data.currentUser[0];

            return (
              <div>
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
                              <Link key={link.id} link={link} user={currentUser} />
                            ))}
                            {linksToRender.length === 0 && (
                              <Text>There are no links to display.</Text>
                            )}
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
                              <Link key={link.id} link={link} user={currentUser} />
                            ))}
                            {linksToRender.length === 0 && (
                              <Text>There are no links to display.</Text>
                            )}
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
                            <Link key={link.id} link={link} user={currentUser} />
                          ))}
                          {linksToRender.length === 0 && (
                            <Text>There are no links to display.</Text>
                          )}
                        </div>
                      </div>
                    );
                  }}
                </Query>
              )}
              </div>
            )
          }}
        </Query>
    </div>
  );
}

export default withApollo(LinkList);
