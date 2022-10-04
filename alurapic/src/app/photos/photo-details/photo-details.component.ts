import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';
import { PhotoService } from '../photo/photo.service';

@Component({
  templateUrl: './photo-details.component.html',
})
export class PhotoDetailsComponent implements OnInit {
  photo$!: Observable<Photo>;
  comments$!: Observable<PhotoComment[]>;
  photoId!: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const photoId = this.route.snapshot.params['photoId'];
    this.photo$ = this.photoService.findById(photoId);
    this.comments$ = this.photoService.getComments(photoId);
    this.photo$.subscribe(
      () => {},
      (err) => {
        console.log(err);
        this.router.navigate(['not-found']);
      }
    );
  }

  remove() {
    this.photoService.removePhoto(this.photoId).subscribe(
      () => {
        this.alertService.success('Photo removed');
        this.router.navigate(['']);
      },
      (err) => {
        console.log(err);
        this.alertService.warning('Could not delete the photo');
      }
    );
  }

  like(photo: Photo) {
    this.photoService.like(photo.id);
  }
}
