# Angular21Tutorial

# Angular 21 – Control Flow and Conditional Rendering

Control flow is one of the most important concepts in Angular. It allows developers to dynamically display, hide, or change elements based on conditions, application state, user interactions, and API responses.

In Angular 21, we use the modern built-in control flow syntax:

- `@if` – Conditional rendering.
- `@else` – Alternative rendering.
- `@else if` – Multiple conditional branches.
- `@switch`, `@case`, `@default` – Multiple fixed-value conditions.
- Signals – Reactive state management.
- Event binding – Handling user interactions such as clicks and dropdown changes.

Let's understand each concept with practical examples, step by step.

## 1. What is Control Flow in Angular?

Control flow determines which HTML elements or components should be rendered based on a particular condition.

For example:

- Show Login if the user is not logged in.
- Show Dashboard if the user is logged in.
- Show a loading message while API data is loading.
- Show success or error messages after submitting a form.
- Show additional fields when a dropdown option is selected.

### Traditional Angular syntax vs Angular 21

Earlier Angular applications commonly used structural directives:

HTMLWrap linesCopy codePreview

```html
<div *ngIf="isLoggedIn">
  Welcome User!
</div>

<div *ngIf="!isLoggedIn">
  Please Login
</div>
```

Modern Angular uses built-in control flow:

HTMLWrap linesCopy codePreview

```html
@if (isLoggedIn) {
  <div>Welcome User!</div>
} @else {
  <div>Please Login</div>
}
```

Important: `@if` and `@else` are built into Angular. You don't need to import `CommonModule` or `NgIf` to use them.

## 2. @if and @else Syntax in Angular 21

The basic syntax is:

HTMLWrap linesCopy codePreview

```html
@if (condition) {
  <!-- HTML when condition is true -->
} @else {
  <!-- HTML when condition is false -->
}
```

### Example: Login status

app.component.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  isLoggedIn = signal(false);

}
```

app.component.html

HTMLWrap linesCopy codePreview

```html
@if (isLoggedIn()) {
  <h2>Welcome to Dashboard!</h2>
} @else {
  <h2>Please Login First</h2>
}
```

Here:

- `signal(false)` creates a reactive boolean value.
- `isLoggedIn()` reads the signal value.
- If the value is `true`, Angular displays the dashboard message.
- If the value is `false`, Angular displays the login message.

## 3. Conditional Rendering with Signals

Signals are a reactive state management feature in Angular.

A signal stores a value and notifies Angular when that value changes.

### Example

app.component.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  count = signal(0);

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

}
```

app.component.html

HTMLWrap linesCopy codePreview

```html
<h2>Count: {{ count() }}</h2>

<button (click)="increment()">Increment</button>

<button (click)="decrement()">Decrement</button>

@if (count() > 0) {
  <p>Count is positive</p>
} @else if (count() === 0) {
  <p>Count is zero</p>
} @else {
  <p>Count is negative</p>
}
```

How does it work?

1. Initially, count is 0.
2. Click Increment.
3. Count becomes 1.
4. Angular detects the signal update.
5. The appropriate conditional block is rendered.

Interview tip Signals are read by calling them as functions, such as `count()`. Use `.set()` to replace a value and `.update()` to calculate a new value from the existing one.

## 4. Toggle Show/Hide Elements

One of the most common real-world use cases is showing and hiding elements when a user clicks a button.

### TypeScript

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  isVisible = signal(false);

  toggleVisibility() {
    this.isVisible.update(value => !value);
  }

}
```

### HTML

HTMLWrap linesCopy codePreview

```html
<button (click)="toggleVisibility()">
  {{ isVisible() ? 'Hide Details' : 'Show Details' }}
</button>

