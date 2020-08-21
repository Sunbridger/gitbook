/**
 * 正式生成路由：1、将相应的路由放在对应的路由下，形成子路由；2、生成同级路由
 * index：当前文件深度，为maxlen的倒序循环
 * nofindnum：未找到路由的次数
 * newcurr：当前新的深度下的路由数据
 */

const allRouters = {};

const substrName = (name) => name.substr(0, name.lastIndexOf('-'));

const ceateRouter = (index, nofindnum, newcurr) => {
    if (newcurr === 0) {
        newcurr = null;
    }

    const curr = newcurr || allRouters['len' + index];

    const pre = allRouters['len' + (index - 1)];

    const noFind = [];

    if (!pre) {
        curr.map((c) => {
            var path = '/' + c.fileName.replace('/index', '');
            if (path.match('_')) {
                path = path.replace('/_', '/:');
            }
            c.path = path;
            Routers.push(c);
        });
    } else {

        curr.map((c) => {
            const fobj = pre.find((p) => {
                let name = substrName(c.name);
                for (let i = 0; i < nofindnum; i++) {
                    name = substrName(name);
                }
                return name === p.name;
            });
            if (fobj) {
                console.log(c.fileName);
                const path = c.fileName.replace(fobj.fileName, '').substr(1).replace('_', ':');

                if (path.match('/') && !path.match('/:')) {
                    path = path.replace('/index', '');
                }

                if (path === undefined) {
                    throw new Error("path 不合法....");
                }

                c.path = path;
                if (path === 'index') {
                    c.path = '';
                    fobj.needDelectName = fobj.needDelectName || true;
                }
                if (Array.isArray(fobj.children)) {
                    fobj.children.push(c);
                } else {
                    fobj.children = [c];
                }
            }
            else {
                noFind.push(c);
            }
        });

        if (noFind.length) {
            ceateRouter(index - 1, ++nofindnum, noFind);
        }
    }
};


const deleteNameFun = (arr) => {
    arr.map(function (r) {
        delete r.fileName;
        if (r.needDelectName) {
            delete r.name;
        }
        delete r.needDelectName;
        if (Array.isArray(r.children)) {
            deleteNameFun(r.children);
        }
    });
};

const getRouter = function (config) {
    const Routers = [];

    const {
        rc,
        redirect,
        rootFile
    } = Object.assign({}, {
        rc: null,
        redirect: '',
        rootFile: 'views'
    }, config);


    let maxLen = 0;

    if (rc === null) {
        return Routers;
    }


    const routerFileAndLen = rc.keys().map((fileName) => {
        let realFileName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
        return {
            fileName: realFileName,
            routerName: realFileName.replace(/\//g, '-').replace(/_/g, ''),
            routerComponent: fileName.substr(1),
            fileLen: fileName.match(/\//g).length
        };
    }).sort((a, b) => a.fileLen - b.fileLen);


    routerFileAndLen.map((item) => {
        const { routerName: name, fileName, routerComponent, fileLen } = item;

        maxLen = fileLen;

        const key = 'len' + maxLen;

        const obj = {
            name,
            fileName,
            path: `/${name}`,
            needDelectName: false,
            component: () => import(`../../${rootFile}${routerComponent}`)
        };

        if (Array.isArray(allRouters[key])) {
            allRouters[key].push(obj);
        } else {
            allRouters[key] = [obj];
        }
    });

    Routers.push.apply(Routers, allRouters.len1);

    for (let i = maxLen; i > 1; i--) {
        ceateRouter(i);
    }

    deleteNameFun(Routers);

    return Routers;
}


const Routers = getRouter({
    rc: require.context('views', true, /\.vue$/),
    rootFile: 'views',
});

export default Routers;
