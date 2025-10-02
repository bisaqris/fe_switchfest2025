import React, { useState } from 'react'
import CheckboxComponents from '@/components/form/form-elements/CheckboxComponents'
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Checkbox from '@/components/form/input/Checkbox';

export default function SearchOption() {
    const [rememberMe, setRememberMe] = useState(false);
    return (
        <>
            <div className='w-1/3 flex flex-col '>
                <div className='flex flex-col gap-y-4 p-4 border border-gray-200 rounded-lg shadow-sm'>
                    <Input
                        id='Search'
                        type='Search'
                        placeholder='Search'
                    />
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-row gap-2'>
                            <Checkbox id="rememberMe" checked={rememberMe} onChange={setRememberMe} />
                            <Label htmlFor="rememberMe" className="ml-2 mb-0 font-normal cursor-pointer">
                                Ingat saya
                            </Label>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Checkbox id="rememberMe" checked={rememberMe} onChange={setRememberMe} />
                            <Label htmlFor="rememberMe" className="ml-2 mb-0 font-normal cursor-pointer">
                                Ingat saya
                            </Label>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Checkbox id="rememberMe" checked={rememberMe} onChange={setRememberMe} />
                            <Label htmlFor="rememberMe" className="ml-2 mb-0 font-normal cursor-pointer">
                                Ingat saya
                            </Label>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Checkbox id="rememberMe" checked={rememberMe} onChange={setRememberMe} />
                            <Label htmlFor="rememberMe" className="ml-2 mb-0 font-normal cursor-pointer">
                                Ingat saya
                            </Label>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Checkbox id="rememberMe" checked={rememberMe} onChange={setRememberMe} />
                            <Label htmlFor="rememberMe" className="ml-2 mb-0 font-normal cursor-pointer">
                                Ingat saya
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
