import { Component, OnInit, ViewChild } from '@angular/core';
import { Post, Comment } from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('commentForm', { static: false }) commentForm!: NgForm;

  posts: Post[] = [];
  newComment: Comment = { _id: '', postId: '', userId: '', user: '', text: '' };
  isAuthenticated: boolean = false; // Variable para controlar la autenticación

  constructor(private postsService: PostsService, private userService: UserService) {}

  ngOnInit(): void {
    this.getPosts();
    this.isAuthenticated = this.userService.isUserAuthenticated();

  }

  getPosts(): void {
    this.postsService.getPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
      },
      (error: any) => {
        console.error('Error al obtener las publicaciones', error);
      }
    );
  }

  toggleComments(post: Post) {
    if (!post.showComments) {
      this.postsService.getCommentsByPostId(post._id).subscribe(
        (comments: Comment[]) => {
          post.comments = comments;
          post.showComments = true;

          // Obtener y asignar el nombre de usuario a cada comentario
          post.comments.forEach(comment => {
            this.postsService.getUserById(comment.userId).subscribe(user => {
              comment.user = user.name;
            });
          });
        },
        (error: any) => {
          console.error('Error al obtener los comentarios', error);
        });
    } else {
      post.showComments = !post.showComments;
    }
  }

  addComment(post: Post) {
    if (this.isAuthenticated) {
      this.newComment.postId = post._id; // Asignar el postId al nuevo comentario antes de agregarlo

      this.postsService.addComment(this.newComment.postId, this.newComment).subscribe(
        (response: Comment) => {
          post.comments.push(response);

          this.postsService.getUserNameForComment(response).subscribe(commentWithUser => {
            const index = post.comments.findIndex(comment => comment._id === response._id);
            if (index !== -1) {
              post.comments[index] = commentWithUser;
            }
          });

          this.newComment = { _id: '', postId: '', userId: '', user: '', text: '' };
        },
        (error: any) => {
          console.error('Error al agregar el comentario', error);
        }
      );
    } else {
      console.log('Usuario no autenticado. No se pueden agregar comentarios.');
    }
  }
  likePost(post: Post) {
    post.likes++;
  }
}
