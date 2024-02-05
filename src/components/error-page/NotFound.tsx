'use client'
import React from 'react';
import { Button, Result } from 'antd';
import { MehTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function NotFound( {description}: {description?: string}) {
    const router = useRouter()
  return (
    <Result
    status="warning"
    icon={<MehTwoTone />}
    title="Not Found!"
    subTitle={description||"No information found at this time. You may need to refresh."} 
    extra={[
      <Button type="primary" key="console" className=' bg-blue-500' onClick={()=>window.location.reload()}>
        Refresh
      </Button>,
      <Button key="buy" onClick={()=>router.back()}>Back</Button>,
    ]}
  />
  )
}