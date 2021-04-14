import Options from '@/option';
function isOk() {
    return !!this;
}
function isErr() {
    return !!this;
}
function contains(val) {
    return this.isOk() && this.data === val;
}
function containsErr(err) {
    return this.isErr() && this.error === err;
}
function ok() {
    if (this.isOk())
        return Options.some(this.unwrap());
    return Options.none();
}
function err() {
    if (this.isErr())
        return Options.some(this.unwrapErr());
    return Options.none();
}
function unwrap() {
    if (this.isOk())
        return this.data;
    return undefined;
}
function unwrapOr(def) {
    if (this.isOk())
        return this.data;
    return def;
}
function unwrapErr() {
    if (this.isErr())
        return this.error;
    return undefined;
}
// expect asserts that the data exists and returns that data,
// or it will throw an error
// Should be used only when you know for certain that the operation
// succeeded, or within a try/catch
function expect(msg) {
    if (this.isOk())
        return this.unwrap();
    throw new Error(msg);
}
// next in functional programming is often called `bind`
// The wrapped data will be unwrapped and passed to the `nextFunc`,
// unless the Result is an error and the Result will be returned
// The `nextFunc` must return a new Result, either newOk or newError
function next(nextFunc) {
    if (this.isErr())
        return this;
    return nextFunc(this.unwrap());
}
var newError = function (error) {
    return {
        error: error,
        isOk: isOk,
        isErr: isErr,
        contains: contains,
        containsErr: containsErr,
        ok: ok,
        err: err,
        unwrap: unwrap,
        unwrapOr: unwrapOr,
        unwrapErr: unwrapErr,
        expect: expect,
        next: next
    };
};
var newOk = function (data) {
    return {
        data: data,
        isOk: isOk,
        isErr: isErr,
        contains: contains,
        containsErr: containsErr,
        ok: ok,
        err: err,
        unwrap: unwrap,
        unwrapOr: unwrapOr,
        unwrapErr: unwrapErr,
        expect: expect,
        next: next
    };
};
export default { newOk: newOk, newError: newError };
//# sourceMappingURL=result.js.map