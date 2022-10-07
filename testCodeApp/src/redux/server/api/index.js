export default server => {
    return {
        //#region AUTH
        auth: (user) => {
            return new Promise((resolve, reject) => {
                const path = '/login';
                server.post(path, {
                        ...user
                    })
                    .then(user => {
                        resolve(user);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        //#endregion AUTH

        //#region Task
        taskAdd: (t) => {
            return new Promise((resolve, reject) => {
                const path = '/user/task/add';
                server.post(path, {
                        ...t
                    })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        taskCompletePost: (t) => {
            return new Promise((resolve, reject) => {
                const path = '/user/task/completed';
                server.post(path, {
                        ...t
                    })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        taskComplete: () => {
            return new Promise((resolve, reject) => {
                const path = '/user/task/completed/list';
                server.get(path)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        taskIncomplete: () => {
            return new Promise((resolve, reject) => {
                const path = '/user/task/incomplete/list';
                server.get(path)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        //#endregion Task

        //#region Location
        currentLocation: () => {
            return new Promise((resolve, reject) => {
                const path = '/user/location/current';
                server.get(path)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        previousLocation: () => {
            return new Promise((resolve, reject) => {
                const path = '/user/location/previous/list';
                server.get(path)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        currentCheckIn: (t) => {
            return new Promise((resolve, reject) => {
                const path = '/user/location/add';
                server.post(path, {
                        ...t
                    })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        //#endregion Location

    }
}