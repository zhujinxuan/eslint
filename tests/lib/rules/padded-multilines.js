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

const valid = {
    "if": "function test(a){\n let b = a\n \nif (a.find(x => {\n if (x.checked) return true;\n return x.actual === x.expected})) {\n b = []\n }\n\n return b\n}",
    "for": "function test(a){\n let b = 0;\n \nfor (;a > 0; a-- ) {\n b++\n }\n\n return b\n}",
    "while": "function test(a){\n let b = 0;\n \nwhile (a > 0) {\n b++\n }\n\n return b\n}",
    "dowhile": "function test(a){\n let b = 0;\n \ndo {\n b++\n } while (a > 0);\n \n return b\n}",
}

const invalid = {
    "if" : "function test(a){\n let b = a\n if (a.find(x => {\n if (x.checked) return true;\n return x.actual === x.expected})) {\n b = []\n }\n return b\n}",
    "for": "function test(a){\n let b = 0;\n for (;a > 0; a-- ) {\n b++\n }\n return b\n}",
    "while": "function test(a){\n let b = 0;\n while (a > 0) {\n b++\n }\n return b\n}",
    "dowhile": "function test(a){\n let b = 0;\n do {\n b++\n } while (a > 0); \n return b\n}"
}

ruleTester.run("padded-multilines", rule, {
    valid: [
        valid.if,
        "function test(a){\n if (a ===1) {\n b =1\n } else if (a === 2) {\n b= 2\n } \n}",
        valid.for,
        valid.while,
        valid.dowhile
    ],
    invalid: [
        {
            code: invalid.if,
            output: valid.if,
            errors: [{ messageId: "before", line: 3, column: 2 }, { messageId: "after", line: 7, column:3}]
        },
        {
            code: invalid.for,
            output: valid.for,
            errors: [{ messageId: "before" , line: 3, column: 2}, { messageId: "after", line:5, columb:3 }]
        },
        {
            code: invalid.while,
            output: valid.while,
            errors: [{ messageId: "before", line: 3, column: 2 }, { messageId: "after", line: 5, column: 3 }]
        },
        {
            code: invalid.dowhile,
            output: valid.dowhile,
            errors: [{ messageId: "before", line: 3, column: 2 }, { messageId: "after", line: 5, column: 18 }]
        }
    ]
});
