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
import { Mutation } from 'react-apollo'

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

function Post() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [about, setAbout] = React.useState('');

    return (
      <div>
        <Nav />
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
