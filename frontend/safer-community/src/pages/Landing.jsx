
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="#"
            className="flex items-center justify-center text-black hover:text-[rgba(255,79,90,255)]"
            prefetch={false}
          >
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <a
              href="#about"
              className="text-sm text-black hover:text-[rgba(255,79,90,255)] font-medium hover:underline underline-offset-4"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-sm text-black hover:text-[rgba(255,79,90,255)] cursor-pointer font-medium hover:underline underline-offset-4"
            >
              Features
            </a>
          </nav>
        </div>
        <Link
          to="/register"
          className="inline-flex h-9 items-center justify-center hover:text-white rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[rgba(255,79,90,255)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Sign Up
        </Link>
      </header>
      <main className="flex-1 overflow-hidden">
        <section id="about" className="w-full py-12 sm:py-16 md:py-12 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none overflow-hidden">
                    Track your marks as a student
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Worried about what you need to get for that final exam to
                    pass? We've got you covered with that and more!
                  </p>
                </div>
                <Link
                  to="register"
                  className="inline-flex h-10 items-center justify-center rounded-md hover:scale-105 hover:text-white bg-[rgba(255,79,90,255)] px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-[rgba(255,79,90,255)]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
              </div>
              <img
                src={hero}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 sm:py-16 md:py-12 lg:py-12 bg-muted "
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl overflow-hidden">
                  Faster iteration. More innovation.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The platform for rapid progress. Let your team focus on
                  shipping features instead of managing infrastructure with
                  automated CI/CD, built-in testing, and integrated
                  collaboration.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <CombineIcon className="w-8 h-8" />
                <h3 className="text-xl font-bold">Collaboration</h3>
                <p className="text-muted-foreground">
                  Make collaboration seamless with built-in code review tools.
                </p>
              </div>
              <div className="grid gap-1">
                <BotIcon className="w-8 h-8" />
                <h3 className="text-xl font-bold">Automation</h3>
                <p className="text-muted-foreground">
                  Automate your workflow with continuous integration.
                </p>
              </div>
              <div className="grid gap-1">
                <ScaleIcon className="w-8 h-8" />
                <h3 className="text-xl font-bold">Scale</h3>
                <p className="text-muted-foreground">
                  Deploy to the cloud with a single click and scale with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function BotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function CombineIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="8" x="2" y="2" rx="2" />
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
      <polyline points="7 21 10 18 7 15" />
      <rect width="8" height="8" x="14" y="14" rx="2" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ScaleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
