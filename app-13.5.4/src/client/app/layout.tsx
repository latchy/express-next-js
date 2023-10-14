/* TSX DOCUMENT */

'use strict';

import React from 'react';

export const metadata = {
    title: 'Express/Next JS',
};

interface Props {
    children: React.ReactNode;
}

export default function Layout(props: Props) {
    const { children } = props;

    return (
        <html lang="en">
            <head>
                <link rel='icon' href='/favicon.ico' />
            </head>
            <body>{children}</body>
        </html>
    );
}
