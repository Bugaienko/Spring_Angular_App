import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../models/Comment";
import {Observable} from "rxjs";

const COMMENT_API = "http://localhost:8080/api/comment/";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addCommentToPost(message: string, postId: number): Observable<any>{
    // return this.http.post(COMMENT_API + 'create', comment);
    return this.http.post(COMMENT_API + postId + 'create', {
      message: message
    });
  }

  getCommentToPost(postId: number): Observable<any> {
    return this.http.get(COMMENT_API + postId + '/all')
  }

  deletePost(commentId: number): Observable<any> {
    return this.http.delete(COMMENT_API + commentId + '/delete');
  }

}
