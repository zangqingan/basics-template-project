# basics-template-project

最基础的项目：只有eslint、Git 提交规范化。默认js。

# 一、Eslint

## 1.1 安装eslint

```bash
pnpm create @eslint/config@latest

How would you like to use ESLint?（您希望如何使用 ESLint）

To check syntax only（只检查语法）
To check syntax and find problems（检查语法并发现问题）√

What type of modules does your project use?（你的项目使用什么类型的模块？）

JavaScript modules (import/export) （JavaScript模块（导入/导出）√
CommonJS (require/exports) （CommonJS(需要/出口) ）
None of these （这些都不是）

Which framework does your project use?（您的项目使用哪个框架？）

React
Vue.js
None of these √（这些都不是）

Does your project use TypeScript?（你的项目使用TypeScript吗？）

No  √
Yes

Where does your code run?（你的代码在哪里运行？）

Browser (浏览器) √
Node

Would you like to install them now?（您现在要安装它们吗？）

No
Yes √

Which package manager do you want to use？（您想使用哪个包管理器）

npm
yarn
pnpm √
bun


```

它会安装一些依赖、如果是知道前端框架或者使用ts可以直接选也可以后期添加所需要依赖配置。

```json
  "devDependencies": {
    "@eslint/js": "^9.25.1",
    "eslint": "^9.25.1",
    "globals": "^16.0.0"
  }
```

1. @eslint/js：ESLint 的核心包，用于支持 JavaScript 的代码分析功能，适用于基于 JavaScript 的代码检查
2. eslint：ESLint 包
3. globals：JavaScript 全局变量的库，提供常见的全局变量，通常用于 ESLint 配置中定义哪些全局变量是允许的

<!-- 如果是vue、ts这需要加上下面的依赖 -->

4. @vitejs/plugin-vue：Vite 的官方 Vue 插件，专为 Vue 3 项目设计
5. eslint-plugin-vue：专为 Vue 项目设计的 ESLint 插件，提供了对 Vue 特有语法（如模板、指令等）的代码检查和规则支持
6. typescript-eslint：TypeScript 的 ESLint 插件，允许 ESLint 对 TypeScript 代码进行静态分析和代码检查

在项目根目录下，你会发现生成了一个 eslint.config.js 文件，它是新的默认配置格式，用于配置 ESLint 的规则和选项。

```js
import js from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  // 测试用例
  {
    files: ["./index.js"], //确定配置对象应用于哪些文件
    ignores: ["node_modules"], //确定应该忽略哪些文件
    rules: {
      "no-undef": "warn",
      "no-alert": "error", //禁止使用 alert、confirm 和 prompt
      "no-empty-function": "error", //禁止空函数
      "no-var": "error", //禁止使用var
    },
  },
  // 配置忽略检查文件
  {
    ignores: [
      "**/node_modules",
      "**/public",
      "**/assets",
      "**/dist",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
    ],
  },
];
```

然后就可以使用命令来在终端输出全部错误或修复部分错误。

```js
npx eslint src/main.ts
npx eslint --fix src/main.ts
pnpm dlx eslint yourfile.js
```

## 1.2 配置eslint

ESLint v9 引入了新的配置格式，Flat Config 即扁平化配置。导出一个数组，每个元素是一个配置对象。

常见配置项属性如下:

1. files：指定要应用规则的文件或目录。
2. ignores： 它是一个字符串数组。可以实现局部忽略，也可以是全局，这取决于是否有 files 字段。
3. rules： 定义lint规则，它是一个对象，键是规则名称，值是规则的配置。
4. globals： 它是一个对象，键是全局变量名称，值是其类型。
5. plugins： 添加插件,它是一个对象，键是插件名称，值是插件的配置。
6. languageOptions： 配置语言选项，它是一个对象，键是语言选项名称，值是其配置。

一个具体例子如下：

