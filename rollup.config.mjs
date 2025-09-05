import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

export default [
  // ES Modules
  {
    input: 'src/dzs-search-expand/dzs-search-expand.ts',
    output: {
      file: 'dist/index.js', format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.prod.json',
        sourceMap: false,
        compilerOptions: {
          declaration: true,
          "declarationDir": "./types",    // all .d.ts files go here
        }
      }),
      babel({babelHelpers: 'bundled', extensions: ['.ts']}),
      copy({
        targets: [
          { src: 'src/dzs-search-expand/style/skins', dest: 'dist/style' },
          { src: 'src/dzs-search-expand/style/skins', dest: 'dist/dzs-search-expand/style' },
          { src: ['src/style/table-for-jsDoc.css', 'src/style/bootstrap.min.css'], dest: 'dist/style' },
        ]}),
      terser(),
    ],
  },
  // ES Modules
  {
    input: 'src/dzs-search-expand/dzs-search-expand.ts',
    output: {
      // dir: 'dist/dev',
      file: 'dist/index-dev.js',
      format: 'es',
      sourcemap: true,
      // preserveModules: true,
      // preserveModulesRoot: 'src',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.dev.json',
        sourceMap: false,
        compilerOptions: {
          declaration: true,
          declarationDir: '.'
        }
      }),
      // -- sourcemaps
      babel({babelHelpers: 'bundled', extensions: ['.ts']}),
    ],
  },
  // ES Modules
  {
    input: 'src/dzs-search-expand/dzs-search-expand--web-components.ts',
    output: {
      file: 'dist/dzsSearchExpandWebComponents.js', format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.prod.json',
        sourceMap: false,
      }),
      babel({babelHelpers: 'bundled', extensions: ['.ts']}),
      terser(),
      postcss({
        plugins: []
      })
    ],
  },
  // ES Modules
  {
    input: 'src/dzs-search-expand/dzs-search-expand--web-components.ts',
    output: {
      file: 'dist/dzsSearchExpandWebComponents-dev.js', format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.prod.json',
        sourceMap: false,
      }),
      babel({babelHelpers: 'bundled', extensions: ['.ts']}),
      postcss({
        plugins: []
      })
    ],
  },

  // Styles extraction: compile SCSS to plain CSS in dist/
  {
    input: 'src/dzs-search-expand/styles-entry.js',
    output: {
      file: 'dist/dzs-search-expand.styles.js',
      format: 'es',
    },
    plugins: [
      postcss({
        extract: 'dzs-search-expand.css',
        sourceMap: false,
        minimize: true,
        extensions: ['.scss'],
        use: {
          sass: {
            includePaths: ['src/dzs-search-expand']
          }
        }
      })
    ]
  },

  // UMD
  {
    input: 'src/dzs-search-expand/dzs-search-expand.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'dzsSearchExpand',
      indent: false,
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.prod.json',
        sourceMap: false,
      }),
      babel({babelHelpers: 'bundled', extensions: ['.ts'], exclude: 'node_modules/**'}),
      terser(),
    ],
  },
]