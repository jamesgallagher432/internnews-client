import React, { Component } from "react";
import Head from "next/head";
import Nav from "../../components/nav";
import Link from "../../components/link";
import {
  Box,
  Text,
  TextArea,
  Anchor,
  Button,
  Heading,
  Tabs,
  Tab,
  TextInput,
} from "grommet";
import styled from "styled-components";
import gql from "graphql-tag";
import withApollo from "../../lib/withApollo";
import { Query } from "react-apollo";
import { useRouter } from "next/router";
import { Mutation } from "react-apollo";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { timeDifferenceForDate } from "../../lib/utils";
import Loading from "../../components/loading";
import USER_QUERY from "../../lib/queries/current_user";
import FEED_QUERY from "../../lib/queries/get_user_feed";
import UPDATE_PROFILE from "../../lib/mutations/update_profile";
import RESET_PASSWORD from "../../lib/mutations/reset_password";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function Post() {
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [queryError, setQueryError] = React.useState("");
  const [old_password, setOldPassword] = React.useState("");
  const [new_password, setNewPassword] = React.useState("");
  const [show_reset_complete, completeReset] = React.useState("");
  const [password_error, setPasswordError] = React.useState("");
  const [showReset, showResetPassword] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const cookies = parseCookies();

  return (
    <div>
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
        <Query
          query={FEED_QUERY}
          variables={{ user: parseInt(router.query.id) }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error</div>;

            const user = data.allUsers[0];

            return (
              <div
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <Head>
                  <title>{user.username} | Intern News</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                user: {user.username}
                <br />
                email: {user.email}
                <br />
                about: {user.about}
                <br />
                <Query query={USER_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return <div>Error</div>;

                    const currentUser = data.currentUser[0];

                    if (currentUser) {
                      if (loaded === false) {
                        setUsername(currentUser.username);
                        setEmail(currentUser.email);
                        setAbout(currentUser.about);
                      }

                      setLoaded(true);

                      if (
                        parseInt(currentUser.id) === parseInt(router.query.id)
                      ) {
                        return (
                          <div>
                            <Anchor
                              onClick={() => showResetPassword(!showReset)}
                              color="gray"
                            >
                              Reset Password
                            </Anchor>
                            <br />
                            {showReset === true && (
                              <div>
                                <Heading level="4">Reset Password</Heading>
                                {show_reset_complete === true && (
                                  <Text>Your password has been reset.</Text>
                                )}
                                {password_error && (
                                  <div>
                                    <Text color="red">{password_error}</Text>
                                    <br />
                                  </div>
                                )}
                                <TextInput
                                  id="old_password"
                                  name="old_password"
                                  placeholder="Old password"
                                  type="password"
                                  value={old_password}
                                  style={{ width: "50%" }}
                                  onChange={(event) =>
                                    setOldPassword(event.target.value)
                                  }
                                />
                                <br />
                                <TextInput
                                  id="new_password"
                                  name="new_password"
                                  placeholder="New password"
                                  type="password"
                                  value={new_password}
                                  style={{ width: "50%" }}
                                  onChange={(event) =>
                                    setNewPassword(event.target.value)
                                  }
                                />
                                <Mutation
                                  mutation={RESET_PASSWORD}
                                  variables={{
                                    oldPassword: old_password,
                                    newPassword: new_password,
                                  }}
                                  onCompleted={(data) => {
                                    setPasswordError(null);
                                    completeReset(true);
                                  }}
                                  onError={(err) =>
                                    setPasswordError(
                                      err.graphQLErrors[0].message
                                    )
                                  }
                                >
                                  {(resetMutation) => (
                                    <Button
                                      primary
                                      onClick={resetMutation}
                                      color="accent-3"
                                      label="Submit"
                                      style={{
                                        marginTop: 40,
                                        marginBottom: 40,
                                      }}
                                    />
                                  )}
                                </Mutation>
                              </div>
                            )}
                            <Heading level="4">Update Profile</Heading>
                            {queryError && (
                              <Text color="red">
                                {queryError}
                                <br />
                              </Text>
                            )}
                            <TextInput
                              id="username"
                              name="username"
                              placeholder="Username"
                              value={username}
                              style={{ width: "50%" }}
                              onChange={(event) =>
                                setUsername(event.target.value)
                              }
                            />
                            <br />
                            <TextInput
                              id="email"
                              name="email"
                              placeholder="Email"
                              value={email}
                              style={{ width: "50%" }}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                            <br />
                            <TextArea
                              placeholder="About"
                              value={about}
                              onChange={(event) => setAbout(event.target.value)}
                              style={{ width: "50%" }}
                            />
                            <br />
                            <Mutation
                              mutation={UPDATE_PROFILE}
                              variables={{ username, email, about }}
                              onCompleted={(data) => setQueryError(null)}
                              onError={(err) =>
                                setQueryError(err.graphQLErrors[0].message)
                              }
                            >
                              {(commentMutation) => (
                                <Button
                                  primary
                                  onClick={commentMutation}
                                  color="accent-3"
                                  label="Submit"
                                  style={{ marginTop: 40, marginBottom: 40 }}
                                />
                              )}
                            </Mutation>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    } else {
                      return null;
                    }
                  }}
                </Query>
                <Query query={USER_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;

                    const currentUser = data.currentUser[0];

                    return (
                      <Tabs justify="start">
                        <Tab title="Submissions" style={{ paddingBottom: 10 }}>
                          {user.links.map((link) => (
                            <Link
                              key={link.id}
                              link={link}
                              user={currentUser}
                            />
                          ))}
                        </Tab>
                        <Tab title="Comments" style={{ paddingBottom: 10 }}>
                          {user.comments.map((comment) => (
                            <div>
                              <Anchor
                                href={`/user/${comment.user.id}`}
                                color="gray"
                              >
                                {comment.user.username}
                              </Anchor>{" "}
                              {timeDifferenceForDate(comment.createdAt)} on{" "}
                              <Anchor
                                href={`/posts/${comment.link.id}`}
                                color="gray"
                              >
                                {comment.link.title}
                              </Anchor>
                              <br />
                              {comment.description}
                            </div>
                          ))}
                        </Tab>
                        <Tab title="Votes" style={{ paddingBottom: 10 }}>
                          {user.upvotes.map((upvote) => (
                            <Link link={upvote.link} user={currentUser} />
                          ))}
                        </Tab>
                      </Tabs>
                    );
                  }}
                </Query>
              </div>
            );
          }}
        </Query>
      </MainBox>
    </div>
  );
}

export default withApollo(Post);
