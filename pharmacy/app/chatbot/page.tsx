"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, Edit, Copy, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample knowledge base data
const knowledgeBases = [
  { id: 1, name: "General Pharmacy FAQ", articles: 25, lastUpdated: "2023-06-15" },
  { id: 2, name: "Prescription Information", articles: 40, lastUpdated: "2023-06-10" },
  { id: 3, name: "COVID-19 Resources", articles: 15, lastUpdated: "2023-06-18" },
]

export default function ChatbotPage() {
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to VOXO Pharmacy! How can I assist you today?")
  const [chatbotName, setChatbotName] = useState("VOXO Assistant")
  const [isActive, setIsActive] = useState(true)
  const [newKnowledgeBase, setNewKnowledgeBase] = useState({ name: "", description: "" })
  const [isCopied, setIsCopied] = useState(false)

  // Sample embed code (you would generate this dynamically based on the actual settings)
  const embedCode = `
<script>
window.intercomSettings = {
  api_base: "https://api-iam.intercom.io",
  app_id: "YOUR_APP_ID_HERE"
};
</script>
<script>
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/YOUR_APP_ID_HERE';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
`.trim()

  const handleSaveSettings = () => {
    console.log("Saving chatbot settings...")
    // Here you would typically save the settings to your backend
    toast({
      title: "Settings saved",
      description: "Your chatbot settings have been updated successfully.",
    })
  }

  const handleAddKnowledgeBase = () => {
    console.log("Adding new knowledge base:", newKnowledgeBase)
    // Here you would typically add the new knowledge base to your backend
    setNewKnowledgeBase({ name: "", description: "" })
    toast({
      title: "Knowledge Base Added",
      description: "Your new knowledge base has been created successfully.",
    })
  }

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setIsCopied(true)
      toast({
        title: "Embed Code Copied",
        description: "The embed code has been copied to your clipboard.",
      })
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Chatbot Management</h1>
        <p className="text-muted-foreground">Configure and manage your pharmacy chatbot</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="general" className="flex-1 sm:flex-none">
            General Settings
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex-1 sm:flex-none">
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 sm:flex-none">
            Analytics
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure the basic settings for your chatbot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="chatbot-name">Chatbot Name</Label>
                  <Input id="chatbot-name" value={chatbotName} onChange={(e) => setChatbotName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Textarea
                    id="welcome-message"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="chatbot-active" checked={isActive} onCheckedChange={setIsActive} />
                  <Label htmlFor="chatbot-active">Chatbot Active</Label>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="embed-code">Embed Code</Label>
                  <div className="relative">
                    <Textarea id="embed-code" value={embedCode} readOnly className="h-[200px] font-mono text-sm" />
                    <Button variant="secondary" size="sm" className="absolute right-2 top-2" onClick={copyEmbedCode}>
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {isCopied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Copy this code and paste it into your website's HTML, just before the closing {"</body>"} tag.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Management</CardTitle>
                <CardDescription>Manage the knowledge bases used by your chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Articles</TableHead>
                        <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {knowledgeBases.map((kb) => (
                        <TableRow key={kb.id}>
                          <TableCell className="font-medium">{kb.name}</TableCell>
                          <TableCell className="hidden sm:table-cell">{kb.articles}</TableCell>
                          <TableCell className="hidden md:table-cell">{kb.lastUpdated}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Knowledge Base
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Knowledge Base</DialogTitle>
                      <DialogDescription>Create a new knowledge base for your chatbot</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="kb-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="kb-name"
                          value={newKnowledgeBase.name}
                          onChange={(e) => setNewKnowledgeBase({ ...newKnowledgeBase, name: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="kb-description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="kb-description"
                          value={newKnowledgeBase.description}
                          onChange={(e) => setNewKnowledgeBase({ ...newKnowledgeBase, description: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddKnowledgeBase}>Add Knowledge Base</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Chatbot Analytics</CardTitle>
                <CardDescription>View performance metrics for your chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,234</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.5s</div>
                      <p className="text-xs text-muted-foreground">-0.2s from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">85%</div>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Human Handoff Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">15%</div>
                      <p className="text-xs text-muted-foreground">-2% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}

