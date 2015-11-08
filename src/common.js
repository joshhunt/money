import React from 'react';
import numeral from 'numeral';

export const Currency = ({value}) => {
    value = value || '';
	const val = typeof value == 'number' ? value : parseFloat(value.replace(/[^\d.-]/g, ''));
	if (!parseFloat(val)) {
		return <span>{value}</span>
	}

	const moolah = numeral(Math.ceil(val)).format('$0,0[.]00');
	return <span>{moolah}</span>;
}

export const Percent = ({value}) => {
	return <span>{numeral(value).format('0%')}</span>;
}