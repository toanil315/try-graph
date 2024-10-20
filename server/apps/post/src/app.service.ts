import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Post,
  CreatePostRequest,
  Comment,
  CreateCommentRequest,
} from './proto/post';

@Injectable()
export class PostService {
  private posts: Post[] = [];
  private comments: Comment[] = [];

  getPosts() {
    return {
      posts: this.posts,
    };
  }

  getPostById(id: string) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      return {} as Post;
    }
    return post;
  }

  createPost(post: CreatePostRequest) {
    const newPost: Post = {
      ...post,
      id: String(Date.now()),
      createAt: new Date().toISOString(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(updatedPost: Post) {
    const index = this.posts.findIndex((post) => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts.splice(index, 1, updatedPost);
      return updatedPost;
    }
  }

  deletePost(id: string) {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      const deletedPost = this.posts[index];
      this.posts.splice(index, 1);
      return deletedPost;
    }
  }

  getPostComments(postId: string) {
    const post = this.posts.find((post) => post.id === postId);
    if (!post) {
      return {
        comments: [],
      };
    }
    const comments = this.comments.filter(
      (comment) => comment.postId === postId,
    );
    return {
      comments,
    };
  }

  createComment(comment: CreateCommentRequest) {
    const newComment = {
      ...comment,
      id: String(Date.now()),
      createAt: new Date().toISOString(),
    };
    this.comments.push(newComment);
    return newComment;
  }
}
