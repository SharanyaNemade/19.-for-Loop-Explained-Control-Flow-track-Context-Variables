# Angular21Tutorial

# Angular 21 – Complete Guide to Component Styling and Global Styling

Angular provides several ways to apply CSS to an application. The most important distinction is between component-level styling and global styling.

In Angular 21, you can use:

- Component-specific CSS files.
- Global CSS files.
- Inline CSS styles.
- Multiple stylesheets in a component.
- CSS preprocessors such as SCSS and LESS.
- Angular's view encapsulation to control how styles affect components.

Let's understand each concept with practical examples.

## 1. What is component-level styling in Angular?

Component-level styling means writing CSS specifically for an individual Angular component.

For example, suppose you have these components:

text

```text
src/
  app/
    home/
      home.component.ts
      home.component.html
      home.component.css

    login/
      login.component.ts
      login.component.html
      login.component.css

    dashboard/
      dashboard.component.ts
      dashboard.component.html
      dashboard.component.css
```

Each component has its own CSS file.

home.component.css

css

```css
h1 {
  color: blue;
}

.home-container {
  background-color: lightblue;
  padding: 20px;
}
```

login.component.css

css

```css
h1 {
  color: red;
}

.login-container {
  background-color: lightyellow;
  padding: 20px;
}
```

home.component.ts

typescript

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
```

home.component.html

HTMLWrap linesCopy codePreview

```html
<div class="home-container">
  <h1>Home Page</h1>
</div>
```

login.component.ts

typescript

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {}
```

### What happens here?

- Home component uses its own CSS.
- Login component uses its own CSS.
- The `h1` in Home is blue.
- The `h1` in Login is red.
- The CSS from one component normally does not affect another component.

This is possible because Angular uses `ViewEncapsulation.Emulated` by default.

When should you use component-level styling?

Use it when:

- Styling buttons, forms, cards, tables, etc., that belong to a particular component.
- Building reusable components.
- Developing large applications with multiple developers.
- Keeping CSS maintainable and organized.

## 2. What is global styling in Angular?

Global styling means writing CSS that can apply throughout the entire Angular application.

Instead of creating CSS separately for every component, you define common styles in global CSS files.

Angular CLI projects normally have a global stylesheet:

text

```text
src/
  styles.css
```

You can define common styles there.

styles.css

css

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

h1 {
  color: green;
}

button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
}

.container {
  width: 90%;
  margin: auto;
}
```

Now these styles can affect matching elements throughout your Angular application.

For example:

home.component.html

HTMLWrap linesCopy codePreview

```html
<h1>Home Page</h1>

<div class="container">
  Welcome to Home
</div>

<button>Submit</button>
```

login.component.html

HTMLWrap linesCopy codePreview

```html
<h1>Login Page</h1>

<div class="container">
  Login Form
</div>

<button>Login</button>
```

Both components can use the styles defined in `styles.css`.

### When should you use global styling?

Use global CSS for:

- Common fonts and typography.
- Application-wide colors.
- CSS resets.
- Body and HTML styling.
- Common button styles.
- Common utility classes.
- Theme variables.
- Third-party library styles.

For example, if your entire application uses the same primary color, define it globally:

css

```css
:root {
  --primary-color: #1976d2;
  --secondary-color: #424242;
  --background-color: #f5f5f5;
}

body {
  background-color: var(--background-color);
}

.primary-button {
  background-color: var(--primary-color);
}
```

Now multiple components can use the same CSS variables.

## 3. Difference between component styles and global styles

| Feature | Component styles | Global styles |
| --- | --- | --- |
| Scope | Normally limited to one component | Application-wide |
| Location | Component CSS file | `src/styles.css` or another global file |
| Reusability | Specific to component | Shared across components |
| Encapsulation | Usually Emulated | Not encapsulated |
| Maintenance | Managed per component | Managed centrally |
| Best use | Component-specific UI | Common application design |
| Example | Login form styling | Common fonts and colors |

### Visual understanding

Global CSS

Entire Angular application

Home

Global CSS

Login

Global CSS

Dashboard

Global CSS

Component CSS

Home CSS

Home only

Login CSS

Login only

Dashboard CSS

Dashboard only

Important: Global styles can still affect elements inside components using Angular's default Emulated encapsulation. Component encapsulation prevents component CSS from leaking out; it does not prevent global CSS from entering.

## 4. Inline styles vs internal styles vs external styles

These are three common ways of writing CSS.

### A. Inline styles

Inline styles mean writing CSS directly inside an HTML element using the `style` attribute.

Example:

HTMLWrap linesCopy codePreview

```html
<h1 style="color: red; font-size: 30px;">
  Welcome to Angular
