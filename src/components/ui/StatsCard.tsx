import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, bgColor, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className={`${bgColor} p-3 rounded-lg`}>
            {icon}
          </div>
          {trend && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              trend.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{value}</h3>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
    </div>
  );
}