'use client';

import { useState, useEffect } from 'react';
import Loading from '@components/Loading.js';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import tooltipIcon from '@public/tooltip.png';
import { Tooltip } from 'react-tooltip';

const Form = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [currentUsername, setCurrentUsername] = useState('');
    const [formDetails, setFormDetails] = useState({batch: 0, pendingFees: 0});
    const [touched, setTouched] = useState({number: false, age: false, batch: false});

    const mobileNumberRegex = new RegExp(/^[6-9]\d{9}$/g);

    const valid = {
        number: mobileNumberRegex.test(formDetails.number),
        username: currentUsername.length > 3,
        age: formDetails.age >= 18 && formDetails.age <= 65,
        batch: formDetails.batch > 0,
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + '-' + currentDate.getFullYear();

    let lastEnrolledMonth;
    if(formDetails.lastEnrolled){
        const lastEnrolledDate = new Date(formDetails.lastEnrolled);
        lastEnrolledMonth = lastEnrolledDate.getMonth() + '-' + lastEnrolledDate.getFullYear();
    }

    let username = searchParams.get('username');

    if (username === null) username = '';

    const submitUsername = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/getUser?username=${currentUsername}`);
            const data = await response.json();

            if(response.status == 500){
                alert('Something went wrong. Please try again later.')
            }
            else{
                setFormDetails(data);
            }
        }
        catch(err){
            console.log(err);
            alert('Something went wrong. Please try again later.')
        }

        setIsLoading(false);

        router.push(`/form?username=${currentUsername}`);
    };

    const enrollCourse = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        setIsLoading(true);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/updateUserInfo`, {
                method: "POST",
                body: JSON.stringify({
                    username,
                    number: formDetails.number,
                    age: formDetails.age,
                    batch: formDetails.batch
                })
            })

            const data = await response.json();

            if(response.status == 500){
                alert('Something went wrong. Please try again later.')
            }
            else{
                setFormDetails(data);
            }
        }
        catch(err){
            console.log(err);
            alert('Something went wrong. Please try again later.');
        }

        setIsLoading(false);
    }

    const payFees = async (event) => {
        event.preventDefault();

        if (isLoading) return;

        setIsLoading(true);

        const paymentStatus = confirm("Make payment success?");

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/makePayment`, {
                method: "POST",
                body: JSON.stringify({
                    username,
                    paymentStatus
                })
            });

            const data = await response.json();

            if(response.status == 500){
                alert('Something went wrong. Please try again later.');
            }
            else{
                setFormDetails(data);
                alert("Payment was success.")
            }
        }
        catch(err){
            console.log(err);
            alert('Something went wrong. Please try again later.');
        }

        setIsLoading(false);
    };

    const updateFormDetails = (field_name, value) => {
        setFormDetails((prevState) => ({ ...prevState, [field_name]: value }));
    };

    const updateTouched = (field_name) => {
        setTouched((prevState) => ({ ...prevState, [field_name]: true }))
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true);

            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/getUser?username=${username}`);
                const jsonData = await response.json();

                setFormDetails(jsonData);
            }
            catch(err){
                console.log(err);
            }

            setIsLoading(false);
        }

        if(username.length > 0)
            fetchUserDetails();
    }, []);

    return (
        <div className='flex grow items-center justify-center'>
            {isLoading ? (
                <Loading color='black'></Loading>
            ) : (
                <div>
                    {username.length < 4 ? (
                        <div className='flex flex-col space-y-4'>
                            <input
                                type='text'
                                placeholder='Enter username'
                                className='w-72 rounded-md border-2 border-gray-400 p-2 outline-black'
                                value={currentUsername}
                                onChange={(e) => setCurrentUsername(e.target.value.trim())}
                            ></input>
                            <button
                                className='rounded-md bg-green-600 p-2 text-white duration-300 hover:scale-105 hover:bg-green-900 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-500'
                                onClick={submitUsername}
                                disabled={!valid.username}
                            >
                                Let&#39;s go 🧘‍♂️
                            </button>
                        </div>
                    ) : (
                        <form className='flex flex-col space-y-4'>
                            <div>
                                <p className='text-3xl font-semibold text-gray-600'>Hi {username}👋</p>
                                <p className='font-semibold text-gray-600'>
                                    You can select your preferences and pay fees here.
                                </p>
                            </div>

                            <div className='flex w-full items-center space-x-4'>
                                <p className='min-w-[3.5rem] font-semibold text-gray-600'>Mobile</p>
                                <input
                                    type='number'
                                    className='w-full rounded-md border-2 border-gray-400 p-1'
                                    value={formDetails.number}
                                    onChange={(event) => updateFormDetails('number', event.target.value)}
                                    name={'number'}
                                    onBlur={() => updateTouched('number')}
                                ></input>
                            </div>

                            {!valid.number && touched.number && (
                                <div className='relative top-[-1rem] flex w-full items-center space-x-4'>
                                    <p className='min-w-[3.5rem] font-semibold text-gray-600'></p>
                                    <p className='min-w-[3.5rem] text-sm font-semibold text-red-600'>
                                        Please enter a valid Mobile Number.
                                    </p>
                                </div>
                            )}

                            <div className='flex w-full items-center space-x-4'>
                                <p className='min-w-[3.5rem] font-semibold text-gray-600'>Age</p>
                                <input
                                    type='number'
                                    min={18}
                                    max={65}
                                    step={1}
                                    className='w-full rounded-md border-2 border-gray-400 p-1'
                                    value={formDetails.age}
                                    onChange={(event) => updateFormDetails('age', event.target.value)}
                                    name={'age'}
                                    onBlur={() => updateTouched('age')}
                                ></input>
                            </div>

                            {!valid.age && touched.age && (
                                <div className='relative top-[-1rem] flex w-full items-center space-x-4'>
                                    <p className='min-w-[3.5rem] font-semibold text-gray-600'></p>
                                    <p className='min-w-[3.5rem] text-sm font-semibold text-red-600'>
                                        Age must be between 18 and 65.
                                    </p>
                                </div>
                            )}

                            <div className='flex w-full items-center space-x-4'>
                                <p className='min-w-[3.5rem] font-semibold text-gray-600'>Batch</p>
                                <select
                                    name='batch'
                                    className='w-full rounded-md border-2 border-gray-400 p-1 '
                                    value={formDetails.batch}
                                    onChange={(event) => updateFormDetails('batch', event.target.value)}
                                    invalid={true}
                                    onBlur={() => updateTouched('batch')}
                                    disabled={currentMonth == lastEnrolledMonth}
                                >
                                    <option value='0'>None (Please select a Batch)</option>
                                    <option value='1'>6-7 AM 🌅</option>
                                    <option value='2'>7-8 AM ⛅</option>
                                    <option value='3'>7-8 AM ☀️</option>
                                    <option value='4'>5-6 PM 🌇</option>
                                </select>

                                {(currentMonth == lastEnrolledMonth) && <Image src={tooltipIcon} height={24} className='hover:cursor-pointer' data-tooltip-id="batch-tooltip" data-tooltip-content="Cannot change batch for the current month after enrolling in course."></Image>}
                                <Tooltip id='batch-tooltip' className='z-10'></Tooltip>
                            </div>

                            {!valid.batch && touched.batch && (
                                <div className='relative top-[-1rem] flex w-full items-center space-x-4'>
                                    <p className='min-w-[3.5rem] font-semibold text-gray-600'></p>
                                    <p className='min-w-[3.5rem] text-sm font-semibold text-red-600'>
                                        Please select a batch.
                                    </p>
                                </div>
                            )}

                            <div className='flex w-full items-center space-x-4'>
                                <button
                                    className='w-full rounded-md bg-blue-600 p-2 text-white duration-300 hover:scale-105 hover:bg-blue-900 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-500'
                                    onClick={enrollCourse}
                                    disabled={!valid.number || !valid.age || !valid.batch}
                                >
                                    {(currentMonth == lastEnrolledMonth) ? 'Update Info' : 'Enroll Now'}
                                </button>
                                <button
                                    className='w-full rounded-md bg-green-600 p-2 text-white duration-300 hover:scale-105 hover:bg-green-900 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-500'
                                    onClick={payFees}
                                    disabled={!valid.number || !valid.age || !valid.batch || formDetails.pendingFees == 0}
                                >
                                    Pay ₹{formDetails.pendingFees} 💰
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default Form;
