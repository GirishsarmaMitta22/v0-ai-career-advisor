"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, User, Search, BookOpen, Star, Eye } from "lucide-react"

const videoData = {
  "Software Engineering": [
    {
      id: 1,
      title: "Complete JavaScript Course for Beginners",
      instructor: "Tech Academy",
      duration: "12:45:30",
      views: "2.1M",
      rating: 4.8,
      level: "Beginner",
      thumbnail: "/javascript-programming-tutorial.jpg",
      description: "Master JavaScript fundamentals with hands-on projects and real-world examples.",
      tags: ["JavaScript", "Programming", "Web Development"],
    },
    {
      id: 2,
      title: "React.js Full Course - Build Modern Web Apps",
      instructor: "Code Masters",
      duration: "8:30:15",
      views: "1.8M",
      rating: 4.9,
      level: "Intermediate",
      thumbnail: "/react-javascript-framework-tutorial.jpg",
      description: "Learn React.js from scratch and build professional web applications.",
      tags: ["React", "Frontend", "JavaScript"],
    },
    {
      id: 3,
      title: "System Design Interview Preparation",
      instructor: "Engineering Pro",
      duration: "6:20:45",
      views: "950K",
      rating: 4.7,
      level: "Advanced",
      thumbnail: "/system-design-architecture-tutorial.jpg",
      description: "Master system design concepts for technical interviews at top companies.",
      tags: ["System Design", "Interviews", "Architecture"],
    },
  ],
  "Data Science": [
    {
      id: 4,
      title: "Python for Data Science Complete Course",
      instructor: "Data Academy",
      duration: "15:30:20",
      views: "1.5M",
      rating: 4.8,
      level: "Beginner",
      thumbnail: "/python-data-science-pandas-tutorial.jpg",
      description: "Learn Python programming specifically for data science applications.",
      tags: ["Python", "Data Science", "Pandas"],
    },
    {
      id: 5,
      title: "Machine Learning A-Z: Complete Guide",
      instructor: "ML Experts",
      duration: "20:15:10",
      views: "2.3M",
      rating: 4.9,
      level: "Intermediate",
      thumbnail: "/machine-learning-algorithms-tutorial.jpg",
      description: "Comprehensive machine learning course covering all major algorithms.",
      tags: ["Machine Learning", "AI", "Algorithms"],
    },
    {
      id: 6,
      title: "Deep Learning with TensorFlow",
      instructor: "Neural Networks Pro",
      duration: "18:45:30",
      views: "890K",
      rating: 4.6,
      level: "Advanced",
      thumbnail: "/tensorflow-deep-learning-neural-networks.jpg",
      description: "Master deep learning concepts and build neural networks with TensorFlow.",
      tags: ["Deep Learning", "TensorFlow", "Neural Networks"],
    },
  ],
  "Digital Marketing": [
    {
      id: 7,
      title: "Digital Marketing Masterclass 2024",
      instructor: "Marketing Guru",
      duration: "10:20:15",
      views: "1.2M",
      rating: 4.7,
      level: "Beginner",
      thumbnail: "/digital-marketing-social-media-strategy.jpg",
      description: "Complete digital marketing course covering SEO, social media, and PPC.",
      tags: ["Digital Marketing", "SEO", "Social Media"],
    },
    {
      id: 8,
      title: "Google Ads & Facebook Ads Mastery",
      instructor: "Ad Specialist",
      duration: "7:45:20",
      views: "680K",
      rating: 4.8,
      level: "Intermediate",
      thumbnail: "/google-ads-facebook-advertising-tutorial.jpg",
      description: "Master paid advertising on Google and Facebook platforms.",
      tags: ["Google Ads", "Facebook Ads", "PPC"],
    },
  ],
}

const categories = Object.keys(videoData)

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("Software Engineering")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("All")

  const currentVideos = videoData[selectedCategory as keyof typeof videoData] || []

  const filteredVideos = currentVideos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLevel = selectedLevel === "All" || video.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Video Learning Library</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Curated video courses and tutorials to accelerate your career growth
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                      <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button size="lg" className="gap-2">
                              <Play className="h-5 w-5" />
                              Play Video
                            </Button>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-black/70 text-white">
                              {video.duration}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                            <Badge
                              variant={
                                video.level === "Beginner"
                                  ? "secondary"
                                  : video.level === "Intermediate"
                                    ? "default"
                                    : "destructive"
                              }
                              className="shrink-0"
                            >
                              {video.level}
                            </Badge>
                          </div>
                          <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {video.instructor}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {video.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {video.rating}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {video.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 gap-2">
                              <Play className="h-4 w-4" />
                              Watch Now
                            </Button>
                            <Button variant="outline" size="icon">
                              <BookOpen className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredVideos.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-muted-foreground mb-4">No videos found matching your criteria</div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedLevel("All")
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            {/* Featured Playlists */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Featured Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Full-Stack Development
                    </CardTitle>
                    <CardDescription>Complete journey from frontend to backend development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      12 videos • 45 hours • Beginner to Advanced
                    </div>
                    <Button className="w-full">Start Learning Path</Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Data Science Mastery
                    </CardTitle>
                    <CardDescription>From Python basics to advanced machine learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">15 videos • 60 hours • Beginner to Expert</div>
                    <Button className="w-full">Start Learning Path</Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Digital Marketing Pro
                    </CardTitle>
                    <CardDescription>Master all aspects of modern digital marketing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">8 videos • 30 hours • Beginner to Advanced</div>
                    <Button className="w-full">Start Learning Path</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
