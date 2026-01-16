import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google'; // Changed from Inter to Montserrat
import './globals.css';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppProviders } from '@/providers/AppProviders';

// Configure Montserrat font
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'PeoplePilot - HR Management',
  description: 'Simple HR management for small companies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans">
        {/* Update DEFAULT_COMPANY color to ghost green */}
        <CompanyProvider>
           <ErrorBoundary> {/* Add ErrorBoundary here */}
       <AppProviders> {/* Replace individual providers */}
          {children}
        </AppProviders>
    </ErrorBoundary>
        </CompanyProvider>
      </body>
    </html>
  );
}