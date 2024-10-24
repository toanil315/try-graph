import { useRouter } from '@/shared/hooks';
import { BlogCommentsView } from './BlogCommentsView';
import {
  GetPostCommentsDocument,
  GetPostCommentsQuery,
  useCommentAddedSubscription,
  useCreateCommentMutation,
  useGetPostCommentsQuery,
} from '@/generated/schemas';

export const BlogComments = () => {
  const { query } = useRouter();
  const { data } = useGetPostCommentsQuery({
    variables: {
      postId: query.id as string,
    },
    skip: !query.id,
  });
  const [createCommentMutation] = useCreateCommentMutation({
    refetchQueries: [
      {
        query: GetPostCommentsDocument,
        variables: {
          postId: query.id as string,
        },
      },
    ],
  });
  useCommentAddedSubscription({
    variables: {
      postId: query.id as string,
    },
    skip: !query.id,
    onData: ({ client, data }) => {
      if (data.data) {
        const newComment = data.data.commentAdded;
        const existingComments: GetPostCommentsQuery | null = client.readQuery({
          query: GetPostCommentsDocument,
          variables: {
            postId: query.id as string,
          },
        });
        client.writeQuery({
          query: GetPostCommentsDocument,
          variables: {
            postId: query.id as string,
          },
          data: {
            getPostComments: [...(existingComments?.getPostComments || []), newComment],
          },
        });
      }
    },
  });

  const handleComment = (comment: string) => {
    if (query.id) {
      createCommentMutation({
        variables: {
          data: {
            comment,
            postId: query.id as string,
          },
        },
      });
    }
  };

  return (
    <BlogCommentsView
      comments={data?.getPostComments || []}
      onComment={handleComment}
    />
  );
};
