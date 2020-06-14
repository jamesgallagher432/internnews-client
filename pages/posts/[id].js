import React from "react";
import Head from "next/head";
import Nav from "../../components/nav";
import Link from "../../components/link";
import { Box, Text, TextArea, Anchor, Button } from "grommet";
import styled from "styled-components";
import withApollo from "../../lib/withApollo";
import { Query } from "react-apollo";
import Router from "next/router";
import { useRouter } from "next/router";
import { Mutation } from "react-apollo";
import { parseCookies } from "nookies";
import Loading from "../../components/loading";
import USER_QUERY from "../../lib/queries/current_user";
import CREATE_COMMENT from "../../lib/mutations/create_comment";
import CREATE_COMMENT_REPLY from "../../lib/mutations/create_comment_reply";
import FEED_QUERY from "../../lib/queries/get_feed";
import { timeDifferenceForDate } from "../../lib/utils";

const MainBox = styled(Box)`
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 100vh;
`;

function Post() {
  const router = useRouter();

  const [comment, setCommentValue] = React.useState("");
  const [commentError, setCommentError] = React.useState("");

  const [replyComment, setReplyComment] = React.useState("");
  const [replyCommentError, setReplyCommentError] = React.useState("");

  const [showReply, setShowReply] = React.useState("");

  const cookies = parseCookies();

  return (
    <div>
      {cookies.authentication ? (
        <Query query={USER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return <div>Error</div>;

            const currentUser = data.currentUser[0];

            return <Nav user={currentUser} />;
          }}
        </Query>
      ) : (
        <Nav />
      )}
      <MainBox style={{ backgroundColor: "#F0F0F0", paddingBottom: "5%" }}>
        <Query query={FEED_QUERY} variables={{ link: router.query.id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>This post does not exist.</div>;

            const link = data.allLinks[0];

            return (
              <div
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <Head>
                  <title>{link.title} | Intern News</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Link key={link.id} link={link} />
                <br />
                <h4>Post a Comment</h4>
                {commentError && (
                  <Text color="red">
                    {commentError}
                    <br />
                  </Text>
                )}
                <TextArea
                  placeholder="type here"
                  value={comment}
                  onChange={(event) => setCommentValue(event.target.value)}
                  style={{ width: "50%" }}
                />
                <br />
                {cookies.authentication ? (
                  <Mutation
                    mutation={CREATE_COMMENT}
                    variables={{
                      linkId: data.allLinks[0].id,
                      description: comment,
                    }}
                    onCompleted={(data) =>
                      Router.push(`/posts/${router.query.id}`)
                    }
                    onError={(err) =>
                      setCommentError(err.graphQLErrors[0].message)
                    }
                  >
                    {(commentMutation) => (
                      <Button
                        primary
                        onClick={commentMutation}
                        color="accent-3"
                        label="Submit"
                        style={{ marginTop: 10, marginBottom: 10 }}
                      />
                    )}
                  </Mutation>
                ) : (
                  <Text>Please sign in to comment</Text>
                )}
                <h4>Comments</h4>
                {link.comments.length === 0 && (
                  <Text>This post has no comments.</Text>
                )}
                {link.comments.map((comment) => {
                  if (comment.parent) {
                    return null;
                  } else {
                    return (
                      <Box>
                        <div>
                          <Anchor href={`/user/${comment.user.id}`} color="gray">
                            {comment.user.username}
                          </Anchor>{" "}
                          1 day ago
                          <br />
                          {comment.description}
                        </div>
                        {comment.children.map((child) => {
                          return (
                              <div style={{ paddingLeft: "5%" }}>
                                <Anchor href={`/user/${child.user.id}`} color="gray">
                                  {child.user.username}
                                </Anchor>{" "}
                                {timeDifferenceForDate(child.createdAt)}
                                <br />
                                {child.description}
                              </div>
                          );
                        })}
                        <br />
                        {cookies.authentication && (
                          <div>
                            <Anchor onClick={() => setShowReply(comment.id)}>Reply</Anchor>
                            {showReply === comment.id && (
                              <div>
                                {replyCommentError && (
                                  <Text color="red">
                                    {replyCommentError}
                                    <br />
                                  </Text>
                                )}
                                <TextArea
                                  placeholder="type here"
                                  value={replyComment}
                                  onChange={(event) => setReplyComment(event.target.value)}
                                  style={{ width: "50%" }}
                                /><br />
                                  <Mutation
                                    mutation={CREATE_COMMENT_REPLY}
                                    variables={{
                                      commentId: comment.id,
                                      description: replyComment,
                                    }}
                                    onCompleted={(data) =>
                                      Router.push(`/posts/${router.query.id}`)
                                    }
                                    onError={(err) =>
                                      setReplyCommentError(err.graphQLErrors[0].message)
                                    }
                                  >
                                    {(replyMutation) => (
                                      <Button
                                        primary
                                        onClick={replyMutation}
                                        color="accent-3"
                                        label="Submit"
                                        style={{ marginTop: 10, marginBottom: 10 }}
                                      />
                                    )}
                                  </Mutation>
                              </div>
                            )}
                          </div>
                        )}
                      </Box>
                    );
                  }
                })}
              </div>
            );
          }}
        </Query>
      </MainBox>
    </div>
  );
}

export default withApollo(Post);
