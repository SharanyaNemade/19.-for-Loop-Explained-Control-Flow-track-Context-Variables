# Angular21Tutorial




# Angular 21: Complete Guide to `@for`, Signals, `track`, and Array Iteration

Angular 21 uses the modern built-in control flow syntax introduced in Angular 17. The `@for` block is the recommended way to iterate over arrays in Angular templates.

When combined with Angular Signals, `@for` makes it easier to build reactive lists, update collections, optimize rendering, and manage dynamic UI efficiently.

Let's cover each topic with practical examples, interview questions, and best practices.

## 1. What is `@for` in Angular 21?

`@for` is Angular's built-in template control flow syntax for looping through iterable collections, such as arrays.

It replaces the older `*ngFor` structural directive.

Old approach (`*ngFor`):

HTMLWrap linesCopy codePreview

```html
<ul>
  <li *ngFor="let user of users">
    {{ user.name }}
  </li>
</ul>
```

Modern approach (`@for`):

HTMLWrap linesCopy codePreview

```html
<ul>
  @for (user of users; track user.id) {
    <li>{{ user.name }}</li>
  }
</ul>
```

### Key differences

| Feature | `*ngFor` | `@for` |
| --- | --- | --- |
| Syntax | Structural directive | Built-in control flow |
| Track | `trackBy` function | `track` expression |
| Empty state | Separate `*ngIf` | `@empty` |
| Import | `CommonModule` or `NgFor` | No directive import |
| Performance | Depends on tracking | Efficient keyed reconciliation |

Important: `@for` is built into Angular's template syntax. You don't need to import `NgFor` or `CommonModule` just to use it.

## 2. Basic syntax of `@for`

The general syntax is:

HTMLWrap linesCopy codePreview

```html
@for (item of items; track item.id) {
  <!-- HTML template -->
} @empty {
  <!-- Empty state -->
}
```

There are three important parts:

- `item`: Current item in the iteration.
- `items`: Array or iterable collection.
- `track item.id`: Unique identifier Angular uses to track items.

Example:

typescript

```typescript
export class AppComponent {
  users = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Amit' }
  ];
}
```

Template:

HTMLWrap linesCopy codePreview

```html
@for (user of users; track user.id) {
  <p>{{ user.name }}</p>
} @empty {
  <p>No users found.</p>
}
```

Output:

text

```text
Rahul
Priya
Amit
```

## 3. Using `@for` with Angular Signals

This is one of the most important concepts in modern Angular.

A Signal is a reactive container that notifies Angular when its value changes.

To create a writable signal, use Angular's `signal()` function.

### Component TypeScript

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html'
})
export class UsersComponent {

  users = signal([
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Amit' }
  ]);

}
```

### HTML template

HTMLWrap linesCopy codePreview

```html
<ul>
  @for (user of users(); track user.id) {
    <li>{{ user.name }}</li>
  }
</ul>
```

Important: You must call `users()` to read the signal value.

- `users` refers to the signal itself.
- `users()` returns the current array.
- `users.set()` replaces the entire array.
- `users.update()` updates the array based on its previous value.

### Adding an item

typescript

```typescript
addUser() {
  this.users.update(users => [
    ...users,
    {
      id: 4,
      name: 'Sneha'
    }
  ]);
}
```

### Removing an item

typescript

```typescript
removeUser(id: number) {
  this.users.update(users =>
    users.filter(user => user.id !== id)
  );
}
```

### Updating an item

typescript

```typescript
updateUser(id: number) {
  this.users.update(users =>
    users.map(user =>
      user.id === id
        ? { ...user, name: 'Updated Name' }
        : user
    )
  );
}
```

### Complete template

HTMLWrap linesCopy codePreview

```html
<button (click)="addUser()">Add User</button>

