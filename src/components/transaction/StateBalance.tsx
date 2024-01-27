'use client'
import React from "react";

type Props = {};

export default function StateBalance({}: Props) {
  return (
    <div className="stats bg-cyan-800 text-white shadow-lg">
      <div className="stat">
        <div className="stat-title text-xs text-gray-50">Account balance</div>
        <div className="stat-value text-3xl font-sans font-bold">$89,400</div>
        <div className="stat-actions">
          <button className="btn btn-xs btn-success">Add funds</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title text-xs text-gray-50 " >Current balance</div>
        <div className="stat-value text-3xl font-sans font-bold">$89,400</div>
        <div className="stat-actions flex gap-2">
          <button className="btn btn-xs">Withdrawal</button>
          <button className="btn btn-xs">deposit</button>
        </div>
      </div>
    </div>
  );
}
