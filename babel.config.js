module.exports = {
  assumptions: {
    privateFieldsAsProperties: true,
    setPublicClassFields: true,
  },
  presets: [
    [
      'next/babel',
      {
        'class-properties': {},
      },
    ],
  ],
  plugins: [
    [ '@babel/plugin-proposal-export-default-from' ],
    [ '@babel/plugin-proposal-private-methods' ],
    [
      'module-resolver',
      {
        root: [ './src' ],
      },
    ],
  ],
};
