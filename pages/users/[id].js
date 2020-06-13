import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import Link from '../../components/link'
import { Box, Text, TextArea, Anchor, Button, Heading, Tabs, Tab, TextInput } from 'grommet'
import styled from 'styled-components'
import gql from 'graphql-tag'
import withApollo from '../../lib/withApollo'
import { Query } from 'react-apollo'
import { useRouter } from 'next/router';
import { Mutation } from 'react-apollo';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

const FEED_QUERY = gql`
  query Users($user: Int) {
    allUsers(user: $user) {
      id
      username
      email
      about
      createdAt
      links {
        id
        title
        slug
        description
        by {
          id
          username
        }
        comments {
          id
        }
        upvotes {
          id
        }
      }
      comments {
        id
        description
        user {
          id
          username
        }
      }
      upvotes {
        id
        link {
          id
          title
          slug
          description
          by {
            id
            username
          }
          comments {
            id
          }
          upvotes {
            id
          }
        }
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($username: String!, $email: String!, $about: String!) {
    updateProfile(username: $username, email: $email, about: $about) {
      id
      username
      email
      about
      createdAt
      links {
        id
        title
        slug
        description
        by {
          id
          username
        }
        comments {
          id
        }
        upvotes {
          id
        }
      }
      comments {
        id
        description
        user {
          id
          username
        }
      }
      upvotes {
        id
        link {
          id
          title
          slug
          description
          by {
            id
            username
          }
          comments {
            id
          }
          upvotes {
            id
          }
        }
      }
    }
  }
`;

const USER_QUERY = gql`
  {
    currentUser {
      id
      username
      email
      about
    }
  }
`;

function Post() {
  const router = useRouter();

  const key = Math.random();

  const [username, setUsername] = React.useState(key);
  const [email, setEmail] = React.useState(key);
  const [about, setAbout] = React.useState(key);
  const cookies = parseCookies()

    return (
      <div>
        {cookies.authentication ? (
          <Query query={USER_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const currentUser = data.currentUser[0];

              return (
                <Nav user={currentUser} />
              )
            }}
          </Query>
        ) : (
          <Nav />
        )}
        <MainBox style={{ backgroundColor: "#F0F0F0" }}>
          <Query query={FEED_QUERY} variables={{ user: parseInt(router.query.id) }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const user = data.allUsers[0];

              return (
                <div style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                  <Head>
                    <title>{user.username} | Intern News</title>
                    <link rel='icon' href='/favicon.ico' />
                  </Head>
                  user: {user.username}<br />
                  email: {user.email}<br />
                  about: {user.about}<br />
                  <Query query={USER_QUERY}>
                    {({ loading, error, data }) => {
                      if (loading) return <div>Fetching</div>
                      if (error) return <div>Error</div>

                      const currentUser = data.currentUser[0];

                      if (currentUser) {
                        if (username === key) {
                          setUsername(currentUser.username)
                        }

                        if (email === key) {
                          setEmail(currentUser.email)
                        }

                        if (about === key) {
                          setAbout(currentUser.about)
                        }

                        if (parseInt(currentUser.id) === parseInt(router.query.id)) {
                          return (
                            <div>
                              <TextInput id="username" name="username" placeholder="Username"
                                value={username}
                                style={{ width: "50%" }}
                                onChange={event => setUsername(event.target.value)}/>
                              <br />
                              <TextInput id="email" name="email" placeholder="Email"
                                value={email}
                                style={{ width: "50%" }}
                                onChange={event => setEmail(event.target.value)}/>
                              <br />
                              <TextArea
                                placeholder="About"
                                value={about}
                                onChange={event => setAbout(event.target.value)}
                                style={{ width: "50%" }}
                              />
                              <br />
                              <Mutation mutation={UPDATE_PROFILE} variables={{ username, email, about }}>
                                {commentMutation => <Button primary onClick={commentMutation} label="Submit" style={{ marginTop: 40, marginBottom: 40 }}/>}
                              </Mutation>
                              <br /><br />
                            </div>
                          )
                        } else {
                          return null;
                        }
                      } else {
                        return null;
                      }
                    }}
                  </Query>
                  <Tabs justify="start">
                    <Tab title="Submissions">
                      {user.links.map((link) => <Link key={link.id} link={link} />)}
                    </Tab>
                    <Tab title="Comments">
                      {user.comments.map((comment) =>
                        <div>
                          <Anchor href={`/user/${comment.user.id}`} color="gray">{comment.user.username}</Anchor> 1 day ago on Post Name<br />
                          {comment.description}
                        </div>
                      )}
                    </Tab>
                    <Tab title="Votes">
                      {user.upvotes.map((upvote) => <Link link={upvote.link} />)}
                    </Tab>
                  </Tabs>
                </div>
              )
            }}
          </Query>
        </MainBox>
      </div>
    );
};

export default withApollo(Post);
