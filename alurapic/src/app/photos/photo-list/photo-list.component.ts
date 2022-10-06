import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/shared/loading/loading.service';

import { Photo } from '../photo/photo';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filter: string = '';

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoServive: PhotoService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.start();
    this.activatedRoute.params.subscribe((params) => {
      this.userName = params['userName'];
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
  }

  load() {
    this.photoServive
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos) => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      });
  }
}
