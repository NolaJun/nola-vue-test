module.exports={
    "presets": [
        ["env", { "modules": false }],
        // 'stage-2' // npm install --save-dev babel-preset-stage-2
    ],
    "plugins": [
        // "transform-runtime"
        "@babel/plugin-transform-runtime",
        ["import", {"libraryName": "vant", "style":true}]
    ],
    "comments": false,
    "env": {
        "test": {
            "plugins": ["transform-es2015-modules-commonjs"], // 采用plugins来讲ES modules转译成Commonjs modules
            // "presets": [ // npm install --save-dev babel-preset-env
            //     ["env", { "targets": { "node": "current" }}] // 增加或修改
            // ]
        }
    }
}
