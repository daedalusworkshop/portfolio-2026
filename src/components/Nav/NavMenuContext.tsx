'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/** How long the pointer must rest on a trigger before its menu opens. */
const OPEN_DELAY_MS = 100
/** How long an open menu survives after the pointer leaves it. */
const CLOSE_GRACE_MS = 220

type NavMenuState = {
  openId: string | null
  /** Hover enter: opens after a delay, or instantly if another menu is already open. */
  requestOpen: (id: string) => void
  /** Hover leave: closes after a grace period, cancellable by re-entering. */
  requestClose: (id: string) => void
  /** Click/tap: opens now, no delay. */
  openNow: (id: string) => void
  /** Escape, blur, link click, outside press, route change. */
  closeNow: () => void
  /** Tap-to-toggle on touch devices. */
  toggle: (id: string) => void
}

const NavMenuContext = createContext<NavMenuState | null>(null)

export function NavMenuProvider({ pathname, children }: { pathname: string; children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const openIdRef = useRef<string | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** Which menu the pending open belongs to, so one menu can't cancel another's. */
  const pendingOpenId = useRef<string | null>(null)

  const commit = useCallback((id: string | null) => {
    openIdRef.current = id
    setOpenId(id)
  }, [])

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
    pendingOpenId.current = null
  }, [])

  const closeNow = useCallback(() => {
    clearTimers()
    commit(null)
  }, [clearTimers, commit])

  const openNow = useCallback((id: string) => {
    clearTimers()
    commit(id)
  }, [clearTimers, commit])

  const requestOpen = useCallback((id: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    if (openIdRef.current === id) return

    // A menu is already open, so the user has committed to hovering the nav — swap instantly.
    if (openIdRef.current !== null) {
      openNow(id)
      return
    }

    if (openTimer.current) clearTimeout(openTimer.current)
    pendingOpenId.current = id
    openTimer.current = setTimeout(() => {
      openTimer.current = null
      pendingOpenId.current = null
      commit(id)
    }, OPEN_DELAY_MS)
  }, [commit, openNow])

  const requestClose = useCallback((id: string) => {
    // Only drop the pending open if it is this menu's — a sweep past another
    // trigger must not cancel the open the pointer is currently waiting on.
    if (pendingOpenId.current === id) {
      if (openTimer.current) clearTimeout(openTimer.current)
      openTimer.current = null
      pendingOpenId.current = null
    }
    if (openIdRef.current !== id) return

    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null
      if (openIdRef.current === id) commit(null)
    }, CLOSE_GRACE_MS)
  }, [commit])

  const toggle = useCallback((id: string) => {
    clearTimers()
    commit(openIdRef.current === id ? null : id)
  }, [clearTimers, commit])

  useEffect(() => {
    closeNow()
  }, [pathname, closeNow])

  useEffect(() => clearTimers, [clearTimers])

  const value = useMemo(
    () => ({ openId, requestOpen, requestClose, openNow, closeNow, toggle }),
    [openId, requestOpen, requestClose, openNow, closeNow, toggle]
  )

  return <NavMenuContext.Provider value={value}>{children}</NavMenuContext.Provider>
}

export function useNavMenu(): NavMenuState {
  const context = useContext(NavMenuContext)
  if (!context) throw new Error('useNavMenu must be used within a NavMenuProvider')
  return context
}
