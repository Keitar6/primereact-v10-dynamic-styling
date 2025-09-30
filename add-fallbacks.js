const fs = require('fs');
const path = require('path');

// Map of CSS variables to their fallback values
const fallbackMap = {
  // Colors - Surface palette
  '--test-example-surface-0': '#ffffff',
  '--test-example-surface-50': '#f7f8f9',
  '--test-example-surface-100': '#dadee3',
  '--test-example-button-raised-shadow':
    '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  '--test-example-button-rounded-border-radius': '2rem',
  '--test-example-button-badge-size': '1rem',

  // Button focus ring
  '--test-example-button-focus-ring-width': '1px',
  '--test-example-button-focus-ring-style': 'solid',
  '--test-example-button-focus-ring-offset': '2px',

  // Button Success variants
  '--test-example-button-success-background': '#22c55e',
  '--test-example-button-success-border-color': '#22c55e',
  '--test-example-button-success-color': '#ffffff',
  '--test-example-button-success-hover-background': '#16a34a',
  '--test-example-button-success-hover-border-color': '#16a34a',
  '--test-example-button-success-hover-color': '#ffffff',
  '--test-example-button-success-active-background': '#15803d',
  '--test-example-button-success-active-border-color': '#15803d',
  '--test-example-button-success-active-color': '#ffffff',
  '--test-example-button-success-focus-ring-color': '#22c55e',
  '--test-example-button-success-focus-ring-shadow': 'none',

  // Button Info variants
  '--test-example-button-info-background': '#0ea5e9',
  '--test-example-button-info-border-color': '#0ea5e9',
  '--test-example-button-info-color': '#ffffff',
  '--test-example-button-info-hover-background': '#0284c7',
  '--test-example-button-info-hover-border-color': '#0284c7',
  '--test-example-button-info-hover-color': '#ffffff',
  '--test-example-button-info-active-background': '#0369a1',
  '--test-example-button-info-active-border-color': '#0369a1',
  '--test-example-button-info-active-color': '#ffffff',
  '--test-example-button-info-focus-ring-color': '#0ea5e9',
  '--test-example-button-info-focus-ring-shadow': 'none',

  // Button Warning variants
  '--test-example-button-warn-background': '#f97316',
  '--test-example-button-warn-border-color': '#f97316',
  '--test-example-button-warn-color': '#ffffff',
  '--test-example-button-warn-hover-background': '#ea580c',
  '--test-example-button-warn-hover-border-color': '#ea580c',
  '--test-example-button-warn-hover-color': '#ffffff',
  '--test-example-button-warn-active-background': '#c2410c',
  '--test-example-button-warn-active-border-color': '#c2410c',
  '--test-example-button-warn-active-color': '#ffffff',
  '--test-example-button-warn-focus-ring-color': '#f97316',
  '--test-example-button-warn-focus-ring-shadow': 'none',

  // Button Help variants
  '--test-example-button-help-background': '#a855f7',
  '--test-example-button-help-border-color': '#a855f7',
  '--test-example-button-help-color': '#ffffff',
  '--test-example-button-help-hover-background': '#9333ea',
  '--test-example-button-help-hover-border-color': '#9333ea',
  '--test-example-button-help-hover-color': '#ffffff',
  '--test-example-button-help-active-background': '#7e22ce',
  '--test-example-button-help-active-border-color': '#7e22ce',
  '--test-example-button-help-active-color': '#ffffff',
  '--test-example-button-help-focus-ring-color': '#a855f7',
  '--test-example-button-help-focus-ring-shadow': 'none',

  // Button Danger variants
  '--test-example-button-danger-background': '#ef4444',
  '--test-example-button-danger-border-color': '#ef4444',
  '--test-example-button-danger-color': '#ffffff',
  '--test-example-button-danger-hover-background': '#dc2626',
  '--test-example-button-danger-hover-border-color': '#dc2626',
  '--test-example-button-danger-hover-color': '#ffffff',
  '--test-example-button-danger-active-background': '#b91c1c',
  '--test-example-button-danger-active-border-color': '#b91c1c',
  '--test-example-button-danger-active-color': '#ffffff',
  '--test-example-button-danger-focus-ring-color': '#ef4444',
  '--test-example-button-danger-focus-ring-shadow': 'none',

  // Button Contrast variants
  '--test-example-button-contrast-background': '#191d23',
  '--test-example-button-contrast-border-color': '#191d23',
  '--test-example-button-contrast-color': '#ffffff',
  '--test-example-button-contrast-hover-background': '#282e38',
  '--test-example-button-contrast-hover-border-color': '#282e38',
  '--test-example-button-contrast-hover-color': '#ffffff',
  '--test-example-button-contrast-active-background': '#37404c',
  '--test-example-button-contrast-active-border-color': '#37404c',
  '--test-example-button-contrast-active-color': '#ffffff',
  '--test-example-button-contrast-focus-ring-color': '#191d23',
  '--test-example-button-contrast-focus-ring-shadow': 'none',
  '--test-example-surface-200': '#bcc3cd',
  '--test-example-surface-300': '#9fa9b7',
  '--test-example-surface-400': '#818ea1',
  '--test-example-surface-500': '#64748b',
  '--test-example-surface-600': '#556376',
  '--test-example-surface-700': '#465161',
  '--test-example-surface-800': '#37404c',
  '--test-example-surface-900': '#282e38',
  '--test-example-surface-950': '#191d23',

  // Primary colors
  '--test-example-primary-50': '#f9ffff',
  '--test-example-primary-100': '#eaffff',
  '--test-example-primary-200': '#bde1f5',
  '--test-example-primary-300': '#89adc1',
  '--test-example-primary-400': '#3b5f73',
  '--test-example-primary-500': '#274b5f',
  '--test-example-primary-600': '#0e3246',
  '--test-example-primary-700': '#000a1e',
  '--test-example-primary-800': '#00000f',
  '--test-example-primary-900': '#000000',
  '--test-example-primary-950': '#000000',
  '--test-example-primary-color': '#274b5f',
  '--test-example-primary-contrast-color': '#ffffff',
  '--test-example-primary-hover-color': '#ad1457',
  '--test-example-primary-active-color': 'rgba(39, 75, 95, 0.68)',

  // Text colors
  '--test-example-text-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-text-hover-color': '#262626',
  '--test-example-text-muted-color': '#64748b',
  '--test-example-text-hover-muted-color': '#556376',

  // OneCX variables
  '--test-example-onecx-content-bg-color': '#ffffff',
  '--test-example-onecx-hover-bg-color': '#ad1457',
  '--test-example-onecx-text-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-onecx-text-secondary-color': '#262626',
  '--test-example-onecx-button-hover-bg': '#ad1457',
  '--test-example-onecx-button-active-bg': 'rgba(39, 75, 95, 0.68)',
  '--test-example-onecx-error-color': '#b00020',

  // Dimensions and layout
  '--test-example-border-radius-md': '6px',
  '--test-example-border-radius-sm': '4px',
  '--test-example-transition-duration': '0.2s',
  '--test-example-scrollbar-width': '17px',

  // Focus ring
  '--test-example-focus-ring-width': '1px',
  '--test-example-focus-ring-style': 'solid',
  '--test-example-focus-ring-color': '#274b5f',
  '--test-example-focus-ring-offset': '2px',
  '--test-example-focus-ring-shadow': 'none',

  // Form field dimensions
  '--test-example-form-field-padding-x': '0.75rem',
  '--test-example-form-field-padding-y': '0.75rem',

  // Highlight colors
  '--test-example-highlight-background': '#bde1f5',
  '--test-example-highlight-focus-background': '#89adc1',
  '--test-example-highlight-color': '#274b5f',
  '--test-example-highlight-focus-color': 'rgba(0, 0, 0, 0.87)',

  // Zinc colors (for dark theme)
  '--test-example-zinc-50': '#fafafa',
  '--test-example-zinc-100': '#f4f4f5',
  '--test-example-zinc-200': '#e4e4e7',
  '--test-example-zinc-300': '#d4d4d8',
  '--test-example-zinc-400': '#a1a1aa',
  '--test-example-zinc-500': '#71717a',
  '--test-example-zinc-600': '#52525b',
  '--test-example-zinc-700': '#3f3f46',
  '--test-example-zinc-800': '#27272a',
  '--test-example-zinc-900': '#18181b',
  '--test-example-zinc-950': '#09090b',

  // Color palette - Red
  '--test-example-red-50': '#fef2f2',
  '--test-example-red-100': '#fee2e2',
  '--test-example-red-200': '#fecaca',
  '--test-example-red-300': '#fca5a5',
  '--test-example-red-400': '#f87171',
  '--test-example-red-500': '#ef4444',
  '--test-example-red-600': '#dc2626',
  '--test-example-red-700': '#b91c1c',
  '--test-example-red-800': '#991b1b',
  '--test-example-red-900': '#7f1d1d',
  '--test-example-red-950': '#450a0a',

  // Color palette - Orange
  '--test-example-orange-50': '#fff7ed',
  '--test-example-orange-100': '#ffedd5',
  '--test-example-orange-200': '#fed7aa',
  '--test-example-orange-300': '#fdba74',
  '--test-example-orange-400': '#fb923c',
  '--test-example-orange-500': '#f97316',
  '--test-example-orange-600': '#ea580c',
  '--test-example-orange-700': '#c2410c',
  '--test-example-orange-800': '#9a3412',
  '--test-example-orange-900': '#7c2d12',
  '--test-example-orange-950': '#431407',

  // Color palette - Purple
  '--test-example-purple-50': '#faf5ff',
  '--test-example-purple-100': '#f3e8ff',
  '--test-example-purple-200': '#e9d5ff',
  '--test-example-purple-300': '#d8b4fe',
  '--test-example-purple-400': '#c084fc',
  '--test-example-purple-500': '#a855f7',
  '--test-example-purple-600': '#9333ea',
  '--test-example-purple-700': '#7e22ce',
  '--test-example-purple-800': '#6b21a8',
  '--test-example-purple-900': '#581c87',
  '--test-example-purple-950': '#3b0764',

  // Color palette - Green
  '--test-example-green-50': '#f0fdf4',
  '--test-example-green-100': '#dcfce7',
  '--test-example-green-200': '#bbf7d0',
  '--test-example-green-300': '#86efac',
  '--test-example-green-400': '#4ade80',
  '--test-example-green-500': '#22c55e',
  '--test-example-green-600': '#16a34a',
  '--test-example-green-700': '#15803d',
  '--test-example-green-800': '#166534',
  '--test-example-green-900': '#14532d',
  '--test-example-green-950': '#052e16',

  // Color palette - Sky/Blue
  '--test-example-sky-50': '#f0f9ff',
  '--test-example-sky-100': '#e0f2fe',
  '--test-example-sky-200': '#bae6fd',
  '--test-example-sky-300': '#7dd3fc',
  '--test-example-sky-400': '#38bdf8',
  '--test-example-sky-500': '#0ea5e9',
  '--test-example-sky-600': '#0284c7',
  '--test-example-sky-700': '#0369a1',
  '--test-example-sky-800': '#075985',
  '--test-example-sky-900': '#0c4a6e',
  '--test-example-sky-950': '#082f49',

  // Content and overlay
  '--test-example-content-background': '#ffffff',
  '--test-example-content-hover-background': '#ad1457',
  '--test-example-content-border-color': '#dadee3',
  '--test-example-content-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-content-hover-color': '#262626',

  // Form fields
  '--test-example-form-field-background': '#ffffff',
  '--test-example-form-field-disabled-background': '#dadee3',
  '--test-example-form-field-filled-background': '#f7f8f9',
  '--test-example-form-field-filled-hover-background': '#f7f8f9',
  '--test-example-form-field-filled-focus-background': '#f7f8f9',
  '--test-example-form-field-border-color': '#bcc3cd',
  '--test-example-form-field-hover-border-color': '#818ea1',
  '--test-example-form-field-focus-border-color': '#274b5f',
  '--test-example-form-field-invalid-border-color': '#b00020',
  '--test-example-form-field-color': '#465161',
  '--test-example-form-field-disabled-color': '#818ea1',
  '--test-example-form-field-placeholder-color': '#64748b',
  '--test-example-form-field-invalid-placeholder-color': '#b00020',
  '--test-example-form-field-float-label-color': '#64748b',
  '--test-example-form-field-float-label-focus-color': '#274b5f',
  '--test-example-form-field-float-label-active-color': '#64748b',
  '--test-example-form-field-float-label-invalid-color': '#b00020',
  '--test-example-form-field-icon-color': '#818ea1',

  // Mask and overlays
  '--test-example-mask-background': 'rgba(0, 0, 0, 0.32)',
  '--test-example-mask-color': '#bcc3cd',

  // Overlay components
  '--test-example-overlay-modal-background': '#ffffff',
  '--test-example-overlay-modal-border-color': '#bcc3cd',
  '--test-example-overlay-modal-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-overlay-popover-background': '#ffffff',
  '--test-example-overlay-popover-border-color': '#bcc3cd',
  '--test-example-overlay-popover-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-overlay-select-background': '#ffffff',
  '--test-example-overlay-select-border-color': '#bcc3cd',
  '--test-example-overlay-select-color': 'rgba(0, 0, 0, 0.87)',

  // Navigation
  '--test-example-navigation-submenu-icon-color': '#818ea1',
  '--test-example-navigation-submenu-icon-focus-color': '#64748b',
  '--test-example-navigation-submenu-icon-active-color': '#64748b',
  '--test-example-navigation-submenu-label-color': '#64748b',
  '--test-example-navigation-item-focus-background': '#dadee3',
  '--test-example-navigation-item-active-background': '#dadee3',
  '--test-example-navigation-item-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-navigation-item-focus-color': '#262626',
  '--test-example-navigation-item-active-color': '#262626',
  '--test-example-navigation-item-icon-color': '#818ea1',
  '--test-example-navigation-item-icon-focus-color': '#64748b',
  '--test-example-navigation-item-icon-active-color': '#64748b',

  // List options
  '--test-example-list-option-group-background': '#ffffff',
  '--test-example-list-option-group-color': '#64748b',
  '--test-example-list-option-focus-background': '#dadee3',
  '--test-example-list-option-selected-background': '#bde1f5',
  '--test-example-list-option-selected-focus-background': '#89adc1',
  '--test-example-list-option-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-list-option-focus-color': '#262626',
  '--test-example-list-option-selected-color': '#274b5f',
  '--test-example-list-option-selected-focus-color': 'rgba(0, 0, 0, 0.87)',
  '--test-example-list-option-option-selected-color': '#274b5f',
  '--test-example-list-option-option-selected-focus-color': '#274b5f',
  '--test-example-list-option-icon-color': '#818ea1',
  '--test-example-list-option-icon-focus-color': '#64748b',

  // Button variables
  '--test-example-button-primary-color': '#ffffff',
  '--test-example-button-primary-background': '#274b5f',
  '--test-example-button-primary-border-color': '#274b5f',
  '--test-example-button-primary-hover-background': '#ad1457',
  '--test-example-button-primary-hover-border-color': '#ad1457',
  '--test-example-button-primary-hover-color': '#ffffff',
  '--test-example-button-primary-active-background': 'rgba(39, 75, 95, 0.68)',
  '--test-example-button-primary-active-border-color': 'rgba(39, 75, 95, 0.68)',
  '--test-example-button-primary-active-color': '#ffffff',
  '--test-example-button-primary-focus-ring-color': '#274b5f',
  '--test-example-button-primary-focus-ring-shadow': 'none',

  // Button sizing and layout
  '--test-example-button-padding-x': '0.75rem',
  '--test-example-button-padding-y': '0.643rem',
  '--test-example-button-border-radius': '6px',
  '--test-example-button-gap': '0.5rem',
  '--test-example-button-transition-duration': '0.2s',
  '--test-example-button-icon-only-width': '2.5rem',
  '--test-example-button-sm-font-size': '0.875rem',
  '--test-example-button-sm-padding-x': '0.625rem',
  '--test-example-button-sm-padding-y': '0.625rem',
  '--test-example-button-sm-icon-only-width': '2rem',
  '--test-example-button-lg-font-size': '1.125rem',
  '--test-example-button-lg-padding-x': '0.875rem',
  '--test-example-button-lg-padding-y': '0.875rem',
  '--test-example-button-lg-icon-only-width': '3rem',

  // Icon and general sizing
  '--test-example-disabled-opacity': '0.6',
  '--test-example-icon-size': '1rem',

  // Mask transition
  '--test-example-mask-transition-duration': '0.15s',

  // Button label
  '--test-example-button-label-font-weight': '500',

  // Additional button states that might be missing
  '--test-example-button-secondary-background': '#dadee3',
  '--test-example-button-secondary-border-color': '#dadee3',
  '--test-example-button-secondary-color': '#556376',
  '--test-example-button-secondary-hover-background': '#bcc3cd',
  '--test-example-button-secondary-hover-border-color': '#bcc3cd',
  '--test-example-button-secondary-hover-color': '#465161',
  '--test-example-button-secondary-active-background': '#9fa9b7',
  '--test-example-button-secondary-active-border-color': '#9fa9b7',
  '--test-example-button-secondary-active-color': '#37404c',
  '--test-example-button-secondary-focus-ring-color': '#556376',
  '--test-example-button-secondary-focus-ring-shadow': 'none',

  // Additional variables that might be missing
  '--test-example-button-raised-shadow':
    '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  '--test-example-button-rounded-border-radius': '2rem',
  '--test-example-button-badge-size': '1rem',
};

