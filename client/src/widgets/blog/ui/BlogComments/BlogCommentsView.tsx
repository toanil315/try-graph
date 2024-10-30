import { GetPostCommentsQuery } from '@/generated/schemas';
import { Button, Input } from '@/shared/ui/Commons';
import { useState } from 'react';

interface BlogCommentsViewProps {
  comments: GetPostCommentsQuery['getPostComments'];
  onComment: (comment: string) => void;
}

export const BlogCommentsView = ({ comments, onComment }: BlogCommentsViewProps) => {
  const [commentInput, setCommentInput] = useState('');

  const handleComment = () => {
    if (commentInput) {
      onComment(commentInput);
      setCommentInput('');
    }
  };

  return (
    <div className='max-w-4xl mx-2 md:!mx-auto my-0 py-4'>
      <div className='flex flex-col gap-4 p-4 pb-6 bg-white shadow-md rounded-lg'>
        <span className='font-bold text-gray-600'>Comments</span>
        <ul className='flex flex-col gap-2 text-sm text-gray-500 font-medium'>
          {comments.map((comment) => (
            <li key={comment?.id}>
              <span className='font-bold text-gray-600'>Guest: </span>
              {comment?.comment}
            </li>
          ))}
        </ul>
        <div className='flex gap-2'>
          <Input
            className='flex-1 p-2 border border-gray-300 rounded-md'
            type='text'
            placeholder='Enter your comment'
            value={commentInput}
            onChange={(value) => setCommentInput(value as string)}
          />
          <Button
            size='small'
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
