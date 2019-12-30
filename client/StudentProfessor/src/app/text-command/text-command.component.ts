import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-command',
  templateUrl: './text-command.component.html',
  styleUrls: ['./text-command.component.css']
})
export class TextCommandComponent implements OnInit {
@Input() text_command:string;
@Input() answers:any;

  constructor() { }

  ngOnInit() {
  }

}
