import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/components/planes/plan.service';
import { PlanI } from 'src/app/shared/models/planes.interface';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {
  title = 'angular-stripe';
  priceId = 'price_1HW9AlKz8hb8VNavLUrly8KY';
  product = {
    title: 'Classic Peace Lily',
    subTitle: 'Popular House Plant',
    description:
      'Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.',
    price: 18.0,
  };
  quantity = 1;
  stripePromise = loadStripe(environment.stripe_key);
  public planes$: Observable<PlanI[]>;
  constructor(
    private planSvc: PlanService,
    private pageScrollSvc: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.pageScrollSvc.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });
    this.planes$ = this.planSvc.getAllPlanes();
  }
  async checkout(plan?: PlanI) {
    // Call your backend to create the Checkout session.
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: plan.priceId, quantity: 1 }],
      successUrl: `${window.location.href}/home`,
      cancelUrl: `${window.location.href}`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      window.alert(error);
    }
  }
}
