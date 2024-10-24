import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ACTION_ENUM, ROUTES } from '@/shared/constants';
import { blogSchema } from '@/entities/blog/validators';
import BlogForm from './BlogForm';
import { useNavigate } from 'react-router-dom';
import {
  CreatePostRequest,
  GetPostsDocument,
  useCreatePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '@/generated/schemas';

interface Props {
  type: ACTION_ENUM;
  blogId?: string;
}

export const UpsertBlog = ({ type, blogId }: Props) => {
  const navigate = useNavigate();
  const { data } = useGetPostByIdQuery({
    variables: {
      getPostByIdId: blogId || '',
    },
    skip: type === ACTION_ENUM.CREATE || !blogId,
  });

  const blog = data?.getPostById;
  const [createBlog, { loading: createBlogLoading }] = useCreatePostMutation({
    refetchQueries: [{ query: GetPostsDocument }],
  });
  const [updateBlog, { loading: updateBlogLoading }] = useUpdatePostMutation();

  const form = useForm<CreatePostRequest>({
    defaultValues: {
      title: '',
      content: '',
      image: '',
      body: '',
      authorId: '1',
    },
    resolver: yupResolver(blogSchema),
  });

  useEffect(() => {
    if (type === ACTION_ENUM.UPDATE && blog) {
      form.reset({
        title: blog.title,
        content: blog.content,
        image: blog.image,
        body: typeof blog.body === 'string' ? blog.body : blog.content,
        authorId: blog.authorId,
      });
    }
  }, [blog, type]);

  const handleCreateBlog = async (data: CreatePostRequest) => {
    await createBlog({
      variables: {
        data,
      },
    });
    navigate(ROUTES.HOME);
  };

  const handleUpdateBlog = async (data: CreatePostRequest) => {
    await updateBlog({
      variables: {
        updatePostId: blogId || '',
        data,
      },
    });
    navigate(ROUTES.HOME);
  };

  const handleSubmitForm = (data: CreatePostRequest) => {
    if (type === ACTION_ENUM.CREATE) {
      handleCreateBlog(data);
    } else {
      handleUpdateBlog(data);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <BlogForm
          form={form}
          type={type}
          onSubmit={handleSubmitForm}
          isSubmitting={type === ACTION_ENUM.CREATE ? createBlogLoading : updateBlogLoading}
        />
      </FormProvider>
    </div>
  );
};
