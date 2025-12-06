import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Contact = () => {
    const [senderName, setSenderName] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/send-message`, { senderName, subject, message }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            toast.success(res.data?.message);
            setSenderName("");
            setSubject("");
            setMessage("");
            setLoading(false)
        }).catch(error => {
            toast.error(error.response?.data?.message)
            setLoading(false)
        })
    }

    return (
        <div className='overflow-x-hidden'>
            <div className='relative mb-8'>
                <h1 className='flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-14 md:leading-[67px] lg:leading-[90px] tracking-[8px] mx-auto w-fit font-extrabold ' style={{ background: "hsl(222.2 84% 4.9%" }}> Contact
                    <span className='text-tubeLight-effect font-extrabold'>Me</span>
                </h1>
            </div>

            <form onSubmit={handleSendMessage} className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2 px-1.5'>
                    <Label htmlFor="name" className="text-xl">Your Name</Label>
                    <Input
                        id="name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your Name"
                    />
                </div>
                <div className='flex flex-col gap-2 px-1.5'>
                    <Label htmlFor="subject" className="text-xl">Subject</Label>
                    <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                    />
                </div>
                <div className='flex flex-col gap-2 px-1.5'>
                    <Label htmlFor="message" className="text-xl">Message</Label>
                    <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message...."
                    />
                </div>
                <div className='flex justify-end'>
                    {
                        !loading ? <Button type="submit" className="cursor-pointer w-full sm:w-52">
                                    Send Message
                        </Button> : "Sending..."
                    }
                </div>
            </form>
        </div>
    )
}

export default Contact
