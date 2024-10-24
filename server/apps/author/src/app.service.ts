import { Injectable } from '@nestjs/common';
import { Author, CreateAuthorRequest } from './proto/author';

@Injectable()
export class AuthorService {
  private authors: Author[] = [
    {
      id: '1',
      name: 'Toan Dang Cong',
    },
    {
      id: '2',
      name: 'Chorus 2 team',
    },
  ];

  getAuthors() {
    return {
      authors: this.authors,
    };
  }

  getAuthorById(id: string) {
    console.log('get author by id', id);
    return this.authors.find((author) => author.id === id);
  }

  createAuthor(author: CreateAuthorRequest) {
    const newAuthor: Author = {
      ...author,
      id: String(Date.now()),
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  updateAuthor(updatedAuthor: Author) {
    const index = this.authors.findIndex(
      (author) => author.id === updatedAuthor.id,
    );
    if (index !== -1) {
      this.authors.splice(index, 1, updatedAuthor);
      return updatedAuthor;
    }
  }

  deleteAuthor(id: string) {
    const index = this.authors.findIndex((author) => author.id === id);
    if (index !== -1) {
      const deletedAuthor = this.authors[index];
      this.authors.splice(index, 1);
      return deletedAuthor;
    }
  }
}
