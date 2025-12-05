import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllTimelineSliceError, deleteTimeline, getAllTimeline, resetTimelineSlice } from '../store/timelineSlice';
import { toast } from 'react-toastify';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {Trash2} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from 'react-router-dom';

const ManageTimeLine = () => {
  const { loading, error, message, timeline } = useSelector(state => state.timeline);
  const dispatch = useDispatch();
  const handleDeleteTimeline = (_id) => {
    dispatch(deleteTimeline(_id));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineSliceError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading])
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40 p-5'>
      <Tabs defaultValue="timeline">
        <TabsContent value="timeline">
          <Card>
            <CardHeader className='flex flex-col sm:flex-row gap-4 sm:justify-between'>
              <CardTitle>
                Manage Your Timeline
              </CardTitle>
              <Link to="/">
                <Button className="cursor-pointer">Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>

                  <TableRow>
                    <TableHead>
                      Title
                    </TableHead>
                    <TableHead>
                      Description
                    </TableHead>
                    <TableHead>
                      From
                    </TableHead>
                    <TableHead className="text-right">
                      To
                    </TableHead>
                    <TableHead className="text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
  {
    timeline && timeline.length > 0 ? (
      timeline.map((timeli) => (
        <TableRow key={timeli._id} className="bg-accent">
          <TableCell className="font-medium">{timeli.title}</TableCell>
          <TableCell className="md:table-cell">{timeli.description}</TableCell>
          <TableCell className="md:table-cell">{timeli.timeline.from}</TableCell>
          <TableCell className="md:table-cell text-right">{timeli.timeline.to ? timeli.timeline.to : "Present"}</TableCell>
          <TableCell className="flex items-center justify-end">
            <button
              onClick={() => handleDeleteTimeline(timeli._id)}
              className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600 cursor-pointer"
            >
              <Trash2 className="h-5 w-5"/>
            </button>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={5} className="sm:text-3xl text-center">
          You have not added any timeline
        </TableCell>
      </TableRow>
    )
  }
</TableBody>

              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ManageTimeLine
