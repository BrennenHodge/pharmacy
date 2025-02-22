"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { features } from "./features"
import type React from "react"

function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const openSidebar = () => {
    setIsSidebarOpen(true)
    setTimeout(() => setIsOverlayVisible(true), 50)
  }

  const closeSidebar = () => {
    setIsOverlayVisible(false)
    setTimeout(() => setIsSidebarOpen(false), 300)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center">
            <svg width="120" height="26" viewBox="0 0 999 221" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M597.933 108.115C597.933 74.0881 626.789 46.2708 662.191 46.2708C697.738 46.2708 726.763 74.0763 726.763 108.115C726.763 142.467 697.738 170.116 662.191 170.116C626.789 170.116 597.933 142.455 597.933 108.115ZM662.191 73.7262C643.12 73.7262 627.527 89.8526 627.527 108.115C627.527 126.554 643.14 142.817 662.191 142.817C681.392 142.817 696.855 126.561 696.855 108.115C696.855 89.8458 681.412 73.7262 662.191 73.7262Z"
                fill="#001520"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M869.432 108.115C869.432 74.0881 898.288 46.2708 933.69 46.2708C969.236 46.2708 998.262 74.0763 998.262 108.115C998.262 142.467 969.236 170.116 933.69 170.116C898.288 170.116 869.432 142.455 869.432 108.115ZM933.69 73.7262C914.619 73.7262 899.026 89.8526 899.026 108.115C899.026 126.554 914.639 142.817 933.69 142.817C952.891 142.817 968.353 126.561 968.353 108.115C968.353 89.8458 952.911 73.7262 933.69 73.7262Z"
                fill="#001520"
              />
              <path
                d="M780.609 108.968L733.792 49.3922H763.233C767.985 49.3922 772.472 51.5701 775.402 55.2979L799.098 85.4491L822.803 55.2962C825.733 51.5693 830.22 49.3922 834.971 49.3922H864.42L817.607 108.9L863.335 167.152H833.882C829.129 167.152 824.64 164.972 821.71 161.242L799.113 132.469L776.47 161.252C773.54 164.976 769.055 167.152 764.306 167.152H734.753L780.609 108.968Z"
                fill="#001520"
              />
              <path
                d="M438.448 49.3923H464.523C467.343 49.3923 473.316 50.5901 477.158 56.3148L514.923 116.346L552.518 56.6116C555.345 52.1195 560.292 49.3923 565.612 49.3923H591.296L514.923 170.967L438.448 49.3923Z"
                fill="#001520"
              />
              <path
                d="M28.1093 0.0003183H0L118.118 195.018C130.315 214.401 151.449 222.344 170.576 220.296L41.6862 7.44268C38.7816 2.82784 33.5738 0.0170082 28.1093 0.0003183Z"
                fill="#F92120"
              />
              <path
                d="M102.409 0.000318319C107.874 0.0170082 113.127 2.82784 116.032 7.44268L197.82 142.528C199.549 145.339 203.671 145.352 205.38 142.528L282.09 15.8822H282.098L284.299 12.233L287.357 7.18273C290.298 2.72444 295.591 0.0166984 300.952 0.000318319H328.922L220.278 179.494C229.874 192.108 248.991 191.986 258.194 178.218L361.779 7.02905C362.466 6.01393 363.272 5.09193 364.172 4.27438C366.52 2.17587 370.126 0.177965 374.74 0.0083944C374.909 0.00301635 375.078 0.000289801 375.247 0.000244141L403.229 0.000318319L285.356 194.695C275.012 211.543 256.68 220.623 238.585 220.607C220.648 220.592 202.348 211.184 192.348 195.018L74.2281 0.000318319H102.409Z"
                fill="#F92120"
              />
              <path
                d="M198.287 143.097L220.432 179.633L329.14 0H301.152C295.787 0.0163909 290.491 2.72591 287.547 7.18713L284.487 12.2408L282.284 15.8923H282.277L205.517 142.621C203.908 145.277 200.167 145.426 198.287 143.097Z"
                fill="url(#paint0_linear_895_768)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_895_768"
                  x1="311.543"
                  y1="10.8857"
                  x2="222.56"
                  y2="164.236"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F92120" />
                  <stop offset="1" stopColor="#C00100" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={closeSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-1 p-4">
          {features.map((item) => (
            <Button
              key={item.title}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 px-3"
              onClick={() => {
                router.push(item.href)
                if (window.innerWidth < 1024) {
                  closeSidebar()
                }
              }}
            >
              <item.icon className={cn("h-5 w-5", item.color)} />
              {item.title}
            </Button>
          ))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300 ease-in-out",
            isOverlayVisible ? "opacity-100" : "opacity-0",
          )}
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex h-16 items-center border-b bg-white px-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={openSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <main>{children}</main>
      </div>
    </div>
  )
}

export default ClientLayout