@if (isVisible()) {
  <div>
    <h3>Angular 21</h3>
    <p>Welcome to conditional rendering!</p>
  </div>
}
```

Output behavior:

| Action | Result |
| --- | --- |
| Initial page load | Details hidden |
| Click Show Details | Details displayed |
| Click Hide Details | Details removed |

Remember: `@if` removes the conditional content from the DOM when its condition becomes false. It does not merely make the element invisible.

If you want to keep an element in the DOM and only hide it visually, use CSS:

HTMLWrap linesCopy codePreview

```html
<div [hidden]="!isVisible()">
  This element is hidden visually.
</div>
```

## 5. Multiple Conditions: Not Started, In Progress, Success, Error

This is a very important real-time application example.

Imagine an application that submits data to an API. Depending on the response, we need to display different messages.

We have four states:

- `notStarted`
- `inProgress`
- `success`
- `error`

### TypeScript

typescript

```typescript
import { Component, signal } from '@angular/core';

type Status =
  | 'notStarted'
  | 'inProgress'
  | 'success'
  | 'error';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  status = signal<Status>('notStarted');

  startProcess() {
    this.status.set('inProgress');

    setTimeout(() => {
      this.status.set('success');
    }, 2000);
  }

  reset() {
    this.status.set('notStarted');
  }

  showError() {
    this.status.set('error');
  }

}
```

### HTML

HTMLWrap linesCopy codePreview

```html
<h2>API Status Example</h2>

<button
  (click)="startProcess()"
  [disabled]="status() === 'inProgress'">
  Start Process
</button>

<button (click)="showError()">
  Simulate Error
</button>

<button (click)="reset()">
  Reset
</button>

@if (status() === 'notStarted') {
  <p>Process has not started yet.</p>
}

@else if (status() === 'inProgress') {
  <p>Loading... Please wait.</p>
}

@else if (status() === 'success') {
  <p>Data submitted successfully!</p>
}

@else if (status() === 'error') {
  <p>Something went wrong!</p>
}
```

### Understanding the flow

## API status flow

Not Started

Initial state

In Progress

API request running

Success

Request completed

Error

Request failed

Interview point: Use `@if` and `@else if` when conditions involve different logical expressions. Use `@switch` when comparing one variable against multiple fixed values.

### Alternative: Using @switch

The same example can be written using `@switch`.

HTMLWrap linesCopy codePreview

```html
@switch (status()) {

  @case ('notStarted') {
    <p>Process not started.</p>
  }

  @case ('inProgress') {
    <p>Loading...</p>
  }

  @case ('success') {
    <p>Success!</p>
  }

  @case ('error') {
    <p>Error occurred!</p>
  }

  @default {
    <p>Unknown status.</p>
  }

}
```

`@switch` uses strict equality (`===`) and does not fall through between cases.

Angular

## 6. Dropdown-Based Conditional Rendering

This is another frequently asked Angular interview and practical development question.

Requirement: When the user selects a country, display the corresponding information.

## Interactive country dropdown

Select a country to see conditional rendering in action.

 India # 🇮🇳 India

Capital: New Delhi

Currency: Indian Rupee (INR)

### Actual Angular implementation

app.component.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  selectedCountry = signal('India');

  onCountryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedCountry.set(value);
  }

}
```

app.component.html

HTMLWrap linesCopy codePreview

```html
<h2>Select Country</h2>

<select
  [value]="selectedCountry()"
  (change)="onCountryChange($event)">

  <option value="India">India</option>
  <option value="USA">USA</option>
  <option value="UK">UK</option>

</select>

@if (selectedCountry() === 'India') {
  <p>Welcome to India</p>
}
@else if (selectedCountry() === 'USA') {
  <p>Welcome to USA</p>
}
@else if (selectedCountry() === 'UK') {
  <p>Welcome to UK</p>
}
```

What happens internally?

1. User selects a country.
2. The `(change)` event executes.
3. `$event` provides the DOM event object.
4. We retrieve the selected dropdown value.
5. The signal is updated using `.set()`.
6. Angular updates the conditional content.