```js
import js from "@eslint/js";
import globals from "globals";
import pluginVue from 'eslint-plugin-vue';// Vue.js 的官方 ESLint 插件
// 在使用eslint是没选择vue则要自行安装
pnpm add eslint-plugin-vue --save-dev
/** @type {import('eslint').Linter.Config[]} */
export default [
  // 对vue单文件组件进行检查
   {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  // 测试用例
  {
    files: ["./index.js"], //确定配置对象应用于哪些文件
    ignores: ["node_modules"], //确定应该忽略哪些文件
    rules: {
      "no-undef": "warn",
      "no-alert": "error", //禁止使用 alert、confirm 和 prompt
      "no-empty-function": "error", //禁止空函数
      "no-var": "error", //禁止使用var
    },
  },
  // 配置忽略检查文件
  {
    ignores: [
      "**/node_modules",
      "**/public",
      "**/assets",
      "**/dist",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
    ],
  },
];

```

VS Code 中配置 ESLint 插件：在 .vscode/settings.json (没有此文件就创建)文件写入以下配置：

```json
{
  "eslint.useFlatConfig": true, //vscode-eslint >= v8.57.0，确保扁平化配置开启
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit" // eslint自动修复
  },
  // 为列表中指定的文件类型启用 ESLint 验证
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "json5",
    "jsonc",
    "yaml",
    "toml",
    "xml"
  ]
}
```

ESLint 脚本命令配置将命令写在 package.json 的 scripts 里

```json

  "scripts": {
    "lint:eslint": "eslint --fix  --cache --max-warnings 0  \"src/**/*.{vue,ts,tsx}\"  --cache-location 'node_modules/.cache/eslint/'",
}
```

1. --max-warnings： 此选项允许您指定警告阈值，如果项目中存在过多的警告级别规则冲突，则该阈值可用于强制 ESLint 退出并显示错误状态
2. --fix： 指示 ESLint 尝试修复尽可能多的问题
3. --cache： 存储有关已处理文件的信息，以便仅对更改的文件进行操作。确保仅对更改的文件进行 linted 处理，从而显著提高 ESLint 的运行时性能
4. --cache-location： 缓存位置的文件或目录的路径，因为缓存会生成一个 .eslintcache 文件，不配置将在根目录下生成，我们这里统一处理放在 node_modules/.cache

使用命令检查`pnpm lint:eslint`

# 二、Prettier

Prettier 是一个代码格式化工具，主要用于自动化代码的风格统一和格式化，专注于确保代码的可读性和一致性

## 2.1 安装prettier

```bash
pnpm add --save-dev --save-exact prettier
devDependencies:
+ prettier 3.5.3

```

在根目录下新增两个文件：

1. .prettierignore 忽略文件，表示哪些文件忽略格式化
2. .prettierrc.js Prettier 配置文件(ES Modules)

```js
/** @type {import('prettier').Config} */
const config = {
  printWidth: 100, // 每行最大字符数
  tabWidth: 2, // 缩进空格数
  semi: true, // 尾部添加分号
  singleQuote: true, // 是否使用单引号而不是双引号
  bracketSpacing: true, // 在对象字面量的括号内添加空格
  arrowParens: "always", // 总是为箭头函数的参数添加圆括号
  proseWrap: "preserve", // 不改变 Markdown 文本的换行
  bracketSameLine: false,
};

export default config;
```

配置脚本

```json
  "scripts": {
    "lint:format": "prettier  --write --cache \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\"",
}
```

1. --write：这将就地重写所有已处理的文件。这与 eslint --fix 工作流程相当。您也可以使用 -w 别名。
2. --cache： 存储有关已处理文件的信息，以便仅对更改的文件进行操作

使用命令检查`pnpm lint:format`

# 三、ESLint 和 Prettier 配合使用

在 ESLint v9.0.0 前的格式化程序和 Prettier 起冲突，这是一个常常发生的事情。在 ESLint v9 已经移除了多个内置的格式化规则，使其更专注于代码质量检查而非格式，这意味着 eslint-config-prettier 的用武之地有所减少。不过，一些广泛使用的 ESLint 插件可能仍然包含格式化相关的规则。对于这些规则：可以手动关闭冲突的规则或者使用插件 eslint-config-prettier 。

