import { Controller } from '@nestjs/common';
import {
  Author,
  AuthorDetailRequest,
  AuthorServiceController,
  AuthorServiceControllerMethods,
  CreateAuthorRequest,
  DeleteAuthorRequest,
} from './proto/author';
import { Observable } from 'rxjs';
import { AuthorService } from './app.service';

@Controller()
@AuthorServiceControllerMethods()
export class AuthorController implements AuthorServiceController {
  constructor(private readonly authorService: AuthorService) {}

  getAuthors() {
    return this.authorService.getAuthors();
  }

  getAuthorById(request: AuthorDetailRequest) {
    return this.authorService.getAuthorById(request.id);
  }

  createAuthor(request: CreateAuthorRequest) {
    return this.authorService.createAuthor(request);
  }

  updateAuthor(request: Author): Promise<Author> | Observable<Author> | Author {
    return this.authorService.updateAuthor(request);
  }

  deleteAuthor(
    request: DeleteAuthorRequest,
  ): Promise<Author> | Observable<Author> | Author {
    return this.authorService.deleteAuthor(request.id);
  }
}
