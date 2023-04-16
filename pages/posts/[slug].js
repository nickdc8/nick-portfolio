import { client } from '../../lib/contentful';
import Image from 'next/image';
import Head from 'next/head';
import Button from '../../components/Button';

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: 'portfolioPosts' });

  const paths = res.items.map((post) => ({
    params: { slug: post.fields.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await client.getEntries({
    content_type: 'portfolioPosts',
    'fields.slug': params.slug,
  });

  const post = res.items[0];

  // Ensure that the `content` and `weblink` fields are defined
  const content = post.fields.content || '';
  const weblink = post.fields.weblink || null;

  return {
    props: {
      title: post.fields.title,
      description: post.fields.description,
      disciplines: post.fields.disciplines,
      weblink: weblink,
      content: content,
      thumbnailUrl: `https:${post.fields.thumbnail.fields.file.url}`,
      thumbnailAlt: post.fields.thumbnail.fields.title,
      thumbnailWidth: post.fields.thumbnail.fields.file.details.image.width,
      thumbnailHeight: post.fields.thumbnail.fields.file.details.image.height,
    },
  };
}

export default function PostPage({
  title,
  description,
  disciplines,
  weblink,
  content,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>
          {disciplines.map((discipline) => (
            <span
              key={discipline}
              className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
            >
              {discipline}
            </span>
          ))}
        </p>
        {weblink && <Button href={weblink} />}

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}
