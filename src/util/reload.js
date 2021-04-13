export const reloadUrl = (link) => {
    let stringUrl = '';
    const x = window.location.href
    const url = new URL(x).origin;
    if (url) {
        stringUrl = `${url}/${link}`;
        console.log({ stringUrl });
        setTimeout(() => {
            window.location.href = stringUrl;
        }, 500);
    }
}