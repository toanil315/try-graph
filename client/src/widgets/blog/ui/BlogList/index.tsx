import { LargeLoadingIcon } from '@/shared/ui';
import { BlogListView } from './BlogListView';
import { useGetPostsQuery } from '@/generated/schemas';

export const BlogList = () => {
  const { data, loading } = useGetPostsQuery();

  if (loading) {
    return (
      <div className='flex justify-center py-10'>
        <LargeLoadingIcon className='animate-spin' />
      </div>
    );
  }

  return (
    <div className='p-4 max-w-4xl mx-auto my-0'>
      {data?.getPosts && (
        <BlogListView blogs={Array.isArray(data?.getPosts) ? data?.getPosts : []} />
      )}
    </div>
  );
};