function addFallbacksToFile(filePath) {
  console.log(`Processing ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let changesCount = 0;

  // Handle single-line var() calls without fallbacks
  const singleLineVarRegex = /var\((--test-example-[^,)]+)\)(?!\s*,)/g;

  content = content.replace(singleLineVarRegex, (match, varName) => {
    if (fallbackMap[varName]) {
      modified = true;
      changesCount++;
      console.log(`Adding fallback for ${varName}: ${fallbackMap[varName]}`);
      return `var(${varName}, ${fallbackMap[varName]})`;
    }
    console.warn(`No fallback defined for ${varName}`);
    return match;
  });

  // Handle multiline var() calls without fallbacks (like the ones with line breaks)
  const multiLineVarRegex = /var\(\s*(--test-example-[^,)]+)\s*\)(?!\s*,)/g;

  content = content.replace(multiLineVarRegex, (match, varName) => {
    const cleanVarName = varName.trim();
    if (fallbackMap[cleanVarName]) {
      modified = true;
      changesCount++;
      console.log(
        `Adding fallback for ${cleanVarName}: ${fallbackMap[cleanVarName]}`,
      );
      return `var(${cleanVarName}, ${fallbackMap[cleanVarName]})`;
    }
    console.warn(`No fallback defined for ${cleanVarName}`);
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath} - Made ${changesCount} changes`);
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`);
  }

  return { modified, changesCount };
}

// Process the SCSS file
const scssFile = path.join(__dirname, 'src/styles/prime-base-theme.scss');

console.log('🚀 Starting fallback addition process...\n');

try {
  const result = addFallbacksToFile(scssFile);

  if (result.modified) {
    console.log(`\n🎉 Successfully processed ${scssFile}`);
    console.log(`📊 Total changes made: ${result.changesCount}`);
    console.log(`\n✨ All CSS custom properties now have fallback values!`);
  } else {
    console.log(`\n✅ File already up to date - no changes needed.`);
  }
} catch (error) {
  console.error(`\n❌ Error processing file: ${error.message}`);
  process.exit(1);
}

console.log('\n🏁 Done!');
