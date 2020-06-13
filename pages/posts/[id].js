import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import Link from '../../components/link'
import { Box, Text, TextArea, Anchor, Button } from 'grommet'
import styled from 'styled-components'
import gql from 'graphql-tag'
import withApollo from '../../lib/withApollo'
import { Query } from 'react-apollo'
import Router from 'next/router'
import { useRouter } from 'next/router';
import { Mutation } from 'react-apollo';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Loading from '../../components/loading';
import USER_QUERY from '../../lib/queries/current_user';
import CREATE_COMMENT from '../../lib/mutations/create_comment';
import FEED_QUERY from '../../lib/queries/get_feed';

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function Post() {
  const router = useRouter();
  const [comment, setCommentValue] = React.useState('');
  const [commentError, setCommentError] = React.useState('');

  const cookies = parseCookies()

    return (
      <div>
        <Head>
          <title>Intern News</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
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
        <MainBox style={{ backgroundColor: "#F0F0F0", paddingBottom: "5%" }}>
          <Query query={FEED_QUERY} variables={{ link: router.query.id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <div>This post does not exist.</div>

              const link = data.allLinks[0];

              return (
                <div style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                  <Link key={link.id} link={link} />
                  <br />
                  <h4>Post a Comment</h4>
                  {commentError && (
                    <Text color="red">{commentError}<br /></Text>
                  )}
                  <TextArea
                    placeholder="type here"
                    value={comment}
                    onChange={event => setCommentValue(event.target.value)}
                    style={{ width: "50%" }}
                  />
                  <br />
                  {cookies.authentication ? (
                    <Mutation mutation={COMMENT_MUTATION} variables={{ linkId: data.allLinks[0].id, description: comment }}
                      onCompleted={data => Router.push(`/posts/${router.query.id}`)}
                      onError={(err) => setCommentError(err.graphQLErrors[0].message)}>
                      {commentMutation => <Button primary onClick={commentMutation} label="Submit" style={{ marginTop: 10, marginBottom: 10 }}/>}
                    </Mutation>
                  ) : (
                    <Text>Please sign in to comment</Text>
                  )}
                  <h4>Comments</h4>
                  {link.comments.length === 0 && (
                    <Text>This post has no comments.</Text>
                  )}
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
