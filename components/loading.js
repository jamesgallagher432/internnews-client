import React, { Component } from 'react'
import { Box, Text, Anchor } from 'grommet'
import gql from 'graphql-tag'
import withApollo from '../lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { Mutation } from 'react-apollo'
import { timeDifferenceForDate } from '../lib/utils'
import MoonLoader from "react-spinners/MoonLoader";

class Loading extends Component {
  render() {
    return (
      <Box style={{ backgroundColor: "white", padding: 20, borderRadius: 10, minHeight: "50vh" }} align="center">
        <Box style={{ padding: "20vh" }}>
          <MoonLoader size={20} justify="center" />
        </Box>
      </Box>
    )
  }
}

export default Loading;
