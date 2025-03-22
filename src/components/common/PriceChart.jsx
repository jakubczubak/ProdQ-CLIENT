import React from 'react';
import { NoDataChart } from './NoDataChart';
import { renderChart } from './ChartRenderer';

export const PriceChart = ({ open, onCancel, data }) => {
  if (!open) {
    return null;
  }

  return (
    <div sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      {data.length === 0 ? <NoDataChart onCancel={onCancel} /> : renderChart(data, onCancel)}
    </div>
  );
};