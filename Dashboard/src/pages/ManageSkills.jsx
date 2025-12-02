import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllSkillSliceErrors, deleteSkill, getAllSkills, resetSkillSliceErrors, updateSkill } from '../store/skillSlice';
import { toast } from 'react-toastify';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';

const ManageSkills = () => {
  const { skills, error, loading, message } = useSelector(state => state.skill);
  const dispatch = useDispatch();
  const [newProficiency, setNewProficiency] = useState(1);

  const handleUpdateSkill = (_id) => {
    dispatch(updateSkill(_id,newProficiency));
  }
  const handleDeleteSkill = (_id) => {
    dispatch(deleteSkill(_id));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSliceErrors());
      dispatch(getAllSkills());
    }
  }, [dispatch, error, loading, message])


  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40 p-5'>
      <Tabs defaultValue="skills">
        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Link to="/">
                <Button className="w-fit cursor-pointer">
                  Retun to Dashboard
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {
                skills && skills.length > 0 ? (skills.map((skill) => {
                  return (
                    <Card key={skill._id}>
                      <CardHeader>
                        <div className="flex items-center justify-between w-full">
                          <CardTitle className="text-2xl">
                            {skill.title}
                          </CardTitle>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Trash2
                                  onClick={() => handleDeleteSkill(skill._id)}
                                  className="h-5 w-5 cursor-pointer hover:text-red-600"
                                />
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                Delete
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardHeader>

                      <CardFooter>
                        <label className='text-2xl mr-2'>
                          Proficiency
                        </label>
                        <Input
                          type="number"
                          defaultValue={skill.proficiency} onChange={(e) => setNewProficiency(e.target.value)}
                          onBlur={() => handleUpdateSkill(skill._id)}
                        />
                      </CardFooter>
                    </Card>
                  )
                })) : <CardTitle className="text-3xl overflow-y-hidden">
                  You have not added any skills
                </CardTitle>
              }
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default ManageSkills
