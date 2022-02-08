import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  // InMemoryCache() should take the place of the subsequent code. Much easier to implement.
  cache: new InMemoryCache(),
  uri: '/graphql',
  // request: (operation) => {
  //   const token = localStorage.getItem('id_token');
    
  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : '',
  //     },
  //   });
  // },
});

//Basically wrap your <Router> in the ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
