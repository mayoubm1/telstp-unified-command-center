import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Command,
  Brain, 
  Users, 
  Activity, 
  Database, 
  Globe, 
  Zap, 
  Heart,
  Microscope,
  Network,
  Bot,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Cpu,
  Server,
  Monitor,
  Wifi,
  ExternalLink,
  Play,
  Pause,
  Settings,
  BarChart3,
  GitBranch,
  Layers
} from 'lucide-react'
import './App.css'

function App() {
  const [aiAgents, setAiAgents] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [systemStats, setSystemStats] = useState({
    totalHubs: 12,
    activeHubs: 1,
    totalAgents: 0,
    activeProjects: 0
  })

  // Application Hubs Configuration
  const applicationHubs = [
    {
      id: 'm2-3m',
      name: 'M2-3M Research Portal',
      description: 'Advanced research and AI collaboration platform',
      status: 'operational',
      url: 'https://olnow.vercel.app', // This is the live deployed URL based on user's screenshot
      icon: Microscope,
      color: 'bg-green-500',
      agents: 15,
      lastActive: new Date(),
      features: ['AI Agents', 'Research Projects', 'Real-time Analytics', 'Global Network']
    },
    {
      id: 'omnicognitor',
      name: 'OmniCognitor',
      description: 'Multi-platform AI interface and coordination hub',
      status: 'development',
      url: '#',
      icon: Brain,
      color: 'bg-blue-500',
      agents: 0,
      lastActive: null,
      features: ['Multi-AI Platform', 'Cross-platform Chaining', 'Unified Interface']
    },
    {
      id: 'wellness-clinic',
      name: 'Wellness Clinic',
      description: 'Personal health and wellness management system',
      status: 'development',
      url: '#',
      icon: Heart,
      color: 'bg-pink-500',
      agents: 0,
      lastActive: null,
      features: ['Health Monitoring', 'Wellness Plans', 'AI Health Assistant']
    },
    {
      id: 'telemedicine',
      name: 'Telemedicine Hub',
      description: 'Advanced telemedicine and consultation platform',
      status: 'development',
      url: '#',
      icon: Monitor,
      color: 'bg-purple-500',
      agents: 0,
      lastActive: null,
      features: ['Video Consultations', 'Medical Records', 'Appointment Scheduling']
    },
    {
      id: 'ai-tutor',
      name: 'AI Tutor System',
      description: 'Educational AI companion and learning platform',
      status: 'development',
      url: '#',
      icon: Users,
      color: 'bg-yellow-500',
      agents: 0,
      lastActive: null,
      features: ['Personalized Learning', 'Educational Content', 'Progress Tracking']
    },
    {
      id: 'global-network',
      name: 'Global Network Hub',
      description: 'Worldwide connectivity and collaboration platform',
      status: 'planning',
      url: '#',
      icon: Globe,
      color: 'bg-indigo-500',
      agents: 0,
      lastActive: null,
      features: ['Global Connectivity', 'Cross-border Collaboration', 'Network Analytics']
    }
  ]

  // Fetch data from Supabase
  useEffect(() => {
    fetchData()
    
    // Set up real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      fetchData()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setConnectionStatus('connecting')

      // Fetch AI agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('ai_agents')
        .select('*')
        .order('created_at', { ascending: false })

      if (agentsError) throw agentsError

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (projectsError) throw projectsError

      setAiAgents(agentsData || [])
      setProjects(projectsData || [])
      
      // Update system stats
      setSystemStats(prev => ({
        ...prev,
        totalAgents: agentsData?.length || 0,
        activeProjects: projectsData?.length || 0
      }))
      
      setConnectionStatus('connected')
    } catch (error) {
      console.error('Error fetching data:', error)
      setConnectionStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500'
      case 'development': return 'bg-yellow-500'
      case 'planning': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'Operational'
      case 'development': return 'In Development'
      case 'planning': return 'Planning'
      case 'error': return 'Error'
      default: return 'Unknown'
    }
  }

  const ConnectionStatusBadge = () => {
    const statusConfig = {
      connecting: { color: 'bg-yellow-500', text: 'Connecting', icon: Activity },
      connected: { color: 'bg-green-500', text: 'Live', icon: CheckCircle },
      error: { color: 'bg-red-500', text: 'Error', icon: AlertCircle }
    }
    
    const config = statusConfig[connectionStatus]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    )
  }

  const openHub = (hub) => {
    if (hub.url && hub.url !== '#') {
      window.open(hub.url, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Command className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">TELsTP Unified Command Center</h1>
                  <p className="text-sm text-blue-200">League of Extraordinary Gentlemen</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ConnectionStatusBadge />
              <div className="text-sm text-blue-200">
                Last update: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 animate-spin text-blue-400" />
              <span className="text-lg text-white">Initializing Command Center...</span>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-black/20 border-white/10">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
              <TabsTrigger value="hubs" className="text-white data-[state=active]:bg-blue-600">Application Hubs</TabsTrigger>
              <TabsTrigger value="agents" className="text-white data-[state=active]:bg-blue-600">AI Agents</TabsTrigger>
              <TabsTrigger value="projects" className="text-white data-[state=active]:bg-blue-600">Projects</TabsTrigger>
              <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-blue-600">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* System Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-black/20 border-white/10 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Application Hubs</CardTitle>
                    <Layers className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemStats.activeHubs}/{systemStats.totalHubs}</div>
                    <p className="text-xs text-blue-200">Operational/Total</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
                    <Bot className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemStats.totalAgents}</div>
                    <p className="text-xs text-green-200">Active in system</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    <Database className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemStats.activeProjects}</div>
                    <p className="text-xs text-purple-200">Research initiatives</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Network Status</CardTitle>
                    <Globe className="h-4 w-4 text-indigo-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">Global</div>
                    <p className="text-xs text-indigo-200">TELsTP ecosystem</p>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Project */}
              {projects.length > 0 && (
                <Card className="border-2 border-blue-400/50 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-white">{projects[0].name}</CardTitle>
                        <CardDescription className="text-base mt-2 text-blue-200">
                          {projects[0].description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-blue-600 text-white">Featured</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {projects[0].metadata?.apps?.map((app, index) => (
                        <Badge key={index} variant="outline" className="border-white/20 text-white">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* System Health */}
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    System Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>M2-3M Research Portal</span>
                      <div className="flex items-center gap-2">
                        <Progress value={100} className="w-24" />
                        <Badge className="bg-green-600 text-white">100%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database Connection</span>
                      <div className="flex items-center gap-2">
                        <Progress value={100} className="w-24" />
                        <Badge className="bg-green-600 text-white">Optimal</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Network Connectivity</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-24" />
                        <Badge className="bg-green-600 text-white">95%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>AI Agent Response</span>
                      <div className="flex items-center gap-2">
                        <Progress value={98} className="w-24" />
                        <Badge className="bg-green-600 text-white">98%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Application Hubs Tab */}
            <TabsContent value="hubs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applicationHubs.map((hub) => {
                  const Icon = hub.icon
                  return (
                    <Card key={hub.id} className="bg-black/20 border-white/10 text-white hover:bg-black/30 transition-all cursor-pointer" onClick={() => openHub(hub)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${hub.color}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{hub.name}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(hub.status)}`}></div>
                                <span className="text-sm text-gray-300">{getStatusText(hub.status)}</span>
                              </div>
                            </div>
                          </div>
                          {hub.status === 'operational' && (
                            <ExternalLink className="h-4 w-4 text-blue-400" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-4">{hub.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Agents:</span>
                            <span className="text-white">{hub.agents}</span>
                          </div>
                          {hub.lastActive && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Last Active:</span>
                              <span className="text-white">{hub.lastActive.toLocaleDateString()}</span>
                            </div>
                          )}
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {hub.features.slice(0, 2).map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-300">
                                  {feature}
                                </Badge>
                              ))}
                              {hub.features.length > 2 && (
                                <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                                  +{hub.features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* AI Agents Tab */}
            <TabsContent value="agents" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiAgents.map((agent) => (
                  <Card key={agent.id} className="bg-black/20 border-white/10 text-white hover:bg-black/30 transition-all">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/api/placeholder/48/48`} />
                          <AvatarFallback className="bg-blue-600 text-white">
                            <Bot className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${agent.configuration?.mode === 'active' ? 'bg-green-500' : agent.configuration?.mode === 'listening' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                            <span className="text-sm text-gray-300">
                              {agent.configuration?.mode || 'Unknown'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Emotion:</span>
                          <span className="text-white capitalize">{agent.configuration?.emotion || 'Neutral'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Created:</span>
                          <span className="text-white">{new Date(agent.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Hub:</span>
                          <span className="text-white">M2-3M Portal</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-black/20 border-white/10 text-white hover:bg-black/30 transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{project.name}</CardTitle>
                          <CardDescription className="mt-2 text-gray-300">
                            {project.description}
                          </CardDescription>
                        </div>
                        <Badge 
                          className={
                            project.status === 'active' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-white'
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-white">Connected Applications:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.metadata?.apps?.map((app, index) => (
                              <Badge key={index} variant="outline" className="border-white/20 text-white">
                                {app}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                          <span>Theme: {project.metadata?.theme || 'Standard'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      System Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Database Connection</span>
                        <Badge className="bg-green-600 text-white">Optimal</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>API Response Time</span>
                        <Badge className="bg-green-600 text-white">&lt; 200ms</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Real-time Updates</span>
                        <Badge className="bg-green-600 text-white">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>M2-3M Portal</span>
                        <Badge className="bg-green-600 text-white">Operational</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5 text-blue-400" />
                      Network Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>TELsTP Network</span>
                        <Badge className="bg-blue-600 text-white">Connected</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Global Hubs</span>
                        <Badge className="bg-blue-600 text-white">12 Planned</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Sync</span>
                        <Badge className="bg-green-600 text-white">Real-time</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Command Center</span>
                        <Badge className="bg-green-600 text-white">Online</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 text-white md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-purple-400" />
                      Deployment Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>M2-3M Research Portal</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>OmniCognitor Platform</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Telemedicine Hub</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Overall TELsTP Ecosystem</span>
                          <span>35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">
              © 2025 TELsTP - Telemedicine and Life Science Technology Park
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>Powered by</span>
              <Badge variant="outline" className="border-white/20 text-white">League of Extraordinary Gentlemen</Badge>
              <span>&</span>
              <Badge variant="outline" className="border-white/20 text-white">Manus AI</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

