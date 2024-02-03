import { client } from '../../lib/contentful';
import Head from 'next/head';
import Button from '../../components/Button';
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

  const weblink = post.fields.weblink ?? null;

  // const gallery = post.fields.gallery?.['en-US'] ?? null;

  return {
    props: {
      title: post.fields.title,
      description: post.fields.description,
      disciplines: post.fields.disciplines,
      weblink: weblink,
      gallery: post.fields.gallery,
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
  gallery,
}) {
  return (
    <div className='mt-20'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <div className='md:flex mb-10 gap-8'>
        <div className='md:w-1/3'>
          <div className='uppercase text-sm font-medium text-slate-800 dark:text-slate-100'>
            Client
          </div>
          <h1 className='mb-2 text-xl font-bold text-slate-800 dark:text-slate-100'>
            {title}
          </h1>
          <p>
            {disciplines.map((discipline) => (
              <span
                key={discipline}
                className='text-xs tracking-wide font-semibold uppercase text-slate-300 bg-gray-800 dark:bg-gray-900  px-2 py-1 rounded-md mr-2 mb-3'
              >
                {discipline}
              </span>
            ))}
          </p>
          {weblink && <Button href={weblink} />}
        </div>
        <div className='md:w-3/4 mt-8 md:mt-0 text-lg leading-relaxed text-slate-800 dark:text-slate-100'>
          {description}
        </div>
      </div>

      {/* Render the images from the `gallery` field */}
      <div className='flex flex-wrap -mx-4'>
        {gallery &&
          gallery.map((image) => (
            <div key={image.sys.id} className='px-4 mb-6'>
              <Image
                src={`https:${image.fields.file.url}`}
                alt={image.fields.description || ''}
                width={image.fields.file.details.image.width}
                height={image.fields.file.details.image.height}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
