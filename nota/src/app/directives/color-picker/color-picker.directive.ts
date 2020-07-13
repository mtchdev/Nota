import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'color-picker',
    templateUrl: './color-picker.directive.html'
})
export class ColorPickerDirectiveComponent implements OnInit {

    @Output() color = new EventEmitter<string>();

    public colors: Array<string> = [
        '#FF0000',
        '#FF9100',
        '#F7FF00',
        '#00FF31',
        '#00F6FF',
        '#0055FF',
        '#5D00FF',
        '#9100FF',
        '#FF00DD',
        '#FF0080'
    ];

    ngOnInit() {
    }

    selectColor(color: string): void {
        this.color.emit(color.substr(1));
    }
}
