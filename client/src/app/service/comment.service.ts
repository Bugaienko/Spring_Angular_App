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

  createComment(comment: Comment, postId: number): Observable<any>{
    return this.http.post(COMMENT_API + 'create', comment);
  }
}
