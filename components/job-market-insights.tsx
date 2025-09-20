"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, MapPin, DollarSign, Users, Building, Briefcase, Target, AlertCircle, Star } from "lucide-react"

const salaryTrends = [
  { year: "2020", "Software Engineer": 8, "Data Analyst": 6, "Digital Marketing": 4, "Product Manager": 12 },
  { year: "2021", "Software Engineer": 9, "Data Analyst": 7, "Digital Marketing": 5, "Product Manager": 14 },
  { year: "2022", "Software Engineer": 11, "Data Analyst": 8, "Digital Marketing": 6, "Product Manager": 16 },
  { year: "2023", "Software Engineer": 13, "Data Analyst": 9, "Digital Marketing": 7, "Product Manager": 18 },
  { year: "2024", "Software Engineer": 15, "Data Analyst": 11, "Digital Marketing": 8, "Product Manager": 20 },
]

const jobDemand = [
  { role: "Full Stack Developer", demand: 95, growth: "+28%", openings: 12500 },
  { role: "Data Scientist", demand: 88, growth: "+22%", openings: 8200 },
  { role: "Product Manager", demand: 82, growth: "+18%", openings: 6800 },
  { role: "UI/UX Designer", demand: 78, growth: "+15%", openings: 5400 },
  { role: "Digital Marketing", demand: 72, growth: "+12%", openings: 9600 },
  { role: "Business Analyst", demand: 68, growth: "+10%", openings: 7200 },
]

const industryGrowth = [
  { name: "Technology", value: 35, color: "#8b5cf6" },
  { name: "Healthcare", value: 18, color: "#06b6d4" },
  { name: "Finance", value: 15, color: "#10b981" },
  { name: "E-commerce", value: 12, color: "#f59e0b" },
  { name: "Education", value: 10, color: "#ef4444" },
  { name: "Others", value: 10, color: "#6b7280" },
]

const cityData = [
  {
    city: "Bangalore",
    jobs: 45000,
    avgSalary: "₹12.5 LPA",
    growth: "+25%",
    topIndustries: ["Technology", "Startups", "R&D"],
    costOfLiving: "High",
  },
  {
    city: "Mumbai",
    jobs: 38000,
    avgSalary: "₹11.8 LPA",
    growth: "+18%",
    topIndustries: ["Finance", "Media", "Consulting"],
    costOfLiving: "Very High",
  },
  {
    city: "Delhi NCR",
    jobs: 42000,
    avgSalary: "₹11.2 LPA",
    growth: "+20%",
    topIndustries: ["Government", "Consulting", "Technology"],
    costOfLiving: "High",
  },
  {
    city: "Pune",
    jobs: 28000,
    avgSalary: "₹10.5 LPA",
    growth: "+22%",
    topIndustries: ["Technology", "Automotive", "Manufacturing"],
    costOfLiving: "Medium",
  },
  {
    city: "Hyderabad",
    jobs: 32000,
    avgSalary: "₹10.8 LPA",
    growth: "+24%",
    topIndustries: ["Technology", "Pharma", "Biotech"],
    costOfLiving: "Medium",
  },
]

const emergingRoles = [
  {
    title: "AI/ML Engineer",
    growth: "+45%",
    avgSalary: "₹18-35 LPA",
    description: "Design and implement machine learning models and AI systems",
    skills: ["Python", "TensorFlow", "PyTorch", "Statistics"],
    companies: ["Google", "Microsoft", "Flipkart", "Zomato"],
  },
  {
    title: "Cloud Architect",
    growth: "+38%",
    avgSalary: "₹20-40 LPA",
    description: "Design and manage cloud infrastructure and migration strategies",
    skills: ["AWS", "Azure", "Docker", "Kubernetes"],
    companies: ["Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    title: "Cybersecurity Analyst",
    growth: "+32%",
    avgSalary: "₹12-25 LPA",
    description: "Protect organizations from cyber threats and security breaches",
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment"],
    companies: ["Wipro", "HCL", "IBM", "Accenture"],
  },
  {
    title: "Product Designer",
    growth: "+28%",
    avgSalary: "₹10-22 LPA",
    description: "Create user-centered designs for digital products and services",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    companies: ["Swiggy", "PhonePe", "Paytm", "Ola"],
  },
]

export function JobMarketInsights() {
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Job Market Insights</h1>
          <p className="text-muted-foreground text-lg">
            Real-time data and trends to help you make informed career decisions
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi NCR</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Salary Trends</TabsTrigger>
            <TabsTrigger value="cities">City Analysis</TabsTrigger>
            <TabsTrigger value="emerging">Emerging Roles</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Job Openings</p>
                      <p className="text-2xl font-bold">2.4M+</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">+15% from last year</span>
                      </div>
                    </div>
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Salary Growth</p>
                      <p className="text-2xl font-bold">18%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">Year over year</span>
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Companies</p>
                      <p className="text-2xl font-bold">45K+</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">+12% hiring</span>
                      </div>
                    </div>
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Remote Jobs</p>
                      <p className="text-2xl font-bold">35%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">+8% increase</span>
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Demand Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>High Demand Roles</CardTitle>
                  <CardDescription>Most in-demand positions in the current market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobDemand.map((job, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{job.role}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {job.growth}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {job.openings.toLocaleString()} jobs
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${job.demand}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Industry Distribution</CardTitle>
                  <CardDescription>Job opportunities by industry sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={industryGrowth}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {industryGrowth.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {industryGrowth.map((industry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: industry.color }} />
                        <span className="text-sm">{industry.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6 mt-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Salary Growth Trends</CardTitle>
                <CardDescription>Average salary progression over the years (in LPA)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salaryTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="year" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="Software Engineer" stroke="#8b5cf6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Data Analyst" stroke="#06b6d4" strokeWidth={2} />
                      <Line type="monotone" dataKey="Digital Marketing" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="Product Manager" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                    <span className="text-sm">Software Engineer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
                    <span className="text-sm">Data Analyst</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                    <span className="text-sm">Digital Marketing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <span className="text-sm">Product Manager</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cities" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityData.map((city, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {city.city}
                      </CardTitle>
                      <Badge variant={city.growth.startsWith("+") ? "default" : "secondary"}>{city.growth}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Job Openings</p>
                        <p className="text-lg font-semibold">{city.jobs.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Salary</p>
                        <p className="text-lg font-semibold">{city.avgSalary}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Top Industries</p>
                      <div className="flex flex-wrap gap-1">
                        {city.topIndustries.map((industry, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cost of Living</span>
                      <Badge
                        variant={
                          city.costOfLiving === "Very High"
                            ? "destructive"
                            : city.costOfLiving === "High"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {city.costOfLiving}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emerging" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {emergingRoles.map((role, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          {role.title}
                        </CardTitle>
                        <CardDescription className="mt-2">{role.description}</CardDescription>
                      </div>
                      <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                        {role.growth}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-medium">{role.avgSalary}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Hiring Companies</p>
                      <div className="flex flex-wrap gap-1">
                        {role.companies.map((company, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button size="sm" className="w-full">
                      <Target className="h-4 w-4 mr-2" />
                      Explore Learning Path
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border bg-card border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Market Insight</h3>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      These emerging roles represent the fastest-growing opportunities in the Indian job market. Early
                      skill development in these areas can provide significant career advantages and higher compensation
                      packages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
