import React, { Component } from 'react';
import { Button, List, DatePicker } from 'antd';

class DemoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   onChange = (date, dateString) => {
     // eslint-disable-next-line no-console
     console.log(date, dateString);
   }

   render() {
     return (
       <div>
         <Button type="primary">Antd 按钮</Button>
         <div style={{ margin: '16px 0px' }}>
           <DatePicker style={{ width: 200 }} onChange={this.onChange} />
         </div>

         <List
           header={<div>Antd 列表</div>}
           footer={<div>Footer</div>}
           bordered
           dataSource={[
             'Racing car sprays burning fuel into crowd.',
             'Japanese princess to wed commoner.',
             'Australian walks 100km after outback crash.',
             'Man charged over missing wedding girl.',
             'Los Angeles battles huge wildfires.',
           ]}
           renderItem={item => (
             <List.Item>
               {item}
             </List.Item>
           )}
         />
       </div>
     );
   }
}

export default DemoList;
