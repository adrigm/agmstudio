import { Component, OnInit, AfterContentChecked, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  content = `var gulp = require('gulp');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var connect = require('gulp-connect');

  gulp.task('html', function() {
      gulp.src('src/html/**/*.html')
          .pipe(gulp.dest('dist'))
          .pipe(connect.reload());
  });`;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
