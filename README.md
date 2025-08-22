<div id="top"></div>




<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://github.com/raduzoom/search-expand
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Chip Selector</h3>

  <p style="text-align: center">
    Chip selector 
    <br />
    <a href="https://github.com/raduzoom/search-expand" target="_blank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://raduzoom.github.io/search-expand/demo.html" target="_blank">View Demo ( GitHub Pages )</a>
    ·
    <a href="https://github.com/raduzoom/search-expand/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/raduzoom/search-expand/issues" target="_blank">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


**Chip selector** is a universal tool that helps you display a chip selector to your project. The chip selector has an input where you can filter out results. It can be linked to a form **&lt;input type="checkbox"&gt;** that can be manipulated in real time.


![skin-default](https://user-images.githubusercontent.com/58981243/211401746-eb089fdd-044f-4034-916c-458fb9dad221.jpg "Chip Selector")

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started
Clone the repository and install dependencies:

* npm
```sh
  git clone <repo-url>
  cd search-expand
  npm install
```
Start the development build:

* npm
```sh
  npm run dev
```
____

- Open src/demo.html in a browser to see the component in action.




## Usage
1. Initialize via the global function dzs_initDzsChipSelector or by importing the module in TypeScript.

2. Feed options through a form’s checkboxes or via the data-persistentOptions attribute on the root element.

3. Available configuration options include:

- placeholderNoItemsFound – text when filtering yields no results.

- middlewareFilterResults – custom function for filtering.

- viewSkin – choose a skin such as skin-default or skin-flat.

- inputPlaceholderText – placeholder for the filter input.

See the documentation in **README.md** and explore src/demo.html for practical examples.

## Important Files
src/search-expand/search-expand.ts – main component class.

src/search-expand/config/ – default configuration and class names.

src/search-expand/js_common/ – shared DOM utilities.

src/search-expand/jsinc/ – event listeners and initial DOM setup.

Unit tests – located alongside the source files (*.spec.ts).

## Learning Next
Examine the interface ChipSelectorOptions in src/search-expand/search-expand.type.ts for available settings.

Review the SCSS themes under src/search-expand/style/skins/ to customize the look and feel.

Explore unit tests in src/search-expand/*.spec.ts to understand expected behavior and how the component handles option updates and autocomplete filtering.

This overview should help newcomers quickly orient themselves in the codebase and know where to look for configuration, demos, and tests.
### Works With

This component has been made to be versatile, it includes both ES6 and UMD builds ( module / bundled ).

* Vanilla javascript / html via UMD embed
* [Typescript](https://www.typescriptlang.org/)
* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* * example - [Functional](https://stackblitz.com/edit/react-ts-btq4kq?file=App.tsx)
* [Angular](https://angular.io/)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Git clone this repository.

### Prerequisites

Install npm - tested with at least version 8.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/raduzoom/search-expand
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To develop -
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Projects

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>


## Code explanation

Can be used as a web component for creating a chip selector. 

Allows the chip selector to feed from multiple origins. The chip selector allows the user to select one or more options from a list of items. It can either get the options from a form element or from the "data-persistentOptions" attribute on the main element. 

The class has various methods for initializing the structure of the component, handling user input, and updating the view. The class also uses several imported functions and constants from other modules for specific tasks such as removing children from a DOM element, getting the computed style of an element, and inserting HTML. 

The class also extends the HTMLElement interface to add a webComponent property and the Window interface to add a global function "dzs_initDzsChipSelector" which can be used to initialize the component on an HTML element.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Options -->
## Options
<table class="table-for-jsDoc">
            <thead>
            <tr>
              <th><label class=" ">propName</label></th>
              <th><label class=" ">description</label></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><span class="prop-name">  placeholderNoItemsFound?:</span> <em> string</em></td>
              <td class="prop-description"> text for no items found</td>
            </tr>
            <tr>
              <td><span class="prop-name">  middlewareFilterResults?:</span> <em> any</em></td>
              <td class="prop-description"> include a middleware function like filtering the results</td>
            </tr>
            <tr>
              <td><span class="prop-name">  viewSkin?:</span> <em> string</em></td>
              <td class="prop-description"> the skin can be "skin-default", "skin-flat" - also needs css file being
                loaded
              </td>
            </tr>
            <tr>
              <td><span class="prop-name">  inputPlaceholderText?:</span> <em> string</em></td>
              <td class="prop-description"> the placeholder for Filter Results ... text</td>
            </tr>
            <tr>
              <td><span class="prop-name">  onUpdateFunction?:</span> <em> (...args: any[]) => any</em></td>
              <td class="prop-description"> custom function for onUpdate</td>
            </tr>
            <tr>
              <td><span class="prop-name">  viewIsWrapping?:</span> <em> boolean</em></td>
              <td class="prop-description"> wrap false or true</td>
            </tr>
            <tr>
              <td><span class="prop-name">  persistentOptions?:</span> <em> ChipSelectorItem[]</em></td>
              <td class="prop-description"> the persistent options</td>
            </tr>
            </tbody>
          </table>

<p align="right">(<a href="#top">back to top</a>)</p>

## Flexible Styling

The Search Expand component supports multiple flexible styling approaches to fit different use cases and design requirements.

### 🎨 Available Styling Approaches

#### 1. **Pre-built Skins** (Recommended)
The component comes with multiple pre-built skins that can be switched dynamically:

- `default` - Classic rounded design
- `flat` - Modern flat design  
- `default-dark` - Dark theme variant
- `flat-dark` - Flat design with dark theme

#### 2. **Dynamic Skin Switching**
Change skins programmatically at runtime:

```javascript
// Traditional usage
const searchExpand = initSearchExpand(element, { viewSkin: 'default' });
searchExpand.setSkin('flat'); // Switch to flat skin

// Web component usage
const component = document.querySelector('dzs-search-expand');
component.setSkin('flat-dark'); // Switch to flat dark skin
```

#### 3. **CSS Custom Properties**
Override specific design tokens using CSS variables:

```css
.my-search-container {
    --search-expand-primary-color: #e74c3c;
    --search-expand-border-radius: 20px;
    --search-expand-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
    --search-expand-background: #f8f9fa;
    --search-expand-text-color: #333;
}
```

### 🚀 Usage Patterns

#### **TypeScript/JavaScript Import**

```typescript
import { initSearchExpand, getAvailableSkins } from 'search-expand';

// Initialize with specific skin
const searchExpand = initSearchExpand(element, {
    viewSkin: 'flat',
    persistentOptions: [...]
});

// Get available skins
console.log(getAvailableSkins()); // ['default', 'flat', 'default-dark', 'flat-dark']

// Change skin dynamically
searchExpand.setSkin('default-dark');
```

#### **Web Component**

```html
<!-- HTML with data attributes -->
<dzs-search-expand 
    data-skin="flat"
    data-persistentOptions='[...]'>
</dzs-search-expand>

<script>
// JavaScript to change skin
const component = document.querySelector('dzs-search-expand');
component.setSkin('default-dark');
</script>
```

#### **UMD Module (Browser)**

```html
<script src="dist-webpack/search-expand.js"></script>
<script>
// Access via global variable
const searchExpand = SearchExpand.initSearchExpand(element, {
    viewSkin: 'flat'
});

// Change skin
searchExpand.setSkin('default-dark');
</script>
```

### 🎯 Styling Strategies

#### **Strategy 1: Skin-Based Theming**
Use pre-built skins for consistent design across your application:

```javascript
// Initialize all components with the same skin
const components = document.querySelectorAll('.search-component');
components.forEach(element => {
    initSearchExpand(element, { viewSkin: 'flat' });
});
```

#### **Strategy 2: Contextual Styling**
Use different skins based on context:

```javascript
// Light theme for main content
initSearchExpand(mainElement, { viewSkin: 'default' });

// Dark theme for sidebar
initSearchExpand(sidebarElement, { viewSkin: 'default-dark' });
```

#### **Strategy 3: Custom Branding**
Combine skins with CSS custom properties:

```css
.branded-search {
    --search-expand-primary-color: var(--brand-primary);
    --search-expand-secondary-color: var(--brand-secondary);
    --search-expand-border-radius: var(--brand-border-radius);
}
```

### 📱 Responsive Design

The component automatically adapts to different screen sizes. You can enhance this with custom breakpoints:

```css
/* Mobile-first approach */
.search-expand-mobile {
    --search-expand-width: 100%;
    --search-expand-font-size: 16px;
}

/* Tablet */
@media (min-width: 768px) {
    .search-expand-tablet {
        --search-expand-width: 300px;
        --search-expand-font-size: 14px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .search-expand-desktop {
        --search-expand-width: 400px;
        --search-expand-font-size: 16px;
    }
}
```

### 🎨 Design System Integration

#### **CSS Custom Properties Reference**

| Property | Default | Description |
|----------|---------|-------------|
| `--search-expand-primary-color` | `#007bff` | Primary brand color |
| `--search-expand-secondary-color` | `#6c757d` | Secondary color |
| `--search-expand-border-radius` | `8px` | Border radius |
| `--search-expand-shadow` | `0 2px 4px rgba(0,0,0,0.1)` | Box shadow |
| `--search-expand-background` | `#ffffff` | Background color |
| `--search-expand-text-color` | `#333333` | Text color |
| `--search-expand-border-color` | `#dee2e6` | Border color |
| `--search-expand-hover-color` | `#f8f9fa` | Hover state color |

#### **Integration with Design Systems**

```css
/* Tailwind CSS */
.search-expand-tailwind {
    --search-expand-primary-color: theme('colors.blue.500');
    --search-expand-border-radius: theme('borderRadius.lg');
    --search-expand-shadow: theme('boxShadow.lg');
}

/* Material Design */
.search-expand-material {
    --search-expand-primary-color: #2196f3;
    --search-expand-border-radius: 4px;
    --search-expand-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

/* Bootstrap */
.search-expand-bootstrap {
    --search-expand-primary-color: var(--bs-primary);
    --search-expand-border-radius: var(--bs-border-radius);
    --search-expand-shadow: var(--bs-box-shadow);
}
```

### 🔍 Best Practices

1. **Consistency**: Use the same skin across related components
2. **Performance**: Pre-load skins if switching frequently
3. **Accessibility**: Ensure sufficient color contrast
4. **Testing**: Test all skins across different devices and browsers
5. **Documentation**: Document custom skins and their use cases

### 🚀 Getting Started with Styling

1. **Choose your usage pattern** (TypeScript, Web Component, or UMD)
2. **Select a base skin** (default, flat, or dark variants)
3. **Customize with CSS variables** if needed
4. **Test across different contexts** and screen sizes
5. **Document your styling decisions** for your team

For more detailed styling information, see [FLEXIBLE_STYLING.md](FLEXIBLE_STYLING.md).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [] Add Additional Templates w/ Examples

See the [open issues](https://github.com/raduzoom/search-expand/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Dev


| <div style="width:80px">ID</div> | Description                                   |
|----------------------------------|-----------------------------------------------|
| dist                             | Rollup outputs here umd files, es files etc.. |
| dist-webpack                     | For development, only umd files               |


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@ZoomItFlash](https://twitter.com/ZoomItFlash) - email@example.com

Project Link: [https://github.com/raduzoom/search-expand#readme](https://github.com/raduzoom/search-expand#readme)

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/raduzoom/search-expand.svg?style=for-the-badge
[contributors-url]: https://github.com/raduzoom/search-expand/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/raduzoom/search-expand.svg?style=for-the-badge
[forks-url]: https://github.com/raduzoom/search-expand/network/members
[stars-shield]: https://img.shields.io/github/stars/raduzoom/search-expand.svg?style=for-the-badge
[stars-url]: https://github.com/raduzoom/search-expand/stargazers
[issues-shield]: https://img.shields.io/github/issues/raduzoom/search-expand.svg?style=for-the-badge
[issues-url]: https://github.com/raduzoom/search-expand/issues
[license-shield]: https://img.shields.io/github/license/raduzoom/search-expand.svg?style=for-the-badge
[license-url]: https://github.com/raduzoom/search-expand/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/radu-hulubas-809404222/
[product-screenshot]: images/screenshot.png
