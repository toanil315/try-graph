import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Author = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateAuthorRequest = {
  name: Scalars['String']['input'];
};

export type CreatePostRequest = {
  authorId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
  content: Scalars['String']['input'];
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
  data: CreatePostRequest;
};

export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdatePostArgs = {
  data: CreatePostRequest;
  id: Scalars['ID']['input'];
};

export type Post = {
  author?: Maybe<Author>;
  authorId: Scalars['ID']['output'];
  body: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  getAuthorById?: Maybe<Author>;
  getAuthors: Array<Maybe<Author>>;
  getPostById?: Maybe<Post>;
  getPosts: Array<Maybe<Post>>;
};

export type QueryGetAuthorByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetPostByIdArgs = {
  id: Scalars['ID']['input'];
};

export const BlogItemFragmentDoc = gql`
  fragment BlogItem on Post {
    id
    title
    content
    createAt
    image
    author {
      name
    }
  }
`;
export const BlogDetailFragmentDoc = gql`
  fragment BlogDetail on Post {
    id
    title
    image
    content
    body
    createAt
    authorId
    author {
      id
      name
    }
  }
`;
export const CreatePostDocument = gql`
  mutation CreatePost($data: CreatePostRequest!) {
    createPost(data: $data) {
      ...BlogDetail
    }
  }
  ${BlogDetailFragmentDoc}
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($updatePostId: ID!, $data: CreatePostRequest!) {
    updatePost(id: $updatePostId, data: $data) {
      ...BlogDetail
    }
  }
  ${BlogDetailFragmentDoc}
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostId: // value for 'updatePostId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options,
  );
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;
export const GetPostsDocument = gql`
  query GetPosts {
    getPosts {
      ...BlogItem
    }
  }
  ${BlogItemFragmentDoc}
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export function refetchGetPostsQuery(variables?: GetPostsQueryVariables) {
  return { query: GetPostsDocument, variables: variables };
}
export const GetPostByIdDocument = gql`
  query GetPostById($getPostByIdId: ID!) {
    getPostById(id: $getPostByIdId) {
      ...BlogDetail
    }
  }
  ${BlogDetailFragmentDoc}
`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      getPostByIdId: // value for 'getPostByIdId'
 *   },
 * });
 */
export function useGetPostByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables> &
    ({ variables: GetPostByIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
}
export function useGetPostByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(
    GetPostByIdDocument,
    options,
  );
}
export function useGetPostByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(
    GetPostByIdDocument,
    options,
  );
}
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdSuspenseQueryHookResult = ReturnType<typeof useGetPostByIdSuspenseQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<
  GetPostByIdQuery,
  GetPostByIdQueryVariables
>;
export function refetchGetPostByIdQuery(variables: GetPostByIdQueryVariables) {
  return { query: GetPostByIdDocument, variables: variables };
}
export type BlogItemFragment = {
  id: string;
  title: string;
  content: string;
  createAt: string;
  image: string;
  author?: { name: string } | null;
};

export type BlogDetailFragment = {
  id: string;
  title: string;
  image: string;
  content: string;
  body: string;
  createAt: string;
  authorId: string;
  author?: { id: string; name: string } | null;
};

export type CreatePostMutationVariables = Exact<{
  data: CreatePostRequest;
}>;

export type CreatePostMutation = {
  createPost?: {
    id: string;
    title: string;
    image: string;
    content: string;
    body: string;
    createAt: string;
    authorId: string;
    author?: { id: string; name: string } | null;
  } | null;
};

export type UpdatePostMutationVariables = Exact<{
  updatePostId: Scalars['ID']['input'];
  data: CreatePostRequest;
}>;

export type UpdatePostMutation = {
  updatePost?: {
    id: string;
    title: string;
    image: string;
    content: string;
    body: string;
    createAt: string;
    authorId: string;
    author?: { id: string; name: string } | null;
  } | null;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostsQuery = {
  getPosts: Array<{
    id: string;
    title: string;
    content: string;
    createAt: string;
    image: string;
    author?: { name: string } | null;
  } | null>;
};

export type GetPostByIdQueryVariables = Exact<{
  getPostByIdId: Scalars['ID']['input'];
}>;

export type GetPostByIdQuery = {
  getPostById?: {
    id: string;
    title: string;
    image: string;
    content: string;
    body: string;
    createAt: string;
    authorId: string;
    author?: { id: string; name: string } | null;
  } | null;
};