</h1>

<button style="background-color: blue; color: white;">
  Submit
</button>
```

You can also use Angular style bindings:

HTMLWrap linesCopy codePreview

```html
<h1 [style.color]="headingColor">
  Welcome
</h1>

<div [style.background-color]="backgroundColor">
  Angular Content
</div>
```

Advantages:

- Easy to apply quick styling.
- Useful for dynamic styles.
- No separate CSS file required.

Disadvantages:

- Difficult to maintain when used extensively.
- Can make HTML complicated.
- Not suitable for reusable styling.

Use inline styles for dynamic values or very small styling requirements.

### B. Internal styles

Internal styles mean writing CSS inside the component's `@Component` decorator using the `styles` property.

Example:

typescript

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h1>Welcome Home</h1>
    <button>Submit</button>
  `,
  styles: `
    h1 {
      color: blue;
    }

    button {
      background-color: green;
      color: white;
      padding: 10px;
    }
  `
})
export class HomeComponent {}
```

Here, CSS is written inside the TypeScript file.

Advantages:

- No separate CSS file required.
- Useful for small components.
- Styles are associated with the component.

Disadvantages:

- TypeScript files become lengthy.
- Difficult to maintain large stylesheets.
- HTML, TypeScript and CSS concerns become mixed.

Use internal styles for small components with very few CSS rules.

### C. External styles

External styles mean writing CSS in a separate `.css` or `.scss` file and connecting it to the component.

Example:

home.component.css

css

```css
h1 {
  color: blue;
}

button {
  background-color: green;
  color: white;
  padding: 10px;
}
```

home.component.ts

typescript

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
```

This is generally the recommended approach for medium and large components.

### Comparison

| Feature | Inline | Internal | External |
| --- | --- | --- | --- |
| Location | HTML element | TypeScript decorator | CSS file |
| Syntax | `style=""` | `styles` | `styleUrl` |
| Maintenance | Difficult | Moderate | Easy |
| Reusability | Low | Low | Better organization |
| Dynamic styling | Excellent with bindings | Not directly dynamic | Can use CSS variables and bindings |
| Best use | Dynamic values | Small components | Most components |

## 5. How to create and use multiple global CSS files

Suppose you have a large Angular 21 application.

You may want to separate global CSS into multiple files instead of maintaining everything inside `styles.css`.

For example:

text

```text
src/
│
├── app/
│   ├── home/
│   ├── login/
│   └── dashboard/
│
├── styles/
│   ├── reset.css
│   ├── typography.css
│   ├── variables.css
│   ├── buttons.css
│   ├── forms.css
│   └── layout.css
│
└── styles.css
```

### Step 1: Create multiple CSS files

reset.css

css

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

variables.css

css

```css
:root {
  --primary-color: #1976d2;
  --secondary-color: #424242;
  --font-size: 16px;
}
```

typography.css

css

```css
body {
  font-family: Arial, sans-serif;
  font-size: var(--font-size);
}

h1 {
  font-size: 30px;
}
```

buttons.css

css

```css
.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
}
```

### Step 2: Register multiple CSS files in angular.json

Open `angular.json`.

Find the build configuration and its `styles` array.

Example:

json

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles/reset.css",
              "src/styles/variables.css",
              "src/styles/typography.css",
              "src/styles/buttons.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

The important part is:

json

```json
"styles": [
  "src/styles/reset.css",
  "src/styles/variables.css",
  "src/styles/typography.css",
  "src/styles/buttons.css",
  "src/styles.css"
]
```

What happens?

Angular includes all these files in the application's global styling bundle.

You can now use their CSS classes in any component.

For example:

HTMLWrap linesCopy codePreview

```html
<h1>Angular 21</h1>

<button class="btn-primary">
  Submit
</button>
```

