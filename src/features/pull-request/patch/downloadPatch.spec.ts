import { describe, expect, test } from '@jest/globals';
import { exportedForTesting } from './downloadPatch';
const { buildPatchUrl, buildPatchFileName } = exportedForTesting;

describe('Test buildPatchUrl', () => {
    test('full url', () => {
        expect(buildPatchUrl('https://github.com/account/repo/pull/1'))
            .toBe('https://api.github.com/repos/account/repo/pulls/1');
    });
    test('url without https', () => {
        expect(buildPatchUrl('github.com/account/repo/pull/1'))
            .toBe('https://api.github.com/repos/account/repo/pulls/1');
    });
    test('url with long repo name', () => {
        expect(buildPatchUrl('https://github.com/account/repo-name/pull/1'))
            .toBe('https://api.github.com/repos/account/repo-name/pulls/1');
    });
    test('url with entreprise github url', () => {
        expect(buildPatchUrl('https://sgithub.us/account/repo/pull/1'))
            .toBe('https://api.github.com/repos/account/repo/pulls/1');
    });
});

describe('Test buildPatchFileName', () => {
    test('full url', () => {
        expect(buildPatchFileName('https://github.com/account/repo/pull/1'))
            .toBe('repo_pull_1.patch');
    });
    test('url without https', () => {
        expect(buildPatchFileName('github.com/account/repo/pull/1'))
            .toBe('repo_pull_1.patch');
    });
    test('url with long repo name', () => {
        expect(buildPatchFileName('https://github.com/account/repo-name/pull/1'))
            .toBe('repo-name_pull_1.patch');
    });
    test('url with entreprise github url', () => {
        expect(buildPatchFileName('https://sgithub.us/account/repo/pull/1'))
            .toBe('repo_pull_1.patch');
    });
});
