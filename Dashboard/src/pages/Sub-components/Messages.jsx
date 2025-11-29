import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUser } from '../../store/userSlice'
import { clearAllMessagesSliceError, deleteMessage, getAllMessages, resetMessageSlice } from '../../store/messageSlice'
import SpecialLoadingButton from './SpecialLoadingButton'
import { toast } from "react-toastify"


const Messages = () => {
  const { error, messages, loading, toastMessage } = useSelector((state) => state.messagesStore);
  const dispatch = useDispatch()
  const [messageId, setMessageId] = useState("")
  const handleDeleteMessage = (_id) => {
    dispatch(deleteMessage(_id));
    setMessageId(_id)
  }
  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages())
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllMessagesSliceError())
    }
    if (toastMessage) {
      toast.success(toastMessage);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, messages, loading])

  return (<>
    <div className='min-h-[100vh] sm:gap-4 p-3 sm:pl-20'>
      <Tabs defaultValue="messages">
        <TabsContent value="messages">
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:justify-between sm:flex-row sm:item">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {messages && messages.length > 0 ? (
                messages.map((message) => {
                  return (
                    <Card key={message._id} className="grid gap-2 p-2">
                      <CardDescription className="text-slate-950">
                        <span className='font-medium mr-2'>Sender Name :</span>
                        {message.senderName}

                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className='font-medium mr-2'>Subject :</span>
                        {message.subject}

                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className='font-medium mr-2'>Message :</span>
                        {message.message}
                      </CardDescription>
                      <CardFooter className="justify-end">
                        {
                          loading && messageId === message._id ? <SpecialLoadingButton content="Deleting.." width={"w-32"} /> : <Button className="cursor-pointer w-32" onClick={() => handleDeleteMessage(message._id)}>Delete</Button>
                        }
                      </CardFooter>
                    </Card>
                  )
                })
              ) : <CardHeader>No Messages Found</CardHeader>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </>
  )
}

export default Messages