## 7. Handling DOM Events Properly

Angular provides event binding using parentheses `()`.

General syntax:

HTMLWrap linesCopy codePreview

```html
<button (click)="methodName()">
  Click Me
</button>
```

Some commonly used DOM events:

| Event | Purpose |
| --- | --- |
| `(click)` | Button click |
| `(change)` | Dropdown or input change |
| `(input)` | Input value changes |
| `(keyup)` | Keyboard key released |
| `(keydown)` | Keyboard key pressed |
| `(mouseover)` | Mouse enters element |
| `(submit)` | Form submission |

### Example: Input-based conditional rendering

TypeScript

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  username = signal('');

}
```

HTML

HTMLWrap linesCopy codePreview

```html
<input
  type="text"
  placeholder="Enter username"
  (input)="username.set($any($event.target).value)"
/>

@if (username().length > 0) {
  <p>Hello, {{ username() }}!</p>
}
@else {
  <p>Please enter your username.</p>
}
```

Here, `$event` represents the event object, and `$event.target` represents the element that triggered the event.

For better type safety, you can also handle the event in a TypeScript method, as demonstrated in the dropdown example.

Angular event binding documentation: [Event binding – Angular official documentation](<https://angular.dev/guide/templates/event-binding?utm_source=chatgpt.com>).

## 8. Common Developer Mistakes in Angular Conditional Rendering

These are common mistakes that developers should avoid.

### Mistake 1: Forgetting parentheses when reading a signal

IncorrectHTMLWrap linesCopy codePreview

```html
@if (isLoggedIn) {
  <p>Welcome!</p>
}
```

CorrectHTMLWrap linesCopy codePreview

```html
@if (isLoggedIn()) {
  <p>Welcome!</p>
}
```

A signal must be called to read its current value.

### Mistake 2: Using assignment instead of comparison

IncorrectHTMLWrap linesCopy codePreview

```html
@if (status = 'success') {
  <p>Success!</p>
}
```

CorrectHTMLWrap linesCopy codePreview

```html
@if (status() === 'success') {
  <p>Success!</p>
}
```

Use comparison operators when checking conditions.

### Mistake 3: Using multiple independent conditions unnecessarily

If only one state should be displayed at a time, prefer an `@if` / `@else if` chain.

HTMLWrap linesCopy codePreview

```html
@if (status() === 'loading') {
  <p>Loading...</p>
} @else if (status() === 'success') {
  <p>Success!</p>
} @else {
  <p>Something else.</p>
}
```

Separate `@if` blocks are independent and can render multiple sections simultaneously.

### Mistake 4: Incorrectly accessing dropdown values

IncorrectHTMLWrap linesCopy codePreview

```html
<select (change)="selectedCountry.set($event)">
```

The event object is not the selected string value.

Correcttypescript

```typescript
onCountryChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.selectedCountry.set(value);
}
```

### Mistake 5: Using `@if` when you only want visual hiding

`@if` destroys and recreates the conditional view when the condition changes.

If you only want to hide the element visually, consider:

HTMLWrap linesCopy codePreview

```html
<div [hidden]="!showDetails()">
  Additional Information
</div>
```

### Mistake 6: Putting too much business logic inside HTML

Avoid complicated expressions:

HTMLWrap linesCopy codePreview

```html
@if (user() && user().age >= 18 &&
     user().isActive && user().role === 'admin') {
  <p>Admin Access</p>
}
```

Prefer a computed signal.

typescript

```typescript
import { computed, signal } from '@angular/core';

user = signal({
  age: 25,
  isActive: true,
  role: 'admin'
});

