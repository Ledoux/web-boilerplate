import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const TodosPage = () => {
  return (<main className='testpage main'>
    TEST
  </main>)
}

// Initialize GraphQL queries or mutations with the `gql` tag
const MyQuery = gql`query MyQuery { todos { text } }`

// We then can use `graphql` to pass the query results returned by MyQuery
// to TodosList as a prop (and update them as the results change)
const TodosPageWithData = graphql(MyQuery)(TodosPage)
export default TodosPageWithData
