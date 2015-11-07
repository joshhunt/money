import React from 'react';
import numeral from 'numeral';

export const Currency = ({value}) => {
  const moolah = numeral(Math.ceil(value)).format('$0,0[.]00');
  return <strong>{moolah}</strong>;
}

export const Percent = ({value}) => {
  return <span>{numeral(value).format('0%')}</span>;
}