//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import { NoDataChart } from './NoDataChart';
import { renderChart } from './ChartRenderer';

export const PriceChart = ({ open, onCancel, data }) => {
  if (!open) {
    return null;
  }

  return data.length === 0 ? <NoDataChart onCancel={onCancel} /> : renderChart(data, onCancel);
};
