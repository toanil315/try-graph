import { BlogListView } from './BlogListView';
import { useGetPostsQuery } from '@/generated/schemas';

export const BlogList = () => {
  const { data } = useGetPostsQuery();

  return (
    <div className='p-4 max-w-4xl mx-auto my-0'>
      {data?.getPosts && (
        <BlogListView blogs={Array.isArray(data?.getPosts) ? data?.getPosts : []} />
      )}
    </div>
  );
};
