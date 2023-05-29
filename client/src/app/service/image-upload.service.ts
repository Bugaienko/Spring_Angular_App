import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "http";

const IMAGE_API = "http://localhost:8080/api/image/";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {
  }

  uploadImageToCurrentUser(file: File): Observable<any> {
    const uploadDate = new FormData();
    uploadDate.append('file', file)

    return this.http.post(IMAGE_API + 'upload', uploadDate);
  }

  uploadImageToPost(file: File, postId: number): Observable<any> {
    const uploadDate = new FormData();
    uploadDate.append('file', file)

    return this.http.post(IMAGE_API + postId + 'upload', uploadDate);
  }

  getProfileImage(): Observable<any> {
    return this.http.get(IMAGE_API + 'profileImage');
  }

  getPostImage(postId: number): Observable<any> {
    return this.http.get(IMAGE_API + postId + '/image');
  }

}