1. eslint-config-prettier：用于关闭所有不必要或可能与 Prettier 冲突的规则
2. eslint-plugin-prettier：将 Prettier 作为规则插入到 ESLint 里

```js
pnpm add --save-dev eslint-plugin-prettier
devDependencies:
+ eslint-plugin-prettier 5.2.6

```

在 eslint.config.js 中引入

```js
//...其他依赖
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  //...
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
```

# 四、EditorConfig

EditorConfig 是一个跨平台的文件格式，用于统一不同编辑器和 IDE 之间的代码风格。它允许开发人员定义一组规则，这些规则指定了代码的缩进、换行符、空格等风格。通过使用 EditorConfig 文件，开发人员可以确保他们的代码在不同的编辑器和 IDE 中保持一致的风格，从而提高代码的可读性和可维护性。

在根目录下新建一个 .editorconfig 文件, 配置如下：

```js
# 官网：https://editorconfig.org/
root = true # 表示最顶层的 EditorConfig 文件，即停止向上找，直接使用该配置文件

[*] # 匹配所有文件
charset = utf-8 # 控制字符集
indent_style = space # 缩进方式 (tabl | space)
indent_size = 2 # 缩进大小

end_of_line = lf # 设置换行符的类型。可选值为 lf（Unix 风格）、cr（Mac 风格）或 crlf（Windows 风格）。
insert_final_newline = true # 是否在文件末尾插入一个空行，以确保文件总是以换行符结尾
trim_trailing_whitespace = true # 是否保存文件时删除行尾的空白字符



```

# 五、缓存文件删除

在上面的 Eslint 命令中，会生成缓存文件，这些文件存在 node_modules/.cache 目录中，有些时候我们可以删除这些缓存，它的作用在于删除缓存会强制重新检查所有文件，而不是依赖可能过时的缓存结果。我们使用rimraf 这个跨平台的删除工具，我们借助它来删除缓存文件。

```bash
pnpm add --save-dev rimraf
pnpm add -D rimraf

devDependencies:
+ rimraf 6.0.1

```

在 package.json 的 scripts 中添加命令

```json
  "scripts": {
    "clear:cache": "rimraf node_modules/.cache",
  }

```

执行脚本`pnpm clear:cache`即可。

# 六、Git 提交规范化
从零搭建起一套 Git 提交规范化流程，主要分为 lint 校验和 Commit Message 规范化，通过工具如 Husky、Lint-staged、Commitlint 和 Commitizen，一步步实现 Git 提交规范化。先了解一下基础概念

1. husky：一个 Git hook 工具，使用 Husky 可以挂载 Git 钩子，使现代的原生 Git 钩子变得简单，即可以帮助我们在 commit 前做一些自定义操作
2. Lint-staged： 对暂存的 git 文件运行 linters，也就是只对暂存的文件进行 ESLint、Prettier、Stylelint 等检查
3. commitlint：对 commit 信息进行检查，即 lint Commit Message
4. Commitizen：基于 Node.js 的  git commit  命令行工具，辅助生成标准化规范化的 Commit Message

简单说就是git提供了钩子，可以在commit前做一些自定义操作，比如检查代码是否符合规范，检查commit信息是否符合规范，检查是否有冲突等。

## 6.1 git-hook
hook 翻译过来是钩子的意思，有点类似于 Vue 的生命周期钩子一样，Git 能在特定的重要动作发生时触发自定义脚本。执行 git init 命令后，会在当前目录下生成一个 .git 文件，目录中就存在一个 hooks 文件夹，目录下存放着一些 shell 脚本，以 .sample 为后缀，表示默认不启动。这些 shell 脚本主要分为两大类：客户端和服务端，我们这里只关注客户端。在客户端下，也细分一些钩子种类，比如 提交工作流钩子、电子邮件工作流钩子和其它钩子：
1. pre-commit  钩子在键入提交信息前运行
2. prepare-commit-msg  钩子在启动提交信息编辑器之前，默认信息被创建之后运行
3. commit-msg  存有当前提交信息的临时文件，如果该钩子脚本以非零值退出，Git 将放弃提交
4. post-commit  钩子在整个提交过程完成后运行

