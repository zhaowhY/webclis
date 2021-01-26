import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { getDemoData, downloadFile, uploadFile } from 'api/demo.js'

import './index.less'


@inject('counterStore')
@observer
class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentWillReact() {
    console.log('componentWillReact')
  }
  config = {
    navigationBarTitleText: '首页'
  }
  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  getGeneralData = async () => {
    console.log(await getDemoData())
  }

  uplaodFile = () => {
    Taro.chooseImage({
      async success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(await uploadFile({ tempFilePaths }))
      }
    })
  }

  openFile = async () => {
    const tempFilePaths = await downloadFile();
    Taro.openDocument({
      filePath: tempFilePaths,
      fileType: 'docx'
    })
  }

  render() {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Button onClick={this.getGeneralData}>获取普通数据</Button>
        <Button onClick={this.uplaodFile}>上传文件</Button>
        <Button onClick={this.openFile}>下载文件</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index 
