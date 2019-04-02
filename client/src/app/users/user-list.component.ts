import {Component, OnInit} from '@angular/core';
import {UserListService} from './user-list.service';
import {User} from './user';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'user-list-component',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

export class UserListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public users: User[];
  public filteredUsers: User[];

  // These are the target values used in searching.
  // We should rename them to make that clearer.
  public userName: string;
  public userEmail: string;
  public userPhone: string;

  // The ID of the
  private highlightedID: string = '';

  // Static references for displaying an example profile page
  public exampleUser: string;
  public exampleEmail: string;
  public exampleBio: string;
  public exampleMakeModel: string;
  public exampleYear: string;
  public exampleColor: string;
  public exampleNotes: string;


  private user: User;

  // Inject the UserListService into this component.
  constructor(public userListService: UserListService) {

    this.exampleUser = 'Albert Einstein';
    this.exampleEmail = 'Albert.Einstein@nointernet.yet';
    this.exampleBio = 'I am a German-born theoretical physicist who discovered the theory of relativity! Also I never learned how to drive!';
    this.exampleMakeModel = 'Pontiac Torpedo';
    this.exampleYear = '1940';
    this.exampleColor = 'Black';
    this.exampleNotes = 'Nearly 80 years old, but it\'s still brand new.';

    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.exampleUser = this.user.name;
      this.exampleEmail = this.user.email;
    }
  }

  isHighlighted(user: User): boolean {
    return user._id['$oid'] === this.highlightedID;
  }


  public filterUsers(searchName: string): User[] {

    this.filteredUsers = this.users;

    // Filter by name
    if (searchName != null) {
      searchName = searchName.toLocaleLowerCase();

      this.filteredUsers = this.filteredUsers.filter(user => {
        return !searchName || user.name.toLowerCase().indexOf(searchName) !== -1;
      });
    }


    return this.filteredUsers;
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  refreshUsers(): Observable<User[]> {
    // Get Users returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const users: Observable<User[]> = this.userListService.getUsers();
    users.subscribe(
      users => {
        this.users = users;
        this.filterUsers(this.userName);
      },
      err => {
        console.log(err);
      });
    return users;
  }

  loadService(): void {
    this.userListService.getUsers().subscribe(
      users => {
        this.users = users;
        this.filteredUsers = this.users;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.refreshUsers();
    this.loadService();
  }
}
