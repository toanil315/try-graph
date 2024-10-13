import { Injectable } from '@nestjs/common';
import { Post, CreatePostRequest } from './proto/post';

@Injectable()
export class PostService {
  private posts: Post[] = [];

  getPosts() {
    return {
      posts: this.posts,
    };
  }

  getPostById(id: string) {
    return this.posts.find((post) => post.id === id);
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
}
