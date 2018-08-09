import { Component, OnInit, HostListener } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  animateChild,
  stagger,
  group,
  keyframes
} from "@angular/animations";
import { Router } from "@angular/router";
import { AccessService } from "../../services/access.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public line: number = 0;

  constructor(
    protected router: Router,
    protected accessService: AccessService
  ) {}

  ngOnInit() {
    this.nextLine();
  }

  nextLine() {
    this.line++;
    if (this.line != 5)
      setTimeout(() => {
        this.nextLine();
      }, 10000);
  }

  @HostListener("window:orientationchange", ["$event"])
  onOrientationChange(event) {
    if (event.type == "orientationchange" && this.line == 5) {
      this.line++;

      this.accessService.grantAccess();

      setTimeout(() => {
        this.router.navigate(["/success"]);
      }, 10000);
    }
  }
}
