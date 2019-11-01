import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'modal-regular',
    templateUrl: './modal.directive.html'
})
export class ModalDirectiveComponent implements OnInit {
    @Input() title: string;
    @Input() message: string;
    @Input() cancelText: string;
    @Input() nextText: string;
    @Input() visible: boolean;
    @Output() onCancel: EventEmitter<void> = new EventEmitter();
    @Output() onNext: EventEmitter<void> = new EventEmitter();

    ngOnInit() {
        if (this.visible === undefined) {
            this.visible = false;
        }
    }

    public cancel(): void {
        this.onCancel.emit();
    }

    public next(): void {
        this.onNext.emit();
    }
}
