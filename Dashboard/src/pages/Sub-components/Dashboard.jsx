import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
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

const Dashboard = () => {
  const { user } = useSelector(state => state.user)
  const { projects } = useSelector(state => state.project)
  const { skills } = useSelector(state => state.skill)
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
                                <TableCell className="hidden md:table-cell">{project.deployed ? "Yes":"No"}</TableCell>
                                <TableCell><Link to={`/update/project/${project._id}`}>
                                  <Button className="cursor-pointer">Update</Button>
                                </Link></TableCell>
                                <TableCell className="text-right"><Link to={project.projectLink ? project.projectLink:""}>
                                  <Button className="cursor-pointer">Visit</Button>
                                </Link></TableCell>
                              </TableRow>
                            )
                          })
                        ) : ("")
                      }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