You don't need to import these CSS files separately into every component.

Important: CSS loading order matters. If two files define the same selector with equal specificity, the later applicable declaration generally wins.

### Alternative: Import multiple CSS files inside styles.css

Instead of listing every file in `angular.json`, you can use CSS `@import`.

styles.css

css

```css
@import './styles/reset.css';
@import './styles/variables.css';
@import './styles/typography.css';
@import './styles/buttons.css';
@import './styles/layout.css';
```

Then configure only:

json

```json
"styles": [
  "src/styles.css"
]
```

Both approaches work. For larger applications, explicitly registering global styles in `angular.json` makes the application entry points easier to understand.

## 6. How to load multiple CSS files inside a single component

Angular 21 supports multiple component stylesheets.

There are two ways to do this.

### Method 1: Using styleUrls

Suppose your component has two CSS files:

text

```text
dashboard/
  dashboard.component.ts
  dashboard.component.html
  dashboard.component.css
  dashboard-responsive.css
```

dashboard.component.css

css

```css
.dashboard {
  background-color: lightblue;
  padding: 20px;
}
```

dashboard-responsive.css

css

```css
@media (max-width: 768px) {
  .dashboard {
    padding: 10px;
  }
}
```

Now load both files inside the component.

dashboard.component.ts

typescript

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',

  styleUrls: [
    './dashboard.component.css',
    './dashboard-responsive.css'
  ]
})
export class DashboardComponent {}
```

Both CSS files are associated with the Dashboard component.

### Method 2: Using styleUrl and styles

You can also combine an external stylesheet with internal styles.

typescript

```typescript
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',

  styleUrl: './dashboard.component.css',

  styles: `
    h1 {
      color: blue;
    }

    button {
      padding: 10px;
    }
  `
})
export class DashboardComponent {}
```

### Difference between styleUrl, styleUrls and styles

| Property | Purpose |
| --- | --- |
| `styleUrl` | Loads one external CSS file |
| `styleUrls` | Loads multiple external CSS files |
| `styles` | Defines CSS directly inside component metadata |

Angular 21 supports all three.

My recommendation: Use `styleUrl` for one stylesheet and `styleUrls` when a component genuinely needs multiple external stylesheets. Keep styles grouped logically rather than creating too many small files.

## 7. How Angular style encapsulation works

This is one of the most important Angular styling concepts.

Style encapsulation determines whether a component's CSS can affect other components.

Angular provides four encapsulation modes in Angular 21:

1. `ViewEncapsulation.Emulated`
2. `ViewEncapsulation.ShadowDom`
3. `ViewEncapsulation.None`
4. `ViewEncapsulation.ExperimentalIsolatedShadowDom`

Let's understand them.

### A. ViewEncapsulation.Emulated

Default modeAngular uses Emulated encapsulation by default.

Example:

typescript

```typescript
@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h1>Home Page</h1>
  `,
  styles: `
    h1 {
      color: red;
    }
  `
})
export class HomeComponent {}
```

Angular internally generates special attributes to scope the CSS selectors.

Conceptually, the generated HTML looks like:

HTMLWrap linesCopy codePreview

```html
<app-home _nghost-ng-c123>
  <h1 _ngcontent-ng-c123>
    Home Page
  </h1>
</app-home>
```

The generated CSS is conceptually similar to:

css

```css
h1[_ngcontent-ng-c123] {
  color: red;
}
```

The actual generated attribute names are Angular implementation details.

Result:

- Home component CSS affects its own template elements.
- It does not normally affect another component's template.
- Global CSS can still affect Home component elements.

### B. ViewEncapsulation.ShadowDom

Angular uses the browser's native Shadow DOM.

Example:

typescript

```typescript
import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h1>Home Page</h1>
  `,
  styles: `
    h1 {
      color: red;
    }
  `,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent {}
