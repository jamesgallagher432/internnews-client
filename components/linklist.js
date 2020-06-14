import React, { useState } from "react";
import Link from "../components/link";
import { useRouter } from "next/router";
import { Text, Anchor } from "grommet";
import { Query } from "react-apollo";
import withApollo from "../lib/withApollo";
import Loading from "./loading";
import Router from "next/router";
import TOP_FEED_QUERY from "../lib/queries/top_feed";
import BEST_FEED_QUERY from "../lib/queries/best_feed";
import NEW_FEED_QUERY from "../lib/queries/new_feed";
import CURRENT_USER from "../lib/queries/current_user";

function LinkList() {
  const [isTop, setIsTop] = useState("feed");
  const router = useRouter();

  var page_number = page_number;

  if (page_number) {
    if (parseInt(page_number) > 0) {
      if (parseInt(page_number) === 1) {
        var standard_page_number = page_number;
        var last = 25;
        var first = 0;
      } else {
        var last = parseInt(page_number) * 25;
        var standard_page_number = page_number;
        var first = last - 25;
      }
    } else {
      Router.push("/");
    }
  } else {
    var standard_page_number = 1;
    var last = 25;
    var first = 0;
  }

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
          marginBottom: 5,
        }}
      >
        View:{" "}
        <Anchor
          onClick={() => setIsTop("feed")}
          color="gray"
          style={{ paddingRight: 5 }}
        >
          Feed
        </Anchor>{" "}
        <Anchor
          onClick={() => setIsTop("best")}
          color="gray"
          style={{ paddingRight: 5 }}
        >
          Top
        </Anchor>{" "}
        <Anchor onClick={() => setIsTop("new")} color="gray">
          New
        </Anchor>
      </div>
      <Query query={CURRENT_USER}>
        {({ loading, data }) => {
          if (loading) return <Loading />;

          const currentUser = data.currentUser[0];

          return (
            <div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                {isTop === "feed" && (
                  <Query
                    query={TOP_FEED_QUERY}
                    variables={{ first: first, last: last }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <Loading />;
                      if (error) return <div>Error</div>;

                      const linksToRender = data.allLinks;

                      return (
                        <div>
                          {linksToRender.map((link) => (
                            <Link
                              key={link.id}
                              link={link}
                              user={currentUser}
                            />
                          ))}
                          {linksToRender.length === 0 && (
                            <Text>There are no links to display.</Text>
                          )}
                          {linksToRender.length === 25 && (
                            <div>
                              <br />
                              <Anchor
                                onClick={() =>
                                  Router.push(
                                    `/?page=${
                                      parseInt(standard_page_number) + 1
                                    }`
                                  )
                                }
                              >
                                Next
                              </Anchor>
                            </div>
                          )}
                          {parseInt(standard_page_number) > 1 && (
                            <Anchor
                              onClick={() =>
                                Router.push(
                                  `/?page=${parseInt(standard_page_number) - 1}`
                                )
                              }
                            >
                              Previous
                            </Anchor>
                          )}
                        </div>
                      );
                    }}
                  </Query>
                )}
                {isTop === "best" && (
                  <Query
                    query={BEST_FEED_QUERY}
                    variables={{ first: first, last: last }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <Loading />;
                      if (error) return <div>Error</div>;

                      const linksToRender = data.allLinks;

                      return (
                        <div>
                          {linksToRender.map((link) => (
                            <Link
                              key={link.id}
                              link={link}
                              user={currentUser}
                            />
                          ))}
                          {linksToRender.length === 0 && (
                            <Text>There are no links to display.</Text>
                          )}
                          {linksToRender.length === 25 && (
                            <div>
                              <br />
                              <Anchor
                                onClick={() =>
                                  Router.push(
                                    `/?page=${
                                      parseInt(standard_page_number) + 1
                                    }`
                                  )
                                }
                              >
                                Next
                              </Anchor>
                            </div>
                          )}
                          {parseInt(standard_page_number) > 1 && (
                            <Anchor
                              onClick={() =>
                                Router.push(
                                  `/?page=${parseInt(standard_page_number) - 1}`
                                )
                              }
                            >
                              Previous
                            </Anchor>
                          )}
                        </div>
                      );
                    }}
                  </Query>
                )}
                {isTop === "new" && (
                  <Query
                    query={NEW_FEED_QUERY}
                    variables={{ first: first, last: last }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <Loading />;
                      if (error) return <div>Error</div>;

                      const linksToRender = data.allLinks;

                      return (
                        <div>
                          {linksToRender.map((link) => (
                            <Link
                              key={link.id}
                              link={link}
                              user={currentUser}
                            />
                          ))}
                          {linksToRender.length === 0 && (
                            <Text>There are no links to display.</Text>
                          )}
                          {linksToRender.length === 25 && (
                            <div>
                              <br />
                              <Anchor
                                onClick={() =>
                                  Router.push(
                                    `/?page=${
                                      parseInt(standard_page_number) + 1
                                    }`
                                  )
                                }
                              >
                                Next
                              </Anchor>
                            </div>
                          )}
                          {parseInt(standard_page_number) > 1 && (
                            <Anchor
                              onClick={() =>
                                Router.push(
                                  `/?page=${parseInt(standard_page_number) - 1}`
                                )
                              }
                            >
                              Previous
                            </Anchor>
                          )}
                        </div>
                      );
                    }}
                  </Query>
                )}
              </div>
            </div>
          );
        }}
      </Query>
    </div>
  );
}

export default withApollo(LinkList);
