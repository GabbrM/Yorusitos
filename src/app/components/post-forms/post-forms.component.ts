import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/posts.model";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-forms',
  templateUrl: './post-forms.component.html',
  styleUrls: ['./post-forms.component.css']
})
export class PostFormsComponent {

  formulario!: FormGroup;
  constructor(private formBuilder: FormBuilder, private postsService: PostsService) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      image: [''],
      likes: [0]
    });
  }

  submitForm() {
    if (this.formulario.valid) {
      const post: Post = this.formulario.value;
      console.log(this.formulario.value)
      this.postsService.addPost(post).subscribe(
        (response) => {
          console.log('Post creado:', response);
        },
        (error) => {
          console.error('Error al crear el post:', error);
        }
      );
    }
  }

}
