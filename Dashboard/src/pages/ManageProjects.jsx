import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllProjectSliceError, deleteProject, getAllProjects, resetProjectSlice, updateProject } from '../store/projectSlice';
import { toast } from 'react-toastify';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Pen, Trash2 } from "lucide-react"
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
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';


const ManageProjects = () => {
  const { loading, message, error, projects } = useSelector(state => state.project);
  const dispatch = useDispatch();

  const handleDeleteProject = (_id) => {
    dispatch(deleteProject(_id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError())
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, loading])

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
                      Banner
                    </TableHead>
                    <TableHead>
                      Title
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stack
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Deployed
                    </TableHead>
                    <TableHead>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    projects && projects.length > 0 ? (
                      projects.map((project) => {
                        return (<TableRow key={project._id} className="bg-accent">
                          <TableCell>
                            <div>
                              <img src={project.projectImage && project.projectImage.url} alt={project.title}
                                className='w-16 h-16'
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{project.stack}</TableCell>
                          <TableCell className="hidden md:table-cell">{project.deployed === true ? "Yes":"No  "}</TableCell>
                          <TableCell className="flex flex-row items-center gap-3 h-24">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/view/projects/${project._id}`}>
                            <button onClick={() => handleDeleteTimeline(timeli._id)} className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-950 hover:bg-green-600 cursor-pointer">
                            <Eye className='h-5 w-5'/>
                            </button>
                                  </Link>

                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  View
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/update/project/${project._id}`}>
                            <button onClick={() => handleDeleteTimeline(timeli._id)} className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-ywllow-400 cursor-pointer">
                            <Pen className='h-5 w-5'/>
                            </button>
                                  </Link>

                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                 Edit
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                            <button onClick={()=>handleDeleteProject(project._id)} className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600 cursor-pointer" >
                            <Eye className='h-5 w-5'/>
                            </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  Delete
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className=" flex items-center justify-end">
                            
                          </TableCell>
                        </TableRow>)
                      })
                    ) : <TableRow>
                      <TableCell className="sm:text-3xl overflow-hidden">
                        You have not added any project
                      </TableCell>
                    </TableRow>
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

export default ManageProjects
