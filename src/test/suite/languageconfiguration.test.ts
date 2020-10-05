'use strict';

import { getTALLanguageConfiguration } from "../../languageconfiguration";
import * as assert from 'assert';


suite('TAL Language Configuration', () => {
    const cnfg = getTALLanguageConfiguration();

    suite('"onEnterRules"', () => {
        const INDENT_ONENTER_REGEX = cnfg.onEnterRules![2].beforeText;
        const OUTDENT_ONENTER_REGEX = cnfg.onEnterRules![3].beforeText;

        // Test that indent-on-enter works on the following strings
        [
            // The basics without the comments
            'for i := 0 to 10 do',
            'while true do',
            'do',
            'else',
            'if true then',
            'case number of',
        ].forEach(testString => {
            [
                // Add comments to the basics
                '',  // no comment
                '!',
                ' !',
                '!!',
                '!foo',
                '!foo!',
                '!foo! ',
                '!foo! !foo',
                '!foo! !foo!',
                '--',
                ' --',
                '--foo',
                '--foo !foo',
                '--foo !foo!',
                '!foo! --foo',
                '!foo --foo!',
            ].forEach(commentString => {
                test(`Check that indent-on-enter applies to "${testString + commentString}"`, () => {
                    const result = INDENT_ONENTER_REGEX.test(testString + commentString);
                    assert.strictEqual(result, true);
                });
            });
        });

        // Test that indent-on-enter does not work on the following strings
        [
            '^do',
            'do^',
            'str[0:2] := "do";',
            'todo',
            '^todo',
            'todo^',
            'to^do',
            'elsewhere',
            'something^else',
            'day^of',
            'true) then',
            'true!good stuff!) then',
            '--do',
            '--for i := 0 to 10 do',
            '--      some_stuff = true then',
            '!do',
            '!for i := 0 to 10 do',
            '! if some_stuff = true then',
            '!changed my mind! !true) then',
            'for i := 0 to 10 do ;',
            'while (i := i + 1) < 10 do ;',
            'if true then return true;',
        ].forEach(testString => {
            [
                // Add comments to the basics
                '',  // no comment
                '!',
                ' !',
                '!!',
                '!foo',
                '!foo!',
                '!foo! ',
                '!foo! !foo',
                '!foo! !foo!',
                '--',
                ' --',
                '--foo',
                '--foo !foo',
                '--foo !foo!',
                '!foo! --foo',
                '!foo --foo!',
            ].forEach(commentString => {
                test(`Check that indent-on-enter does not apply to "${testString + commentString}"`, () => {
                    const result = INDENT_ONENTER_REGEX.test(testString + commentString);
                    assert.strictEqual(result, false);
                });
            });
        });

        // Test that outdent-on-enter works on the following strings
        [
            // The basics without the comments
            'end',
            'end;',
            '   end',
            '   end;',
            'end ;',
        ].forEach(testString => {
            [
                // Add comments to the basics
                '',  // no comment
                '!',
                ' !',
                '!!',
                '!foo',
                '!foo!',
                '!foo! ',
                '!foo! !foo',
                '!foo! !foo!',
                '--',
                ' --',
                '--foo',
                '--foo !foo',
                '--foo !foo!',
                '!foo! --foo',
                '!foo --foo!',

            ].forEach(commentString => {
                test(`Check that outdent-on-enter applies to "${testString + commentString}"`, () => {
                    const result = OUTDENT_ONENTER_REGEX.test(testString + commentString);
                    assert.strictEqual(result, true);
                });
            });
        });

        // Test that outdent-on-enter does not work on the following strings
        [
            // The basics without the comments
            '^end',
            '^end;',
            'end^',
            'str[0:2] := "end";',
            'ending',
            'the^end',
            'struct foo; begin string byte[0:1]; end;',
            'begin string byte[0:1]; end;',
            '!end',
            '--end',
            '!is this the end?! end',
            '!is this the end?! ! ! end',
        ].forEach(testString => {
            [
                // Add comments to the basics
                '',  // no comment
                '!',
                ' !',
                '!!',
                '!foo',
                '!foo!',
                '!foo! ',
                '!foo! !foo',
                '!foo! !foo!',
                '--',
                ' --',
                '--foo',
                '--foo !foo',
                '--foo !foo!',
                '!foo! --foo',
                '!foo --foo!',

            ].forEach(commentString => {
                test(`Check that outdent-on-enter does not apply to "${testString + commentString}"`, () => {
                    const result = OUTDENT_ONENTER_REGEX.test(testString + commentString);
                    assert.strictEqual(result, false);
                });
            });
        });

    });
});
