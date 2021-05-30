import React from 'react';

export default ((props) => {
  const { name, ...others } = props;

  return (
    <svg
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="currentColor"
      overflow="hidden"
      {...others}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
});

/**
 * @name svg文件名
 */
// <SvgIcon
//   name="icon"
//   style={{
//     width: 100,
//     height: 100,
//     border: '1px solid red'
//   }}
// ></SvgIcon>;
