import AppHeader from '@/components/day-weaver/header';
import { format } from 'date-fns';

export default function PrivacyPolicyPage() {
  return (
    <div>
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1>Privacy Policy for Day Weaver</h1>

          <p><strong>Last Updated:</strong> {format(new Date(), 'dd/MM/yyyy')}</p>

          <p>
            Welcome to Day Weaver ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information that you provide directly to us. For example, we collect information when you create tasks, including descriptions, deadlines, and priorities. We do not collect personal information unless you voluntarily provide it to us for purposes such as creating an account or contacting us.
          </p>
          <ul>
            <li><strong>Task Data:</strong> All task information you enter is processed to provide the scheduling service. This data is stored locally in your browser session and is not transmitted to our servers unless you explicitly save or share it.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>The information we collect is used solely to provide and improve the functionality of Day Weaver. We use the task data you provide to:</p>
          <ul>
            <li>Generate and optimize your daily schedule.</li>
            <li>Display your tasks and progress.</li>
            <li>Maintain the state of your task list within your browser session.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>We do not sell, trade, rent, or otherwise share your personal information with third parties for marketing purposes. Your task data is processed by a third-party AI service (e.g., Google's Gemini) to generate the optimized schedule. This data is sent securely and is subject to the privacy policies of the respective AI service provider. We do not store this information on our servers after the schedule has been generated.</p>

          <h2>4. Data Security</h2>
          <p>We implement reasonable security measures to protect the information we handle. However, please be aware that no security measures are perfect or impenetrable, and we cannot guarantee the absolute security of your data.</p>

          <h2>5. Third-Party Services</h2>
          <p>Our application uses Google's Generative AI services to power the schedule optimization feature. Your use of this feature is subject to Google's terms of service and privacy policy.</p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@dayweaver.com">privacy@dayweaver.com</a>.</p>
        </div>
      </main>
    </div>
  );
}
