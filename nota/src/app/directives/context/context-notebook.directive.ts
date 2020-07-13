import { Component, OnInit, Input } from '@angular/core';
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

    ngOnInit() {
        window.addEventListener('click', (): void => {
            this.props.show = false;
        });
    }
}
