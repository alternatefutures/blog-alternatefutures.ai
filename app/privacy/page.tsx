import type { Metadata } from "next";
import AnalyticsPrivacyControls from "@/components/AnalyticsPrivacyControls";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Privacy & Cookie Notice",
  description:
    "How the Alternate Futures blog uses optional analytics, cookies, service providers, and visitor information.",
};

export default function PrivacyPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="privacy-content">
        <h1>Privacy &amp; Cookie Notice</h1>
        <p className="privacy-date">Last updated: September 28, 2026</p>

        <section className="privacy-section">
          <h2>Who we are</h2>
          <p>
            Alternate Futures Inc., a Washington State corporation, is the
            controller responsible for personal information processed through
            this website. This notice applies to the public blog at
            blog.alternatefutures.ai. Contact us at{" "}
            <a href="mailto:system@alternatefutures.ai">
              system@alternatefutures.ai
            </a>{" "}
            with a privacy question or request.
          </p>
        </section>

        <section className="privacy-section">
          <h2>What we process and why</h2>
          <h3>Site delivery and security</h3>
          <p>
            Our hosting, content-delivery, and security providers may process
            an IP address, request time, requested page, browser information,
            and technical logs needed to deliver and protect the site. We rely
            on our legitimate interests in operating a secure, reliable
            website and, where applicable, compliance with legal obligations.
          </p>
          <h3>Messages</h3>
          <p>
            When you contact us, we process the information you submit to
            answer you and maintain the resulting business relationship. The
            legal basis is taking steps at your request, performing a contract,
            or our legitimate interest in responding to you, depending on the
            request. We do not add you to a marketing list without a separate
            choice.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Optional Google Analytics</h2>
          <p>
            If you select “Accept analytics,” we use Google Analytics 4 to
            understand how people find and use our public blog. Consent is the
            legal basis for this processing. We may measure pages viewed,
            referral or campaign source, approximate geography, device
            category, browser, operating system, and session information. We
            remove unknown and potentially sensitive URL parameters before
            sending a page path to Google.
          </p>
          <p>
            Analytics is off until you accept. We disable Google Signals,
            advertising storage, advertising user data, and advertising
            personalization. Analytics is also disabled on login and
            administrative routes. Declining does not change how the public
            blog works.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Cookies and your choice</h2>
          <p>
            We use <strong>af-analytics-consent-v2</strong>, an essential
            first-party preference stored in your browser for up to six months,
            to remember whether you accepted or declined analytics. If you
            accept, Google Analytics may set <strong>_ga</strong> and{" "}
            <strong>_ga_*</strong> cookies for measurement; we configure those
            browser cookies for no more than six months. Declining or
            withdrawing consent disables future measurement and asks the
            browser to remove those Google Analytics cookies.
          </p>
          <p>
            Your choice, policy version, and choice time are stored in your
            browser. We do not create an identity-level consent profile for an
            otherwise anonymous visitor. You can change your choice below at
            any time. Withdrawal does not affect processing that occurred while
            your consent was valid.
          </p>
          <AnalyticsPrivacyControls />
        </section>

        <section className="privacy-section">
          <h2>Privacy safeguards</h2>
          <ul>
            <li>Google Analytics does not load unless you accept it.</li>
            <li>Analytics is disabled on administrative and login routes.</li>
            <li>Google Signals and advertising features are disabled.</li>
            <li>Analytics and consent cookies are limited to six months.</li>
            <li>
              Email, token, code, session, and other unknown query parameters
              are not sent to GA4.
            </li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Service providers and international transfers</h2>
          <p>
            Google LLC processes optional analytics data on our behalf.
            Hosting, content-delivery, security, and email providers process the
            limited information needed to provide their services. These
            providers may process information in the United States or other
            countries. Where GDPR requires a transfer safeguard, we use the
            provider&apos;s applicable adequacy mechanism or contractual
            protections, such as Standard Contractual Clauses. Learn more in{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="privacy-section">
          <h2>Retention</h2>
          <p>
            The analytics consent preference and analytics cookies expire after
            no more than six months unless you renew your choice. Security and
            delivery logs are kept only as long as needed to operate and
            protect the service. Messages and business records are retained
            while we handle the request and for any period required by
            contract, tax, security, or other law.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Your GDPR rights</h2>
          <p>
            Where GDPR applies, you may ask to access, correct, erase, restrict,
            or receive personal information, or object to processing based on
            legitimate interests. You may withdraw consent at any time and may
            lodge a complaint with the data-protection authority where you
            live, work, or believe an infringement occurred. Some rights have
            legal exceptions.
          </p>
          <p>
            Send a request to{" "}
            <a href="mailto:system@alternatefutures.ai">
              system@alternatefutures.ai
            </a>
            . We may need to verify your identity before acting. We do not use
            public-site analytics for automated decisions that produce legal or
            similarly significant effects.
          </p>
        </section>

        <section className="privacy-section">
          <h2>External links</h2>
          <p>
            Links to external websites take you to services governed by their
            own privacy notices. Opening a link does not grant those services
            analytics consent on this website.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Verify it</h2>
          <p>
            The blog is open source. You can review the{" "}
            <a
              href="https://github.com/alternatefutures/blog-alternatefutures.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              source code on GitHub
            </a>{" "}
            and use your browser&apos;s developer tools to confirm Google
            Analytics loads only after consent.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Changes and questions</h2>
          <p>
            We update the date above when this notice changes. A material
            change to optional analytics will use a new consent version and ask
            you to choose again. Contact{" "}
            <a href="mailto:system@alternatefutures.ai">
              system@alternatefutures.ai
            </a>{" "}
            with questions.
          </p>
        </section>

        <section className="privacy-tldr">
          <h2>TL;DR</h2>
          <p>
            Analytics is optional and off until you accept it. We do not use it
            for advertising, we limit its browser cookies, and you can withdraw
            consent at any time.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
