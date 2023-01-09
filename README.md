# Minimal repro for Jest 26 -> 29 upgrade issue
This example demonstrates an error that appears in tests as a result of upgrading Jest from v26 to v29 in a Next.js 12 application. The issue relates to dependencies that are shipped as ES modules. For this example, I've used the [Nano ID](https://github.com/ai/nanoid) package but any ESM package should do.

The test file is as follows:
```javascript
import getId from './index';

describe('simple test', () => {
  it('should work', () => {
    const id = getId();
    expect(id).toBeDefined();
  });
});
```

The file under test (index.js) contains this code:
```javascript
import { customAlphabet } from 'nanoid';

export default customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
```

The git repo has two branches:

 - jest-26
 - main (where jest 29 is used)

The only difference between the branches is the Jest version used. 

## Jest 26
Running the following commands
```
> git switch jest-26
> npm i
> npm test
```
yields the following output
```
(node:40424) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/index.test.js
  simple test
    ✓ should work (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.656 s
Ran all test suites.
```

## Jest 29
Running the following commands
```
> git switch main
> npm i
> npm test
```
yields the following output
```
 FAIL  src/index.test.js
  ● Test suite failed to run

    Must use import to load ES Module: /Users/eirikur/Projects/jest-esm-issue-repro/node_modules/nanoid/index.browser.js

    > 1 | import { customAlphabet } from 'nanoid';
        | ^
      2 |
      3 | export default customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
      4 |

      at Runtime.requireModule (node_modules/jest-runtime/build/index.js:817:21)
      at Object.<anonymous> (src/index.js:1:1)
      at Object.<anonymous> (src/index.test.js:1:1)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.509 s
Ran all test suites.
```

## Node/NPM version
```bash
npm:  8.18.0
node: v16.16.0
```