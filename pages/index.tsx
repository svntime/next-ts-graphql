import { GetStaticProps } from 'next';
import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { QueryClientConfig } from 'pages/_app';
import { getPosts } from 'api/posts';
import Post from 'components/Post/Post';
import Spinner from 'components/Spinner/Spinner';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient(QueryClientConfig);

  await queryClient.prefetchQuery('posts', getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const Home: React.FC = () => {
  const { data: prefetchedData } = useQuery('posts', getPosts);
  const { data: clientData } = useQuery('posts-2', getPosts);

  return (
    <div className="container mx-auto p-16">
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-5xl font-medium text-center text-gray-700 mb-8">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className="flex flex-col text-gray-700">
          <h2 className="text-xl font-medium text-center my-8">prefetched data</h2>
          {prefetchedData ? (
            <ul className="grid grid-cols-4 gap-3">
              {prefetchedData?.posts.data.slice(0, 8).map((post) => (
                <Post key={post.id} id={post.id} title={post.title} />
              ))}
            </ul>
          ) : (
            <Spinner />
          )}
          <h2 className="text-xl font-medium text-center my-8">client-side fetched data</h2>
          {clientData ? (
            <ul className="grid grid-cols-4 gap-3">
              {clientData?.posts.data.slice(0, 8).map((post) => (
                <Post key={post.id} id={post.id} title={post.title} />
              ))}
            </ul>
          ) : (
            <Spinner />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
