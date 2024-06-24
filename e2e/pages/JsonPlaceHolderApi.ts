export class JsonPlaceHolderApi {
    baseUrl: string = 'https://jsonplaceholder.typicode.com';
  
    async getTotalPostCount() {
      const response = await fetch(`${this.baseUrl}/posts`);
      const data = await response.json();
      return data.length;
    }
  
    async createPost(postData: { userId: number; title: string; body: string }) {
      const response = await fetch(`${this.baseUrl}/posts`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      return data.id;
    }
  
    async getPostById(postId: number): Promise<any> {
        const url = `${this.baseUrl}/posts/${postId}`;
        console.log(`Requesting URL: ${url}`); // Debugging log
        const response = await fetch(url);
        const post = await response.json();
        if (Object.keys(post).length === 0 || response.status === 404) {
            // Log the error or handle it as needed before throwing
            console.error(`Error fetching post with ID ${postId}: Post not found`);
            throw new Error('Post not found');
        }
        return post;
    }
  
    async updatePost(postId: number, postData: { title: string; body: string; userId: number }) {
      const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      return data;
    }
  
    async patchPost(postId: number, postData: { title?: string; body?: string; userId?: number }) {
      const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(postData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      return data;
    }

    async deletePost(postId: number) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
    });
    }
}    