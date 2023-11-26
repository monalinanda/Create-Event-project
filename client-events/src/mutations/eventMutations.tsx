import { gql } from '@apollo/client';

const ADD_EVENT = gql`
  mutation AddEvent(
    $name: String!
    $description: String!
      $date : String!
      $time : String!
      $duration : String!
    $status: EventStatus!
    $clientId: ID!
  ) {
    addEvent(
      name: $name
      description: $description
      date : $date 
      time : $time 
      duration : $duration
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
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

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $name: String!
    $description: String!
    $date : String!
    $time : String!
    $duration : String!
    $status: EventStatusUpdate!
  ) {
    updateEvent(
      id: $id
      name: $name
      description: $description
      date : $date 
      time : $time 
      duration : $duration
      status: $status
    ) {
      id
      name
      description
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

export { ADD_EVENT , DELETE_EVENT, UPDATE_EVENT };