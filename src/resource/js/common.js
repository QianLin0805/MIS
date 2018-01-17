export function delay(vue, url){
    return new Promise((resolve) => {
        vue.$ajax({
            method: 'get',
            url: url
        }).then((res) => {
            let obj = res.data;
            resolve(obj);
        }).catch((err) => {
            resolve('');
        });
    });
}