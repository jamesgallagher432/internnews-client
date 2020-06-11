import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import Link from '../../components/link'
import { Box, Text, TextArea, Anchor } from 'grommet'
import styled from 'styled-components'
import gql from 'graphql-tag'
import withApollo from '../../lib/withApollo'
import { Query } from 'react-apollo'

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

const FEED_QUERY = gql`
  {
    allLinks(link: 1) {
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
        user {
          id
          username
        }
        description
      }
    }
  }
`;

function Post() {
  const [comment, setCommentValue] = React.useState('');
  
    return (
      <div>
        <Head>
          <title>Intern News</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav />
        <MainBox style={{ backgroundColor: "#F0F0F0" }}>
          <Query query={FEED_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const link = data.allLinks[0];

              return (
                <div style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                  <Link key={link.id} link={link} />
                  <br />
                  <h4>Post a Comment</h4>
                  <TextArea
                    placeholder="type here"
                    value={comment}
                    onChange={event => setCommentValue(event.target.value)}
                    style={{ width: "50%" }}
                  />
                  <h4>Comments</h4>
                  {link.comments.map((comment) => {
                    return (
                      <div>
                        <Anchor href={`/user/${comment.user.id}`} color="gray">{comment.user.username}</Anchor> 1 day ago<br />
                        {comment.description}
                      </div>
                    )
                  })}
                </div>
              )
            }}
          </Query>
        </MainBox>
      </div>
    );
};

export default withApollo(Post);
