import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

export default observer(() => {
  const { demo: { update } } = window.useStore();

  useEffect(() => {
    update({ value: (new Date()).toString() });
  }, [update]);
  const { value } = window.useStore('demo');
  return (
    <div>
      {value}
    </div>
  );
});
