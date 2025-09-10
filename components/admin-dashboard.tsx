"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { LogOut, Settings, AlertTriangle, Bell, Megaphone, Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"

interface AdminDashboardProps {
  adminUser: string
  onLogout: () => void
}

interface Alert {
  id: string
  title: string
  message: string
  type: string
  isActive: boolean
  startDate: string
  endDate: string
  createdAt: any
  updatedAt: any
}

interface Banner {
  id: string
  message: string
  isActive: boolean
  fontSize?: string
  fontWeight?: string
  createdAt: any
  updatedAt: any
}

export function AdminDashboard({ adminUser, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [editingBanner, setEditingBanner] = useState(false)
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null)
  const [showCreateAlert, setShowCreateAlert] = useState(false)
  const [alertError, setAlertError] = useState<string | null>(null)

  // Banner State
  const [bannerData, setBannerData] = useState<Omit<Banner, "id" | "createdAt" | "updatedAt">>({
    message: "",
    isActive: false,
    fontSize: "16px",
    fontWeight: "500",
  })
  const [banner, setBanner] = useState<Banner | null>(null)

  // Alert State
  const [alertData, setAlertData] = useState<Omit<Alert, "id" | "createdAt" | "updatedAt">>({
    title: "",
    message: "",
    type: "",
    isActive: true,
    startDate: "",
    endDate: "",
  })

  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const unsubscribeAlerts = onSnapshot(collection(db, "alerts"), (snapshot) => {
      const alertsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Alert))
      setAlerts(alertsData.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()))
    })

    const unsubscribeBanner = onSnapshot(collection(db, "banner"), (snapshot) => {
      if (!snapshot.empty) {
        const bannerDoc = snapshot.docs[0]
        setBanner({ id: bannerDoc.id, ...bannerDoc.data() } as Banner)
        setBannerData({
          message: bannerDoc.data().message,
          isActive: bannerDoc.data().isActive,
          fontSize: bannerDoc.data().fontSize || "16px",
          fontWeight: bannerDoc.data().fontWeight || "500",
        })
      }
    })

    return () => {
      unsubscribeAlerts()
      unsubscribeBanner()
    }
  }, [])

  const handleBannerChange = (field: string, value: string | boolean) => {
    setBannerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAlertChange = (field: string, value: string | boolean) => {
    setAlertData((prev) => ({ ...prev, [field]: value }))
  }

  const validateAlertData = () => {
    if (!alertData.title.trim() || !alertData.message.trim() || !alertData.type) {
      setAlertError("Please fill in all required fields: Title, Message, and Type.")
      return false
    }
    setAlertError(null)
    return true
  }

  const handleSaveBanner = async () => {
    if (!bannerData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a banner message.",
        variant: "destructive",
      })
      return
    }

    try {
      if (banner) {
        const bannerRef = doc(db, "banner", banner.id)
        await updateDoc(bannerRef, {
          ...bannerData,
          updatedAt: serverTimestamp(),
        })
      } else {
        await addDoc(collection(db, "banner"), {
          ...bannerData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }
      toast({
        title: "Banner Updated",
        description: "Alert banner has been saved successfully.",
      })
      setEditingBanner(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update banner.",
        variant: "destructive",
      })
    }
  }

  const handleCreateAlert = async () => {
    if (!validateAlertData()) {
      return
    }

    try {
      await addDoc(collection(db, "alerts"), {
        ...alertData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      toast({
        title: "Alert Created",
        description: "New alert has been created successfully.",
      })
      // Reset form
      setAlertData({
        title: "",
        message: "",
        type: "",
        isActive: true,
        startDate: "",
        endDate: "",
      })
      setShowCreateAlert(false)
      setAlertError(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create alert.",
        variant: "destructive",
      })
    }
  }

  const handleEditAlert = (alert: Alert) => {
    setAlertData({
      title: alert.title,
      message: alert.message,
      type: alert.type,
      isActive: alert.isActive,
      startDate: alert.startDate,
      endDate: alert.endDate,
    })
    setEditingAlert(alert)
  }

  const handleUpdateAlert = async () => {
    if (!editingAlert) return

    if (!validateAlertData()) {
      return
    }

    try {
      const alertRef = doc(db, "alerts", editingAlert.id)
      await updateDoc(alertRef, {
        ...alertData,
        updatedAt: serverTimestamp(),
      })
      toast({
        title: "Alert Updated",
        description: "Alert has been updated successfully.",
      })
      setEditingAlert(null)
      setAlertData({
        title: "",
        message: "",
        type: "",
        isActive: true,
        startDate: "",
        endDate: "",
      })
      setAlertError(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update alert.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAlert = async (alertId: string) => {
    try {
      await deleteDoc(doc(db, "alerts", alertId))
      toast({
        title: "Alert Deleted",
        description: "Alert has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete alert.",
        variant: "destructive",
      })
    }
  }

  const handleToggleAlert = async (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId)
    if (!alert) return

    try {
      const alertRef = doc(db, "alerts", alertId)
      await updateDoc(alertRef, {
        isActive: !alert.isActive,
        updatedAt: serverTimestamp(),
      })
      toast({
        title: `Alert ${alert.isActive ? "Deactivated" : "Activated"}`,
        description: `Alert has been ${alert.isActive ? "hidden from" : "published to"} the website.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle alert status.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    onLogout()
  }

  const getAlertTypeInfo = (type: string) => {
    switch (type) {
      case "maintenance":
        return {
          label: "Maintenance",
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          badge: "bg-yellow-100 text-yellow-800",
        }
      case "emergency":
        return { label: "Emergency", color: "text-red-600", bg: "bg-red-50", badge: "bg-red-100 text-red-800" }
      case "information":
        return {
          label: "Information",
          color: "text-blue-600",
          bg: "bg-blue-50",
          badge: "bg-blue-100 text-blue-800",
        }
      default:
        return { label: "Select Type", color: "text-gray-600", bg: "bg-gray-50", badge: "bg-gray-100 text-gray-800" }
    }
  }

  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A"
    const date = dateString.toDate ? dateString.toDate() : new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const activeAlerts = alerts.filter((alert) => alert.isActive)
  const inactiveAlerts = alerts.filter((alert) => !alert.isActive)

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <img
                src="/images/wp-water-logo.png"
                alt="West Prairie Water Company Logo"
                className="h-8 sm:h-10 w-auto flex-shrink-0"
              />
              <div className="hidden xs:block min-w-0">
                <h1 className="text-sm sm:text-lg lg:text-xl font-semibold truncate" style={{ color: "#1b1b1b" }}>
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden md:inline truncate max-w-32 lg:max-w-none">
                Welcome, {adminUser.split("@")[0]}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm px-2 sm:px-3"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Log Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <TooltipProvider>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gray-100 rounded-lg">
              <TabsTrigger
                value="overview"
                className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 py-2 px-1 xs:px-2 text-xs sm:text-sm text-gray-600 data-[state=active]:text-foreground data-[state=active]:bg-background"
              >
                <Settings className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="banner"
                className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 py-2 px-1 xs:px-2 text-xs sm:text-sm text-gray-600 data-[state=active]:text-foreground data-[state=active]:bg-background"
              >
                <Megaphone className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">Banner</span>
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 py-2 px-1 xs:px-2 text-xs sm:text-sm text-gray-600 data-[state=active]:text-foreground data-[state=active]:bg-background"
              >
                <Bell className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">Alerts</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {/* Stats Cards */}
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Alerts</p>
                        <p className="text-xl sm:text-2xl font-bold text-water-600">{activeAlerts.length}</p>
                      </div>
                      <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-water-600 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Banner Status</p>
                        <p className="text-xl sm:text-2xl font-bold text-red-600">
                          {banner?.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                      <Megaphone className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Inactive Alerts</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-500">{inactiveAlerts.length}</p>
                      </div>
                      <EyeOff className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Banner Status */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="truncate">Alert Banner</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {banner?.isActive && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-red-100 border border-red-300 rounded-lg p-3 sm:p-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <p
                            className="text-xs sm:text-sm text-gray-900 break-words"
                            style={{
                              fontSize: banner.fontSize || "16px",
                              fontWeight: banner.fontWeight || "500",
                            }}
                          >
                            {banner.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
                        <Badge variant="default" className="w-fit">
                          Active
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingBanner(true)
                            setActiveTab("banner")
                          }}
                          className="text-xs sm:text-sm w-full xs:w-auto"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Edit Banner
                        </Button>
                      </div>
                    </div>
                  )}
                  {!banner?.isActive && (
                    <div className="text-center py-6 sm:py-8 text-gray-500">
                      <Megaphone className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                      <p className="text-sm sm:text-base">
                        {banner ? "The banner is currently inactive." : "No banner has been created yet."}
                      </p>
                      <Button
                        variant="outline"
                        className="mt-2 bg-transparent text-xs sm:text-sm"
                        onClick={() => {
                          setEditingBanner(true)
                          setActiveTab("banner")
                        }}
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        {banner ? "Edit Banner" : "Create Banner"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Bell className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="truncate">Recent Alerts</span>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowCreateAlert(true)
                        setActiveTab("alerts")
                      }}
                      className="text-xs sm:text-sm w-full xs:w-auto"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      New Alert
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {alerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-3 sm:p-4">
                        <div className="space-y-2">
                          <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                <h4 className="font-medium text-xs sm:text-sm truncate max-w-full">{alert.title}</h4>
                              </div>
                              <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                                <Badge
                                  className={`${getAlertTypeInfo(alert.type).badge} text-xs`}
                                >
                                  {getAlertTypeInfo(alert.type).label}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2 break-words">{alert.message}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={alert.isActive ? "default" : "secondary"}
                                className="text-xs whitespace-nowrap w-fit"
                              >
                                {alert.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alert Banner Tab */}
            <TabsContent value="banner">
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="pb-3 sm:pb-4 border-b">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <CardTitle className="text-base sm:text-lg lg:text-xl truncate" style={{ color: "#1b1b1b" }}>
                        Alert Banner Management
                      </CardTitle>
                    </div>
                    <Badge
                      variant={banner?.isActive ? "default" : "secondary"}
                      className="text-xs whitespace-nowrap w-fit"
                    >
                      {banner?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Manage the urgent alert banner that appears at the top of the website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Current Banner Display */}
                  {!editingBanner && banner && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm font-medium">Current Banner</Label>
                        <div className="border rounded-lg p-3 sm:p-4 bg-red-100 border-red-300">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <p
                              className="text-gray-900 break-words"
                              style={{
                                fontSize: banner.fontSize || "16px",
                                fontWeight: banner.fontWeight || "500",
                              }}
                            >
                              {banner.message}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
                        <div className="text-xs sm:text-sm text-gray-600">
                          Last updated: {formatDate(banner.updatedAt)}
                        </div>
                        <Button onClick={() => setEditingBanner(true)} className="text-xs sm:text-sm w-full xs:w-auto">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Edit Banner
                        </Button>
                      </div>
                    </div>
                  )}

                  {!editingBanner && !banner && (
                    <div className="text-center py-6 sm:py-8 text-gray-500">
                      <p className="text-sm sm:text-base">No banner has been created yet.</p>
                      <Button
                        variant="outline"
                        className="mt-2 bg-transparent text-xs sm:text-sm"
                        onClick={() => setEditingBanner(true)}
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        {banner ? "Edit Banner" : "Create Banner"}
                      </Button>
                    </div>
                  )}

                  {/* Edit Banner Form */}
                  {editingBanner && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="banner-message" className="text-xs sm:text-sm font-medium">
                          Banner Message
                        </Label>
                        <Textarea
                          id="banner-message"
                          placeholder="Enter urgent alert message (e.g., URGENT: Boil Water Advisory in Effect...)"
                          value={bannerData.message}
                          onChange={(e) => handleBannerChange("message", e.target.value)}
                          rows={3}
                          className="w-full resize-none text-xs sm:text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="banner-font-size" className="text-xs sm:text-sm font-medium">
                            Font Size
                          </Label>
                          <Select
                            value={bannerData.fontSize}
                            onValueChange={(value) => handleBannerChange("fontSize", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12px">12px (X-Small)</SelectItem>
                              <SelectItem value="14px">14px (Small)</SelectItem>
                              <SelectItem value="16px">16px (Normal)</SelectItem>
                              <SelectItem value="18px">18px (Large)</SelectItem>
                              <SelectItem value="20px">20px (X-Large)</SelectItem>
                              <SelectItem value="24px">24px (2X-Large)</SelectItem>
                              <SelectItem value="28px">28px (3X-Large)</SelectItem>
                              <SelectItem value="32px">32px (4X-Large)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="banner-font-weight" className="text-xs sm:text-sm font-medium">
                            Font Weight
                          </Label>
                          <Select
                            value={bannerData.fontWeight}
                            onValueChange={(value) => handleBannerChange("fontWeight", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select font weight" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="400">Normal</SelectItem>
                              <SelectItem value="500">Medium</SelectItem>
                              <SelectItem value="600">Semibold</SelectItem>
                              <SelectItem value="700">Bold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="banner-status" className="text-xs sm:text-sm font-medium">
                          Banner Status
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="banner-status"
                            checked={bannerData.isActive}
                            onCheckedChange={(checked) => handleBannerChange("isActive", checked)}
                          />
                          <Label htmlFor="banner-status" className="text-xs sm:text-sm text-gray-600">
                            {bannerData.isActive ? "Banner is Active (Visible on site)" : "Banner is Inactive (Hidden)"}
                          </Label>
                        </div>
                      </div>

                      {bannerData.message && (
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm font-medium">Preview</Label>
                          <div className="border rounded-lg p-3 sm:p-4 bg-red-100 border-red-300">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <p
                                className="text-gray-900 break-words"
                                style={{
                                  fontSize: bannerData.fontSize,
                                  fontWeight: bannerData.fontWeight,
                                }}
                              >
                                {bannerData.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                        <Button
                          onClick={handleSaveBanner}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm w-full xs:w-auto"
                        >
                          <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Save Banner
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingBanner(false)}
                          className="text-xs sm:text-sm w-full xs:w-auto"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alerts & Notices Tab */}
            <TabsContent value="alerts" className="space-y-4 sm:space-y-6">
              {/* Create/Edit Alert Form */}
              {(showCreateAlert || editingAlert) && (
                <Card className="shadow-lg border-water-200">
                  <CardHeader className="bg-gradient-to-r from-water-50 to-prairie-50 pb-3 sm:pb-4 rounded-lg">
                    <CardTitle className="text-base sm:text-lg lg:text-xl" style={{ color: "#1b1b1b" }}>
                      {editingAlert ? "Edit Alert" : "Create New Alert"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {alertError && (
                      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                        <p className="font-bold">Validation Error</p>
                        <p>{alertError}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="alert-title" className="text-xs sm:text-sm font-medium">
                          Alert Title *
                        </Label>
                        <Input
                          id="alert-title"
                          placeholder="Enter alert title"
                          value={alertData.title}
                          onChange={(e) => handleAlertChange("title", e.target.value)}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alert-type" className="text-xs sm:text-sm font-medium">
                          Alert Type *
                        </Label>
                        <Select value={alertData.type} onValueChange={(value) => handleAlertChange("type", value)}>
                          <SelectTrigger className="text-xs sm:text-sm">
                            <SelectValue placeholder="Select alert type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                            <SelectItem value="information">Information</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alert-message" className="text-xs sm:text-sm font-medium">
                        Alert Message *
                      </Label>
                      <Textarea
                        id="alert-message"
                        placeholder="Enter the full alert message..."
                        value={alertData.message}
                        onChange={(e) => handleAlertChange("message", e.target.value)}
                        rows={4}
                        className="resize-none text-xs sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date" className="text-xs sm:text-sm font-medium">
                          Start Date
                        </Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={alertData.startDate}
                          onChange={(e) => handleAlertChange("startDate", e.target.value)}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date" className="text-xs sm:text-sm font-medium">
                          End Date
                        </Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={alertData.endDate}
                          onChange={(e) => handleAlertChange("endDate", e.target.value)}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-xs sm:text-sm font-medium">
                        Status
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="status"
                          checked={alertData.isActive}
                          onCheckedChange={(checked) => handleAlertChange("isActive", checked)}
                        />
                        <Label htmlFor="status" className="text-xs sm:text-sm text-gray-600">
                          {alertData.isActive ? "Active (Visible on website)" : "Inactive (Hidden from website)"}
                        </Label>
                      </div>
                    </div>

                    {alertData.title && alertData.message && alertData.type && (
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm font-medium">Preview</Label>
                        <div className={`border rounded-lg p-3 sm:p-4 ${getAlertTypeInfo(alertData.type).bg}`}>
                          <div className="flex items-start gap-2 sm:gap-3">
                            <AlertTriangle
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${getAlertTypeInfo(alertData.type).color} mt-1 flex-shrink-0`}
                            />
                            <div className="min-w-0">
                              <h4
                                className="font-semibold text-xs sm:text-sm mb-1 break-words"
                                style={{ color: "#1b1b1b" }}
                              >
                                {alertData.title}
                              </h4>
                              <p className="text-xs text-gray-700 break-words">{alertData.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                      <Button
                        onClick={editingAlert ? handleUpdateAlert : handleCreateAlert}
                        className="bg-gradient-to-r from-water-600 to-prairie-600 hover:from-water-700 hover:to-prairie-700 text-white text-xs sm:text-sm w-full xs:w-auto"
                      >
                        <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        {editingAlert ? "Update Alert" : "Create Alert"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowCreateAlert(false)
                          setEditingAlert(null)
                          setAlertData({
                            title: "",
                            message: "",
                            type: "",
                            isActive: true,
                            startDate: "",
                            endDate: "",
                          })
                          setAlertError(null)
                        }}
                        className="text-xs sm:text-sm w-full xs:w-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Alerts List */}
              {!showCreateAlert && !editingAlert && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
                    <h3 className="text-base sm:text-lg font-semibold">Manage Alerts & Notices</h3>
                    <Button onClick={() => setShowCreateAlert(true)} className="text-xs sm:text-sm w-full xs:w-auto">
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Create New Alert
                    </Button>
                  </div>

                  {/* Active Alerts */}
                  <Card>
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                        <span className="truncate">Active Alerts ({activeAlerts.length})</span>
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        These alerts are currently visible on the website.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {activeAlerts.length === 0 ? (
                        <div className="text-center py-6 sm:py-8 text-gray-500">
                          <Bell className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                          <p className="text-sm sm:text-base">No active alerts</p>
                        </div>
                      ) : (
                        <div className="space-y-3 sm:space-y-4">
                          {activeAlerts.map((alert) => (
                            <div key={alert.id} className="border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                                    <h4 className="font-semibold text-sm sm:text-base break-words">{alert.title}</h4>
                                  </div>
                                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                                    <Badge
                                      className={`${getAlertTypeInfo(alert.type).badge} text-xs w-fit`}
                                    >
                                      {getAlertTypeInfo(alert.type).label}
                                    </Badge>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words">{alert.message}</p>
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                                    <span>Created: {formatDate(alert.createdAt)}</span>
                                    <span>Updated: {formatDate(alert.updatedAt)}</span>
                                    {alert.startDate && <span>Start: {alert.startDate}</span>}
                                    {alert.endDate && <span>End: {alert.endDate}</span>}
                                  </div>
                                </div>
                                <div className="flex flex-row lg:flex-col items-center gap-2">
                                  <div className="flex gap-2">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleToggleAlert(alert.id)}
                                          className="p-2"
                                        >
                                          {alert.isActive ? (
                                            <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                                          ) : (
                                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                          )}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>{alert.isActive ? "Set Inactive" : "Set Active"}</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleEditAlert(alert)}
                                          className="p-2"
                                        >
                                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Edit Alert</TooltipContent>
                                    </Tooltip>
                                    <AlertDialog>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="p-2 bg-transparent">
                                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                                            </Button>
                                          </AlertDialogTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete Alert</TooltipContent>
                                      </Tooltip>
                                      <AlertDialogContent className="max-w-sm sm:max-w-md mx-4">
                                        <AlertDialogHeader>
                                          <AlertDialogTitle className="text-sm sm:text-base">
                                            Delete Alert
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="text-xs sm:text-sm break-words">
                                            Are you sure you want to delete "{alert.title}"? This action cannot be
                                            undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="flex-col xs:flex-row gap-2">
                                          <AlertDialogCancel className="text-xs sm:text-sm w-full xs:w-auto">
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => handleDeleteAlert(alert.id)}
                                            className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm w-full xs:w-auto"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Inactive Alerts */}
                  <Card>
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
                        <span className="truncate">Inactive Alerts ({inactiveAlerts.length})</span>
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        These alerts are hidden from the website.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {inactiveAlerts.length === 0 ? (
                        <div className="text-center py-6 sm:py-8 text-gray-500">
                          <EyeOff className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                          <p className="text-sm sm:text-base">No inactive alerts</p>
                        </div>
                      ) : (
                        <div className="space-y-3 sm:space-y-4">
                          {inactiveAlerts.map((alert) => (
                            <div
                              key={alert.id}
                              className="border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 opacity-75"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                                    <h4 className="font-semibold text-sm sm:text-base break-words">{alert.title}</h4>
                                  </div>
                                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                                    <Badge
                                      className={`${getAlertTypeInfo(alert.type).badge} text-xs w-fit`}
                                    >
                                      {getAlertTypeInfo(alert.type).label}
                                    </Badge>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs w-fit"
                                    >
                                      Inactive
                                    </Badge>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words">{alert.message}</p>
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                                    <span>Created: {formatDate(alert.createdAt)}</span>
                                    <span>Updated: {formatDate(alert.updatedAt)}</span>
                                    {alert.startDate && <span>Start: {alert.startDate}</span>}
                                    {alert.endDate && <span>End: {alert.endDate}</span>}
                                  </div>
                                </div>
                                <div className="flex flex-row lg:flex-col items-center gap-2">
                                  <div className="flex gap-2">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleToggleAlert(alert.id)}
                                          className="p-2"
                                        >
                                          {alert.isActive ? (
                                            <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                                          ) : (
                                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                          )}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>{alert.isActive ? "Set Inactive" : "Set Active"}</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleEditAlert(alert)}
                                          className="p-2"
                                        >
                                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Edit Alert</TooltipContent>
                                    </Tooltip>
                                    <AlertDialog>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="p-2 bg-transparent">
                                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                                            </Button>
                                          </AlertDialogTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete Alert</TooltipContent>
                                      </Tooltip>
                                      <AlertDialogContent className="max-w-sm sm:max-w-md mx-4">
                                        <AlertDialogHeader>
                                          <AlertDialogTitle className="text-sm sm:text-base">
                                            Delete Alert
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="text-xs sm:text-sm break-words">
                                            Are you sure you want to delete "{alert.title}"? This action cannot be
                                            undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="flex-col xs:flex-row gap-2">
                                          <AlertDialogCancel className="text-xs sm:text-sm w-full xs:w-auto">
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => handleDeleteAlert(alert.id)}
                                            className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm w-full xs:w-auto"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TooltipProvider>
      </main>
    </div>
  )
}
