import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import ignoreImport from 'rollup-plugin-ignore-import';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default [{
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true
        },
        {
            file: "dist/index.es.js",
            format: "esm",
            sourcemap: true
        }
    ],
    external: ["react", "react-dom"],
    plugins: [
        resolve({ extensions: ['.js','.jsx', '.ts', '.tsx']}), 
        commonjs(), 
        postcss({ extensions: ['.css', '.scss'], extract: false, modules: false, minimize: true, use: ['sass']}),
        typescript({ tsconfig: './tsconfig.json'})
    ]
},  {
    input: 'src/index.ts',
    output: {
        file: packageJson.types,
        format: 'es'
    },
    plugins: [
        ignoreImport({extensions: ['.scss', '.css']}),
        dts()
    ]
}];