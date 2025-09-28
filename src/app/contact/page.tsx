import AppHeader from '@/components/day-weaver/header';

export default function ContactPage() {
  return (
    <div>
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you! Whether you have a question about our features, a suggestion for improvement, or need assistance, please feel free to reach out.
          </p>
          <h2>Get in Touch</h2>
          <p>
            For general inquiries, feedback, or support, please email us at:
            <br />
            <a href="mailto:contact@dayweaver.com">contact@dayweaver.com</a>
          </p>
          <p>
            We do our best to respond to all inquiries within 48 business hours.
          </p>
          <h2>Mailing Address</h2>
          <p>
            Day Weaver Inc.
            <br />
            123 Productivity Lane
            <br />
            Focus City, FS 54321
            <br />
            United States
          </p>
          <h2>Feedback</h2>
          <p>
            Your feedback is invaluable to us as we continue to improve Day Weaver. If you have any ideas or suggestions, please don't hesitate to share them.
          </p>
        </div>
      </main>
    </div>
  );
}
