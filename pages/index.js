import { client } from '../lib/contentful';
import Image from 'next/image';

export async function getStaticProps() {
  const res = await client.getEntries({
    content_type: 'hero',
    limit: 1,
  });

  const postRes = await client.getEntries({ content_type: 'portfolioPosts' });

  console.log('Posts:', postRes.items);

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
        <h1>{heroTitle}</h1>
      </div>
      <div>
        {posts.map((post) => (
          <a
            href={`/posts/${encodeURIComponent(post.fields.slug)}`}
            key={post.sys.id}
          >
            <div>
              <h2>{post.fields.title}</h2>
              <Image
                src={`https:${post.fields.thumbnail.fields.file.url}`}
                alt={post.fields.thumbnail.fields.title}
                width={post.fields.thumbnail.fields.file.details.image.width}
                height={post.fields.thumbnail.fields.file.details.image.height}
              />
              <div>
                {post.fields.disciplines.map((discipline, index) => (
                  <button key={index}>{discipline}</button>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
