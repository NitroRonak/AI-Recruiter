"use client";
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormContainer from './_components/FormContainer';
const CreateInterview = () => {
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const onHandleInputChange = (field: string,value:string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }
  return (
    <div className='mt-5 px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex items-center gap-5'>
        <ArrowLeft onClick={() => router.back()} className='h-10 w-10 cursor-pointer'/>
        <h2 className='font-bold text-2xl'>Create New Interview</h2>
        
      </div>
      <Progress value={step * 33.33} className='mt-5 w-full'/>
      <FormContainer onHandleInputChange={onHandleInputChange}/>
    </div>
  )
}

export default CreateInterview
