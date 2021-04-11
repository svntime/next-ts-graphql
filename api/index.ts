import { request, gql } from 'graphql-request';

export const controllers = {
  posts: 'https://graphqlzero.almansi.me/api'
};

export const graphQL = <T>(endpoint: string, query: string) => async (): Promise<T> =>
  await request(
    endpoint,
    gql`
      ${query}
    `
  );
