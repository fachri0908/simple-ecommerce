export const getCurrentPath = () => {
    return window.location.pathname;
}

export const updateQuery = (label: string, value: string) => {
    const url = new URL(window.location.href);
    if(value) {
        url.searchParams.set(label, value);
    } else {
        url.searchParams.delete(label);
    }
    window.history.pushState({}, "", url);
};

export const getQuery = (query: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(query) || "";
};