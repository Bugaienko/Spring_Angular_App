import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostsLoaded = false;
  isUserDataLoaded = false;
  posts!: Post[];
  user!: User;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageService: ImageUploadService
  ) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getCommentsToPost(this.posts);
        this.getImagesToPost(this.posts);
        this.isPostsLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })

  }

  getImagesToPost(posts: Post[]): void {
    posts.forEach(p => {
      this.imageService.getPostImage(<number>p.id)
        .subscribe(data => {
          p.image = data.imageBytes;
        })
    });
  }

  getCommentsToPost(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentToPost(<number>p.id)
        .subscribe(data => {
          p.comments = data;
        })
    });
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);

    if (!post.userLiked?.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          post.userLiked?.push(this.user.username);
          this.notificationService.showSnackBar('Liked');
        });
    } else {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          const index = post.userLiked ? post.userLiked.indexOf(this.user.username, 0) : -1;
          if (index > -1) {
            post.userLiked?.splice(index, 1);
          }
        });
      this.notificationService.showSnackBar('Disliked');
    }
  }

  postComment(message: string, postId: number, postIndex: number): void{
    const post = this.posts[postIndex];
    console.log(post);
    this.commentService.addCommentToPost(message, postId)
      .subscribe(data => {
        console.log(data);
        post.comments?.push(data);
      })
  }

  formatImage(img: any): any {
    if (img == null){
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }


  protected readonly HTMLInputElement = HTMLInputElement;
}


