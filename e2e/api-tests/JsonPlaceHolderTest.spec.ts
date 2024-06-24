import { test, expect } from '@playwright/test';
import { JsonPlaceHolderApi } from '../pages/JsonPlaceHolderApi';

test.describe('JSONPlaceholder API Tests', () => {
  let api: JsonPlaceHolderApi;
  let initialPostCount: number;
  let createdPostId: number;

  test.beforeAll(async () => {
    api = new JsonPlaceHolderApi();
    initialPostCount = await api.getTotalPostCount();
  });

  test('should create a new post and store its ID', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    createdPostId = await api.createPost(newPost);
    expect(createdPostId).toBeGreaterThan(0);
  });

  test('should get only the created post by ID', async () => {
    const post = await api.getPostById(createdPostId);
    // Validate that the response is not empty or undefined
    expect(post).not.toBeNull();
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
    // Now check for the values
    expect(post).toEqual(expect.objectContaining({
      id: createdPostId,
      title: 'foo',
      body: 'bar',
      userId: 1,
    }));
  });

  test('should update the title of the created post with PATCH', async () => {
    const updatedPost = { title: 'Updated Title' };
    const post = await api.patchPost(createdPostId, updatedPost);
    expect(post.title).toBe('Updated Title');
  });

  test('should delete the created post by ID and confirm deletion', async () => {
    await api.deletePost(createdPostId);
    await expect(api.getPostById(createdPostId)).rejects.toThrow('Post not found'); // Assuming the API throws a 'Post not found' error for non-existent posts
  });

  test('should verify the total number of posts has not changed', async () => {
    const currentPostCount = await api.getTotalPostCount();
    expect(currentPostCount).toBe(initialPostCount); // This assumes no real deletion occurs in the JSONPlaceholder API
  });
});