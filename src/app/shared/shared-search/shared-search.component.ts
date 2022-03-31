import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shared-search',
  templateUrl: './shared-search.component.html',
  styleUrls: ['./shared-search.component.scss']
})
export class SharedSearchComponent implements OnInit {
  @Input() open = true;

  constructor() { }

  ngOnInit(): void {
  }

}
