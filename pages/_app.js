import '../styles/globals.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import Header from "../components/Header";

export const client = new ApolloClient({
  uri: `http://localhost:3001/graphql`,
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
        <Header/>
        <Component {...pageProps} />
      </ApolloProvider>

  )
}

export default MyApp
