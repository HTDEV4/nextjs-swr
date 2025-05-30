export const debounce = <Params extends unknown[]>(
    callback: (...args: Params) => unknown,
    timeout: number = 500
) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Params) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args);
        }, timeout);
    }
}