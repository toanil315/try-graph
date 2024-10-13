
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateAuthorRequest {
    name: string;
}

export interface CreatePostRequest {
    title: string;
    image: string;
    content: string;
    body: string;
    authorId: string;
}

export interface Author {
    id: string;
    name: string;
}

export interface IMutation {
    createPost(data: CreatePostRequest): Nullable<Post> | Promise<Nullable<Post>>;
    updatePost(id: string, data: CreatePostRequest): Nullable<Post> | Promise<Nullable<Post>>;
    deletePost(id: string): Nullable<Post> | Promise<Nullable<Post>>;
}

export interface Post {
    id: string;
    title: string;
    image: string;
    content: string;
    body: string;
    createAt: string;
    authorId: string;
    author?: Nullable<Author>;
}

export interface IQuery {
    getPosts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;
    getPostById(id: string): Nullable<Post> | Promise<Nullable<Post>>;
    getAuthors(): Nullable<Author>[] | Promise<Nullable<Author>[]>;
    getAuthorById(id: string): Nullable<Author> | Promise<Nullable<Author>>;
}

type Nullable<T> = T | null;
