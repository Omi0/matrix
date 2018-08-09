import {
  Component,
  Directive,
  OnInit,
  Input,
  TemplateRef,
  ViewContainerRef,
  HostBinding,
  HostListener,
  OnDestroy
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  query,
  stagger
} from "@angular/animations";
import { Subscription } from "rxjs/Subscription";
import { TimerObservable } from "rxjs/observable/TimerObservable";

interface IReview {
  firstName: string;
  lastName: string;
  fullName: string;
  location: string;
  reviewTitle: string;
  reviewBody: string;
  starRating: string;
}

@Directive({
  selector: "[repeat]"
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set repeat(couner: number) {
    for (let i = 1; i <= couner; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i
      });
    }
  }
}

@Component({
  selector: "widget",
  templateUrl: "./widget.component.html",
  styleUrls: ["./widget.component.scss"],
  host: {
    "(@widgetAnimation.done)": "onwidgetAnimationDone($event)"
  },
  animations: [
    trigger("widgetAnimation", [
      transition(":enter", [
        group([
          query(
            ".info .logo, .info .based-on",
            style({
              opacity: 0
            }),
            { optional: true }
          ),
          query(
            ".stars img",
            style({
              opacity: 0,
              transform: "rotateY(-70deg) scale(0.9) translateX(-20%)",
              transformOrigin: "left center"
            }),
            { optional: true }
          ),
          query(
            ".info .logo",
            style({
              transform: "translateX(-100%)"
            }),
            { optional: true }
          ),
          query(
            ".info .based-on",
            style({
              transform: "translateX(100%)"
            }),
            { optional: true }
          )
        ]),
        query(
          ".stars img",
          stagger("0.3s", [
            animate(
              "0.3s cubic-bezier(0.21, 2.3, 0.8, 1.29)",
              style({
                opacity: 1,
                transform: "rotateY(0deg) scale(1) translateX(0%)"
              })
            )
          ]),
          { optional: true }
        ),
        query(
          ".info .logo, .info .based-on",
          animate(
            "0.6s ease-in",
            style({ opacity: 1, transform: "translateX(0%)" })
          )
        )
      ])
    ]),
    trigger("reviewsAnimation", [
      transition("* <=> *", [
        query(
          ":self",
          [
            style({
              opacity: 0
            }),
            animate("1s", style({ opacity: 1 }))
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input() reviews: IReview[];

  star = {
    length: 5,
    empty: "http://cdn.trustpilot.net/brand-assets/1.7.0/single-star-empty.svg",
    full: "http://cdn.trustpilot.net/brand-assets/1.7.0/single-star-5.svg",
    1: "http://cdn.trustpilot.net/brand-assets/1.7.0/stars-1.svg",
    2: "http://cdn.trustpilot.net/brand-assets/1.7.0/stars-2.svg",
    3: "http://cdn.trustpilot.net/brand-assets/1.7.0/stars-3.svg",
    4: "http://cdn.trustpilot.net/brand-assets/1.7.0/stars-4.svg",
    5: "http://cdn.trustpilot.net/brand-assets/1.7.0/stars-5.svg"
  };
  base_url = "https://www.trustpilot.com/";
  Array = Array;
  activeReview = null;
  private interval_between_reviews = 7000;
  private timerSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    if (!this.reviews || this.reviews.length == 0)
      throw new Error("'reviews' parameter is not defined for WidgetComponent");
  }

  ngOnDestroy() {
    if (this.timerSubscription) this.timerSubscription.unsubscribe();
  }

  /**
   * Calculating Medial Rate
   * @return number
   */
  get midRate(): number {
    let total = null;
    let rates = this.reviews.map(review => review.starRating);

    rates.forEach(rate => {
      total += parseInt(rate);
    });

    return total == null ? 0 : total / rates.length;
  }

  @HostBinding("@widgetAnimation")
  get widgetAnimation() {
    return true;
  }

  onwidgetAnimationDone(event) {
    let timer = TimerObservable.create(0, this.interval_between_reviews);
    this.timerSubscription = timer.subscribe(t => {
      this.slideReview();
    });
  }

  slideReview() {
    if (
      this.activeReview == null ||
      this.activeReview == this.reviews.length - 1
    ) {
      this.activeReview = 0;
    } else {
      this.activeReview++;
    }
  }
}
