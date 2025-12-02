import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress"
import { clearAllApplicationSliceErrors, deleteApplication, getAllApplication, resetApplicationSliceError } from '../../store/applicationSlice';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';

const Dashboard = () => {
  const { user } = useSelector(state => state.user);
  const { projects } = useSelector(state => state.project);
  const { skills } = useSelector(state => state.skill);
  const { applications,error,message,loading } = useSelector(state => state.application);
  const { timeline } = useSelector(state => state.timeline);

  const dispatch=useDispatch()
  const [appId,setAppId]=useState("")
  const handleDeleteSoftwareApplication = (_id) => {
    setAppId(_id)
    dispatch(deleteApplication(_id))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetApplicationSliceError());
      dispatch(getAllApplication())
    }
  },[dispatch,loading,message,error])
  
  return (
    <>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2'>
          <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4
                '>
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user?.linkedInURL}>
                    <Button className="cursor-pointer">
                      Visit LinkedIn
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>
                    Project Completed
                  </CardTitle>
                  <CardTitle className="text-6xl">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to="/manage/projects">
                    <Button className="cursor-pointer">Manage Projects</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>
                    Skills
                  </CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to="/manage/skills">
                    <Button className="cursor-pointer">Manage Skills</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <Tabs defaultValue="projects">
              <TabsContent value="projects">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>
                      Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Stack</TableHead>
                          <TableHead className="hidden md:table-cell">Deployed</TableHead>
                          <TableHead className=" md:table-cell">Update</TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>{
                        projects && projects.length > 0 ? (
                          projects?.map((project) => {
                            return (
                              <TableRow className="bg-accent" key={project._id}>
                                <TableCell>
                                  <div className='font-semibold'>{project.title}</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{project.stack}</TableCell>
                                <TableCell className="hidden md:table-cell">{project.deployed ? "Yes" : "No"}</TableCell>
                                <TableCell><Link to={`/update/project/${project._id}`}>
                                  <Button className="cursor-pointer px-1 sm:px-3">Update</Button>
                                </Link></TableCell>
                                <TableCell className="text-right"><Link to={project.projectLink ? project.projectLink : ""}>
                                  <Button className="cursor-pointer px-1.5 sm:px-3">Visit</Button>
                                </Link></TableCell>
                              </TableRow>
                            )
                          })
                        ) : <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
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


            <Tabs defaultValue="skills">
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-3 gap-4">
                    {
                      skills && skills.length > 0 ? (
                        skills.map((skill) => {
                          return (
                            <Card key={skill._id}>
                              <CardHeader>
                                {skill.title}
                              </CardHeader>
                              <CardFooter>
                                <Progress value={skill.proficiency} />
                              </CardFooter>
                            </Card>
                          )
                        })
                      ) : <TableRow>
                        <TableCell className="text-3xl overflow-y-hidden">
                          You have not added any project
                        </TableCell>
                      </TableRow>
                    }
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs defaultValue="software">
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4" value="software">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Application</CardTitle>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              Name
                            </TableHead>
                            <TableHead className="md:table-cell">
                              Icon
                            </TableHead>
                            <TableHead className="md:table-cell">
                              Action
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {
                            applications && applications.length > 0 ? (
                              applications.map((application) => {
                                return (
                                  <TableRow className="bg-accent" key={application._id}>
                                    <TableCell>{application.name}</TableCell>
                                    <TableCell>
                                      <img src={application.svg && application.svg.url}
                                        alt={application.name}
                                        className='w-7 h-7'
                                      /></TableCell>
                                    <TableCell>
                                    {
                                      loading && appId === application._id ? <SpecialLoadingButton content={"deleting..."}/> : <Button onClick={() => handleDeleteSoftwareApplication(application._id)} className="cursor-pointer">Delete</Button>
                                    }
                                      
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            ) : <TableRow>
                              <TableCell className="text-md sm:text-3xl overflow-hidden">
                                No software added
                              </TableCell>
                            </TableRow>
                          }
                        </TableBody>
                      </Table>
                    </CardContent>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage/timeline"}>
                      <Button className="cursor-pointer">Manage Timeline</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableHead>Title</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead className="text-right">To</TableHead>
                      </TableHeader>
                      <TableBody>
                        {
                          timeline && timeline.length > 0 ? (
                            timeline.map((timeli)=>{
                              return (<TableRow key={timeli._id} className="bg-accent">
                                  <TableCell className="font-medium">
                                    {timeli.title}
                                  </TableCell>
                                  <TableCell className="md:table-cell">{timeli.timeline.from}</TableCell>
                                  <TableCell className="md:table-cell text-right">{timeli.timeline.to ? timeli.timeline.to : "Present" }</TableCell>
                              </TableRow>)
                            })
                          ) : <TableRow>
                            <TableCell className="text-3xl overflow-hidden">
                              You have not added any timeline
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
        </main >
      </div >
    </>
  )
}

export default Dashboard
