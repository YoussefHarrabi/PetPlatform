import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';  // Import the service
import { UserAuthService } from '../services/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


interface CommunityPost {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string; // Optional for photos
  user: any;
  date: Date;
  
}

@Component({
  selector: 'app-communaute',
  templateUrl: './communaute.component.html',
  styleUrls: ['./communaute.component.css']
})
export class CommunauteComponent implements OnInit {
  posts: CommunityPost[] = []; // Stores all the posts
  connectedUserId: string | null = null; // ID of the logged-in user
  newPost: Partial<CommunityPost> = {
    title: '',
    content: '',
    imageUrl: '',
    user: {},
    
    
  };

  constructor(private postService: PostService,private authService: UserAuthService, private http: HttpClient,    private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.loadPosts();

    console.log('posts', this.posts);
    this.connectedUserId = this.authService.getCurrentUserId();
    
  }

  // Loads posts from the backend
  loadPosts(): void {
    this.postService.getPosts().subscribe(
      
      (response) => {
        
        this.posts = response.map((post:any) => ({
          ...post,
          imageUrl: post.imageUrl?"http://localhost:8084" + post.imageUrl : null
        }));
        
      },
      (error) => {
        console.error('Failed to load posts', error);
      }
    );
  }
   // Delete a post by ID
   deletePost(postId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.http.delete(`http://localhost:8084/api/posts/${postId}`).subscribe(
        () => {
          // Remove the deleted post from the local array
          this.posts = this.posts.filter(post => post.id !== postId);
          alert('Post supprimé avec succès.');
        },
        error => {
          alert('Erreur lors de la suppression du post.');
          console.error(error);
        }
      );
    }
  }

  // Handles image upload and previews
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.newPost.imageUrl = e.target?.result as string; // Convert image to base64 for preview
      };
      reader.readAsDataURL(file);
    }
  }

  // Creates a new post
  publishPost(): void {
    if (this.newPost.title && this.newPost.content) {
      const formData = new FormData();
      formData.append('post', new Blob([JSON.stringify({
        title: this.newPost.title,
        content: this.newPost.content,
      })], { type: 'application/json' }));
      
      const fileInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
      if (fileInput && fileInput.files) {
        formData.append('image', fileInput.files[0]); // Append image if selected
      }
  
      let userID = this.authService.getCurrentUserId();
      this.postService.createPost(userID , formData).subscribe(
        (response:any) => {
          response.imageUrl = response.imageUrl?"http://localhost:8084" + response.imageUrl : null
          this.posts.push(response);
          this.toastr.success('Post created successfully!', 'Success'); // Success toast
          this.clearForm(); // Clear the form after publishing
        },
        (error) => {
          console.error('Failed to create post', error);
          this.toastr.error('Failed to create the post. Please try again.', 'Error'); // Error toast
        }
      );
    }
  }

  // Clears the form
  clearForm(): void {
    this.newPost = { title: '', content: '', imageUrl: '' };
  }
}