@for (user of users(); track user.id) {
  <div>
    {{ user.name }}

    <button (click)="removeUser(user.id)">
      Delete
    </button>
  </div>
} @empty {
  <p>No users available.</p>
}
```

What happens when a signal changes?

1. You update the signal using `.set()` or `.update()`.
2. Angular detects that the signal has changed.
3. The template that reads the signal is notified.
4. Angular reconciles the collection with the existing views.
5. Only the necessary DOM changes are performed.

This is the benefit of combining Signals with `@for`.

Angular

+1

## 4. Using `track` for better performance

The `track` expression is one of the most important features of `@for`.

It tells Angular how to identify each item in a collection.

Consider this example:

typescript

```typescript
products = signal([
  { id: 101, name: 'Laptop', price: 50000 },
  { id: 102, name: 'Mobile', price: 20000 },
  { id: 103, name: 'Tablet', price: 30000 }
]);
```

Use:

HTMLWrap linesCopy codePreview

```html
@for (product of products(); track product.id) {
  <div>
    {{ product.name }} - {{ product.price }}
  </div>
}
```

### Why is `track product.id` important?

Imagine you have 1,000 products and add one new product.

Without a reliable tracking strategy, Angular may have difficulty identifying which existing views correspond to which data items.

With `track product.id`, Angular can identify items using their unique IDs and efficiently reconcile the DOM.

For example:

Before updating

1Laptop

2Mobile

3Tablet

After adding a product

1Laptop

2Mobile

3Tablet

4MonitorNew item

Conceptual illustration: existing items retain their identity; the new item gets a new view.

### Different ways to use `track`

| Syntax | When to use |
| --- | --- |
| `track item.id` | Recommended for objects |
| `track item.uuid` | When using UUIDs |
| `track item` | When object identity is stable |
| `track $index` | Static collections |

Best practice:

HTMLWrap linesCopy codePreview

```html
@for (product of products(); track product.id) {
  <app-product-card [product]="product" />
}
```

Use a unique, stable identifier whenever possible.

Angular's documentation explains that `track` helps minimize DOM operations and improve rendering performance.

Angular

+1

## 5. Why should `$index` be avoided in `track`?

This is a common Angular interview question.

Consider:

HTMLWrap linesCopy codePreview

```html
@for (user of users(); track $index) {
  <div>{{ user.name }}</div>
}
```

Here Angular identifies items by their position rather than their actual identity.

Suppose the array contains:

| Index | User |
| --- | --- |
| 0 | Rahul |
| 1 | Priya |
| 2 | Amit |

Now remove Rahul.

| New index | User |
| --- | --- |
| 0 | Priya |
| 1 | Amit |

The index-based tracking keys remain 0 and 1 for the first two positions, even though the users occupying those positions have changed.

This can cause Angular to reuse existing views for different logical records.

For example, imagine each row contains:

- An input field.
- A checkbox.
- An expanded/collapsed state.
- A child component with internal state.

The UI state may become associated with the wrong user when the collection changes.

### Better approach

HTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  <div>
    {{ user.name }}
  </div>
}
```

### When is `$index` acceptable?

It is perfectly acceptable when:

- The collection is static.
- Items are never inserted or removed.
- Items are never reordered.
- The identity of each item is irrelevant.

For example:

typescript

```typescript
days = ['Monday', 'Tuesday', 'Wednesday'];
```

HTMLWrap linesCopy codePreview

```html
@for (day of days; track $index) {
  <p>{{ day }}</p>
}
```

Interview takeaway: Avoid `$index` for dynamic collections because indexes represent positions, not stable item identities. It is not universally bad; it is appropriate for genuinely static lists.

Angular

+1

## 6. Looping over arrays of objects

In real-world applications, you will mostly work with arrays of objects received from APIs.

Example: Employee management system.

### TypeScript

typescript

```typescript
import { Component, signal } from '@angular/core';

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.html'
})
export class EmployeesComponent {

  employees = signal<Employee[]>([
    {
      id: 1,
      name: 'Rahul',
      department: 'IT',
      salary: 50000
    },
    {
      id: 2,
      name: 'Priya',
      department: 'HR',
      salary: 45000
    },
    {
      id: 3,
      name: 'Amit',
      department: 'Finance',
      salary: 60000
    }
  ]);

}
```

### HTML

HTMLWrap linesCopy codePreview

```html
<h2>Employee List</h2>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
      <th>Salary</th>
    </tr>
  </thead>

  <tbody>
    @for (employee of employees(); track employee.id) {
      <tr>
        <td>{{ employee.id }}</td>
        <td>{{ employee.name }}</td>
        <td>{{ employee.department }}</td>
        <td>{{ employee.salary }}</td>
      </tr>
    } @empty {
      <tr>
        <td colspan="4">No employees found.</td>
      </tr>
    }
  </tbody>
</table>
```