我们也主要用到pre-commit 和 commit-msg 这两个钩子。

1. pre-commit：在键入提交信息前进行 lint 校验，比如 ESLint、Prettier 等
2. commit-msg：对当前 Commit Message 进行检查并使用工具来规范化 Message 信息

要在 git 钩子里去做这些事情，我们就需要借助工具 Husky 来配置 Git 钩子。

## 6.2 Husky
Husky 是一个 Git hook 工具，使用 Husky 可以挂载 Git 钩子，使现代的原生 Git 钩子变得简单，即帮助我们在 Git 操作执行前或执行后自动执行脚本。
```js
pnpm add --save-dev husky

devDependencies:
+ husky 9.1.7

// init 初始化
pnpm exec husky init
// 这条命令会在根目录下新增一个 .husky 目录，目录下会创建  pre-commit  脚本并在  package.json  中生成一个名为 prepare 的脚本
  "scripts": {
    "prepare": "husky"
  }

```
执行脚本`pnpm prepare`即可初始化 husky。


上述操作完成后就可以完成在键入提交信息前进行 lint 校验，但是每次lint都是全量项目的 lint 校验可能会耗费大量时间。所以能不能有一个方法只 lint 我当前修改的文件，而不是全量 lint ，这样就可以避免 lint 的耗时，提高效率且有针对性。这里就可以使用 Lint-staged 来只对暂存的文件进行 lint 校验。

## 6.3 Lint-staged
Lint-staged 是一个用于在提交前对暂存的文件运行 linters 的工具。它的主要目的是在提交前对代码进行检查，以确保提交的代码符合项目的代码风格和质量标准。
安装
```js
pnpm add --save-dev lint-staged

devDependencies:
+ lint-staged 15.5.1

```
**配置**：和 ESLint、Stylelint 等很像可以通过多种方式来配置，一种普遍的方式是直接在 package.json 中配置，比如：
```json
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.vue": [
      "prettier --write",
	  "eslint --fix",
      "stylelint --fix",
    ]
  },
```
还有种方式是创建一个配置文件
1. 新建一个 lint-staged.config.js 文件
2. 配置 lint-staged
```js
module.exports = {
  "*.{js,ts,jsx,tsx}": [
    "prettier --write",
    "eslint --fix"
  ],
  "*.vue": [
    "prettier --write",
    "eslint --fix", 
}
```
接下来，我们需要确保 Git 钩子 pre-commit 能够正确调用 lint-staged。在根目录下的终端运行 shell 命令：
```js
echo "pnpm lint-staged" > .husky/pre-commit
```
这条命令的作用是将 "pnpm lint-staged" 写入到 .husky/pre-commit 文件中。这样，每次在执行 git commit 命令之前，husky 会自动执行 lint-staged 命令，对暂存的文件进行 lint 校验。

测试：将文件全部提交到暂存区、在终端执行命令 git commit -m 'test'。查看是否触发eslint校验即可。
出现类似这样的画面，即表示 lint-staged 起作用了，可以看到，因为校验未通过，Commit 提交并未通过而是直接退出了。
```bash
$ git commit -m "test"
√ Backed up original state in git stash (7d9058b)
√ Hiding unstaged changes to partially staged files...
‼ Running tasks for staged files...
  > lint-staged.config.js — 11 files
    > *.{js,ts,jsx,tsx} — 4 files
      √ prettier --write --cache
      × eslint --fix [FAILED]
    √ *.json — 2 files
↓ Skipped because of errors from tasks.
↓ Skipped because of errors from tasks.
√ Reverting to original state because of errors...
√ Cleaning up temporary files...

× eslint --fix:

E:\Full-stack-Engineer\practicalPractice\basics-template-project\index.js
  2:1   error  Unexpected alert                        no-alert
  3:23  error  Unexpected empty function 'myFunction'  no-empty-function

✖ 2 problems (2 errors, 0 warnings)

husky - pre-commit script failed (code 1)
```

