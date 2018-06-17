/**
 * @fileoverview Tests for padded-multilines rule.
 * @author Jinxuan Zhu <https://github.com/zhujinxuan>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/padded-multilines"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = {
    ecmaVersion: 2018
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run("padded-multilines", rule, {
    valid: [
        `function test(a) {
  let b = a

  if (a.find(x => {
    if (x.checked) return true;
    const {actual, expected} =x;
    return actual === expected})) {
    b = []
    }

  return b
}`
    ],
    invalid: [
        {
            code: `function test(a) {
  let b = a

  if (a.find(x => {
    if (x.checked) return true;
    const {actual, expected} =x;
    return actual === expected})) {
    b = []
    }

  return b
}`,

            errors: [{ messageId: "before" }, { messageId: "after" }]
        }
    ]
});