```

Angular creates a Shadow Root for the component.

How to Build a Lightweight Embeddable Widget in Vanilla JS (Under 30KB) - DEV Community

[dev.to](<https://dev.to/alex_boykov/how-to-build-a-lightweight-embeddable-widget-in-vanilla-js-under-30kb-5f4b?utm_source=chatgpt.com>)

Result:

- Component CSS stays inside its Shadow DOM.
- Internal styles do not affect outside elements.
- Ordinary global CSS does not cross into the shadow tree.
- Shadow DOM also changes how events, slots and DOM inspection work.

Use this when you need native browser-level style isolation, especially for independently reusable web components.

### C. ViewEncapsulation.None

This disables Angular's style encapsulation.

Example:

typescript

```typescript
import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h1>Home Page</h1>
  `,
  styles: `
    h1 {
      color: red;
    }
  `,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {}
```

Result:

The CSS behaves like global CSS.

For example, the `h1` rule can affect headings outside the Home component.

Be careful when using this because styles can accidentally affect other components.

### D. ViewEncapsulation.ExperimentalIsolatedShadowDom

Angular 21 also exposes an experimental encapsulation mode.

typescript

```typescript
encapsulation: ViewEncapsulation.ExperimentalIsolatedShadowDom
```

It uses Shadow DOM while preventing external global styles from leaking into the component.

This is useful for stronger isolation, but it is experimental. Avoid relying on it for production-critical functionality without evaluating its compatibility and limitations.

### Encapsulation comparison

| Mode | CSS isolation | Global styles enter? |
| --- | --- | --- |
| Emulated | Angular-emulated isolation | Yes |
| ShadowDom | Native Shadow DOM | No, ordinary global CSS |
| None | No isolation | Yes |
| ExperimentalIsolatedShadowDom | Strong isolation | No |

