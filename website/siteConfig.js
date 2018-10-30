
// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'imfly',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/logo.png'.
    image: '/img/logo.png',
    infoLink: 'https://ddn.link',
    pinned: true,
  },
];

const siteConfig = {
  title: 'DDN' /* title for your website */,
  tagline: 'API',
  url: 'https://ddn.link' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  editUrl: 'http://git.ebookchain.net/ddn/ddn-docs/edit/master/docs/',

  // Used for publishing and more
  projectName: 'ddn-docs',
  organizationName: 'ddn',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'ddn-install', label: 'Docs'},
    // {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
    { languages: true },
    { search: true }
  ],
  disableHeaderTitle: true,

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo.png',
  footerIcon: 'img/logo.png',
  favicon: 'img/logo.png',

  /* colors for website */
  colors: {
    primaryColor: "white",
    secondaryColor: "#044a84"
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' ddn.link',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'solarized-dark',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-blocks-buttons.js',
  ],
  // stylesheets: ['/css/code-blocks-buttons.css'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  // ogImage: 'img/docusaurus.png',
  // twitterImage: 'img/docusaurus.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },

  // algolia: {
  //   apiKey: '406f131c39cbabe457df08cfcd102997',
  //   indexName: 'ddnlink',
  //   algoliaOptions: {} // Optional, if provided by Algolia
  // },

  cleanUrl: true
};

module.exports = siteConfig;