isAdmin = computed(() => {
  const u = this.user();

  return u.age >= 18 &&
         u.isActive &&
         u.role === 'admin';
});
```

HTMLWrap linesCopy codePreview

```html
@if (isAdmin()) {
  <p>Admin Access</p>
}
```

This makes your application easier to maintain.

### Mistake 7: Not handling API loading, success and error states

Don't display an empty page while waiting for API responses.

Always consider:

- Loading state.
- Success state.
- Error state.
- Empty data state.

These states improve user experience and make applications easier to debug.

## 9. Real-Time Practical Example: Login and Dashboard

Let's combine the concepts into one practical Angular 21 example.

Requirement:

- Initially display Login.
- When the user clicks Login, display Dashboard.
- When the user clicks Logout, return to Login.
- Display different content based on login status.

app.component.ts

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  isLoggedIn = signal(false);

  login() {
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
  }

}
```

app.component.html

HTMLWrap linesCopy codePreview

```html
<div>

  <h1>Angular 21 Application</h1>

  @if (isLoggedIn()) {

    <h2>Welcome to Dashboard</h2>

    <p>You are successfully logged in.</p>

    <button (click)="logout()">
      Logout
    </button>

  } @else {

    <h2>Login Page</h2>

    <p>Please login to continue.</p>

    <button (click)="login()">
      Login
    </button>

  }

</div>
```

This example demonstrates four important Angular concepts:

1. Signals for managing state.
2. `@if` and `@else` for conditional rendering.
3. Event binding using `(click)`.
4. Updating the UI automatically when state changes.

Note: This is a UI demonstration, not production authentication. A real login must validate credentials with a backend and enforce authorization on the server.

## 10. Angular 21 Interview Questions and Answers

Here are important interview questions, from beginner to advanced level.

### Beginner-level questions

Q1. What is control flow in Angular?

Control flow determines which HTML elements or components should be displayed based on conditions.

Angular provides built-in control flow blocks such as:

- `@if`
- `@else`
- `@else if`
- `@switch`
- `@case`
- `@default`
- `@for`

Q2. What is the difference between `@if` and `*ngIf`?

| `@if` | `*ngIf` |
| --- | --- |
| Built-in control flow | Structural directive |
| No import required | Requires NgIf/CommonModule |
| Modern Angular syntax | Older syntax |
| Recommended for new code | Deprecated since Angular 20 |

Q3. What is the purpose of `@else`?

It executes an alternative template when the `@if` condition is false.

HTMLWrap linesCopy codePreview

```html
@if (isLoggedIn()) {
  <p>Welcome!</p>
} @else {
  <p>Please login.</p>
}
```

Q4. Can we use multiple `@else if` conditions?

Yes. Angular supports multiple `@else if` branches.

HTMLWrap linesCopy codePreview

```html
@if (marks() >= 90) {
  <p>Grade A</p>
} @else if (marks() >= 75) {
  <p>Grade B</p>
} @else if (marks() >= 50) {
  <p>Grade C</p>
} @else {
  <p>Fail</p>
}
```

### Intermediate-level questions

Q5. What are Angular Signals?

Signals are reactive values that notify Angular when their values change.

Example:

typescript

```typescript
count = signal(0);

increment() {
  this.count.update(value => value + 1);
}
```

Read a signal using `count()`.

Q6. How do you toggle an element in Angular?

typescript

```typescript
show = signal(false);

toggle() {
  this.show.update(value => !value);
}
```

HTMLWrap linesCopy codePreview

```html
<button (click)="toggle()">Toggle</button>

@if (show()) {
  <p>Hello Angular!</p>
}
```

Q7. What is the difference between `@if` and `@switch`?

- `@if` is useful for evaluating boolean expressions and complex conditions.
- `@switch` is useful for matching one expression against multiple possible values.

Example:

HTMLWrap linesCopy codePreview

```html
@switch (role()) {
  @case ('admin') {
    <p>Admin Dashboard</p>
  }
  @case ('user') {
    <p>User Dashboard</p>
  }
  @default {
    <p>Guest Dashboard</p>
  }
}
```

Q8. What is `$event` in Angular?

`$event` is a special template variable that provides the event object generated by a DOM event.

