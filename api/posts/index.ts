import { IPost } from 'api/posts/types';
import { controllers, graphQL } from 'api';

export const getPosts = graphQL<IPost[]>(
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