Notice that we use:

HTMLWrap linesCopy codePreview

```html
track employee.id
```

Each employee has a unique ID, so Angular can efficiently identify the employee when the array changes.

## 7. Context variables in `@for`

Angular provides six built-in contextual variables inside an `@for` block.

| Variable | Description |
| --- | --- |
| `$index` | Current item's zero-based index |
| `$first` | True if it is the first item |
| `$last` | True if it is the last item |
| `$even` | True if index is even |
| `$odd` | True if index is odd |
| `$count` | Total number of items |

### Example

HTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  <div>
    Name: {{ user.name }}

    Index: {{ $index }}

    First: {{ $first }}

    Last: {{ $last }}

    Even: {{ $even }}

    Odd: {{ $odd }}

    Total: {{ $count }}
  </div>
}
```

### Expected output

For three users:

| Name | `$index` | `$first` | `$last` | `$even` | `$odd` | `$count` |
| --- | --- | --- | --- | --- | --- | --- |
| Rahul | 0 | true | false | true | false | 3 |
| Priya | 1 | false | false | false | true | 3 |
| Amit | 2 | false | true | true | false | 3 |

Remember that `$even` and `$odd` are based on the zero-based index.

### Aliasing contextual variables

You can give contextual variables custom names using `let`.

HTMLWrap linesCopy codePreview

```html
@for (
  user of users();
  track user.id;
  let i = $index,
      first = $first,
      last = $last
) {
  <div>
    {{ i }} - {{ user.name }}

    @if (first) {
      <span>First User</span>
    }

    @if (last) {
      <span>Last User</span>
    }
  </div>
}
```

This is particularly useful when working with nested loops.

Angular

+1

## 8. Styling odd and even rows

You can use `$even` and `$odd` to apply different CSS classes to rows.

This is useful for:

- Employee tables.
- Product lists.
- Order history.
- Reports.
- Data grids.

### HTML

HTMLWrap linesCopy codePreview

```html
<table>
  @for (employee of employees(); track employee.id) {
    <tr
      [class.even-row]="$even"
      [class.odd-row]="$odd">

      <td>{{ employee.name }}</td>
      <td>{{ employee.department }}</td>

    </tr>
  }
</table>
```

### CSS

css

```css
.even-row {
  background-color: #f2f2f2;
}

.odd-row {
  background-color: #ffffff;
}

tr:hover {
  background-color: #dbeafe;
}
```

Example output

Rahul

IT

Priya

HR

Amit

Finance

Sneha

Sales

Illustration of alternating row colors.

### Alternative: Using `ngClass`

You can also use `ngClass`, but it requires importing `NgClass` or `CommonModule`.

HTMLWrap linesCopy codePreview

```html
<tr [ngClass]="{
  'even-row': $even,
  'odd-row': $odd
}">
```

For simple styling, `[class.className]` is generally cleaner.

## 9. Nested `@for` loops

Sometimes you need to iterate over an array inside another array.

Example: Departments containing employees.

### TypeScript

typescript

```typescript
departments = signal([
  {
    id: 1,
    name: 'IT',
    employees: [
      { id: 101, name: 'Rahul' },
      { id: 102, name: 'Amit' }
    ]
  },
  {
    id: 2,
    name: 'HR',
    employees: [
      { id: 103, name: 'Priya' },
      { id: 104, name: 'Sneha' }
    ]
  }
]);
```

### HTML

HTMLWrap linesCopy codePreview

```html
@for (department of departments(); track department.id) {

  <h2>{{ department.name }}</h2>

  @for (employee of department.employees; track employee.id) {
    <p>{{ employee.name }}</p>
  }

}
```

Output:

text

```text
IT
  Rahul
  Amit

HR
  Priya
  Sneha
```

### Accessing outer loop variables

Use aliases to avoid confusion between inner and outer loop variables.

HTMLWrap linesCopy codePreview

```html
@for (
  department of departments();
  track department.id;
  let deptIndex = $index
) {
  <h2>
    Department {{ deptIndex + 1 }}:
    {{ department.name }}
  </h2>

  @for (
    employee of department.employees;
    track employee.id;
    let empIndex = $index
  ) {
    <p>
      {{ deptIndex }} - {{ empIndex }}:
      {{ employee.name }}
    </p>
  }
}
```

This is especially useful in complex nested tables and hierarchical menus.

## 10. Common mistakes developers make with `@for`

These are important for real-world Angular development and interviews.

### Mistake 1: Forgetting parentheses when reading signals

IncorrectHTMLWrap linesCopy codePreview

```html
@for (user of users; track user.id) {
  {{ user.name }}
}
```

CorrectHTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  {{ user.name }}
}
```

