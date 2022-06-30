import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { PlanService } from '../services/plan.service';
import { PlanI } from 'src/app/shared/models/planes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {
  stripePromise = loadStripe(environment.stripe_key);
  public planes$: Observable<PlanI[]>;
  constructor(private planSvc: PlanService, private router: Router) { }

  ngOnInit() {
    this.planes$ = this.planSvc.getAllPlanes();
  }
  async checkout(plan?: PlanI) {
    // Call your backend to create the Checkout session.
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: plan.priceId, quantity: 1 }],
      successUrl: `${window.location.href}/compra-confirmada`,
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
