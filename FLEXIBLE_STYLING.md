# Search Expand Component - Flexible Styling Guide

The Search Expand component supports multiple flexible styling approaches to fit different use cases and design requirements.

## 🎨 Available Styling Approaches

### 1. **Pre-built Skins** (Recommended)
The component comes with multiple pre-built skins that can be switched dynamically:

- `default` - Classic rounded design
- `flat` - Modern flat design  
- `default-dark` - Dark theme variant
- `flat-dark` - Flat design with dark theme

### 2. **Dynamic Skin Switching**
Change skins programmatically at runtime:

```javascript
// Traditional usage
const searchExpand = initSearchExpand(element, { viewSkin: 'default' });
searchExpand.setSkin('flat'); // Switch to flat skin

// Web component usage
const component = document.querySelector('dzs-search-expand');
component.setSkin('flat-dark'); // Switch to flat dark skin
```

### 3. **CSS Custom Properties**
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

### 4. **Custom CSS Classes**
Apply your own CSS classes for complete customization:

```css
.my-custom-search {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 25px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}
```

## 🚀 Usage Patterns

### **TypeScript/JavaScript Import**

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

### **Web Component**

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

### **UMD Module (Browser)**

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

## 🎯 Styling Strategies

### **Strategy 1: Skin-Based Theming**
Use pre-built skins for consistent design across your application:

```javascript
// Initialize all components with the same skin
const components = document.querySelectorAll('.search-component');
components.forEach(element => {
    initSearchExpand(element, { viewSkin: 'flat' });
});
```

### **Strategy 2: Contextual Styling**
Use different skins based on context:

```javascript
// Light theme for main content
initSearchExpand(mainElement, { viewSkin: 'default' });

// Dark theme for sidebar
initSearchExpand(sidebarElement, { viewSkin: 'default-dark' });
```

### **Strategy 3: Custom Branding**
Combine skins with CSS custom properties:

```css
.branded-search {
    --search-expand-primary-color: var(--brand-primary);
    --search-expand-secondary-color: var(--brand-secondary);
    --search-expand-border-radius: var(--brand-border-radius);
}
```

### **Strategy 4: Responsive Styling**
Adapt skins based on screen size:

```javascript
function initResponsiveSearch(element) {
    const isMobile = window.innerWidth < 768;
    const skin = isMobile ? 'flat' : 'default';
    
    return initSearchExpand(element, { viewSkin: skin });
}

// Listen for resize events
window.addEventListener('resize', () => {
    // Reinitialize with appropriate skin
});
```

## 🔧 Advanced Customization

### **Creating Custom Skins**

1. Create a new SCSS file in `src/dzs-search-expand/style/skins/`
2. Import it in the skin registry
3. Use the new skin name

```scss
// skin-custom.scss
.dzs-search-expand {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    
    &__input {
        color: white;
        &::placeholder {
            color: rgba(255,255,255,0.7);
        }
    }
}
```

### **Theme Switching**

```javascript
// Theme switching utility
class SearchExpandThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.components = new Set();
    }
    
    register(component) {
        this.components.add(component);
        this.applyTheme(component);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.components.forEach(component => {
            this.applyTheme(component);
        });
    }
    
    applyTheme(component) {
        const skin = this.currentTheme === 'dark' ? 'default-dark' : 'default';
        component.setSkin(skin);
    }
}

const themeManager = new SearchExpandThemeManager();
```

## 📱 Responsive Design

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

## 🎨 Design System Integration

### **CSS Custom Properties Reference**

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

### **Integration with Design Systems**

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

## 🔍 Best Practices

1. **Consistency**: Use the same skin across related components
2. **Performance**: Pre-load skins if switching frequently
3. **Accessibility**: Ensure sufficient color contrast
4. **Testing**: Test all skins across different devices and browsers
5. **Documentation**: Document custom skins and their use cases

## 🚀 Getting Started

1. **Choose your usage pattern** (TypeScript, Web Component, or UMD)
2. **Select a base skin** (default, flat, or dark variants)
3. **Customize with CSS variables** if needed
4. **Test across different contexts** and screen sizes
5. **Document your styling decisions** for your team

The Search Expand component provides maximum flexibility while maintaining consistency and performance. Choose the approach that best fits your project's needs!
