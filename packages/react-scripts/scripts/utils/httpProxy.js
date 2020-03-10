module.exports.s3 = {
  route: '/proxy/s3-slang-production',
  config: {
    target: 'http://slang-production.s3.amazonaws.com',
    pathRewrite: {
      ['^/proxy/s3-slang-production/' +
      '(https?://slang-production.s3.amazonaws.com|' +
      'https?://s3.amazonaws.com/slang-production)']: '',
    },
    changeOrigin: true,
  },
};

module.exports.cdn = {
  route: '/proxy/cdn-slangapp-com',
  config: {
    target: 'http://cdn.slangapp.com',
    pathRewrite: {
      ['^/proxy/cdn-slangapp-com/' +
      '(https?://cdn.slangapp.com|' +
      'https?://s3.amazonaws.com/cdn.slangapp.com)']: '',
    },
    changeOrigin: true,
  },
};
