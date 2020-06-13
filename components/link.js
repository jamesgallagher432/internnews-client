import React, { Component } from "react";
import { Box, Text, Anchor } from "grommet";
import gql from "graphql-tag";
import withApollo from "../lib/withApollo";
import { useQuery } from "@apollo/react-hooks";
import { Mutation } from "react-apollo";
import { timeDifferenceForDate } from "../lib/utils";
import CREATE_VOTE from "../lib/mutations/create_vote";

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
          <Anchor href={`/user/${this.props.link.by.id}`} color="gray">
            {this.props.link.by.username}
          </Anchor>{" "}
          {timeDifferenceForDate(this.props.link.createdAt)}{" "}
          <strong>{this.props.link.comments.length} comments</strong>
        </div>
      </div>
    );
  }
}

export default withApollo(Link);
