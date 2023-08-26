import { client } from '../lib/contentful';
import Head from 'next/head';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Link href={node.data.uri} className='my-anchor-class'>
          {children}
        </Link>
      );
    },
  },
};

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

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: page.fields.title || '',
      pageContent: page.fields.pageContent || '',
    },
  };
}

export default function Page({ title, content, pageContent }) {
  return (
    <div className='mt-20 max-w-3xl'>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className='text-4xl font-bold mb-5 text-slate-800 dark:text-slate-100'>
        {title}
      </h1>
      <p className='text-slate-800 dark:text-slate-100 text-2xl leading-relaxed body-text'>
        {content}
      </p>
      <div className='text-slate-800 dark:text-slate-100 text-2xl leading-relaxed body-text'>
        {documentToReactComponents(pageContent, options)}
      </div>
    </div>
  );
}
