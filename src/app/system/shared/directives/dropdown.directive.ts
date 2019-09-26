import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[wfmDropDown]'
})
export class DropDownDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('click') onclick(){
        this.isOpen = !this.isOpen;
    }
}