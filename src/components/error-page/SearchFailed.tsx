'use client'
import React from 'react';
import { Button, Result } from 'antd';
import { MehTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function SearchFailed( {description}: {description?: string}) {
    const router = useRouter()
  return (
    <Result
    status="warning"
    icon={<MehTwoTone />}
    title="Not Found!"
    subTitle={description||"No information found at this time."} 
  />
  )
}