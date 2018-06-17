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
        "function test(a){\n let b = a \n\n if (a.find(x => {\n if (x.checked) return true;\n return x.actual === x.expected})) {\n b = []\n }\n\n return b\n}",
        "function test(a){\n if (a ===1) {\n b =1\n } else if (a === 2) {\n b= 2\n } \n}",
        "function test(a){\n let b = 0;\n\n for (;a > 0; a-- ) {\n b++\n } \n \n return b\n}",
        "function test(a){\n let b = 0;\n\n while (a > 0) {\n b++\n } \n \n return b\n}"
        "function test(a){\n let b = 0;\n\n do {\n b++\n } while(a > 0) \n  \n return b\n}"
    ],
    invalid: [
        {
            code: "function test(a) { \nlet b = a\n if (a.find(x => {\n if (x.checked) return true;\n return x.actual === x.expected })) {\n b = []\n }\n return b\n}",
            errors: [{ messageId: "before" }, { messageId: "after" }]
        },
        {
            code: "function test(a) { \n let b = 0\n for (;a > 0; a-- ) {\n b++\n }\n return b\n }",
            errors: [{ messageId: "before" }, { messageId: "after" }]
        },
        {
            code: "function test(a){\n let b = 0;\n\n do {\n b++\n } while (a > 0) \n return b\n}",
            errors: [{ messageId: "before" }, { messageId: "after" }]
        }
    ]
});
