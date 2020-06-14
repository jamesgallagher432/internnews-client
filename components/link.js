import React, { Component } from "react";
import { Box, Text, Anchor } from "grommet";
import withApollo from "../lib/withApollo";
import { Mutation } from "react-apollo";
import { timeDifferenceForDate } from "../lib/utils";
import CREATE_VOTE from "../lib/mutations/create_vote";
import DELETE_LINK from "../lib/mutations/delete_link";
import PropTypes from 'prop-types';

class Link extends Component {
  render() {
    return (
      <div>
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Box direction="row">
            <Mutation
              mutation={CREATE_VOTE}
              variables={{ linkId: this.props.link.id }}
            >
              {(voteMutation) => (
                <div
                  className="ml1 gray f11"
                  onClick={voteMutation}
                  style={{ paddingRight: 10 }}
                >
                  ▲ {this.props.link.upvotes.length}
                </div>
              )}
            </Mutation>
            <Anchor
              href={
                this.props.link.url
                  ? this.props.link.url
                  : `/posts/${this.props.link.slug}`
              }
              color="gray"
              style={{ paddingRight: 10, paddingBottom: 5 }}
            >
              {this.props.link.title}
            </Anchor>{" "}
            {this.props.link.url && <Text>{this.props.link.url.replace("https://", "").replace("/", "").replace("www.", "")}</Text>}
          </Box>
          <Box direction="row">
            <Anchor href={`/user/${this.props.link.by.id}`} color="gray">
              {this.props.link.by.username} &nbsp;
            </Anchor>{" "}
            {timeDifferenceForDate(this.props.link.createdAt)}{" "}&nbsp;
            <strong><Anchor href={`/posts/${this.props.link.slug}`} color="black">{this.props.link.comments.length} comments &nbsp;</Anchor></strong>{" "}
            {this.props.user && (
              <div>
                {(this.props.link.by.id === this.props.user.id || this.props.user.isAdmin === true) && (
                  <Mutation
                    mutation={DELETE_LINK}
                    variables={{ linkId: this.props.link.id }}
                  >
                    {(deleteLink) => (
                      <Anchor onClick={deleteLink} color="pink">Delete</Anchor>
                    )}
                  </Mutation>
                )}
              </div>
          )}
        </Box>
        </div>
      </div>
    );
  }
}


Link.propTypes = {
  link: PropTypes.string,
  user: PropTypes.string
};

export default withApollo(Link);
