const critical = require('critical');

critical.generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: true,
  
    // Your base directory
    base: './',
  
    // HTML source file
    src: '_index.html',
  
    // Viewport width
    width: 1300,
  
    // Viewport height
    height: 900,
  
    // Output results to file
    target: {
      css: 'critical.css',
      html: 'index.html',
      uncritical: 'uncritical.css'
    },
  
    // Minify critical-path CSS when inlining
    minify: true,
  
    // Extract inlined styles from referenced stylesheets
    extract: true,
  });