Angular documentation: [Angular 21 – Styling Components](<https://v21.angular.dev/guide/components/styling?utm_source=chatgpt.com>) and [ViewEncapsulation API](<https://angular.dev/api/core/ViewEncapsulation?utm_source=chatgpt.com>).

## 8. Best practices for managing styles in large Angular applications

When building enterprise-level Angular 21 applications, managing CSS properly is very important.

I recommend the following folder structure:

text

```text
src/
│
├── app/
│   │
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   └── header.component.css
│   │   │
│   │   └── sidebar/
│   │       ├── sidebar.component.ts
│   │       ├── sidebar.component.html
│   │       └── sidebar.component.css
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── login/
│   │   └── dashboard/
│   │
│   └── app.ts
│
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   │
│   ├── base/
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   │
│   ├── components/
│   │   ├── _buttons.scss
│   │   └── _forms.scss
│   │
│   ├── layout/
│   │   ├── _header.scss
│   │   └── _footer.scss
│   │
│   └── themes/
│       ├── _light.scss
│       └── _dark.scss
│
└── styles.scss
```

### Best practice 1: Keep component-specific CSS inside components

For example:

text

```text
login/
  login.component.ts
  login.component.html
  login.component.css
```

Avoid putting every component's CSS inside the global stylesheet.

### Best practice 2: Keep common styles globally

Examples:

- Fonts.
- Colors.
- Typography.
- CSS reset.
- Common utility classes.
- Theme variables.

### Best practice 3: Use CSS variables

Define common colors and dimensions in one place.

css

```css
:root {
  --primary-color: #1976d2;
  --danger-color: #f44336;
  --success-color: #4caf50;

  --spacing-small: 8px;
  --spacing-medium: 16px;
  --spacing-large: 24px;
}
```

Use them inside component CSS:

css

```css
button {
  background-color: var(--primary-color);
  padding: var(--spacing-medium);
}
```

### Best practice 4: Avoid ViewEncapsulation.None unless necessary

Prefer the default `Emulated` mode.

Use `None` only when you intentionally want component styles to become global.

### Best practice 5: Avoid excessive use of \!important

Avoid:

css

```css
h1 {
  color: red !important;
}
```

Prefer proper CSS architecture and selector specificity.

### Best practice 6: Use SCSS for larger projects

SCSS supports variables, mixins, nesting and reusable stylesheet structures.

Example:

scss

```scss
$primary-color: #1976d2;

@mixin primary-button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;
  border: none;
}

button {
  @include primary-button;
}
```

Angular supports Sass and other CSS preprocessors.

### Best practice 7: Avoid ::ng-deep

Avoid using:

css

```css
::ng-deep .some-class {
  color: red;
}
```

Angular strongly discourages new uses of `::ng-deep`.

Instead, prefer:

- Component inputs and CSS custom properties.
- A documented global stylesheet for genuinely global overrides.
- Supported styling APIs provided by third-party libraries.

### Best practice 8: Organize styles by responsibility

Don't create a single CSS file containing thousands of unrelated rules.

Separate styles into logical groups such as:

- Base.
- Layout.
- Components.
- Utilities.
- Themes.

## 9. Which styling approach should you use?

Here is a practical recommendation for Angular 21:

| Requirement | Recommended approach |
| --- | --- |
| Application-wide font | Global CSS |
| Application-wide colors | Global CSS variables |
| Login page design | Component CSS |
| Dashboard design | Component CSS |
| Common buttons | Global CSS or reusable button component |
| Dynamic text color | Angular style binding |
| Dynamic background | Angular style binding |
| Small component styles | Internal styles |
| Large component styles | External CSS/SCSS |
| Multiple global stylesheets | `angular.json` |
| Multiple component stylesheets | `styleUrls` |
| Strong native CSS isolation | ShadowDom |

## 10. Important interview questions and answers

Q1. What is the difference between global CSS and component CSS?

Global CSS can apply throughout the application, whereas component CSS is normally scoped to its component using Angular's encapsulation mechanism.

Q2. Can global CSS override component CSS?

Yes. Global CSS can affect elements inside components using Emulated encapsulation. The winning declaration depends on specificity, source order and other CSS cascade rules.

Q3. Can we use multiple CSS files in one component?

Yes. Use the `styleUrls` property.

typescript

```typescript
styleUrls: [
  './home.css',
  './responsive.css',
  './theme.css'
]
```

Q4. Can we use multiple global CSS files?

Yes. Register multiple files in the `styles` array of `angular.json`.

Q5. What is the default Angular encapsulation mode?

`ViewEncapsulation.Emulated`.

Q6. What happens when we use ViewEncapsulation.None?

Angular disables component style encapsulation. The component's CSS behaves like global CSS.

Q7. What is the difference between styleUrl and styleUrls?

- `styleUrl`: One external stylesheet.
- `styleUrls`: Multiple external stylesheets.

Q8. Are component styles loaded when a lazy-loaded component is loaded?

Yes. Angular associates component styles with the component, so they are included when the component is rendered, including lazy-loaded components.

Q9. Are global styles inherited by child components?

Global CSS selectors can match elements inside child components. However, CSS inheritance is different: properties such as `color` and `font-family` inherit naturally, while properties such as `margin` and `padding` do not.

Q10. Does component CSS automatically apply to child component templates?

No. With Emulated encapsulation, the parent's component CSS normally applies to its own template, not the internal template of its child component.

## 11. Final summary

## Angular 21 styling cheat sheet

Component styling

Local

typescript

```typescript
styleUrl: './home.css'
```

Global styling

Application-wide

json

```json
"styles": [
  "src/styles.css"
]
```

Multiple component stylesheets

typescript

```typescript
styleUrls: [
  './home.css',
  './responsive.css'
]
```

Internal styles

typescript

```typescript
styles: `
  h1 { color: red; }
`
```

Inline styles

HTMLWrap linesCopy codePreview

```html
<h1 style="color: red">Hello</h1>
```

Default encapsulation

typescript

```typescript
encapsulation: ViewEncapsulation.Emulated
```

### Official Angular 21 documentation

For further learning, these are the most useful references:

1. [Styling Components – Angular 21](<https://v21.angular.dev/guide/components/styling?utm_source=chatgpt.com>)
2. [Anatomy of Angular Components](<https://v21.angular.dev/guide/components?utm_source=chatgpt.com>)
3. [Angular Component API](<https://angular.dev/api/core/Component?utm_source=chatgpt.com>)
4. [ViewEncapsulation API](<https://angular.dev/api/core/ViewEncapsulation?utm_source=chatgpt.com>)

My recommendation: For a large Angular 21 application, use global SCSS/CSS for common design rules and component-level SCSS/CSS for individual component designs. Keep the default `ViewEncapsulation.Emulated` unless you have a specific reason to change it. This gives you a clean, reusable and maintainable styling architecture.