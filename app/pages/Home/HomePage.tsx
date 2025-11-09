import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { HowItWorks } from "./components/HowItWorks";
import { GetStarted } from "./components/GetStarted";
import { useAuth } from "~/stores/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-bg text-black">
      <Navigation />
      <Hero />
      <HowItWorks />
      <GetStarted />
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 ZipLinks. Built by{" "}
            <a
              href="https://github.com/ragav2005"
              className="font-medium bg-gradient-primary bg-clip-text text-transparent transition-all duration-300 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              ragav2005
            </a>{" "}
            with love.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
