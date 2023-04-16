import { client } from '../../lib/contentful';
import Image from 'next/image';

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

  // Ensure that the `content` field is defined
  const content = post.fields.content || '';

  return {
    props: {
      title: post.fields.title,
      description: post.fields.description,
      disciplines: post.fields.disciplines,
      weblink: post.fields.weblink,
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
  thumbnailUrl,
  thumbnailAlt,
  thumbnailWidth,
  thumbnailHeight,
}) {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <Image
          src={thumbnailUrl}
          alt={thumbnailAlt}
          width={thumbnailWidth}
          height={thumbnailHeight}
        />
        <p>{description}</p>
        <p>Disciplines: {disciplines.join(', ')}</p>
        <p>
          Web Link: <a href={weblink}>{weblink}</a>
        </p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}
