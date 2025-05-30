import type React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { AuthPages } from "./components/AuthPages"
import { Home } from "./components/Home"
import { GroupManagement } from "./components/GroupManagement"
import { EventManagement } from "./components/EventManagement"
import { Communication } from "./components/Communication"
import { BudgetManagement } from "./components/BudgetManagement"
import { Settings } from "./components/Settings"

export default function App({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Switch>
          <Route path="/auth" component={AuthPages} />
          <Route path="/home" component={Home} />
          <Route path="/groups" component={GroupManagement} />
          <Route path="/events" component={EventManagement} />
          <Route path="/communication" component={Communication} />
          <Route path="/budget" component={BudgetManagement} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  )
}
