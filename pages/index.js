import { client } from '../lib/contentful';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticProps() {
  const res = await client.getEntries({
    content_type: 'hero',
    limit: 1,
  });

  const postRes = await client.getEntries({
    content_type: 'portfolioPosts',
    order: '-fields.published', // sort by published field in descending order
  });

  return {
    props: {
      heroTitle: res.items[0].fields.heroTitle,
      posts: postRes.items,
    },
    revalidate: 60,
  };
}

export default function Home({ heroTitle, posts }) {
  return (
    <>
      <div>
        <Head>
          <title>Portfolio</title>
          <meta
            name='description'
            content='Designer and Front-End Developer with a creative approach to web development. From branding to motion design, I specialize in crafting visually stunning designs and effective user interfaces.'
          />
        </Head>
        <h1 className='text-5xl text-gray-900 dark:text-gray-200 font-bold lg:w-3/4 w-full my-20 leading-tight'>
          {heroTitle}
        </h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12'>
        {posts.map((post) => (
          <Link
            href={`/posts/${encodeURIComponent(post.fields.slug)}`}
            key={post.sys.id}
          >
            <div>
              <Image
                src={`https:${post.fields.thumbnail.fields.file.url}`}
                alt={post.fields.thumbnail.fields.title}
                width={post.fields.thumbnail.fields.file.details.image.width}
                height={post.fields.thumbnail.fields.file.details.image.height}
                className='rounded-md rounded-b-none'
              />
              <div className='bg-gray-300 dark:bg-gray-800 p-4 rounded-md rounded-t-none'>
                <h2 className='font-medium text-gray-800 dark:text-gray-100'>
                  {post.fields.title}
                </h2>
                <div className='flex flex-wrap'>
                  {post.fields.disciplines.map((discipline, index) => (
                    <span
                      key={index}
                      className='text-xs tracking-wide font-semibold uppercase text-gray-300 bg-gray-800 dark:bg-gray-900  px-2 py-1 rounded-md mr-2 mt-2'
                    >
                      {discipline}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
