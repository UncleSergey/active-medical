// Design reminder: quiet clinical poetry — public landing page with calm utility-first navigation and warm editorial hierarchy.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServicePage, { servicePages } from "./pages/ServicePage";

function ServiceRoute({ slug }: { slug: string }) {
  const page = servicePages.find((item) => item.slug === slug);
  return page ? <ServicePage page={page} /> : <NotFound />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {servicePages.map((page) => <Route key={page.slug} path={`/${page.slug}`}><ServiceRoute slug={page.slug} /></Route>)}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
