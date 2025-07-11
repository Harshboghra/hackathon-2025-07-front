const { PurgeCSS } = require('purgecss');
const fs = require('fs');
const purgeCSSConfig = {
    css: ["./src/layout/_theme_override.css"],
    content: ["./src/**/*.{ts,tsx}"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: {
      deep: [/custom-item-table$/, /^p-/, /delete_icon$/, /h-100$/],
    },
    rejected: true,
};

// Function to run PurgeCSS
async function runPurgeCSS() {
  try {
    const purgeCSSResults = await new PurgeCSS().purge(purgeCSSConfig);
    // Collect rejected selectors from the results
    const rejectedSelectors = purgeCSSResults.flatMap((result) =>
      result.rejected || []
    );

    if (rejectedSelectors.length > 0) {
      console.error(
        '\x1b[31m%s\x1b[0m',
        'Error: Some CSS selectors were rejected:',
      );
      console.error('\x1b[31m%s\x1b[0m', rejectedSelectors.join('\n'));
      process.exit(1); // Exit with a non-zero code to indicate an error
    } else {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'All okay: No CSS selectors were rejected.',
      );
      process.exit(0); // Exit with a zero code to indicate success
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error running PurgeCSS:', error.message);
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
}

// Execute PurgeCSS
runPurgeCSS();
