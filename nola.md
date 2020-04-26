## Plugin installation guide
##### installation
 1、 px转rem 自动转换
 
```
npm install postcss-pxtorem --save-dev
npm install postcss-import --save-dev
npm install postcss-url --save-dev
    
```

2、 可伸缩方案布局(详见配置项文件.postcssrc.js)

```npm i -S amfe-flexible```

3、 国际化i18n

```npm install --save vue-i18n```

4、jest(es6->es5)

```
npm install babel-jest --save-dev
```
> .babelrc 
```
"env": {
     "test": {
       "presets": ["env", "stage-2"] // 采用babel-presents-env来转译
     }
   }
```
或
```
"env": {
  "test": {
    "plugins": ["transform-es2015-modules-commonjs"] // 采用plugins来讲ES modules转译成Commonjs modules
  }
}
```