A signal must be read by calling it.

### Mistake 2: Using a non-unique tracking property

IncorrectHTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.name) {
  {{ user.name }}
}
```

Two users might have the same name.

CorrectHTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  {{ user.name }}
}
```

Use a unique identifier.

### Mistake 3: Mutating the signal array directly

Incorrecttypescript

```typescript
this.users().push({
  id: 4,
  name: 'Sneha'
});
```

This mutates the existing array without notifying the signal that its value has changed.

Correcttypescript

```typescript
this.users.update(users => [
  ...users,
  {
    id: 4,
    name: 'Sneha'
  }
]);
```

### Mistake 4: Using `$index` for dynamic data

Incorrect for dynamic collectionsHTMLWrap linesCopy codePreview

```html
@for (user of users(); track $index) {
  <app-user [user]="user" />
}
```

CorrectHTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  <app-user [user]="user" />
}
```

### Mistake 5: Forgetting the empty state

Instead of separately checking whether the array is empty, use `@empty`.

HTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  <p>{{ user.name }}</p>
} @empty {
  <p>No records available.</p>
}
```

### Mistake 6: Using duplicate IDs

typescript

```typescript
users = signal([
  { id: 1, name: 'Rahul' },
  { id: 1, name: 'Amit' }
]);
```

Tracking keys should be unique within the collection. Duplicate keys can cause rendering errors and incorrect reconciliation.

### Mistake 7: Expecting `@for` to support `break` and `continue`

Angular's `@for` does not support JavaScript's flow-modifying `break` and `continue` statements.

Instead, filter the collection before rendering.

typescript

```typescript
activeUsers = computed(() =>
  this.users().filter(user => user.active)
);
```

HTMLWrap linesCopy codePreview

```html
@for (user of activeUsers(); track user.id) {
  <p>{{ user.name }}</p>
}
```

## 11. Best practices with Angular Signals and `@for`

Here are the practices I recommend for production applications.

| Best practice | Reason |
| --- | --- |
| Use `signal()` for reactive state | Makes state changes observable |
| Use `track item.id` | Stable item identity |
| Use `.update()` for array updates | Avoids direct mutation |
| Use `computed()` for derived lists | Keeps derived state synchronized |
| Use `@empty` | Handles empty collections |
| Use `$even` and `$odd` | Simplifies alternating styles |
| Use aliases in nested loops | Improves readability |
| Keep IDs unique | Prevents tracking conflicts |
| Avoid unnecessary computed state | Reduces complexity |

### Example: Search and filter using Signals

This is a common real-world interview scenario.

TypeScript

typescript

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html'
})
export class ProductsComponent {

  searchText = signal('');

  products = signal([
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
    { id: 3, name: 'Tablet', price: 30000 }
  ]);

  filteredProducts = computed(() => {
    const search = this.searchText().toLowerCase();

    return this.products().filter(product =>
      product.name.toLowerCase().includes(search)
    );
  });

}
```

HTML

HTMLWrap linesCopy codePreview

```html
<input
  type="text"
  placeholder="Search products..."
  [value]="searchText()"
  (input)="searchText.set($any($event.target).value)"
/>

