import 'antd/dist/antd.css';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// 让webpack生成runtime的jsonp代码
const nothing = import('./nothing')
nothing;

import outer from './outer'
// 外部会引用的库，用一下是为了让webpack打包打进来，不要tree shake掉
outer;

ReactDOM.render(
    <App />,
    document.getElementById('root'),
)