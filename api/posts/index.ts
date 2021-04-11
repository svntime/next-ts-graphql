import { IPosts } from 'api/posts/types';
import { controllers, graphQL } from 'api';

export const getPosts = graphQL<IPosts>(
  controllers.posts,
  `query {
    posts {
      data {
        id
        title
      }
    }
  }`
);
