import { useGetBlogById } from '@/features/blog';
import { useRouter } from '@/shared/hooks';
import { BlogDetailView } from './BlogDetailView';
import { useGetPostByIdQuery } from '@/generated/schemas';

export const BlogDetail = () => {
  const { query } = useRouter();
  const { data } = useGetPostByIdQuery({
    variables: {
      getPostByIdId: query.id as string,
    },
    skip: !query.id,
  });

  console.log(query);

  if (!data) return null;

  return <BlogDetailView blog={data.getPostById} />;
};
