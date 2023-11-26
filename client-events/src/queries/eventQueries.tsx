import { gql } from '@apollo/client';

const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      name
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      name
      description
      date
      time
      duration
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_EVENTS, GET_EVENT };