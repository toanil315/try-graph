import { Controller } from '@nestjs/common';
import {
  Post,
  PostDetailRequest,
  PostServiceController,
  PostServiceControllerMethods,
  CreatePostRequest,
  DeletePostRequest,
} from './proto/post';
import { Observable } from 'rxjs';
import { PostService } from './app.service';

@Controller()
@PostServiceControllerMethods()
export class PostController implements PostServiceController {
  constructor(private readonly postService: PostService) {}

  getPosts() {
    return this.postService.getPosts();
  }

  getPostById(request: PostDetailRequest) {
    return this.postService.getPostById(request.id);
  }

  createPost(request: CreatePostRequest) {
    return this.postService.createPost(request);
  }

  updatePost(request: Post): Promise<Post> | Observable<Post> | Post {
    return this.postService.updatePost(request);
  }

  deletePost(
    request: DeletePostRequest,
  ): Promise<Post> | Observable<Post> | Post {
    return this.postService.deletePost(request.id);
  }

  getPostComments(request: { postId: string }) {
    return this.postService.getPostComments(request.postId);
  }

  createComment(request: { comment: string; postId: string }) {
    return this.postService.createComment(request);
  }
}