@for (product of filteredProducts(); track product.id) {
  <div>
    {{ product.name }} - {{ product.price }}
  </div>
} @empty {
  <p>No matching products found.</p>
}
```

### How does this work?

1. The user types into the search input.
2. `searchText` is updated.
3. `computed()` recalculates the filtered products.
4. Angular updates the template that reads `filteredProducts()`.
5. `@for` reconciles the filtered collection using product IDs.

Notice that we don't manually subscribe to anything or manually refresh the template.

This is a good example of combining Signals, computed state, and `@for`.

Angular

+1

## 12. Angular 21 interview questions on `@for`

Here are 15 important interview questions with answers.

### Basic interview questions

Q1. What is `@for` in Angular?

`@for` is a built-in control flow block used to iterate over arrays and other JavaScript iterables in Angular templates. It replaces the traditional `*ngFor` syntax.

Q2. Is `@for` available in Angular 21?

Yes. It was introduced in Angular 17 and is available in Angular 21. `NgFor` has been deprecated since Angular 20.

Q3. What is the purpose of `track`?

It identifies collection items so Angular can efficiently reconcile existing DOM views when a collection changes.

Q4. Is `track` mandatory?

Generally, yes. An exception exists for certain signal-based component scenarios where the iterable consists of signals.

Q5. What is the difference between `track item.id` and `track $index`?

- `track item.id`: Tracks items using stable identity.
- `track $index`: Tracks items using their positions.

Use IDs for dynamic collections.

Q6. What is `@empty`?

It defines a fallback template that renders when the collection has no items.

HTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  {{ user.name }}
} @empty {
  No users found.
}
```

### Intermediate interview questions

Q7. Can we use Signals with `@for`?

Yes. Read the signal using its getter.

HTMLWrap linesCopy codePreview

```html
@for (user of users(); track user.id) {
  {{ user.name }}
}
```

Q8. What happens when a Signal array changes?

Angular notifies consumers of the changed signal and reconciles the affected template views.

Q9. What is `$index`?

It represents the zero-based index of the current iteration.

Q10. What is the difference between `$even` and `$odd`?

- `$even`: True when the current index is even.
- `$odd`: True when the current index is odd.

Q11. Can we use nested `@for` loops?

Yes. You can use nested loops to display hierarchical or multidimensional data.

Q12. Can we use `break` and `continue` inside `@for`?

No. Angular's `@for` does not support these statements.

### Advanced interview questions

Q13. What happens if two objects have the same tracking ID?

Duplicate tracking keys can cause Angular to report a tracking error and lead to incorrect view reconciliation.

Q14. What is the difference between `signal()` and `computed()`?

| `signal()` | `computed()` |
| --- | --- |
| Stores writable state | Derives state |
| Can use `.set()` | Read-only |
| Can use `.update()` | Automatically recalculates |
| Used for source data | Used for filtered or calculated data |

Q15. Why should we prefer Signals with `@for`?

Signals provide reactive state management, while `@for` efficiently manages collection rendering. Together they provide a clean approach to building reactive Angular applications.

## 13. Important Angular 21 concepts to remember

## Angular 21 revision sheet

`@for`

Built-in control flow

Replaces `*ngFor`.

`track`

Required in normal usage

Identifies collection items and helps minimize DOM operations.

`@empty`

Displays content when the collection is empty.

`signal()`

Stores reactive, writable state.

`computed()`

Creates derived reactive state.

`$index`, `$first`, `$last`

Provide iteration context.

`$even`, `$odd`

Help implement alternating row styles.

`.set()` and `.update()`

Update signal values.



## 15. Official Angular documentation

For deeper learning, these are the most useful references:

- [Angular Control Flow – @for documentation](<https://angular.dev/guide/templates/control-flow?utm_source=chatgpt.com>).
- [Angular Signals – Official Guide](<https://angular.dev/guide/signals?utm_source=chatgpt.com>).
- [Angular Expression Syntax](<https://v21.angular.dev/guide/templates/expression-syntax?utm_source=chatgpt.com>).
- [Announcing Angular 21 – Official Release Blog](<https://blog.angular.dev/announcing-angular-v21-57946c34f14b?utm_source=chatgpt.com>).

## Final recommendation

If you're preparing for Angular 21 interviews or building enterprise Angular applications, remember these five rules:

1. Prefer `@for` over `*ngFor`.
2. Prefer `track item.id` over `track $index` for dynamic collections.
3. Use `signal()` for reactive collections.
4. Use `.update()` and immutable array operations to modify signal arrays.
5. Use `computed()` for derived data such as searching, filtering, and sorting.

The most important combination to master is:

typescript

```typescript
users = signal<User[]>([]);

activeUsers = computed(() =>
  this.users().filter(user => user.active)
);
```

HTMLWrap linesCopy codePreview

```html
@for (user of activeUsers(); track user.id) {
  <div>{{ user.name }}</div>
} @empty {
  <p>No active users found.</p>
}
```

This is a clean and maintainable pattern for modern Angular development.