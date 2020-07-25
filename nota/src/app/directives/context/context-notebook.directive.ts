import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notebook } from 'app/models/core/Notebook';

interface ContextMenuProps {
    x: number;
    y: number;
    show: boolean;
}

@Component({
    selector: 'context-notebook',
    templateUrl: './context-notebook.directive.html'
})
export class ContextNotebookDirectiveComponent implements OnInit {
    @Input() props: ContextMenuProps;
    @Input() notebook: Notebook;
    @Output() delete = new EventEmitter<Notebook>();
    public confirmation = false;

    ngOnInit() {
        window.addEventListener('click', (e: any): void => {
            if (!document.getElementById('context-menu').contains(e.target)) {
                this.props.show = false;
            }
        });
    }

    public deleteNotebook(): void {
        if (!this.confirmation) {
            this.confirmation = true;
            return;
        }

        this.delete.emit(this.notebook);
        this.props.show = false;
        this.confirmation = false;
    }
}
