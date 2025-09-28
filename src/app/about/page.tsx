import AppHeader from '@/components/day-weaver/header';

export default function AboutPage() {
  return (
    <div>
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1>About Day Weaver</h1>
          <p>
            Welcome to Day Weaver, your personal AI-powered schedule optimization tool. Our mission is to help you take control of your day, increase your productivity, and find a better work-life balance.
          </p>
          <h2>Our Story</h2>
          <p>
            In a fast-paced world, managing tasks, deadlines, and priorities can be overwhelming. Day Weaver was born from the idea that technology, specifically artificial intelligence, could simplify this process. We envisioned a smart assistant that doesn't just list your tasks but intelligently organizes them into a coherent and achievable schedule.
          </p>
          <h2>What We Do</h2>
          <p>
            Day Weaver uses a sophisticated AI model to analyze your tasks based on their priority, estimated completion time, and deadlines. It then "weaves" them together to create an optimized timeline for your day.
          </p>
          <ul>
            <li>
              <strong>Intelligent Scheduling:</strong> Our AI considers all task variables to create a schedule that maximizes your focus and efficiency.
            </li>
            <li>
              <strong>Flexible & Dynamic:</strong> Add new tasks on the fly and re-optimize your schedule with a single click.
            </li>
            <li>
              <strong>User-Friendly Interface:</strong> We believe powerful tools should be simple to use. Our clean, intuitive design lets you focus on what's important.
            </li>
          </ul>
          <h2>Our Commitment</h2>
          <p>
            We are committed to building a tool that genuinely helps people. We continuously work on improving our algorithms and user experience. Your privacy is paramount, and we are dedicated to protecting your data.
          </p>
          <p>
            Thank you for choosing Day Weaver. We're excited to help you weave your perfect day!
          </p>
        </div>
      </main>
    </div>
  );
}