## 6.4 Commit 规范
试想一个场景，在工作中你接手了一个别人的项目，如何能够快速入手呢？除了基本的浏览代码，如果这个项目每次提交都遵循一定规范，比如 “feat：userManage Module”，那么项目的提交历史将变得规范而清晰，这很有助你接下来的上手工作，能了解项目的发展和主要功能，并找到相关的变更记录！
再比如团队的协同开发，你需要理解同事的部分业务代码，是否可以通过清晰、规范的提交信息来帮助我们了解这块的变更历史，从而简化交流达到提高效率的作用
commit 规范的意义体现在几个方面：
1. 提高代码可读性和项目质量、改善项目可维护性
2. 简化协作和沟通
3. 方便版本管理和代码回溯
4. 有助于自动化生成变更日志

两个重要的提交规范：
1. Angular 规范，由 Angular 团队制定并使用，也被社区广泛接受
2. Conventional Commits 规范则是由 Angular 规范发展调整而来的一个更通用的规范

## 6.5 Commitlint
Commitlint 是一个用于检查提交信息是否符合约定的工具。它可以与其他工具（如 Husky）结合使用，以确保提交信息符合约定。
安装
```js
pnpm add --save-dev @commitlint/{cli,config-conventional}
// 这条命令会在你的 package.json 文件的 devDependencies 中生成两个依赖
devDependencies:
+ @commitlint/cli 19.8.0 命令行工具
+ @commitlint/config-conventional 19.8.0 此配置遵循 Conventional Commits 规范，与 @commitlint/cli 配合使用，
```
配置文件
```js
// commitlint.config.js
/** @type {import('@commitlint/types').UserConfig} */ 
 export default { extends: ['@commitlint/config-conventional'] };

```

写完自定义的配置规则后，我们要在创建提交之前对其进行 lint 校验，需要使用到 Husky 的 commit-msg 钩子，运行 shell 命令：
```js

echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg

```
这个 shell 脚本会在 .husky 文件夹生成一个 commit-msg 文件，并且写入以下内容：pnpm dlx commitlint --edit $1

到这一步，我们已经实现了基本的 commit 信息校验,

## 6.6 Commitizen
Commitizen 是一个基于 Node.js 的 git commit 命令行工具，它可以帮助我们生成一套标准化规范化的 Commit 信息。
安装
```js
pnpm add --save-dev commitizen
devDependencies:
+ commitizen 4.3.1


```
安装完后，我们还需要安装一个适配器，这里介绍两个：
1. cz-conventional-changelog是 Commitizen 文档中介绍的适配器，也是广泛使用的适配器
2. @commitlint/cz-commitlint 是 Commitlint 官方提供的 Commitizen 适配器，提供了一种更现代的交互方式

这里使用 @commitlint/cz-commitlint
```js
pnpm add --save-dev @commitlint/cz-commitlint

devDependencies:
+ @commitlint/cz-commitlint 19.8.0
```

