import { useRouter } from '@/shared/hooks';
import { useEffect } from 'react';
import { BlogListView } from './BlogListView';
import { useGetPostsQuery } from '@/generated/schemas';

export const BlogList = () => {
  const { query } = useRouter();
  const { data } = useGetPostsQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query.page, query.search]);

  return (
    <div className='p-4 max-w-4xl mx-auto my-0'>
      {data?.getPosts && (
        <BlogListView blogs={Array.isArray(data?.getPosts) ? data?.getPosts : []} />
      )}
    </div>
  );
};
