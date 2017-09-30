import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  //angular will do this for you but you can do it yourself.
  //you have to do it for your OWN subscriptions.
  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //id and name are both encoded in the route, if they were not,
    //you would not be able to retrieve them.
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy() {

    //we do this because sometimes the component will be destroyed
    //before ngOnDestroy runs, so you force the check.

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();

      //this makes it gc'd faster
      this.paramsSubscription = null;
    }
  }
}
