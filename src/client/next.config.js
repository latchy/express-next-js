/* JS DOCUMENT */

'use strict';

/**
 * @type {import('next').NextConfig}
 **/
const next_config = {
    distDir: '../../.next',
    useFileSystemPublicRoutes: false,
    poweredByHeader: false,
    reactStrictMode: true,
    trailingSlash: false,
    swcMinify: true,
    compress: true,
};

module.exports = { ...next_config };
