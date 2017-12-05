import React from 'react'
import ReactDOM from 'react-dom'

import {installRelayDevTools} from 'relay-devtools';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import App from './components/Test';

//方便调试
installRelayDevTools();

function fetchQuery(
  operation,
  variables,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const testQuery = `
query{
  user(assetId:"1"){
    id
    name
    sex,
    like{
      song
      book
      web
    }
  }
}
`

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query{
        user(assetId:"1"){
          id
          name
          sex,
          like{
            song
            book
            web
          }
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <App viewer={props.viewer} />
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  document.getElementById('root')
);