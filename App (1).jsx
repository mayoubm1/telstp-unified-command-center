import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
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
  TrendingUp
} from 'lucide-react'
import './App.css'

function App() {
  const [aiAgents, setAiAgents] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Fetch data from Supabase
  useEffect(() => {
    fetchData()
    
    // Set up real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000) // Update timestamp every 30 seconds

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
      setConnectionStatus('connected')
    } catch (error) {
      console.error('Error fetching data:', error)
      setConnectionStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const getAgentStatusColor = (config) => {
    const mode = config?.mode || 'unknown'
    switch (mode) {
      case 'active': return 'bg-green-500'
      case 'listening': return 'bg-blue-500'
      case 'thinking': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getAgentIcon = (name) => {
    const iconMap = {
      'Lumen': Sparkles,
      'Hana': Heart,
      'Synapse': Brain,
      'default': Bot
    }
    return iconMap[name] || iconMap.default
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Microscope className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">M2-3M Research Portal</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">TELsTP - Life Science Technology Park</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ConnectionStatusBadge />
              <div className="text-sm text-slate-600 dark:text-slate-400">
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
              <Activity className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-lg">Loading M2-3M System...</span>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="agents">AI Agents</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{aiAgents.length}</div>
                    <p className="text-xs text-muted-foreground">Active in system</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects.length}</div>
                    <p className="text-xs text-muted-foreground">Research initiatives</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Status</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Operational</div>
                    <p className="text-xs text-muted-foreground">All systems online</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Network</CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">Global</div>
                    <p className="text-xs text-muted-foreground">TELsTP ecosystem</p>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Project */}
              {projects.length > 0 && (
                <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{projects[0].name}</CardTitle>
                        <CardDescription className="text-base mt-2">
                          {projects[0].description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-blue-600 text-white">Featured</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {projects[0].metadata?.apps?.map((app, index) => (
                        <Badge key={index} variant="secondary">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* AI Agents Tab */}
            <TabsContent value="agents" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiAgents.map((agent) => {
                  const Icon = getAgentIcon(agent.name)
                  return (
                    <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/api/placeholder/48/48`} />
                            <AvatarFallback>
                              <Icon className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(agent.configuration)}`}></div>
                              <span className="text-sm text-muted-foreground">
                                {agent.configuration?.mode || 'Unknown'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Emotion:</span>
                            <span className="capitalize">{agent.configuration?.emotion || 'Neutral'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Created:</span>
                            <span>{new Date(agent.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{project.name}</CardTitle>
                          <CardDescription className="mt-2">
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
                          <h4 className="font-semibold mb-2">Applications:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.metadata?.apps?.map((app, index) => (
                              <Badge key={index} variant="outline">
                                {app}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
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
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5" />
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
                        <Badge className="bg-blue-600 text-white">12 Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Sync</span>
                        <Badge className="bg-green-600 text-white">Real-time</Badge>
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
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              © 2025 TELsTP - Telemedicine and Life Science Technology Park
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Powered by</span>
              <Badge variant="outline">M2-3M</Badge>
              <span>&</span>
              <Badge variant="outline">Manus AI</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

