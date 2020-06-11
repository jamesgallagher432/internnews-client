import React, { Component } from 'react'
import { Box, Text, Anchor } from 'grommet'

class Link extends Component {
  render() {
    return (
      <div>
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          ▲ {this.props.link.upvotes.length} <Anchor href={this.props.link.url} color="gray">{this.props.link.title}</Anchor> {this.props.link.url}<br />
          <Anchor href={`/user/${this.props.link.by.id}`} color="gray">{this.props.link.by.username}</Anchor> 1 day ago <strong>{this.props.link.comments.length} comments</strong>
        </div>
      </div>
    )
  }
}

export default Link;
