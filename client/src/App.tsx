// Design reminder: quiet clinical poetry — public landing page with calm utility-first navigation and warm editorial hierarchy.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServicePage, { servicePages } from "./pages/ServicePage";
import DoctorPage, { doctorPages } from "./pages/DoctorPage";
import DentalLandingPage from "./pages/DentalLandingPage";
import BranchesPage from "@/pages/BranchesPage";
import ArticlesPage from "@/pages/ArticlesPage";

function ServiceRoute({ slug }: { slug: string }) {
  const page = servicePages.find((item) => item.slug === slug);
  return page ? <ServicePage page={page} /> : <NotFound />;
}

function DoctorRoute({ slug }: { slug: string }) {
  const doctor = doctorPages.find((item) => item.slug === slug);
  return doctor ? <DoctorPage doctor={doctor} /> : <NotFound />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/stomatologiya" component={DentalLandingPage} />
      <Route path="/stomatolohiya" component={DentalLandingPage} />
      <Route path="/viddilennia" component={BranchesPage} />
      <Route path="/viddilennya" component={BranchesPage} />
      <Route path="/statti" component={ArticlesPage} />
      <Route path="/statti/:slug" component={ArticlesPage} />
      {servicePages.map((page) => <Route key={page.slug} path={`/${page.slug}`}><ServiceRoute slug={page.slug} /></Route>)}
      {doctorPages.map((doctor) => <Route key={doctor.slug} path={`/likari/${doctor.slug}`}><DoctorRoute slug={doctor.slug} /></Route>)}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
