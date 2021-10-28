import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

export default observer(() => {
  const { demo: { update } } = window.getStore();

  useEffect(() => {
    update({ value: (new Date()).toString() });
  }, [update]);
  const { value } = window.getStore('demo');
  return (
    <div>
      {value}
    </div>
  );
});
