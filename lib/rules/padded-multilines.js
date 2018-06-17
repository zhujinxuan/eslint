/**
 * @fileoverview A rule to ensure blank lines around multi-line blocks
 * @author Jinxuan Zhu <https://github.com/zhujinxuan>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "enforce blank lines shall around multi-line blocks",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/padded-multilines"
        },
        messages: {
            before: "Missing blank line before a multi-lines block",
            after: "Missing blank line after a multi-lines block"
        },
        fixable: "code",
        schema: [
            {
                enum: ["always", 0]
            }
        ]
    },
    create(context) {
        const sourceCode = context.getSourceCode();
        const lines = sourceCode.getLines();

        /**
         * Enforce blank like before a multi-lines block
         * @param{ASTNode} node The node to verify
         * @returns {void}
         */
        function checkBefore(node) {
            const { loc, parent } = node;

            if (parent.loc.start.line >= loc.start.line - 1) {
                return;
            }
            const { line } = loc.start;

            if (
                line > 1 &&
                lines[line - 2] &&
                lines[line - 2].trim() !== "" &&
                lines[line - 1].trim() !== ""
            ) {
                const comments = context.getSourceCode().getCommentsBefore(node);
                const beforeComment = comments.find(c => c.loc.end.line === line - 1);

                if (beforeComment) {
                    const blankLine = beforeComment.loc.start.line - 1;

                    if (blankLine < 1) {
                        return;
                    }
                    if (lines[blankLine - 1].trim() === "") {
                        return;
                    }
                }

                context.report({
                    node,
                    messageId: "before",
                    fix(fixer) {
                        return fixer.insertTextBefore(node, "\n");
                    }
                });
            }
        }

        /**
         * Enforce blank like after a multi-lines block
         * @param{ASTNode} node The node to verify
         * @returns {void}
         */
        function checkAfter(node) {
            const { loc, parent } = node;

            if (parent.loc.end.line <= loc.end.line + 1) {
                return;
            }
            const { line } = loc.end;

            if (
                lines[line - 1] &&
                lines[line - 1].trim() !== "" &&
                lines[line] &&
                lines[line].trim() !== ""
            ) {
                const { end } = loc;

                context.report({
                    node,
                    loc: { start: end, end },
                    messageId: "after",
                    fix(fixer) {
                        return fixer.insertTextAfter(node, "\n");
                    }
                });
            }
        }

        /**
         * Enforce blank line before and after multi-line blocks
         * @param{ASTNode} node The node to verify
         * @returns {void}
         */
        function check(node) {
            const { loc, parent } = node;

            if (loc.start.line === loc.end.line) {
                return;
            }
            if (!parent) {
                return;
            }
            if (node.type === "IfStatement" && parent.type === "IfStatement") {
                return;
            }
            checkBefore(node);
            checkAfter(node);
        }

        return {
            IfStatement: check,
            VariableDeclaration: check,
            SwitchStatement: check,
            WhileStatement: check,
            DoWhileStatement: check,
            ForStatement: check,
            ForInStatement: check,
            ExpressionStatement: check
        };
    }
};