接着在 package.json 中写入以下内容：
```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  },
}
```
配置在做完上述的安装及基础配置后，我们可以自定义自己的交互文本，在 commitlint.config.js 文件中配置 prompt 属性，比如：
```js
export default {
  ignores: [(commit) => commit === ''],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 | New feature
        'fix', // 修复bug | Bug fix
        'docs', // 文档更新 | Documentation updates
        'style', // 代码格式（不影响代码运行的变动） | Code formatting (changes that do not affect code execution)
        'refactor', // 重构（既不是新增功能，也不是修改bug的代码变动） | Refactoring (code changes that neither fix a bug nor add a feature)
        'perf', // 性能优化 | Performance improvements
        'test', // 增加测试 | Adding tests
        'chore', // 构建过程或辅助工具的变动等杂事、琐事 | Changes to the build process or auxiliary tools
        'revert', // 回滚到上一个版本 | Revert to a previous version
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 | Compilation-related changes, such as release versions or changes to project build or dependencies
        'types', // 类型 | Types
        'ci', // CI 配置文件和脚本的更改 | Changes to CI configuration files and scripts
      ],
    ],
    'header-max-length': [2, 'always', 100], // 头部最大长度100
    'body-max-line-length': [2, 'always', 100], // body最大长度100
    'footer-max-line-length': [2, 'always', 100], // footer最大长度100
    'type-empty': [2, 'never'], // type 不能为空
    'subject-empty': [2, 'never'], // subject 不能为空
    // "scope-empty": [2, "never"], // scope 不能为空
    'type-case': [2, 'always', 'lower-case'], // type 小写
    'scope-case': [2, 'always', ['lower-case', 'pascal-case']], // scope - lower case、PascalCase
    'subject-case': [0, 'always'], // subject 不显示大小写
  },
  // 选项对话
  prompt: {
    questions: {
      type: {
        description: "选择你要提交的变更类型 | Select the type of change you're committing",
        enum: {
          feat: {
            description: '新功能 | A new feature',
            title: 'Features | 功能',
            emoji: '✨',
          },
          fix: {
            description: '修复bug | A bug fix',
            title: 'Bug Fixes | 修复',
            emoji: '🐛',
          },
          docs: {
            description: '仅文档更改 | Documentation only changes',
            title: 'Documentation | 文档',
            emoji: '📚',
          },
          style: {
            description:
              '不影响代码含义的更改（空白、格式化、缺少分号等）| Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles | 样式',
            emoji: '💎',
          },
          refactor: {
            description:
              '既不修复bug也不添加新功能的代码更改 | A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring | 代码重构',
            emoji: '📦',
          },
          perf: {
            description: '提高性能的代码更改 | A code change that improves performance',
            title: 'Performance Improvements | 性能优化',
            emoji: '🚀',
          },
          test: {
            description:
              '添加缺失的测试或修正现有的测试 | Adding missing tests or correcting existing tests',
            title: 'Tests | 测试',
            emoji: '🚨',
          },
          chore: {
            description:
              '构建过程或辅助工具的变动等杂事、琐事 | Changes to the build process or auxiliary tools',
            title: 'Chores | 杂务',
            emoji: '🔧',
          },
          revert: {
            description: '回滚到上一个版本 | Revert to a previous version',
            title: 'Reverts | 回滚',
            emoji: '⏪',
          },
          build: {
            description:
              '编译相关的修改，例如发布版本、对项目构建或者依赖的改动 | Changes that affect the build system or external dependencies',
            title: 'Builds | 构建',
            emoji: '🏗',
          },
          types: {
            description: '类型定义文件更改 | Changes to type definitions',
            title: 'Types | 类型',
            emoji: '🏷️',
          },
          ci: {
            description: 'CI 配置文件和脚本的更改 | Changes to CI configuration files and scripts',
            title: 'Continuous Integration | 持续集成',
            emoji: '🎡',
          },
        },
      },
      scope: {
        description:
          '变更的范围是什么（例如组件或文件名，可选）| What is the scope of this change (e.g. component or file name，optional)',
      },
      subject: {
        description:
          '写一个简短的、命令式的变更描述（必填） | Write a short, imperative tense description of the change（required）',
      },
      body: {
        description:
          '提供更长的变更描述（可选） | Provide a longer description of the change（optional）',
      },
      isBreaking: {
        description: '有什么重大变更吗？| Are there any breaking changes?',
      },
      breakingBody: {
        description:
          '重大变更提交需要一个正文。请输入提交本身的更长描述 | A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: '描述重大变更 | Describe the breaking changes',
      },
      isIssueAffected: {
        description: '此变更是否影响任何未解决的问题？| Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          '如果问题已关闭，提交需要一个正文。请输入提交本身的更长描述 | If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description:
          '添加问题引用（例如 "fix #123", "re #123"）| Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
```

将文件放入暂存区在项目终端输入命令`pnpm commit`即可测试。

