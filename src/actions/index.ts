import { getGreeting } from './geetings/get-greeting.action';
import { getPostLikes } from './posts/get-post-likes.action';
import { updatePostLikes } from './posts/update-likes.actions';

export const server = {
  getGreeting,

  // posts
  getPostLikes,
  updatePostLikes
}