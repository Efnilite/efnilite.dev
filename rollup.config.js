import json from '@rollup/plugin-json';
import pkg from 'package.json';

export default {
    input: 'js/general.js',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [
        json({
            compact: true
        })
    ]
};