HTMLWrap linesCopy codePreview

```html
<button (click)="handleClick($event)">
  Click
</button>
```

Q9. What is the difference between `.set()` and `.update()` in Signals?

| `.set()` | `.update()` |
| --- | --- |
| Assigns a new value | Calculates a new value |
| Takes the new value | Receives the previous value |
| `count.set(10)` | `count.update(v => v + 1)` |

### Advanced-level questions

Q10. What happens internally when a Signal changes inside an `@if` condition?

1. Angular tracks the signal read by the template.
2. The signal value changes.
3. Angular is notified about the change.
4. Angular updates the affected template.
5. The appropriate conditional view is rendered or removed.

Q11. Does `@if` hide an element or remove it from the DOM?

It removes the conditional view from the DOM when the condition is false. It can be recreated when the condition becomes true.

Q12. Can we use Signals with API responses?

Yes. Signals can store API loading states and response data.

For example:

typescript

```typescript
loading = signal(false);
users = signal<string[]>([]);
error = signal('');

loadUsers() {
  this.loading.set(true);

  // API request goes here
}
```

You can use `@if` to display loading, success and error messages.

Q13. What is `computed()` in Angular?

`computed()` creates a read-only derived signal based on other signals.

typescript

```typescript
price = signal(100);
quantity = signal(2);

total = computed(() =>
  this.price() * this.quantity()
);
```

HTMLWrap linesCopy codePreview

```html
<p>Total: {{ total() }}</p>
```

Q14. What is the difference between `@if` and `[hidden]`?

- `@if`: Adds or removes the conditional view from the DOM.
- `[hidden]`: Keeps the element in the DOM but applies the HTML hidden state.

Q15. Do we need to import CommonModule for `@if` in Angular 21?

No. Built-in control flow syntax does not require `CommonModule`.

## 11. Practice Exercises

Try these five exercises to strengthen your understanding.

Angular practice checklist

0/5 completed

[ ]Exercise 1: Create a button that shows and hides a paragraph.

Create a boolean signal, toggle it using .update(), and use @if.

[ ]Exercise 2: Create a login/logout application.

Use a login status signal and @if/@else.

[ ]Exercise 3: Create a dropdown with India, USA and UK options.

Use a select element, change event and multiple @else if conditions.

[ ]Exercise 4: Display Loading, Success and Error messages.

Use a union type signal and @switch or @if/@else if.

[ ]Exercise 5: Calculate total price dynamically.

Use price and quantity signals with a computed() signal.

## 12. Important Angular 21 Documentation

For further learning, refer to the official Angular documentation:

1. [Angular Control Flow – @if, @else, @switch and @for](<https://angular.dev/guide/templates/control-flow?utm_source=chatgpt.com>).
2. [Angular Event Binding](<https://angular.dev/guide/templates/event-binding?utm_source=chatgpt.com>).
3. [Angular 21 Template Expression Syntax](<https://v21.angular.dev/guide/templates/expression-syntax?utm_source=chatgpt.com>).
4. [NgIf API and Deprecation Information](<https://angular.dev/api/common/NgIf?utm_source=chatgpt.com>).

## Final Revision: What You Must Remember

| Concept | Angular syntax |
| --- | --- |
| Conditional rendering | `@if` |
| Alternative condition | `@else` |
| Multiple conditions | `@else if` |
| Multiple fixed values | `@switch` |
| Individual switch condition | `@case` |
| Default switch condition | `@default` |
| Reactive state | `signal()` |
| Update signal | `.set()` / `.update()` |
| Derived state | `computed()` |
| Button click | `(click)` |
| Dropdown change | `(change)` |
| Input change | `(input)` |
| Hide visually | `[hidden]` |

My recommendation: Learn `@if`, `@else if`, `@switch`, Signals and event binding together. These concepts form the foundation for building interactive Angular applications, handling API responses, and answering practical Angular interview questions.