import React from 'react'
import {Button} from 'antd'
import {loadChunk} from 'ylang-runtime'
const css = require('./app.less')
import outer from './outer'
let {lazyComponent} = outer

export type Props = {

}

export default class App extends React.Component<Props, any>{
    constructor(props){
        super(props)
        this.state = {
            page1: null
        }
    }
    onclick = (e) => {
        let Page1 = lazyComponent(loadChunk({
            url: '/page1.chunk-8011137448.js',
            cssurl: '/page1.sand.7f546e011a.css',
            module: 'page1',
        }).then(_=>{
            if(_.ret==0) return _.data
            console.info('load error ', _.data)
            return null
        }))
        this.setState({
            page1: Page1
        })
    }
    render(){
        let Page1 = this.state.page1;
        return <div className={css.root}>
            <div className={css.title}>hello ylang</div>
            <div className={css.container}>
                <div style={{marginBottom: 10}}>
                    <Button type="primary" onClick={this.onclick} >点击加载外部组件</Button>
                </div>
            </div>
            {Page1 && <Page1 text="hello from base" />}
        </div>
    }
}