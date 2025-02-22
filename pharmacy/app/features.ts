import {
  LayoutDashboard,
  MessageSquare,
  PhoneOutgoing,
  MessageCircle,
  Clock,
  Megaphone,
  BookOpen,
  Moon,
  ClipboardList,
  Video,
  PillIcon as Pills,
  Printer,
  VoicemailIcon,
  PhoneCall,
  Bot,
  Users,
  MessageCircleQuestion,
} from "lucide-react"

export const features = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-indigo-500" },
  { title: "Messages", icon: MessageSquare, href: "/messages", color: "text-blue-500" },
  { title: "Outbound", icon: PhoneOutgoing, href: "/outbound", color: "text-green-500" },
  { title: "SMS", icon: MessageCircle, href: "/sms", color: "text-indigo-500" },
  { title: "Faxes", icon: Printer, href: "/faxes", color: "text-purple-500" },
  { title: "Voicemails", icon: VoicemailIcon, href: "/voicemails", color: "text-pink-500" },
  { title: "IVR", icon: PhoneCall, href: "/ivr", color: "text-orange-500" },
  { title: "IVA", icon: Bot, href: "/iva", color: "text-cyan-500" },
  { title: "Chatbot", icon: MessageCircleQuestion, href: "/chatbot", color: "text-green-500" },
  { title: "Store Hours", icon: Clock, href: "/store-hours", color: "text-orange-500" },
  { title: "Announcements", icon: Megaphone, href: "/announcements", color: "text-red-500" },
  { title: "Phonebook", icon: BookOpen, href: "/phonebook", color: "text-teal-500" },
  { title: "After Hours", icon: Moon, href: "/after-hours", color: "text-violet-500" }, // Updated this line
  { title: "Call Log", icon: ClipboardList, href: "/call-log", color: "text-yellow-500" },
  { title: "Queue Reports", icon: Users, href: "/queue-reports", color: "text-cyan-500" },
  { title: "Call Recordings", icon: Video, href: "/call-recordings", color: "text-emerald-500" },
  { title: "Instore Refills", icon: Pills, href: "/instore-refills", color: "text-amber-500" },
]

