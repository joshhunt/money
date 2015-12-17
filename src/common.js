import React from 'react';
import numeral from 'numeral';

export const Currency = ({value, doNotRound}) => {
  value = value || '';

	const val = typeof value == 'number' ? value : parseFloat(value.replace(/[^\d.-]/g, ''));

	if (!parseFloat(val)) {
		return <span>{value}</span>
	}


	const moolah = numeral(( doNotRound ? val : Math.ceil(val) )).format('$0,0[.]00');

  console.info('Currency:', value, '=>', moolah);
	return <span>{moolah}</span>;
}

export const Percent = ({value}) => {
	return <span>{numeral(value).format('0%')}</span>;
}
