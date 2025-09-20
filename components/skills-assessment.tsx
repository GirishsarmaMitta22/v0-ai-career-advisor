"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, User, GraduationCap, Target, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  personalInfo: {
    name: string
    age: string
    location: string
    education: string
    field: string
  }
  interests: string[]
  skills: { [key: string]: number }
  careerGoals: {
    timeframe: string
    workEnvironment: string
    priorities: string[]
  }
}

const skillCategories = {
  technical: [
    "Programming",
    "Data Analysis",
    "Web Development",
    "Mobile Development",
    "AI/Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "Database Management",
  ],
  creative: [
    "Graphic Design",
    "Content Writing",
    "Video Editing",
    "Photography",
    "UI/UX Design",
    "Digital Marketing",
    "Social Media",
    "Copywriting",
  ],
  business: [
    "Project Management",
    "Sales",
    "Marketing",
    "Finance",
    "Operations",
    "Strategy",
    "Leadership",
    "Communication",
  ],
  analytical: [
    "Research",
    "Problem Solving",
    "Critical Thinking",
    "Statistics",
    "Market Analysis",
    "Quality Assurance",
    "Process Improvement",
    "Risk Assessment",
  ],
}

const interestAreas = [
  "Technology & Innovation",
  "Healthcare & Medicine",
  "Education & Training",
  "Finance & Banking",
  "Creative Arts & Media",
  "Business & Entrepreneurship",
  "Science & Research",
  "Social Impact & NGO",
  "Government & Public Service",
  "Sports & Fitness",
  "Travel & Hospitality",
  "Manufacturing & Engineering",
]

export function SkillsAssessment() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<UserProfile>({
    personalInfo: {
      name: "",
      age: "",
      location: "",
      education: "",
      field: "",
    },
    interests: [],
    skills: {},
    careerGoals: {
      timeframe: "",
      workEnvironment: "",
      priorities: [],
    },
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSkillRating = (skill: string, rating: number) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: rating,
      },
    }))
  }

  const handleCareerGoalChange = (field: string, value: string | string[]) => {
    setProfile((prev) => ({
      ...prev,
      careerGoals: {
        ...prev.careerGoals,
        [field]: value,
      },
    }))
  }

  const handlePriorityToggle = (priority: string) => {
    setProfile((prev) => ({
      ...prev,
      careerGoals: {
        ...prev.careerGoals,
        priorities: prev.careerGoals.priorities.includes(priority)
          ? prev.careerGoals.priorities.filter((p) => p !== priority)
          : [...prev.careerGoals.priorities, priority],
      },
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Personal Information</CardTitle>
                  <CardDescription>Tell us about yourself to get started</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={profile.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Select onValueChange={(value) => handlePersonalInfoChange("age", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16-18">16-18 years</SelectItem>
                      <SelectItem value="19-22">19-22 years</SelectItem>
                      <SelectItem value="23-25">23-25 years</SelectItem>
                      <SelectItem value="26-30">26-30 years</SelectItem>
                      <SelectItem value="30+">30+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select onValueChange={(value) => handlePersonalInfoChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select onValueChange={(value) => handlePersonalInfoChange("education", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12th">12th Grade</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">Current Field of Study/Work</Label>
                <Input
                  id="field"
                  placeholder="e.g., Computer Science, Business, Arts, etc."
                  value={profile.personalInfo.field}
                  onChange={(e) => handlePersonalInfoChange("field", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Interests & Passions</CardTitle>
                  <CardDescription>Select areas that genuinely interest you (choose 3-6)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interestAreas.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={profile.interests.includes(interest)}
                      onCheckedChange={() => handleInterestToggle(interest)}
                    />
                    <Label
                      htmlFor={interest}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Skills Assessment</CardTitle>
                  <CardDescription>
                    Rate your proficiency in different skill areas (1 = Beginner, 5 = Expert)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold capitalize text-foreground">{category} Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <div key={skill} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-sm">{skill}</Label>
                          <span className="text-sm text-muted-foreground">
                            {profile.skills[skill] ? `${profile.skills[skill]}/5` : "Not rated"}
                          </span>
                        </div>
                        <RadioGroup
                          value={profile.skills[skill]?.toString() || ""}
                          onValueChange={(value) => handleSkillRating(skill, Number.parseInt(value))}
                          className="flex gap-2"
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <div key={rating} className="flex items-center space-x-1">
                              <RadioGroupItem value={rating.toString()} id={`${skill}-${rating}`} />
                              <Label htmlFor={`${skill}-${rating}`} className="text-xs">
                                {rating}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Career Goals</CardTitle>
                  <CardDescription>Help us understand your career aspirations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Career Timeline</Label>
                <Select onValueChange={(value) => handleCareerGoalChange("timeframe", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When do you want to start your career?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="1-year">Within 1 year</SelectItem>
                    <SelectItem value="2-years">Within 2 years</SelectItem>
                    <SelectItem value="flexible">I'm flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Work Environment</Label>
                <Select onValueChange={(value) => handleCareerGoalChange("workEnvironment", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred work environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Traditional Office</SelectItem>
                    <SelectItem value="remote">Remote Work</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Office + Remote)</SelectItem>
                    <SelectItem value="startup">Startup Environment</SelectItem>
                    <SelectItem value="corporate">Large Corporation</SelectItem>
                    <SelectItem value="freelance">Freelancing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Career Priorities (select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "High Salary",
                    "Work-Life Balance",
                    "Career Growth",
                    "Job Security",
                    "Creative Freedom",
                    "Social Impact",
                    "Learning Opportunities",
                    "Leadership Roles",
                  ].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={priority}
                        checked={profile.careerGoals.priorities.includes(priority)}
                        onCheckedChange={() => handlePriorityToggle(priority)}
                      />
                      <Label htmlFor={priority} className="text-sm font-medium">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  const handleComplete = () => {
    console.log("Assessment completed:", profile)
    // Navigate to recommendations page
    router.push("/recommendations")
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Skills Assessment</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={handleComplete} className="flex items-center gap-2">
              Get My Recommendations
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex items-center gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
