import { describe, expect, test } from '@jest/globals';
import { pullRequestUrlRegex } from './regex'


describe('Test pullRequestUrlRegex', () => {
    test('full url', () => {
        expect(pullRequestUrlRegex.test('https://github.com/account/repo/pull/1'))
            .toBe(true);
    });
    test('url without https', () => {
        expect(pullRequestUrlRegex.test('github.com/account/repo/pull/1'))
        .toBe(true);
    });
    test('url with long repo name', () => {
        expect(pullRequestUrlRegex.test('https://github.com/account/repo-name/pull/1'))
        .toBe(true);
    });
    test('url with entreprise github url', () => {
        expect(pullRequestUrlRegex.test('https://sgithub.us/account/repo/pull/1'))
        .toBe(true);
    });
});
