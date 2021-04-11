import { GetStaticProps } from 'next';
import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { QueryClientConfig } from 'pages/_app';
import { getPosts } from 'api/posts';

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

  console.log(prefetchedData, clientData);

  return (
    <div className="container">
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
