import { client } from '../lib/contentful';
import Head from 'next/head';

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: 'pages' });

  const paths = res.items.map((page) => ({
    params: { slug: page.fields.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await client.getEntries({
    content_type: 'pages',
    'fields.slug': params.slug,
  });

  const page = res.items[0];

  return {
    props: {
      title: page.fields.title,
      content: page.fields.content,
    },
  };
}

export default function Page({ title, content }) {
  return (
    <div className='mt-20 max-w-3xl'>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className='text-4xl font-bold mb-5'>{title}</h1>
      <p className='dark:text-slate-200 text-2xl leading-relaxed body-text'>
        {content}
      </p>
    </div>
  );
}
